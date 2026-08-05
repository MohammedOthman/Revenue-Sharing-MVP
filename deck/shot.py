import sys, asyncio
from playwright.async_api import async_playwright

async def main():
    src = sys.argv[1]; outdir = sys.argv[2]
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
                                    args=["--no-sandbox","--disable-dev-shm-usage"])
        pg = await b.new_page(viewport={"width":1360,"height":900}, device_scale_factor=1)
        await pg.goto("file://"+src)
        await pg.wait_for_timeout(600)
        # undo the fit() scaling so each slide shots at native 1280x720
        await pg.evaluate("document.querySelectorAll('.slide').forEach(e=>{e.style.transform='none';e.style.marginBottom='22px'});document.querySelector('.wrap').style.maxWidth='1320px'")
        await pg.wait_for_timeout(200)
        els = await pg.query_selector_all(".slide")
        print("slides:", len(els))
        for i, el in enumerate(els):
            await el.screenshot(path=f"{outdir}/s{i+1:02d}.png")
        await b.close()

asyncio.run(main())
