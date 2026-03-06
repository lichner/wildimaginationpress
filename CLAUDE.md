---
sitemap: false
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Writing Style Rules

- **Never use em dashes (`—`) or en dashes (`–`) in any text content.** Use commas, full stops, or rewrite the sentence instead. This applies to all user-facing copy: HTML content, front matter descriptions, blog posts, and any generated text.

## Project Overview

Wild Imagination Press is a Jekyll-based static website for a children's book publisher. The site showcases books with a nature-inspired design, includes email signup functionality via MailerLite API with Google reCAPTCHA v3, and features comprehensive SEO optimization. Deployed on GitHub Pages.

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
- **Platform**: GitHub Pages (direct deployment from `main` branch, no GitHub Actions workflow)
- **Build command**: `bundle exec jekyll build`
- **Publish directory**: `_site`

## Architecture Overview

### Jekyll Collections System
Two collections are configured:
- **`books`**: Book pages with permalink `/:collection/:name/` (e.g., `/books/one-puppy-two-puppies/`)
- **`authors`**: Author pages with permalink `/author/:name/` (e.g., `/author/rebecca-mola/`)

Books use `.html` extension (not `.md`) to support rich HTML content.

**Key point**: When adding books, create `.html` files in `_books/` directory with YAML front matter + HTML content.

### Layouts & Includes Structure

**Layouts** (4 total):
- **`_layouts/default.html`**: Main site template with header, navigation, footer, analytics
- **`_layouts/book.html`**: Extends default for individual book pages (hero, description, reviews, related books)
- **`_layouts/post.html`**: Blog post layout
- **`_layouts/author.html`**: Author profile pages

**Key Includes** (8 total):
- **`_includes/head.html`**: SEO metadata, Open Graph tags, Google Analytics, reCAPTCHA, structured data (JSON-LD), font loading
- **`_includes/signup-modal.html`**: Reusable email signup modal triggered by `data-signup-modal` buttons
- **`_includes/thank-you-modal.html`**: Success modal shown after form submission
- **`_includes/book-preview.html`**: Book preview image gallery
- **`_includes/book-review-form.html`**: Review intent signup form for book pages
- **`_includes/book-notify-form.html`**: "Notify me" signup for coming-soon books
- **`_includes/book-notify-pill.html`**: Compact notification signup pill
- **`_includes/help-others-discover-section.html`**: Review/sharing CTA section on book pages

### JavaScript Architecture
- **`assets/js/main.js`**: Core site functionality
  - Mobile navigation toggle with hamburger menu
  - Email signup via **MailerLite API** (config at top of file with API key and group IDs)
  - Signup modal system (`openSignupModal`/`closeSignupModal`) driven by `data-signup-modal` trigger buttons
  - Thank-you modal with variant content (newsletter vs review)
  - Google reCAPTCHA v3 integration for form submissions
  - Smooth scrolling for anchor links with header offset
  - Scroll animations using Intersection Observer API
  - Amazon link tracking via event delegation
  - Lazy image loading
  - Email validation utilities
  - Notification system for user feedback
  - Customer reviews progressive disclosure (show more/fewer)

- **`assets/js/analytics.js`**: Separate Google Analytics initialization with privacy-focused configuration (IP anonymization, cookie settings)

**Note**: Some `onclick` attributes exist in `book.html` and `thank-you-modal.html`. New event handlers should use event delegation or `addEventListener` for consistency.

### CSS Architecture
- **`assets/css/main.scss`**: Single SCSS file with CSS custom properties
- Design uses nature-inspired color palette (greens, teals, blues, pinks)
- CSS variables defined in `:root` for easy theming
- Responsive typography using `clamp()` functions
- Mobile-first responsive design

### Data Files
- **`_data/reviews.yml`**: Customer reviews per book, used for dynamic aggregate ratings in `book.html` JSON-LD structured data

### Configuration (`_config.yml`)
Key settings include:
- Site metadata: title, description, URL, timezone
- SEO settings: tagline, social links, author info, logo
- Google Analytics ID: `google_analytics: G-F2V6B1H630`
- Navigation: Defined in `nav_links` array
- Jekyll plugins: jekyll-sitemap, jekyll-feed, jekyll-seo-tag
- Collections configuration for books and authors with custom permalinks
- Blog settings with permalink pattern and excerpts
- Sitemap priorities and changefreq settings

## Content Management

### Adding New Books
1. Create new file in `_books/` directory (e.g., `new-book-title.html`)
2. Use this front matter template:

```yaml
---
title: "Book Title"
book_title: "Book Title"
sub_title: "Optional Subtitle"
author:
  name: Rebecca Mola
  url: /author/rebecca-mola/
order: 1  # Display order in book listings
status: "Coming Soon"  # or "Available"
age_range: "2-6 years"
image: /assets/images/books/cover-square-medium.jpg  # Square image for cards
category: "Picture Book"
cover_image: "/assets/images/books/cover-large.jpg"  # Large cover for book page
features:
  - Feature 1
  - Feature 2
  - Feature 3

# Categorization
category_meta:
  primary: "JUVENILE FICTION / Animals / General"
  secondary: "JUVENILE FICTION / Imagination & Play"
bisac_codes:
  - "JUV002000"
amazon_categories:
  - "Children's Books > Animals"

# SEO
seo:
  json_ld: false
  type: WebPage
description: "Short description for previews and SEO"
keywords: "keyword1, keyword2, keyword3"

# Book Details
published_date: "2025-01-01"
isbn: "978-XXXXXXXXX"
page_count: 32
publisher: "Wild Imagination Press"

# Amazon KDP Product Links (multi-format, multi-marketplace)
amazon:
  kindle:
    asin: ""
    url: ""
    price: "$4.99 AUD"
    ku_eligible: true
    status: "pending"  # pending | available | coming_soon
  paperback:
    asin: ""
    url: ""
    price: "$19.95 AUD"
    print_length: 32
    status: "pending"
  audiobook:
    asin: ""
    url: ""
    price: "$14.99 AUD"
    status: "pending"

format: "Paperback"  # Primary format for display

# Social Sharing
og_image: "/assets/images/books/cover-square-medium.jpg"
twitter_image: "/assets/images/books/cover-square-medium.jpg"

# Book Preview
preview_images:
  - path: "/assets/images/books/page-01"
    caption: "Description of preview page"

# FAQ (renders as FAQ structured data + on-page accordion)
faq:
  - question: "Question about the book?"
    answer: "Answer to the question."

layout: book
full_description: |
  **Use Markdown syntax for rich formatting!**

  Write natural paragraphs with blank lines between them. The `markdownify` filter
  in the layout will convert this to proper HTML.

  - Use bullet points for features
  - Bold text with **double asterisks**
  - Natural paragraph breaks
---
```

**Important**: The `full_description` field uses Markdown syntax and is processed by the `markdownify` Liquid filter in `_layouts/book.html`.

3. Book pages automatically include:
   - Hero section with cover placeholder or image
   - Book metadata display
   - Status badge styling
   - Feature tags
   - Book preview gallery (if `preview_images` provided)
   - FAQ section (if `faq` provided)
   - Call-to-action button (Amazon link or notification signup)
   - Customer reviews (from `_data/reviews.yml`)
   - Related books section (shows other books in collection)

### Blog
The site includes a blog at `/blog/`. Posts use `_layouts/post.html` and follow the permalink pattern `/blog/:categories/:year/:month/:day/:title/`.

### Navigation Updates
Modify `nav_links` array in `_config.yml`:
```yaml
nav_links:
  - name: Home
    url: /
  - name: Books
    url: /books/
  - name: Blog
    url: /blog/
  - name: About Author
    url: /author/rebecca-mola/
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
- Cookie settings: `SameSite=None;Secure` for compliance

### Email Signup System
The site uses **MailerLite API** for email collection with a modal-based signup flow.

**Architecture**:
- **Backend**: MailerLite API (configured in `main.js` with API key and group IDs)
- **Forms**: Modal-based signup via `_includes/signup-modal.html`, triggered by buttons with `data-signup-modal` attribute
- **Additional forms**: `book-review-form.html`, `book-notify-form.html`, `book-notify-pill.html` for book-specific signups
- **reCAPTCHA**: Google reCAPTCHA v3 validates submissions before API call
- **Success feedback**: Thank-you modal (`_includes/thank-you-modal.html`) with variant content for newsletter vs review intents

**Two Signup Intents** (mapped to MailerLite groups):
1. **Newsletter** (group `173760929538770599`): General book updates, freebies, behind-the-scenes content
2. **Review** (group `173761193104639311`): Reader willing to review a specific book

**Data captured per submission**:
- `email` (required), `first_name` (optional)
- `intent` (newsletter or review), `source_page`, `customer_status`
- `book_slug`, `book_title`, `series`, `book_interests`
- `age_band_interest`
- `utm_source`, `utm_medium`, `utm_campaign`

**Trigger buttons** pass context via `data-*` attributes:
```html
<button data-signup-modal
        data-intent="newsletter"
        data-source="book-page"
        data-book-slug="one-puppy-two-puppies"
        data-book-title="One Puppy, Two Puppies"
        data-title="Modal Heading"
        data-subtitle="Modal subheading text">
  Sign Up
</button>
```

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

### Typography
- **Google Fonts**: Only **Quicksand** is loaded (`head.html`), used across the site
- CSS variables in `main.scss` still reference Playfair Display, Inter, and Crimson Text font families but these are not imported — Quicksand is the active font
- Responsive sizing using `clamp()` for fluid typography

### Iconography
- Material UI icons used for professional presentation
- Icon colors use CSS variables (`var(--primary-green)`, `var(--secondary-green)`)
- 20x20px standard size with responsive scaling

## Performance & Security

### GitHub Pages Configuration
The site is deployed on GitHub Pages with:
- Direct deployment from `main` branch (no GitHub Actions workflow)
- Native Jekyll support with safe mode enabled
- Automatic SSL certificates via Let's Encrypt
- Custom domain support with HTTPS enforcement

### Frontend Optimizations
- Lazy loading images with `loading="lazy"` attribute
- Intersection Observer API for efficient scroll animations
- Event delegation for better performance
- Efficient JavaScript with DOM-ready patterns
- Smooth scrolling with offset calculations for fixed header

### Structured Data
JSON-LD structured data in `_includes/head.html`:
- Organization schema with logo, founding date, contact info
- Social media links (Facebook, Instagram, X)
- Book-specific structured data with aggregate ratings from `_data/reviews.yml`
- FAQ structured data from book front matter `faq` field

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
- Authors: `.html` files in `_authors/`
- Blog posts: Markdown files in `_posts/`
- Data: `_data/reviews.yml` for customer reviews
- Images: `assets/images/` with semantic naming
- Scripts: Development/validation scripts in `_scripts/`
- Layouts: `default`, `book`, `post`, `author` in `_layouts/`
- Includes: 8 partials in `_includes/` (head, signup-modal, thank-you-modal, book-preview, book-review-form, book-notify-form, book-notify-pill, help-others-discover-section)

### Browser Support
- Modern browsers: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- Mobile browsers: iOS Safari, Chrome Mobile, Samsung Internet
- Progressive enhancement for older browsers
- Graceful degradation of advanced CSS features (backdrop-filter, etc.)

### Git Workflow
- Main branch: `main`

### Important Files Reference
- Site configuration: `_config.yml`
- Main stylesheet: `assets/css/main.scss`
- Core JavaScript: `assets/js/main.js`
- SEO metadata: `_includes/head.html`
- Homepage: `index.html`
- Book template: `_layouts/book.html`
- Signup modal: `_includes/signup-modal.html`
- Customer reviews data: `_data/reviews.yml`
- SEO validation: `_scripts/validate_seo.rb`
