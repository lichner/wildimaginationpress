# Authors Collection Implementation

This document describes the authors collection system implemented for Wild Imagination Press.

## Overview

The site now uses a Jekyll `_authors` collection to manage author profiles with individual URLs like `/author/rebecca-mola/`. This approach is scalable, maintainable, and consistent with the existing `_books` collection pattern.

## URL Structure

- **Individual author pages**: `/author/rebecca-mola/`, `/author/another-author/`
- **Legacy redirect**: `/author/` redirects to `/author/rebecca-mola/`

## File Structure

```
_authors/
  rebecca-mola.html         # Rebecca Mola's author profile

_layouts/
  author.html              # Template for author pages

author.html                # Legacy page with redirect to main author
```

## Configuration

### _config.yml

```yaml
collections:
  authors:
    output: true
    permalink: /author/:name/
```

Sitemap configuration added for authors collection with priority 0.8 and monthly changefreq.

### Navigation

Updated navigation link in `_config.yml`:
```yaml
nav_links:
  - name: About Author
    url: /author/rebecca-mola/
```

Updated site-wide author URL:
```yaml
author:
  url: https://wildimaginationpress.com/author/rebecca-mola/
```

## Author Profile Structure

Each author file in `_authors/` uses this front matter:

```yaml
---
layout: author
name: Rebecca Mola                # Full name
slug: rebecca-mola               # URL slug (must match filename)
tagline: Children's Book Author | Creativity Advocate | Nature Lover
image: /assets/images/rebecca.jpeg
email: rebecca@wildimaginationpress.com
job_title: Children's Book Author
description: Author bio for SEO
age_range: Ages 0-10
location: Australia
nationality: Australia

# SEO
title: About Rebecca Mola - Children's Book Author
seo_description: SEO description

# Social links
social:
  instagram: wildimaginationpress
  facebook: people/Wild-Imagination-Press/61583883973173/
  twitter: wildimaginpress
  tiktok: wildimaginationpress

# Schema.org metadata
knows_about:
  - Children's Literature
  - Early Childhood Education
  - Environmental Education
  - Creative Writing
---

<!-- Author bio content in HTML -->
```

## Author Layout Features

The `_layouts/author.html` template provides:

1. **Hero section** with author image and stats (dynamically counts books)
2. **About section** with author bio (from page content)
3. **Books section** showing all books by the author (filtered automatically)
4. **Connect section** with social links and email (if provided)
5. **Schema.org JSON-LD** for SEO

## Linking to Authors

### In Book Front Matter

```yaml
author:
  name: Rebecca Mola
  url: /author/rebecca-mola/
```

### In Templates

The layout automatically links to authors using the `author.url` field.

## Adding New Authors

1. Create new file: `_authors/author-name.html`
2. Add front matter (use `rebecca-mola.html` as template)
3. Add author bio content
4. Update book files to reference the new author:
   ```yaml
   author:
     name: Author Name
     url: /author/author-name/
   ```

## Backward Compatibility

The original `/author/` URL automatically redirects to `/author/rebecca-mola/` using:
- JavaScript redirect (instant)
- Meta refresh tag (for no-JS browsers)

This ensures existing links and bookmarks continue to work.

## Benefits

- ✅ **Scalable**: Easy to add multiple authors
- ✅ **SEO-friendly**: Individual author pages with unique URLs
- ✅ **Maintainable**: Consistent with books collection pattern
- ✅ **Flexible**: Each author can have unique content and metadata
- ✅ **Backward compatible**: Legacy URLs still work

## Related Files

- `_config.yml` - Collection configuration
- `_layouts/author.html` - Author page template
- `_authors/` - Author profiles directory
- `author.html` - Legacy redirect page
- All book files in `_books/` - Updated author URLs
