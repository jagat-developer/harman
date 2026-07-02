# Harman Homes Blog Brand Guide

## Brand Position

The blog should feel like a trusted local real estate desk for Brampton and the GTA. It should connect directly to Harman Sangha's existing RE/MAX Gold Realty presence while being more readable and editorial than the current legacy site.

## Visual System

- Typography: PT Serif for large editorial headings, Poppins for body copy and UI.
- Primary colors: charcoal `#202020`, ink `#101216`, white `#ffffff`.
- Brand accents: RE/MAX blue `#003DA5`, RE/MAX red `#DC1C2E`.
- Support colors: mist `#eef1f4`, slate `#4b5563`, silver `#d7dbe0`.
- Radius: keep cards and buttons at `8px` or less.
- Imagery: use real Harman Sangha, brokerage, property, and market images. Blog cards use the Uplift `featuredImage` when provided.

## Content Style

- Lead with practical real estate decisions: buy, sell, invest, evaluate, compare.
- Prefer clear market context over generic lifestyle copy.
- Keep article pages calm, readable, and SEO-ready.
- Use local signals: Brampton, Caledon, Mississauga, Woodbridge, Oakville, Burlington, Kitchener-Waterloo, Richmond Hill.

## Routes

- `/` and `/blog`: blog landing page.
- `/blog/[slug]`: individual post page powered by the Uplift detail endpoint.
- `/brand-guide`: visual brand guide for the blog theme.

## API

Use `UPLIFT_API_TOKEN` server-side. Do not expose the bearer token in public client code.
