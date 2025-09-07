# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Wild Imagination Press is a Jekyll-based website for a children's book publisher. The site showcases books, author information, and includes email signup functionality. It's deployed on Netlify and designed with a nature-inspired color palette reflecting the magical book tree logo.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Start local development server
bundle exec jekyll serve
# Site will be available at http://localhost:4000

# Build the site for production
bundle exec jekyll build
# Output directory: _site/
```

### Netlify Deployment
The site auto-deploys to Netlify with the following build command:
```bash
bundle exec jekyll build
```
Publish directory: `_site`

## Architecture

### Jekyll Structure
- **Layouts**: `_layouts/` contains page templates
  - `default.html` - Main site template with header/footer
  - `book.html` - Individual book page template
- **Includes**: `_includes/` contains reusable components
  - `head.html` - SEO, analytics, and metadata
- **Collections**: `_books/` contains book content files
- **Assets**: `assets/` contains CSS, JS, and images
  - `css/main.scss` - Main stylesheet with CSS variables
  - `js/main.js` - Interactive functionality (navigation, forms, animations)

### Key Features
- **Responsive Design**: Mobile-first with hamburger navigation
- **SEO Optimized**: Open Graph tags, structured data, Twitter cards
- **Analytics**: Google Analytics integration with event tracking
- **Email Signup**: Newsletter form with validation and analytics tracking
- **Performance**: Lazy loading images, optimized CSS, smooth scrolling animations

## Color Palette & Branding

The site uses a nature-inspired palette defined in CSS variables:
- Primary Green: `#2d5a3d` (headers, navigation)
- Secondary Green: `#4a7c59` (accents, gradients)  
- Light Green: `#7eb3a0` (subtle backgrounds)
- Accent Blue: `#6fa8dc` (hero sections)
- Warm Yellow: `#f7e7b4` (callouts)
- Soft Pink: `#f4c2c2` (buttons, accents)

## Content Management

### Adding New Books
1. Create a new file in `_books/` directory (e.g., `book-title.html`)
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
cover_image: /assets/images/book-cover.jpg
amazon_link: "https://amazon.com/..."
publisher: "Wild Imagination Press"
layout: book
---
```

### Updating Site Configuration
Key settings are likely in `_config.yml` (not present but referenced in README):
- Site title, description
- Navigation links
- Google Analytics ID
- Author information
- Social media links

## Key Files to Know

### Styling (`assets/css/main.scss`)
- Uses SCSS with CSS custom properties
- Responsive breakpoints and mobile-first design
- Component-based structure with BEM-like naming

### JavaScript (`assets/js/main.js`)
- Mobile navigation toggle with hamburger animation
- Email form handling with validation
- Smooth scrolling and scroll-based animations
- Google Analytics event tracking
- Intersection Observer for scroll animations

### Homepage (`index.html`)
- Hero section with coming soon book announcement
- Featured book showcase
- Author section
- Mission statement
- Contact/email signup section

## Deployment Notes

### Netlify Configuration (`netlify.toml`)
- Ruby 2.7.0 environment
- Security headers configured
- Asset caching optimizations
- Redirect rules for SEO

### Browser Support
- Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Tips

### When Making Style Changes
- Modify CSS variables in `assets/css/main.scss` for consistent theming
- Test responsive design at mobile breakpoints
- Check color contrast for accessibility

### When Adding Content
- Follow existing file naming conventions in `_books/`
- Optimize images before adding to `assets/images/`
- Update navigation in site configuration if adding new pages

### When Working with Forms
- Email validation is client-side only - backend integration needed for production
- Google Analytics events are already configured for form submissions
- Form styling uses the site's design system variables
