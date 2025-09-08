# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Wild Imagination Press is a Jekyll-based website for a children's book publisher. The site showcases books, author information, and includes email signup functionality. It's deployed on Netlify and designed with a nature-inspired color palette reflecting the magical book tree logo.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Start local development server (with live reload)
bundle exec jekyll serve
# Site will be available at http://localhost:4000

# Start development server with drafts and future posts
bundle exec jekyll serve --drafts --future

# Build the site for production
bundle exec jekyll build
# Output directory: _site/

# Clean build artifacts
bundle exec jekyll clean
```

### Netlify Deployment
The site auto-deploys to Netlify with the following build command:
```bash
bundle exec jekyll build
```
Publish directory: `_site`
Ruby version: 3.2.2 (configured in netlify.toml)

## Architecture

### Jekyll Structure & Key Concepts
- **Collections**: `_books/` uses Jekyll collections for book management with custom permalink structure (`/:collection/:name/`)
- **Layouts**: `_layouts/` contains page templates
  - `default.html` - Main site template with header/footer, navigation, and analytics
  - `book.html` - Individual book page template for collection items
- **Includes**: `_includes/` contains reusable components
  - `head.html` - SEO metadata, Open Graph tags, Google Analytics, and font loading
- **Assets**: Static files in `assets/`
  - `css/main.scss` - Main SCSS stylesheet with CSS custom properties for theming
  - `js/main.js` - Core interactivity (navigation, forms, animations, tracking)
  - `js/analytics.js` - Separate analytics initialization with privacy-focused configuration
  - `images/` - Optimized images including brand logo and author photos

### Navigation & Routing
- Navigation configured in `_config.yml` via `nav_links` array
- Responsive hamburger menu with smooth animations
- Anchor-based smooth scrolling for single-page sections
- Book collection generates individual pages with SEO-friendly URLs

### JavaScript Architecture
- Modular DOM-ready event listeners for different features
- Event delegation for performance (e.g., Amazon link tracking)
- Intersection Observer API for scroll-based animations
- CSP-compliant inline event tracking
- Email form simulation (no backend integration)

## Color Palette & Design System

The site uses a nature-inspired palette defined in CSS custom properties in `assets/css/main.scss`:
- **Primary Green**: `#2d5a3d` (headers, navigation)
- **Secondary Green**: `#4a7c59` (accents, gradients)  
- **Light Green**: `#7eb3a0` (subtle backgrounds)
- **Bridge Green**: `#5a8b6b` (gradient transitions)
- **Soft Teal**: `#6b9a8a` (bridge between green and blue)
- **Accent Blue**: `#6fa8dc` (hero sections)
- **Warm Yellow**: `#f7e7b4` (callouts)
- **Soft Pink**: `#f4c2c2` (buttons, accents)
- **Cream**: `#faf7f2` (warm backgrounds)
- **Warm White**: `#fefefe` (primary background)

### Typography Stack
- **Headings**: 'Playfair Display' (serif, loaded via Google Fonts)
- **Body**: 'Inter' (sans-serif)
- **Brand**: 'Crimson Text' (professional serif)
- Responsive font sizing using `clamp()` functions

## Content Management

### Adding New Books
1. Create a new `.html` file in `_books/` directory (e.g., `book-title.html`)
2. Use the front matter template from existing books:
```yaml
---
title: "Book Title"
author: "Author Name" 
status: "Coming Soon" # or "Available"
age_range: "2-6 years"
category: "Picture Book"
features:
  - Feature 1
  - Feature 2
description: "Short description"
full_description: |
  Full book description...
amazon_link: "#" # or actual Amazon URL
published_date: 
isbn: 
price: 
publisher: "Wild Imagination Press"
layout: book
---
```
3. Book content goes after the front matter (accessible via `{{ page.full_description }}`)

### Site Configuration (`_config.yml`)
Key settings include:
- Site metadata (title, description, URL structure)
- SEO settings (tagline, social links, author info)
- Google Analytics ID (`google_analytics: G-F2V6B1H630`)
- Navigation structure (`nav_links` array)
- Jekyll plugins (sitemap, feed, SEO tag)
- Collection configuration for books

## Performance & Security Features

### Netlify Configuration (`netlify.toml`)
- **Security Headers**: CSP, XSS protection, frame options, referrer policy
- **Caching Strategy**: Long-term caching for static assets (1 year)
- **Ruby Environment**: Version 3.2.2 with Bundler 2.5.9
- **Redirect Rules**: SEO-friendly book URL handling

### Frontend Optimizations
- CSS custom properties for consistent theming and easy maintenance
- Intersection Observer for efficient scroll animations
- Event delegation for better performance
- Lazy loading implementation ready for images
- Smooth scrolling with offset calculations for fixed headers

### Analytics & Tracking
- Privacy-focused Google Analytics setup with IP anonymization
- Custom event tracking for email signups and Amazon link clicks
- CSP-compliant implementation
- Cookie settings for compliance (`SameSite=None;Secure`)

## Development Workflow

### File Organization Patterns
- Books use `.html` extension (not `.md`) for richer content support
- SCSS variables centralized in `:root` for easy theming
- JavaScript modules organized by feature with clear separation
- Image assets follow semantic naming (logo, author photos)

### When Making Changes
- **Styling**: Modify CSS custom properties in `assets/css/main.scss` for theme changes
- **Content**: Add books to `_books/` following existing front matter structure
- **Navigation**: Update `nav_links` in `_config.yml`
- **Analytics**: Event tracking configured in `main.js` with gtag integration
- **Performance**: Test responsive design breakpoints and scroll behaviors

### Email Form Integration
- Currently client-side validation only
- Simulated submission with success messaging
- Analytics tracking configured for conversion events
- Backend integration needed for actual email collection

## Browser Support
- Modern browsers: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- Mobile browsers: iOS Safari, Chrome Mobile
- Features gracefully degrade for older browsers
