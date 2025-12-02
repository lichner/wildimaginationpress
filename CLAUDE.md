---
sitemap: false
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wild Imagination Press is a Jekyll-based static website for a children's book publisher. The site showcases books with a nature-inspired design, includes email signup functionality with Google reCAPTCHA v3, and features comprehensive SEO optimization. Deployed on GitHub Pages with automatic deployment via GitHub Actions.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Start local development server with live reload
bundle exec jekyll serve
# Site available at http://localhost:4000

# Start server with drafts and future posts
bundle exec jekyll serve --drafts --future

# Build for production
bundle exec jekyll build
# Output: _site/

# Clean build artifacts
bundle exec jekyll clean

# Validate SEO configuration (robots.txt + sitemap.xml)
bundle exec ruby _scripts/validate_seo.rb
```

### Deployment
- **Platform**: GitHub Pages (auto-deploy from git)
- **Build command**: `bundle exec jekyll build`
- **Publish directory**: `_site`
- **Ruby version**: 3.2.2
- **Bundler version**: 2.5.9+

## Architecture Overview

### Jekyll Collections System
Books are managed via Jekyll collections, not posts. This provides:
- Custom permalinks: `/:collection/:name/` (e.g., `/books/one-puppy-two-puppies/`)
- Individual pages for each book with SEO-friendly URLs
- Flexible metadata via front matter
- Books use `.html` extension (not `.md`) to support rich HTML content

**Key point**: When adding books, create `.html` files in `_books/` directory with YAML front matter + HTML content.

### Layouts & Includes Structure
- **`_layouts/default.html`**: Main site template with header, navigation, footer, analytics
- **`_layouts/book.html`**: Extends default layout for individual book pages, includes hero section, description, and related books
- **`_includes/head.html`**: Contains SEO metadata, Open Graph tags, Google Analytics, reCAPTCHA, structured data (JSON-LD), and font preloading

### JavaScript Architecture
- **`assets/js/main.js`**: Core site functionality
  - Mobile navigation toggle with hamburger menu
  - Email form handling with reCAPTCHA v3 and Formspree integration
  - Modal functionality for thank-you messages
  - Smooth scrolling for anchor links with header offset
  - Scroll animations using Intersection Observer API
  - Amazon link tracking via event delegation (CSP-compliant)
  - Lazy image loading
  - Email validation utilities
  - Notification system for user feedback

- **`assets/js/analytics.js`**: Separate Google Analytics initialization with privacy-focused configuration (IP anonymization, cookie settings)

**Important**: All event handlers are inline or delegated for CSP compliance. No `onclick` attributes in HTML.

### CSS Architecture
- **`assets/css/main.scss`**: Single SCSS file with CSS custom properties
- Design uses nature-inspired color palette (greens, teals, blues, pinks)
- CSS variables defined in `:root` for easy theming
- Responsive typography using `clamp()` functions
- Mobile-first responsive design

### Configuration (`_config.yml`)
Key settings include:
- Site metadata: title, description, URL, timezone
- SEO settings: tagline, social links, author info, logo
- Google Analytics ID: `google_analytics: G-F2V6B1H630`
- Navigation: Defined in `nav_links` array
- Jekyll plugins: jekyll-sitemap, jekyll-feed, jekyll-seo-tag
- Collections configuration for books with custom permalinks
- Sitemap priorities and changefreq settings

## Content Management

### Adding New Books
1. Create new file in `_books/` directory (e.g., `new-book-title.html`)
2. Use this front matter template with Markdown formatting:

```yaml
---
title: "Book Title"
author: "Rebecca Mola"
status: "Coming Soon"  # or "Available"
age_range: "2-6 years"
category: "Picture Book"
features:
  - Feature 1
  - Feature 2
  - Feature 3
description: "Short description for previews"
full_description: |
  **Use Markdown syntax for rich formatting!**

  Write natural paragraphs with blank lines between them. The `markdownify` filter in the layout will convert this to proper HTML.

  Inside **Book Title**, discover:

  - Use bullet points for features
  - Bold text with **double asterisks**
  - Italic text with *single asterisks*
  - Natural paragraph breaks

  You can still embed HTML for complex layouts:

  <div class="custom-class">
    <p>HTML works when needed</p>
  </div>

  **End with a strong call to action!**
cover_image: /assets/images/book-cover.jpg  # Optional, omit if not available
amazon_link: "#"  # Use "#" for coming soon, or real Amazon URL
published_date: "2024-01-01"  # Optional
isbn: "978-XXXXXXXXX"  # Optional
price: "$12.99"  # Optional
publisher: "Wild Imagination Press"
layout: book
---
```

**Important**: The `full_description` field uses Markdown syntax and is processed by the `markdownify` Liquid filter in `_layouts/book.html`. This provides:
- Proper semantic HTML output (`<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`)
- Better authoring experience (clean, readable syntax)
- Natural paragraph and list formatting
- Ability to mix Markdown with HTML when needed

3. Book pages automatically include:
   - Hero section with cover placeholder or image
   - Book metadata display
   - Status badge styling
   - Feature tags
   - Call-to-action button (Amazon link or notification signup)
   - Related books section (shows other books in collection)

### Navigation Updates
Modify `nav_links` array in `_config.yml`:
```yaml
nav_links:
  - name: Home
    url: /
  - name: Books
    url: /books/
  - name: About Author
    url: /#author
  - name: Contact
    url: /#contact
```

## SEO & Analytics

### SEO Validation System
The `_scripts/` directory contains Ruby-based SEO validation:
- **`validate_seo.rb`**: Combined validator runner
- **`validate_robots.rb`**: Validates robots.txt syntax and directives
- **`validate_sitemap.rb`**: Validates sitemap.xml structure and URLs
- Checks for development URLs, validates XML structure, verifies priority/frequency values
- Run validation before deployment to catch issues early

### Google Analytics Configuration
- Privacy-focused GA4 setup with IP anonymization
- Custom event tracking for:
  - Email form interactions and submissions
  - Amazon link clicks (outbound tracking)
  - Form validation errors
  - Conversion events with reCAPTCHA status
- All tracking is CSP-compliant with event delegation
- Cookie settings: `SameSite=None;Secure` for compliance

### Email Form Integration
- Client-side form in contact section with validation
- Google reCAPTCHA v3 integration (site key in `_includes/head.html`)
- Formspree backend for email collection (action URL in form)
- Modal thank-you message on successful submission
- Analytics tracking for form engagement and conversions
- Works in both localhost and production environments

**Note**: If Formspree integration needs updating, modify form action URL in `index.html` contact section.

## Design System

### Color Palette
Nature-inspired palette defined in CSS custom properties (`assets/css/main.scss`):
- **Primary Green**: `#2d5a3d` (headers, navigation)
- **Secondary Green**: `#4a7c59` (accents, gradients)
- **Light Green**: `#7eb3a0` (subtle backgrounds)
- **Bridge Green**: `#5a8b6b` (gradient transitions)
- **Soft Teal**: `#6b9a8a` (bridge between green and blue)
- **Accent Blue**: `#6fa8dc` (hero sections, highlights)
- **Warm Yellow**: `#f7e7b4` (callouts)
- **Soft Pink**: `#f4c2c2` (buttons, accents)
- **Cream**: `#faf7f2` (warm backgrounds)
- **Warm White**: `#fefefe` (primary background)

### Typography Stack
- **Headings**: 'Playfair Display' (serif, elegant)
- **Body**: 'Inter' (sans-serif, modern)
- **Brand**: 'Crimson Text' (professional serif)
- Loaded via Google Fonts with preconnect optimization
- Responsive sizing using `clamp()` for fluid typography

### Iconography
- Material UI icons used for professional presentation
- Greyscale SVG icons (#666666)
- 20x20px standard size with responsive scaling
- See `HUMANIZED_ICON_OPTIONS.md` for icon strategy

## Performance & Security

### GitHub Pages Configuration
The site is deployed on GitHub Pages with:
- Automatic deployment via GitHub Actions on push to main branch
- Native Jekyll support with safe mode enabled
- Automatic SSL certificates via Let's Encrypt
- Custom domain support with HTTPS enforcement

### Frontend Optimizations
- Lazy loading images with `loading="lazy"` attribute
- Intersection Observer API for efficient scroll animations
- Event delegation for better performance
- CSP-compliant inline event tracking (no inline onclick handlers)
- Efficient JavaScript with DOM-ready patterns
- Smooth scrolling with offset calculations for fixed header

### Structured Data
JSON-LD structured data in `_includes/head.html`:
- Organization schema with logo, founding date, contact info
- Social media links (Instagram, Twitter/X)
- Enhances search engine understanding of the business

## Common Workflows

### Styling Changes
- Modify CSS custom properties in `:root` of `assets/css/main.scss` for theme changes
- All colors, spacing, and typography are centralized via CSS variables
- Changes automatically apply site-wide due to variable usage

### Adding Analytics Events
Add custom event tracking in `assets/js/main.js`:
```javascript
if (typeof gtag !== 'undefined') {
    gtag('event', 'event_name', {
        'event_category': 'category',
        'event_label': 'label',
        'value': 1
    });
}
```

### Testing Responsive Design
Key breakpoints are defined in `main.scss`. Test mobile navigation, book grid layout, and form behavior at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Development Notes

### File Organization
- Books: `.html` files in `_books/` with YAML front matter
- Images: `assets/images/` with semantic naming
- Scripts: Development/validation scripts in `_scripts/`
- Layouts: Two-level layout inheritance (default → book)

### Browser Support
- Modern browsers: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- Mobile browsers: iOS Safari, Chrome Mobile, Samsung Internet
- Progressive enhancement for older browsers
- Graceful degradation of advanced CSS features (backdrop-filter, etc.)

### Git Workflow
- Main branch: `main`
- Clean working tree at start of conversation
- Recent commits include content updates (Bushlandia, tags, home page changes)

### Important Files Reference
- Site configuration: `_config.yml`
- Main stylesheet: `assets/css/main.scss`
- Core JavaScript: `assets/js/main.js`
- SEO metadata: `_includes/head.html`
- Homepage: `index.html`
- Book template: `_layouts/book.html`
- SEO validation: `_scripts/validate_seo.rb`
