import sys, asyncio, json
from playwright.async_api import async_playwright

JS = """() => {
  const out = [];
  document.querySelectorAll('.slide').forEach((sl, si) => {
    const sb = sl.getBoundingClientRect();
    const items = [];
    sl.querySelectorAll('.t').forEach(el => {
      const r = el.getBoundingClientRect();
      const txt = el.innerText.replace(/\\s+/g,' ').trim();
      if (!txt) return;
      items.push({x:r.left-sb.left, y:r.top-sb.top, w:r.width, h:r.height, t:txt.slice(0,70)});
    });
    out.push({slide: si+1, items});
  });
  return out;
}"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
                                    args=["--no-sandbox","--disable-dev-shm-usage"])
        pg = await b.new_page(viewport={"width":1360,"height":900})
        await pg.goto("file://"+sys.argv[1]); await pg.wait_for_timeout(500)
        await pg.evaluate("document.querySelectorAll('.slide').forEach(e=>e.style.transform='none')")
        await pg.wait_for_timeout(200)
        data = await pg.evaluate(JS)
        await b.close()

    FOOT = 6.46*96   # top of the reserved source-note band
    BOT  = 7.5*96
    problems = 0
    for sl in data:
        msgs = []
        its = sl["items"]
        for it in its:
            bot = it["y"]+it["h"]
            if bot > BOT - 6:
                msgs.append(f"  OFF-SLIDE  y={it['y']:.0f}..{bot:.0f}  «{it['t']}»")
            elif it["y"] >= 6.95*96:
                pass
            elif it["y"] >= FOOT - 4:
                if bot > 6.92*96:
                    msgs.append(f"  FOOTER-OVERRUN y={it['y']:.0f}..{bot:.0f}  «{it['t']}»")
            elif bot > FOOT:
                # crossing into the footer band from above
                msgs.append(f"  INTO-FOOTER y={it['y']:.0f}..{bot:.0f}  «{it['t']}»")
        for i in range(len(its)):
            for j in range(i+1, len(its)):
                a,c = its[i], its[j]
                ox = min(a['x']+a['w'], c['x']+c['w']) - max(a['x'], c['x'])
                oy = min(a['y']+a['h'], c['y']+c['h']) - max(a['y'], c['y'])
                if ox > 8 and oy > 7:
                    msgs.append(f"  OVERLAP {oy:.0f}px  «{a['t'][:44]}» ✕ «{c['t'][:44]}»")
        if msgs:
            problems += len(msgs)
            print(f"── slide {sl['slide']}")
            for m in msgs[:9]: print(m)
    print("total issues:", problems)

asyncio.run(main())
