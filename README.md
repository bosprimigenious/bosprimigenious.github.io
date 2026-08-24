# bosprimigenious.github.io

Personal site built with [al-folio](https://github.com/alshedivat/al-folio), migrated from `my-web`. Live at <https://bosprimigenious.github.io>.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000

Requires Ruby 3+ and Bundler. See [docs/INSTALL.md](docs/INSTALL.md) in upstream al-folio.

## Content

- `_pages/about.md` — homepage
- `_projects/` — GitHub public repos (regenerate: `node scripts/generate-projects.mjs`)
- `_posts/` — blog
- `_bibliography/papers.bib` — publications
- `_data/socials.yml` — contact links

## Deploy

Push to `main` on `bosprimigenious.github.io`. GitHub Actions builds the site and publishes it to `https://bosprimigenious.github.io`.
