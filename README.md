# Wild Imagination Press - Jekyll Website

A beautiful, professional Jekyll website for Wild Imagination Press, showcasing children's books with a focus on creativity and imagination.

## Features

- **Modern Jekyll Architecture**: Built with Jekyll 4.3+ and best practices
- **Responsive Design**: Mobile-first design that works beautifully on all devices
- **SEO Optimized**: Built-in SEO tags, structured data, and meta tags
- **Performance Focused**: Optimized images, lazy loading, and efficient CSS
- **Professional Styling**: Inspired by the book tree logo with soft, nature-inspired colors
- **Interactive Elements**: Smooth scrolling, animations, and user-friendly navigation
- **Email Signup**: Integrated newsletter signup with analytics tracking
- **Book Collection**: Jekyll collections for easy book management
- **Google Analytics**: Built-in analytics integration
- **Social Media Ready**: Open Graph and Twitter card meta tags

## Color Palette

The design uses a sophisticated color palette inspired by the magical book tree logo:

- **Primary Green**: `#2d5a3d` - Deep forest green for headers and primary elements
- **Secondary Green**: `#4a7c59` - Lighter green for accents and gradients
- **Light Green**: `#7eb3a0` - Soft green for subtle backgrounds
- **Accent Blue**: `#6fa8dc` - Gentle blue for hero sections and highlights
- **Warm Yellow**: `#f7e7b4` - Soft yellow for special callouts
- **Soft Pink**: `#f4c2c2` - Gentle pink for buttons and accents
- **Cream**: `#faf7f2` - Warm background color
- **Warm White**: `#fefefe` - Primary background

## Project Structure

```
.
├── _config.yml                 # Jekyll configuration
├── _layouts/
│   ├── default.html           # Main layout template
│   └── book.html              # Book detail page layout
├── _includes/
│   └── head.html              # Head section with SEO and analytics
├── _books/
│   └── one-puppy-two-puppies.md  # Book collection items
├── assets/
│   ├── css/
│   │   └── main.scss          # Main stylesheet with SCSS variables
│   ├── js/
│   │   └── main.js            # JavaScript functionality
│   └── images/
│       ├── wild-imagination-logo.jpg
│       └── rebecca.jpeg
├── index.html                 # Homepage
├── Gemfile                    # Ruby dependencies
└── README.md                  # This file
```

## Setup Instructions

### Prerequisites

- Ruby 2.7+ 
- Bundler gem

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lichner/wildimaginationpress.git
   cd wildimaginationpress
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Run the development server:**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site:**
   Open `http://localhost:4000` in your browser

### Adding New Books

To add a new book to the collection:

1. Create a new file in `_books/` directory (e.g., `new-book-title.md`)
2. Use the following front matter template:

```yaml
---
title: "Your Book Title"
author: "Author Name"
status: "Coming Soon" # or "Available"
age_range: "2-6 years"
category: "Picture Book"
features:
  - Feature 1
  - Feature 2
description: "Short description"
full_description: |
  Full book description here...
cover_image: /assets/images/book-cover.jpg
amazon_link: "https://amazon.com/..."
publisher: "Wild Imagination Press"
layout: book
---

Extended book content here...
```

### Customization

#### Colors
Modify the CSS variables in `assets/css/main.scss`:

```scss
:root {
  --primary-green: #2d5a3d;
  --secondary-green: #4a7c59;
  // ... other colors
}
```

#### Site Configuration
Update `_config.yml` for site-wide settings:

```yaml
title: Your Site Title
description: Your site description
google_analytics: YOUR_GA_ID
```

#### Navigation
Modify the navigation in `_config.yml`:

```yaml
nav_links:
  - name: Home
    url: /
  - name: Books
    url: /#books
```

## Features in Detail

### Responsive Navigation
- Mobile-friendly hamburger menu
- Smooth scrolling to sections
- Fixed header with scroll effects

### Hero Section
- Animated logo with floating effect
- Gradient backgrounds with sparkle animation
- Call-to-action buttons with hover effects

### Book Showcase
- Grid layout for book display
- Book detail pages with collections
- Status badges and feature tags

### Contact Section
- Email signup form with validation
- Social media links (ready for integration)
- Benefit callouts with icons

### Performance Optimizations
- Lazy loading images
- Optimized CSS with SCSS variables
- Efficient JavaScript with event delegation
- SEO-friendly markup and meta tags

## Deployment

### GitHub Pages
The site is configured for GitHub Pages deployment:

1. Push your code to the `main` branch
2. Enable GitHub Pages in repository settings
3. The site will be available at `https://yourusername.github.io/repository-name`

### Custom Domain
To use a custom domain:

1. Add a `CNAME` file with your domain
2. Configure DNS settings with your domain provider
3. Update `_config.yml` with your domain

## Analytics and Tracking

The site includes Google Analytics integration:

- Page view tracking
- Email signup conversion tracking
- External link click tracking (for Amazon links)

Configure your Google Analytics ID in `_config.yml`.

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please contact:
- Email: contact@wildimaginationpress.com
- Website: https://lichner.github.io/wildimaginationpress/