# Icon uploads

These three files are live metadata assets. Replace them **with the same
filenames** to update the website without changing code:

- `favicon.ico` — browser tabs and bookmarks; use a square multi-size ICO.
- `app-icon.png` — general app/search icon; use a square 256×256 PNG or larger.
- `apple-touch-icon.png` — iPhone/iPad home-screen icon; use a 180×180 PNG.

Avoid transparency on the Apple icon; iOS supplies its own rounded mask.

Issue #2 supplies the logo used by these icons. `favicon.svg` preserves that
vector source. The ICO contains 16, 32, 48, 64, 128, and 256 px images.
Keep `public/favicon.ico` in sync with this directory’s ICO for browser fallback
and the web manifest. Increment icon URL versions in layout/manifest metadata
when replacing assets to avoid stale browser caches.
