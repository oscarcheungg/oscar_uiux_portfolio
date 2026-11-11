# ascii-sharks (vendored)

ASCII sharks and schooling fish on a canvas, by drewdi.
Source: https://github.com/stackedlol/ascii-sharks (MIT, see LICENSE).

Copied from the `main` branch, then modified for this portfolio (allowed under
the MIT licence): `RenderOptions` adds a light theme (pale sharks with dark
glyphs, grey fish, blue wakes) and a transparent background, threaded through
`OceanEngine` and `AsciiOcean`; four koi kinds (kohaku, sanke, tancho,
ogon) add a koi body with a rounded tail fan and red patches or black spots
in the renderer, and calm behaviour in the world (no hunting, a slow glide,
curiosity about the pointer, hurrying to where a click lands); five more koi
varieties (kigoi, orenji, asagi, shusui, showa); ripple rings drawn from each
click; and `EngineOptions` hooks (`canSplash`, `onSplash`) so the page can
ignore presses on links and play a sound. Marked "Portfolio addition" in the
source. Used on the
homepage via `src/home/Ocean.tsx`.
