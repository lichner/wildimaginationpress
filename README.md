# Wild Imagination Press - Jekyll Website

A beautiful, professional Jekyll website for Wild Imagination Press, showcasing children's books with a focus on creativity and imagination. Features a nature-inspired design with modern Material UI icons and optimized mobile experience.

## Features

- **Modern Jekyll Architecture**: Built with Jekyll 4.3+ and best practices
- **Responsive Design**: Mobile-first design with consistent styling across all devices
- **Material UI Icons**: Professional greyscale SVG icons for enhanced user experience
- **SEO Optimized**: Built-in SEO tags, structured data, and comprehensive meta tags
- **Performance Focused**: Optimized images, lazy loading, and efficient CSS architecture
- **Professional Styling**: Inspired by the book tree logo with soft, nature-inspired color palette
- **Interactive Elements**: Smooth scrolling, scroll animations, and user-friendly navigation
- **Email Signup**: Integrated newsletter signup with conversion tracking
- **Book Collection**: Jekyll collections with individual book pages and SEO-friendly URLs
- **Google Analytics**: Privacy-focused analytics with custom event tracking
- **Social Media Ready**: Open Graph and Twitter card meta tags for rich sharing
- **Accessibility Focused**: Semantic HTML, ARIA labels, and keyboard navigation support

## Design System

### Color Palette

The design uses a sophisticated, nature-inspired color palette:

- **Primary Green**: `#2d5a3d` - Deep forest green for headers and primary elements
- **Secondary Green**: `#4a7c59` - Lighter green for accents and gradients  
- **Light Green**: `#7eb3a0` - Soft green for subtle backgrounds
- **Bridge Green**: `#5a8b6b` - Intermediate color for smooth transitions
- **Soft Teal**: `#6b9a8a` - Bridge between green and blue
- **Accent Blue**: `#6fa8dc` - Gentle blue for hero sections and highlights
- **Warm Yellow**: `#f7e7b4` - Soft yellow for special callouts
- **Soft Pink**: `#f4c2c2` - Gentle pink for buttons and accents
- **Cream**: `#faf7f2` - Warm background color
- **Warm White**: `#fefefe` - Primary background
- **Text Colors**: `#2c3e50` (dark), `#5a6c7d` (medium), `#8b9dc3` (light)

### Typography

- **Headings**: 'Playfair Display' (serif) - Elegant, readable serif for impact
- **Body Text**: 'Inter' (sans-serif) - Modern, highly readable sans-serif  
- **Brand**: 'Crimson Text' (serif) - Professional serif for brand elements
- **Responsive Sizing**: Uses `clamp()` functions for fluid typography

### Iconography

- **Material UI Icons**: Professional greyscale SVG icons (#666666)
- **Consistent Sizing**: 20x20px standard with responsive scaling
- **Semantic Design**: Icons chosen to match content meaning
- **Accessibility**: Proper ARIA labels and semantic markup

## Project Structure

```
.
├── _config.yml                 # Jekyll configuration with SEO and navigation
├── _layouts/
│   ├── default.html           # Main layout with navigation, analytics, and footer
│   └── book.html              # Individual book page layout
├── _includes/
│   └── head.html              # SEO metadata, Open Graph, analytics, fonts
├── _books/
│   └── one-puppy-two-puppies.html  # Book collection items (.html for rich content)
├── assets/
│   ├── css/
│   │   └── main.scss          # Comprehensive SCSS with CSS custom properties
│   ├── js/
│   │   ├── main.js            # Core interactivity and animations
│   │   └── analytics.js       # Separate analytics initialization
│   └── images/
│       ├── wild-imagination-logo.jpg  # Brand logo
│       └── rebecca.jpeg       # Author photo
├── netlify.toml               # Netlify configuration with security headers
├── index.html                 # Homepage with all sections
├── Gemfile                    # Ruby dependencies
├── WARP.md                   # Development guidance for Warp AI
├── HUMANIZED_ICON_OPTIONS.md # Icon replacement strategy guide
├── _scripts/                 # SEO validation scripts
│   ├── validate_seo.rb       # Combined SEO validation
│   ├── validate_robots.rb    # Robots.txt validator
│   ├── validate_sitemap.rb   # Sitemap.xml validator
│   └── README.md             # Validation documentation
└── README.md                  # This file
```

## Setup Instructions

### Prerequisites

- Ruby 3.2.2+ (as specified in netlify.toml)
- Bundler 2.5.9+
- Jekyll 4.3+

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
   # Site available at http://localhost:4000
   ```

4. **Development with drafts and future posts:**
   ```bash
   bundle exec jekyll serve --drafts --future
   ```

5. **Build for production:**
   ```bash
   bundle exec jekyll build
   # Output in _site/ directory
   ```

6. **Validate SEO configuration:**
   ```bash
   bundle exec ruby _scripts/validate_seo.rb
   # Validates robots.txt and sitemap.xml for production readiness
   ```

### Adding New Books

To add a new book to the collection:

1. Create a new file in `_books/` directory (e.g., `new-book-title.html`)
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
  - Feature 3
description: "Short description for previews"
full_description: |
  Comprehensive book description that supports multiple paragraphs.
  This appears on the individual book page.
cover_image: /assets/images/book-cover.jpg  # Optional
amazon_link: "https://amazon.com/..." # Use "#" for coming soon
published_date: "2024-01-01"  # Optional
isbn: "978-XXXXXXXXX"  # Optional
price: "$12.99"  # Optional
publisher: "Wild Imagination Press"
layout: book
---

<!-- Extended book content in HTML -->
<p>Rich HTML content for the book description page...</p>
```

**Note**: Books use `.html` extension (not `.md`) to support rich HTML content and formatting.

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
- Animated logo with floating effect and backdrop filter
- Multi-layer gradient backgrounds with sparkle animation
- Glassmorphism "Coming Soon" card with backdrop blur
- Call-to-action buttons with advanced hover effects

### Book Showcase
- Material UI icons for professional presentation
- Responsive grid layout with mobile optimization
- Individual book pages with SEO-friendly URLs
- Status badges with conditional styling
- Interactive hover effects and animations

### Mission Section
- Professional Material UI iconography
- Consistent spacing and typography with book details
- Mobile-optimized responsive layout
- Semantic content organization

### Contact Section
- Email signup form with client-side validation
- Social media integration (Instagram, X/Twitter)
- Benefit callouts with Material UI icons
- Conversion tracking for analytics

### SEO Validation System
- **Automated robots.txt validation** - Syntax checking, directive validation, sitemap URL verification
- **Comprehensive sitemap.xml validation** - XML structure, URL format, priority and frequency validation
- **Production readiness checks** - Development URL detection, common mistake identification
- **Colorized terminal output** - Easy-to-read validation results with error categorization
- **Integration ready** - Can be integrated into deployment pipelines and git hooks

### Performance Optimizations
- Lazy loading images with `loading="lazy"`
- CSS custom properties for consistent theming
- Efficient JavaScript with event delegation and Intersection Observer
- CSP-compliant inline event tracking
- Optimized font loading via Google Fonts API
- Compressed assets and efficient caching strategies
- SEO-friendly semantic markup and structured data

## Deployment

### Netlify (Recommended)
The site is optimized for Netlify deployment with `netlify.toml` configuration:

**Build Settings:**
- Build command: `bundle exec jekyll build`
- Publish directory: `_site`
- Ruby version: 3.2.2

**Features:**
- Security headers (CSP, XSS protection, frame options)
- Long-term caching for static assets (1 year)
- SEO-friendly redirects for book URLs
- Automatic SSL certificates

### GitHub Pages
Alternatively, deploy to GitHub Pages:

1. Push your code to the `main` branch
2. Enable GitHub Pages in repository settings
3. The site will be available at `https://yourusername.github.io/repository-name`

### Custom Domain
For custom domains:

1. Add domain to Netlify/GitHub Pages settings
2. Configure DNS with CNAME or A records
3. Update `_config.yml` with your domain
4. Ensure SSL certificate is configured

## Analytics and Tracking

Comprehensive Google Analytics 4 integration with privacy focus:

**Tracking Features:**
- Page view tracking with IP anonymization
- Email signup conversion events
- Amazon link click tracking with event delegation
- Scroll-based engagement tracking
- CSP-compliant implementation
- Cookie settings for compliance (`SameSite=None;Secure`)

**Configuration:**
- Set Google Analytics ID in `_config.yml`: `google_analytics: G-F2V6B1H630`
- Custom events configured in `main.js` with gtag integration
- Separate `analytics.js` file for modular loading

**Privacy:**
- IP anonymization enabled
- Compliant with modern privacy requirements
- User-friendly cookie handling

## Browser Support

**Modern Browsers:**
- Chrome 60+
- Firefox 60+  
- Safari 12+
- Edge 79+

**Mobile Browsers:**
- iOS Safari
- Chrome Mobile
- Samsung Internet

**Features:**
- Progressive enhancement for older browsers
- Graceful degradation of advanced CSS features
- Responsive design works across all viewport sizes
- Touch-friendly navigation and interactions

## Development Workflow

### Code Organization
- **CSS**: Custom properties in `:root` for easy theming
- **JavaScript**: Modular organization by feature
- **Images**: Semantic naming and optimization
- **Content**: Collections for scalable book management

### Key Files for Customization
- `_config.yml` - Site configuration and navigation
- `assets/css/main.scss` - Styling and color system
- `assets/js/main.js` - Interactive functionality
- `_includes/head.html` - SEO and analytics configuration

### Making Changes
- **Styling**: Modify CSS custom properties for theme changes
- **Content**: Add books to `_books/` following existing structure
- **Navigation**: Update `nav_links` array in `_config.yml`
- **Analytics**: Configure event tracking in `main.js`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Run `bundle exec jekyll build` to ensure clean build
5. Submit a pull request with detailed description

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support & Resources

**Documentation:**
- `WARP.md` - Development guidance and architecture overview
- `HUMANIZED_ICON_OPTIONS.md` - Icon strategy and alternatives

**Contact:**
- Website: https://wildimaginationpress.netlify.app/
- Development: Available via repository issues

**Built With:**
- Jekyll 4.3+ static site generator
- SCSS for maintainable styling
- Material UI icons for professional design
- Netlify for deployment and hosting
