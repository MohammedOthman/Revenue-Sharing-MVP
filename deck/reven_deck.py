"""
Reven — branded PPTX slide engine.

Brand truth: BRAND.md + revenue-share-platform/frontend/src/styles/tokens.css
  navy ink   #0C1B3C   page base #0A1122
  electric   #2A5BF5   (the logo squares — the accent, never a gradient)
  off-white  #EAEEF7
  brass      #CBA254   RESERVED FOR MONETARY VALUES ONLY

16:9, 13.333in x 7.5in.
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.dml import MSO_LINE_DASH_STYLE
import copy

# ---------------------------------------------------------------- palette ---
INK_900 = RGBColor(0x0A, 0x11, 0x22)   # page base
INK_870 = RGBColor(0x0D, 0x15, 0x28)
INK_850 = RGBColor(0x10, 0x1A, 0x32)   # raised panel
INK_820 = RGBColor(0x14, 0x20, 0x3C)   # card
INK_780 = RGBColor(0x1B, 0x2A, 0x4C)
INK_720 = RGBColor(0x24, 0x34, 0x5E)
NAVY    = RGBColor(0x0C, 0x1B, 0x3C)   # the logo navy

PAPER_50  = RGBColor(0xEE, 0xF0, 0xF5)
PAPER_100 = RGBColor(0xE2, 0xE7, 0xF0)
PAPER_INK = RGBColor(0x0C, 0x1B, 0x3C)
PAPER_MID = RGBColor(0x47, 0x51, 0x6B)

TEXT_HI    = RGBColor(0xEA, 0xEE, 0xF7)
TEXT_MID   = RGBColor(0xA6, 0xB2, 0xCA)
TEXT_LO    = RGBColor(0x6E, 0x7A, 0x94)
TEXT_FAINT = RGBColor(0x48, 0x52, 0x6E)

BRAND_700 = RGBColor(0x1A, 0x3A, 0xA8)
BRAND_600 = RGBColor(0x21, 0x49, 0xCE)
BRAND_500 = RGBColor(0x2A, 0x5B, 0xF5)   # the logo blue
BRAND_400 = RGBColor(0x4E, 0x78, 0xFF)
BRAND_300 = RGBColor(0x86, 0xA2, 0xFF)
BRAND_200 = RGBColor(0xB3, 0xC4, 0xFF)

BRASS_500 = RGBColor(0xB9, 0x8F, 0x3C)
BRASS_400 = RGBColor(0xCB, 0xA2, 0x54)
BRASS_300 = RGBColor(0xE0, 0xBE, 0x74)   # money figures on dark

OK   = RGBColor(0x4F, 0xC0, 0x88)
WAIT = RGBColor(0xE0, 0xBE, 0x74)
WARN = RGBColor(0xE0, 0x95, 0x5E)
STOP = RGBColor(0xE4, 0x69, 0x5A)
HOLD = RGBColor(0x8C, 0x97, 0xB2)

EDGE        = RGBColor(0x23, 0x2C, 0x43)   # flattened rgba(234,238,247,.10) on ink
EDGE_SOFT   = RGBColor(0x18, 0x20, 0x33)
EDGE_STRONG = RGBColor(0x2E, 0x37, 0x50)

# --------------------------------------------------------------- typefaces --
# Iowan Old Style is not present in Office; Georgia is the closest cross-platform
# member of the same fallback stack declared in tokens.css.
F_DISPLAY = "Georgia"
F_SANS    = "Segoe UI"
F_MONO    = "Consolas"

W = 13.3333
H = 7.5
M = 0.86          # page margin


# ------------------------------------------------------------------ helpers -
def _solid(shape, color):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color


def _noline(shape):
    shape.line.fill.background()


def rect(slide, x, y, w, h, fill=None, line=None, lw=1.0, radius=None, dash=None):
    shp = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,
        Inches(x), Inches(y), Inches(w), Inches(h))
    if radius:
        try:
            shp.adjustments[0] = radius
        except Exception:
            pass
    if fill is None:
        shp.fill.background()
    else:
        _solid(shp, fill)
    if line is None:
        _noline(shp)
    else:
        shp.line.color.rgb = line
        shp.line.width = Pt(lw)
        if dash:
            shp.line.dash_style = dash
    shp.shadow.inherit = False
    html_rect(x, y, w, h, fill, line, radius, lw)
    return shp


def line(slide, x, y, w, color=EDGE, lw=1.0):
    return rect(slide, x, y, w, 0.012, fill=color)


def vline(slide, x, y, h, color=EDGE, lw=1.0):
    return rect(slide, x, y, 0.012, h, fill=color)


def text(slide, x, y, w, h, runs, size=14, color=TEXT_HI, font=F_SANS, bold=False,
         align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, spacing=1.28, tracking=None,
         italic=False, caps=False):
    """runs: a string, or a list of (string, {overrides}) tuples, or list of paragraphs
    where a paragraph is a list of such runs."""
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor

    if isinstance(runs, str):
        paras = [[(runs, {})]]
    elif runs and isinstance(runs[0], (list,)):
        paras = runs
    elif runs and isinstance(runs[0], tuple):
        paras = [list(runs)]
    else:
        paras = [[(str(runs), {})]]

    for pi, para in enumerate(paras):
        p = tf.paragraphs[0] if pi == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        if pi:
            p.space_before = Pt(6)
        if isinstance(para, str):
            para = [(para, {})]
        for chunk in para:
            if isinstance(chunk, str):
                s, o = chunk, {}
            else:
                s, o = chunk
            r = p.add_run()
            r.text = s.upper() if o.get("caps", caps) else s
            f = r.font
            f.name = o.get("font", font)
            f.size = Pt(o.get("size", size))
            f.bold = o.get("bold", bold)
            f.italic = o.get("italic", italic)
            f.color.rgb = o.get("color", color)
            tr = o.get("tracking", tracking)
            if tr is not None:
                f._rPr.set("spc", str(int(tr * 100)))
    html_text(x, y, w, h, paras, size, color, font, bold, align, spacing,
              tracking, italic, caps)
    return tb


def eyebrow(slide, x, y, s, color=BRAND_300, size=10.5, w=8.0):
    return text(slide, x, y, w, 0.26, s, size=size, color=color, font=F_SANS,
                bold=True, caps=True, tracking=2.2)


def accent_squares(slide, x, y, size=0.105, gap=0.145, color=BRAND_500):
    """The brand's signature: two squares on a diagonal."""
    rect(slide, x, y, size, size, fill=color)
    rect(slide, x + gap, y + gap, size, size, fill=color)


# ------------------------------------------------------------------- deck ---
class Deck:
    def __init__(self):
        self.prs = Presentation()
        self.prs.slide_width = Inches(W)
        self.prs.slide_height = Inches(H)
        self.blank = self.prs.slide_layouts[6]
        self.n = 0
        self._notes = []

    def slide(self, bg=INK_900, chrome=True, label=None, count=True):
        s = self.prs.slides.add_slide(self.blank)
        if count:
            html_new_slide(bg, self.n + 1, label, chrome)
        else:
            html_new_slide(bg, self.n, label, chrome)
        bgshape = rect(s, 0, 0, W, H, fill=bg)
        # push background to back
        sp = bgshape._element
        sp.getparent().remove(sp)
        s.shapes._spTree.insert(2, sp)
        if count:
            self.n += 1
        if chrome:
            self._chrome(s, label, bg)
        return s

    def _chrome(self, s, label, bg):
        dark = bg in (INK_900, INK_870, INK_850, INK_820, NAVY, INK_780)
        rule = EDGE_SOFT if dark else RGBColor(0xD3, 0xD9, 0xE4)
        quiet = TEXT_FAINT if dark else RGBColor(0x8B, 0x93, 0xA6)
        line(s, M, H - 0.62, W - 2 * M, color=rule)
        # left: wordmark tick + label
        accent_squares(s, M, H - 0.44, size=0.072, gap=0.10,
                       color=BRAND_500 if dark else BRAND_600)
        text(s, M + 0.30, H - 0.455, 6.2, 0.24,
             ("Reven" if not label else f"Reven   ·   {label}"),
             size=9, color=quiet, font=F_SANS, bold=True, caps=True, tracking=2.0)
        text(s, W - M - 1.2, H - 0.455, 1.2, 0.24, f"{self.n:02d}",
             size=9, color=quiet, font=F_MONO, align=PP_ALIGN.RIGHT, tracking=1.0)

    def note(self, slide, s):
        slide.notes_slide.notes_text_frame.text = s

    def save(self, path):
        self.prs.save(path)
        return path


# ============================================================== LAYOUTS =====
# Every content slide obeys one rule: the headline is an ASSERTION (a full
# sentence that states the point), never a topic label.

def title_slide(d, kicker, title, subtitle, footer):
    s = d.slide(chrome=False, count=False)
    # a single quiet brand field, no gradient
    rect(s, 0, 0, 0.055, H, fill=BRAND_500)
    accent_squares(s, M, 1.15, size=0.16, gap=0.22)
    text(s, M, 1.72, 9.0, 0.3, kicker, size=11, color=BRAND_300,
         font=F_SANS, bold=True, caps=True, tracking=3.0)
    text(s, M, 2.28, 7.95, 2.4, title, size=54, color=TEXT_HI,
         font=F_DISPLAY, spacing=1.02, tracking=-0.8)
    line(s, M, 4.68, 3.2, color=BRAND_500)
    text(s, M, 4.98, 9.4, 1.0, subtitle, size=16.5, color=TEXT_MID,
         font=F_SANS, spacing=1.42)
    text(s, M, H - 1.02, 10.0, 0.3, footer, size=9.5, color=TEXT_FAINT,
         font=F_SANS, caps=True, tracking=2.0)
    return s


def section_slide(d, num, kicker, title, blurb=None):
    s = d.slide(bg=NAVY, chrome=True, count=True)
    text(s, M, 1.62, 2.1, 1.5, num, size=72, color=RGBColor(0x1E, 0x2E, 0x55),
         font=F_DISPLAY, bold=False)
    text(s, M + 2.35, 1.92, 9.5, 0.3, kicker, size=10.5, color=BRAND_300,
         font=F_SANS, bold=True, caps=True, tracking=3.0)
    text(s, M + 2.35, 2.40, 9.8, 1.9, title, size=40, color=TEXT_HI,
         font=F_DISPLAY, spacing=1.06, tracking=-0.5)
    if blurb:
        line(s, M + 2.35, 4.62, 2.6, color=BRAND_500)
        text(s, M + 2.35, 4.92, 8.9, 1.2, blurb, size=14.5, color=TEXT_MID,
             font=F_SANS, spacing=1.5)
    return s


def assertion(s, headline, kicker=None, y=1.05, w=11.0, size=31):
    if kicker:
        eyebrow(s, M, y - 0.42, kicker)
    text(s, M, y, w, 1.55, headline, size=size, color=TEXT_HI,
         font=F_DISPLAY, spacing=1.12, tracking=-0.4)
    return s


def source_note(s, txt, y=None):
    y = y if y is not None else H - 1.02
    text(s, M, y, W - 2 * M, 0.34, txt, size=8, color=TEXT_FAINT,
         font=F_SANS, spacing=1.35)


def stat_card(s, x, y, w, h, value, label, detail=None, money=False,
              tone=None, fill=INK_850, valsize=34):
    rect(s, x, y, w, h, fill=fill, line=EDGE, radius=0.035)
    rect(s, x, y, 0.035, h, fill=tone or (BRASS_400 if money else BRAND_500))
    c = tone or (BRASS_300 if money else TEXT_HI)
    vh = valsize * 1.12 / 72.0
    text(s, x + 0.34, y + 0.22, w - 0.62, vh, value, size=valsize, color=c,
         font=F_MONO if money else F_DISPLAY, tracking=-0.6)
    ly = y + 0.22 + vh + 0.06
    text(s, x + 0.34, ly, w - 0.62, 0.24, label, size=9.5, color=TEXT_MID,
         font=F_SANS, bold=True, caps=True, tracking=1.5)
    if detail:
        text(s, x + 0.34, ly + 0.32, w - 0.62, h - (ly + 0.32 - y) - 0.16, detail,
             size=9, color=TEXT_LO, font=F_SANS, spacing=1.36)


def bullet_block(s, x, y, w, items, size=13, gap=0.62, color=TEXT_MID,
                 lead_color=TEXT_HI, marker=True):
    """items: list of (lead, rest) or plain strings."""
    cy = y
    for it in items:
        if isinstance(it, tuple):
            lead, rest = it
        else:
            lead, rest = None, it
        if marker:
            rect(s, x, cy + 0.115, 0.075, 0.075, fill=BRAND_500)
        tx = x + (0.30 if marker else 0)
        runs = []
        if lead:
            runs.append((lead + "  ", {"color": lead_color, "bold": True}))
        runs.append((rest, {"color": color}))
        tb = text(s, tx, cy, w - (0.30 if marker else 0), 0.9, runs,
                  size=size, font=F_SANS, spacing=1.45)
        cy += gap
    return cy


def column(s, x, y, w, num, title, body, tone=BRAND_500, numcolor=None,
           bodysize=11.5, bh=2.4):
    text(s, x, y, w, 0.4, num, size=11, color=numcolor or tone, font=F_MONO,
         bold=True, tracking=1.6)
    line(s, x, y + 0.36, w, color=EDGE)
    text(s, x, y + 0.58, w, 0.6, title, size=17, color=TEXT_HI,
         font=F_DISPLAY, spacing=1.14)
    text(s, x, y + 1.32, w, bh, body, size=bodysize, color=TEXT_MID,
         font=F_SANS, spacing=1.48)


def table(s, x, y, w, cols, rows, colw=None, header_color=BRAND_300,
          rowh=0.46, size=11, zebra=True, first_bold=True, mono_cols=()):
    n = len(cols)
    colw = colw or [w / n] * n
    cx = x
    for i, c in enumerate(cols):
        text(s, cx, y, colw[i] - 0.16, 0.3, c, size=9, color=header_color,
             font=F_SANS, bold=True, caps=True, tracking=1.6)
        cx += colw[i]
    line(s, x, y + 0.34, w, color=EDGE_STRONG)
    cy = y + 0.50
    for ri, r in enumerate(rows):
        if zebra and ri % 2 == 1:
            rect(s, x - 0.16, cy - 0.09, w + 0.32, rowh, fill=INK_850)
        cx = x
        for ci, cell in enumerate(r):
            val, opts = (cell if isinstance(cell, tuple) else (cell, {}))
            text(s, cx, cy, colw[ci] - 0.16, rowh, val,
                 size=opts.get("size", size),
                 color=opts.get("color", TEXT_HI if (first_bold and ci == 0) else TEXT_MID),
                 font=opts.get("font", F_MONO if ci in mono_cols else F_SANS),
                 bold=opts.get("bold", first_bold and ci == 0),
                 spacing=1.24)
            cx += colw[ci]
        cy += rowh
    return cy


def quote(s, x, y, w, body, attrib, size=17):
    rect(s, x, y, 0.035, 1.5, fill=BRAND_500)
    text(s, x + 0.34, y - 0.04, w - 0.4, 1.4, f"“{body}”", size=size,
         color=TEXT_HI, font=F_DISPLAY, italic=False, spacing=1.34)
    text(s, x + 0.34, y + 1.34, w - 0.4, 0.3, attrib, size=9.5, color=TEXT_LO,
         font=F_SANS, caps=True, tracking=1.4)


def phase_band(s, x, y, w, h, idx, tag, name, window, body, bullets,
               tone=BRAND_500, dim=False):
    fill = INK_850 if not dim else INK_870
    rect(s, x, y, w, h, fill=fill, line=EDGE, radius=0.03)
    rect(s, x, y, w, 0.045, fill=tone)
    text(s, x + 0.34, y + 0.30, w - 0.68, 0.3, tag, size=9, color=tone,
         font=F_SANS, bold=True, caps=True, tracking=2.2)
    text(s, x + 0.34, y + 0.62, w - 0.68, 0.5, name, size=21, color=TEXT_HI,
         font=F_DISPLAY, tracking=-0.3)
    text(s, x + 0.34, y + 1.14, w - 0.68, 0.3, window, size=9.5, color=TEXT_LO,
         font=F_MONO, tracking=0.6)
    text(s, x + 0.34, y + 1.50, w - 0.68, 0.9, body, size=10.5, color=TEXT_MID,
         font=F_SANS, spacing=1.40)
    line(s, x + 0.34, y + 2.36, w - 0.68, color=EDGE)
    cy = y + 2.50
    for b in bullets:
        rect(s, x + 0.34, cy + 0.09, 0.055, 0.055, fill=tone)
        text(s, x + 0.54, cy - 0.02, w - 0.90, 0.44, b, size=9.5, color=TEXT_MID,
             font=F_SANS, spacing=1.34)
        cy += 0.42
    return cy


# ══════════════════════════════════════════════════════════ HTML MIRROR ═════
# The PPTX is the editable deliverable; this renders the SAME coordinates to
# HTML so the layout can be seen (and screenshotted) without PowerPoint.
# 1 inch = 96px, 1pt = 4/3 px — so geometry is 1:1 with the slide.

PX = 96.0
_HTML = {"slides": [], "cur": None}


def _hx(c):
    return "#%02X%02X%02X" % (c[0], c[1], c[2]) if not isinstance(c, RGBColor) else "#" + str(c)


def _h(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def html_new_slide(bg, num, label, chrome):
    _HTML["cur"] = {"bg": "#" + str(bg), "els": [], "num": num, "label": label, "chrome": chrome}
    _HTML["slides"].append(_HTML["cur"])


def html_rect(x, y, w, h, fill, line, radius, lw=1.0):
    if _HTML["cur"] is None:
        return
    st = [f"left:{x*PX:.1f}px", f"top:{y*PX:.1f}px", f"width:{w*PX:.1f}px", f"height:{h*PX:.1f}px"]
    st.append(f"background:{'#'+str(fill) if fill is not None else 'transparent'}")
    if line is not None:
        st.append(f"border:{max(1,lw):.0f}px solid #{line}")
        st.append("box-sizing:border-box")
    if radius:
        st.append(f"border-radius:{min(w,h)*PX*radius*2:.1f}px")
    _HTML["cur"]["els"].append(f'<div class="r" style="{";".join(st)}"></div>')


def html_text(x, y, w, h, paras, size, color, font, bold, align, spacing, tracking, italic, caps):
    if _HTML["cur"] is None:
        return
    fam = {F_DISPLAY: "var(--serif)", F_SANS: "var(--sans)", F_MONO: "var(--mono)"}.get(font, "var(--sans)")
    al = {PP_ALIGN.LEFT: "left", PP_ALIGN.CENTER: "center", PP_ALIGN.RIGHT: "right"}.get(align, "left")
    st = [f"left:{x*PX:.1f}px", f"top:{y*PX:.1f}px", f"width:{w*PX:.1f}px",
          f"font-family:{fam}", f"font-size:{size*4/3:.2f}px", f"color:#{color}",
          f"text-align:{al}", f"line-height:{spacing}"]
    if bold:
        st.append("font-weight:700")
    if italic:
        st.append("font-style:italic")
    if tracking is not None:
        st.append(f"letter-spacing:{tracking*4/3:.2f}px")
    if caps:
        st.append("text-transform:uppercase")
    body = []
    for para in paras:
        runs = []
        for chunk in para:
            t, o = (chunk if isinstance(chunk, tuple) else (chunk, {}))
            rs = []
            if "size" in o:
                rs.append(f"font-size:{o['size']*4/3:.2f}px")
            if "color" in o:
                rs.append(f"color:#{o['color']}")
            if o.get("bold"):
                rs.append("font-weight:700")
            if o.get("italic"):
                rs.append("font-style:italic")
            if "font" in o:
                rs.append("font-family:" + {F_DISPLAY: "var(--serif)", F_SANS: "var(--sans)",
                                            F_MONO: "var(--mono)"}.get(o["font"], "var(--sans)"))
            if "tracking" in o:
                rs.append(f"letter-spacing:{o['tracking']*4/3:.2f}px")
            txt = _h(t.upper() if o.get("caps", caps) else t).replace("\n", "<br>")
            runs.append(f'<span style="{";".join(rs)}">{txt}</span>' if rs else txt)
        body.append("<p>" + "".join(runs) + "</p>")
    _HTML["cur"]["els"].append(f'<div class="t" style="{";".join(st)}">{"".join(body)}</div>')


HTML_SHELL = """<style>
/* The deck commits to one visual world — the navy it is projected in. The page
   is the wall it hangs on, so it stays in that world in both OS themes rather
   than inverting slides that are fixed navy renders. */
:root{
  --serif:"Iowan Old Style","Hoefler Text","Palatino Linotype",Palatino,Charter,Georgia,serif;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --mono:ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace;
  --wall:#05090F; --slide:#0A1122; --edge:#1B2337; --edge-hi:#2A3550;
  --hi:#EAEEF7; --mid:#A6B2CA; --lo:#6E7A94; --faint:#3D465F;
  --brand:#2A5BF5; --brand-lt:#86A2FF; --brass:#CBA254;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
body{margin:0;background:var(--wall);color:var(--hi);font-family:var(--sans);
  -webkit-font-smoothing:antialiased;font-size:15px;line-height:1.55}

.bar{position:sticky;top:0;z-index:10;background:rgba(5,9,15,.86);
  backdrop-filter:blur(10px);border-bottom:1px solid var(--edge)}
.bar-in{max-width:1320px;margin:0 auto;padding:11px 20px;display:flex;
  align-items:center;gap:14px}
.mark{display:flex;gap:3px;flex:0 0 auto}
.mark i{width:7px;height:7px;background:var(--brand);display:block}
.mark i:last-child{align-self:flex-end}
.bar b{font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--mid)}
.bar .sec{margin-left:auto;font-family:var(--mono);font-size:11px;color:var(--lo);
  letter-spacing:.04em;text-align:right}

.wrap{max-width:1320px;margin:0 auto;padding:0 20px 88px}

.intro{padding:56px 0 40px;border-bottom:1px solid var(--edge);margin-bottom:44px;
  display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:44px;align-items:start}
@media (max-width:820px){.intro{grid-template-columns:1fr;gap:28px;padding-top:36px}}
.intro h1{font-family:var(--serif);font-weight:400;font-size:clamp(28px,4.2vw,42px);
  line-height:1.14;margin:0 0 16px;text-wrap:balance;letter-spacing:-.01em}
.intro .kick{font-size:11px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--brand-lt);font-weight:700;margin:0 0 14px}
.intro p{color:var(--mid);margin:0 0 12px;max-width:62ch}
.intro p:last-child{margin-bottom:0}
.aside{border-left:1px solid var(--edge);padding-left:22px}
.aside dt{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--lo);
  font-weight:700;margin-bottom:4px}
.aside dd{margin:0 0 16px;color:var(--mid);font-size:13.5px}
.aside dd:last-child{margin-bottom:0}
.aside code{font-family:var(--mono);font-size:12.5px;color:var(--hi)}

.row{display:grid;grid-template-columns:104px minmax(0,1fr);gap:20px;
  align-items:start;margin-bottom:26px;scroll-margin-top:76px}
@media (max-width:900px){.row{grid-template-columns:1fr;gap:8px}}
.gut{padding-top:2px;text-align:right}
@media (max-width:900px){.gut{text-align:left;display:flex;gap:12px;align-items:baseline}}
.gut .n{font-family:var(--mono);font-size:20px;color:var(--faint);display:block;line-height:1}
.gut .s{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--lo);
  display:block;margin-top:7px;line-height:1.4}
@media (max-width:900px){.gut .s{margin-top:0}}
.frame{position:relative;width:100%;max-width:1280px;aspect-ratio:16/9;
  border:1px solid var(--edge-hi);border-radius:5px;overflow:hidden;background:var(--slide)}
.slide{position:absolute;top:0;left:0;width:1280px;height:720px;
  transform-origin:top left;overflow:hidden}
.slide .r,.slide .t{position:absolute}
.slide .t p{margin:0}

.end{border-top:1px solid var(--edge);margin-top:34px;padding-top:22px;
  color:var(--lo);font-size:13px;max-width:74ch}
.end b{color:var(--mid);font-weight:600}
.kbd{font-family:var(--mono);font-size:11px;border:1px solid var(--edge-hi);
  border-radius:3px;padding:1px 5px;color:var(--mid)}
a{color:var(--brand-lt)}
:focus-visible{outline:2px solid var(--brand);outline-offset:3px}
</style>

<div class="bar"><div class="bar-in">
  <span class="mark"><i></i><i></i></span>
  <b>Reven &nbsp;·&nbsp; Partner Revenue OS</b>
  <span class="sec" id="sec">%COUNT% slides</span>
</div></div>

<div class="wrap">
  <div class="intro">
    <div>
      <p class="kick">Pre-seed investor deck &nbsp;·&nbsp; Riyadh &nbsp;·&nbsp; August 2026</p>
      <h1>The system of record for the money one business owes another.</h1>
      <p>Twenty slides on Sequoia&rsquo;s live ten-section structure — Company purpose, Problem,
      Solution, Why now, Market potential, Competition, Business model, Team, Financials, Vision —
      sequenced on Andy Raskin&rsquo;s five strategic-narrative beats, so the deck opens on what
      changed in the world rather than on the reader&rsquo;s problem. Five appendix pages follow.</p>
      <p>Every figure carries a source. Figures that failed an adversarial verification pass were
      deleted rather than softened, and the register of what is sourced, what is assumed and what
      must still be confirmed is slide 24 — not a footnote.</p>
    </div>
    <dl class="aside">
      <dt>Throughline</dt>
      <dd>The money one business owes another for bringing it revenue has stopped being a private
      arrangement between two finance teams and become a document a government clears before it can
      be issued — and no one has built the record it turns into.</dd>
      <dt>Values in brackets</dt>
      <dd><code>[N]</code>, <code>[amount]</code>, <code>[date]</code> are founder-supplied: the
      research cannot provide them and the deck does not pretend otherwise.</dd>
      <dt>Navigate</dt>
      <dd><span class="kbd">J</span> / <span class="kbd">K</span> or
      <span class="kbd">↓</span> <span class="kbd">↑</span> to step through slides.</dd>
    </dl>
  </div>
%SLIDES%
  <p class="end"><b>The editable file carries more than this page does.</b> Speaker notes sit in the
  notes pane of every slide in <code>Reven_Investor_Deck_2026.pptx</code>, and the narrative method,
  the full script and the assumption register are in
  <code>Reven_Pitch_Deck_Strategic_Narrative.md</code>. The twelve-slide twenty-minute live cut is
  slides 1, 2, 3, 4, 6, 7, 9, 11, 12, 15, 17 and 19.</p>
</div>

<script>
(function(){
  var rows = [].slice.call(document.querySelectorAll('.row'));
  function fit(){
    rows.forEach(function(r){
      var f = r.querySelector('.frame'), s = r.querySelector('.slide');
      s.style.transform = 'scale(' + (f.clientWidth / 1280) + ')';
    });
  }
  fit();
  addEventListener('resize', fit);
  var sec = document.getElementById('sec');
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting) sec.textContent = e.target.dataset.sec + '  ·  ' +
        e.target.dataset.n + ' / ' + rows.length;
    });
  }, {rootMargin:'-45% 0px -45% 0px'});
  rows.forEach(function(r){ io.observe(r); });
  addEventListener('keydown', function(ev){
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    var k = ev.key.toLowerCase(), d = (k==='j'||ev.key==='ArrowDown') ? 1 :
            (k==='k'||ev.key==='ArrowUp') ? -1 : 0;
    if (!d) return;
    ev.preventDefault();
    var mid = innerHeight/2, cur = 0;
    rows.forEach(function(r,i){
      var b = r.getBoundingClientRect();
      if (b.top <= mid + 2) cur = i;
    });
    var t = Math.max(0, Math.min(rows.length-1, cur + d));
    rows[t].scrollIntoView({block:'start'});
  });
})();
</script>"""


def html_write(path, title="Reven — Partner Revenue OS · pre-seed investor deck",
               sections=None):
    sections = sections or []
    out = []
    for i, sl in enumerate(_HTML["slides"]):
        sec = sections[i] if i < len(sections) else ""
        out.append(
            f'  <section class="row" id="s{i+1}" data-n="{i+1}" data-sec="{_h(sec)}">\n'
            f'    <div class="gut"><span class="n">{i+1:02d}</span>'
            f'<span class="s">{_h(sec)}</span></div>\n'
            f'    <div class="frame"><div class="slide" style="background:{sl["bg"]}">'
            + "".join(sl["els"]) + '</div></div>\n  </section>')
    html = (HTML_SHELL.replace("%SLIDES%", "\n".join(out))
                      .replace("%COUNT%", str(len(_HTML["slides"]))))
    open(path, "w", encoding="utf-8").write(f"<title>{title}</title>\n" + html)
    return path
