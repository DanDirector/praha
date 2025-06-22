# Praha Static Site

This repository stores a small collection of static HTML pages for renovation
and handyman services in Prague. Each subdirectory contains a standalone
landing page (e.g. `rekonstrukce-bytu-praha/` or `hodinovy-manzel-praha/`).

## Viewing the site locally

Clone the repository and start a simple HTTP server from the project root:

```bash
python3 -m http.server
```

Then open `http://localhost:8000` in your browser.

## Deployment

The site is ready to be served via GitHub Pages. Push the contents of this
repository to a GitHub repository and enable Pages in the settings. The
included `CNAME` file shows the custom domain that was used originally; adjust
or remove it if you wish to use a different domain.
