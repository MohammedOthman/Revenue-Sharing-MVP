# Deck build

`Reven_Investor_Deck_2026.pptx` is generated, not hand-laid. Narrative, sources and the
assumption register live in [`../Reven_Pitch_Deck_Strategic_Narrative.md`](../Reven_Pitch_Deck_Strategic_Narrative.md).

| File | What it is |
|---|---|
| `reven_deck.py` | Slide engine — the Reven palette from `BRAND.md`/`tokens.css`, layout primitives, and an HTML mirror that renders the **same coordinates** (1in = 96px) so slides can be checked without PowerPoint |
| `build_deck.py` | The deck itself: 20 slides + 5 appendix pages, with speaker notes |
| `audit.py` | Layout check — flags text that overflows a slide, runs into the source-note band, or collides with another block |
| `shot.py` | Screenshots every slide via the pre-installed Chromium |

```sh
pip install python-pptx playwright
python3 build_deck.py                      # → ../Reven_Investor_Deck_2026.pptx + deck.html
python3 audit.py "$PWD/deck.html"          # layout check
python3 shot.py "$PWD/deck.html" ./shots   # per-slide PNGs
```

Edit the `.pptx` directly for one-off wording; regenerate when the structure changes.
