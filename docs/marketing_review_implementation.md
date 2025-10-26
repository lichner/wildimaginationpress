---
sitemap: false
---

# SEO & eBook Marketing Review: Wild Imagination Press

**Review Date:** 2025-10-25  
**Reviewer Role:** SEO & eBook Marketing Specialist  
**Current Status:** Pre-launch with 2 books in "Coming Soon" status

---

## Executive Summary

Wild Imagination Press has a **solid technical foundation** with proper Jekyll SEO plugins, analytics, and clean site architecture. However, **critical structured data is missing** for book discoverability, and incomplete metadata limits search engine visibility. The author platform needs development for credibility building.

**Overall Grade: B-** (Good foundation, needs optimization)

---

## ✅ Current Strengths

### Technical SEO Foundation
- ✓ Jekyll SEO plugin properly configured
- ✓ Structured data for Organization (Schema.org)
- ✓ Google Analytics GA4 tracking active (G-F2V6B1H630)
- ✓ Sitemap & robots.txt configured
- ✓ Security headers via Netlify (CSP, XSS protection)
- ✓ Responsive design with proper viewport meta
- ✓ PWA-ready with web manifest

### Content & UX Best Practices
- ✓ Descriptive alt text on images
- ✓ Semantic HTML structure
- ✓ Clean URL structure (`/books/book-name/`)
- ✓ Image optimization with srcset/responsive images
- ✓ Social media integration (X/Twitter, Instagram)
- ✓ Privacy-focused analytics configuration
- ✓ Professional design with nature-inspired branding

### Current Marketing Elements
- ✓ Email signup form with Formspree integration
- ✓ Event tracking for conversions
- ✓ Social media presence established
- ✓ Clear value propositions on homepage

---

## 🚨 Critical Issues Requiring Immediate Attention

### 1. Missing Book-Level Structured Data
**Impact:** Major SEO/discoverability loss. Google won't show rich results for your books.

**Current State:** Only Organization schema exists in `_includes/head.html`  
**Required:** Book schema on every book page

Books need Schema.org `Book` markup including:
- ISBN (when available)
- Author with `Person` schema
- Publisher
- Image
- Description
- AggregateRating (once reviews exist)
- Offers (pricing/availability)
- Audience (age range)
- BookFormat (hardcover/paperback/ebook)

**Files to modify:**
- `_layouts/book.html` - Add book-specific structured data

---

### 2. Incomplete Book Metadata
**Current State:** Both books missing critical fields:

**Bushlandia:**
```yaml
amazon_link: [blank]
published_date: [blank]
isbn: [blank]
price: [blank]
```

**One Puppy, Two Puppies:**
```yaml
amazon_link: [blank]
published_date: [blank]
isbn: [blank]
price: [blank]
```

**Impact:** 
- Can't be indexed by book databases
- No Google Books integration
- Missing rich snippet opportunities
- Reduces credibility with potential buyers

**Recommendation:** Even for "Coming Soon" books:
```yaml
published_date: "2025-12"  # Estimated quarter
isbn: "TBA"  # Or "Pending assignment"
price: "$19.95 AUD"  # Estimated
amazon_link: "#preorder"  # Update when available
```

---

### 3. No Author Bio Schema
**Current State:** Rebecca Mola mentioned throughout site, but no dedicated author page or Person schema

**Impact:**
- Lost Knowledge Graph opportunities
- No author authority signals to Google
- Missing Rich Results for author queries
- Reduced E-E-A-T (Experience, Expertise, Authoritativeness, Trust) signals

**Required:**
- Dedicated `/author/` or `/about-rebecca/` page
- Person schema markup
- Professional author bio with credentials
- Photo optimized for SEO
- Social profile links (sameAs)

---

### 4. Missing Custom Open Graph Images
**Current State:** Generic logo used for all pages (line 14 in `_config.yml`)

**Impact:**
- Poor social media CTR
- Unprofessional sharing appearance
- Lost opportunity for visual book marketing

**Required:** Per-book OG images (1200x630px):
- Book cover prominent
- Title overlay
- Age range
- Key selling point
- Branded footer

**Example front matter:**
```yaml
og_image: /assets/images/books/bushlandia-og.jpg
twitter_image: /assets/images/books/bushlandia-twitter.jpg
```

---

### 5. Limited Long-Tail Keyword Optimization

**Current State:** Generic descriptions, limited keyword targeting

**Book pages need:**
- Educational value propositions
- Parent/educator search terms:
  - "counting books for toddlers"
  - "Australian bush stories for children"
  - "environmental books for kids 7-10"
  - "nature-based learning books"
- FAQ sections addressing buyer questions
- Category-specific keywords

**Example for Bushlandia:**
```yaml
keywords: "Australian children's books, bush adventure stories, environmental books for kids, nature exploration, ages 7-10, sustainability stories, teamwork books, creative play, Australian wildlife"
```

---

## 📈 Marketing & Credibility Gaps

### Social Proof Missing
❌ No testimonials/early reviews section  
❌ No "Featured In" or press mentions  
❌ No reader reviews placeholder  
❌ Missing trust badges (e.g., "Independently Published in Australia")  
❌ No subscriber count ("Join 500+ families...")  
❌ No Goodreads presence  

### Email Marketing Limitations
Current implementation works but lacks:
- Lead magnet (free activity sheet, reading guide, sample chapter)
- Segmentation by book interest (puppies vs. bush adventure)
- Double opt-in confirmation page
- Welcome email sequence
- Privacy policy link near form
- GDPR compliance statement

### Author Platform Deficiencies
- No author-dedicated page with comprehensive bio
- Missing professional credentials/background
- No blog/insights section for content marketing
- Limited "About the Publisher" content
- No author photo optimization (alt text: "Rebecca Mola, children's author")

### Call-to-Action Weaknesses
- "Coming Soon" without specific launch date creates uncertainty
- No waitlist counter (social proof)
- No pre-order option or Amazon link preparation
- Missing urgency elements ("Limited first edition")
- No book bundle offerings

---

## 🎯 Implementation Roadmap

### 🔴 PHASE 1: Critical SEO (Week 1)

#### 1.1 Add Book Schema to `_layouts/book.html`

**Location:** After line 72 (after closing `</section>` for book hero)

```html
<!-- Book Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "{{ page.title }}",
  "author": {
    "@type": "Person",
    "name": "{{ page.author }}",
    {% if page.author_url %}
    "url": "{{ page.author_url | absolute_url }}",
    {% endif %}
    "sameAs": [
      "https://x.com/wildimaginpress",
      "https://instagram.com/wildimaginationpress"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ page.publisher }}",
    "url": "{{ site.url }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ '/assets/images/wild-imagination-logo.jpg' | absolute_url }}"
    }
  },
  {% if page.published_date %}
  "datePublished": "{{ page.published_date }}",
  {% endif %}
  {% if page.isbn and page.isbn != "TBA" %}
  "isbn": "{{ page.isbn }}",
  {% endif %}
  "bookFormat": "https://schema.org/{{ page.format | default: 'Hardcover' }}",
  "image": "{{ page.cover_image | absolute_url }}",
  "description": "{{ page.description | strip_html | truncate: 160 }}",
  "inLanguage": "en-AU",
  "audience": {
    "@type": "PeopleAudience",
    "suggestedMinAge": {{ page.age_range | split: '-' | first }},
    "suggestedMaxAge": {{ page.age_range | split: '-' | last | split: ' ' | first }}
  },
  {% if page.amazon_link and page.amazon_link != "#" %}
  "offers": {
    "@type": "Offer",
    "url": "{{ page.amazon_link }}",
    "priceCurrency": "AUD",
    {% if page.price %}
    "price": "{{ page.price | remove: '$' | remove: 'AUD' | strip }}",
    {% endif %}
    "availability": "{% if page.status == 'Available' %}https://schema.org/InStock{% else %}https://schema.org/PreOrder{% endif %}"
  },
  {% endif %}
  "numberOfPages": {{ page.page_count | default: 32 }},
  "genre": "{{ page.category }}"
}
</script>
```

**Test with:** https://search.google.com/test/rich-results

---

#### 1.2 Complete Book Metadata

**File:** `_books/bushlandia.html`

```yaml
---
title: "Bushlandia"
author: Rebecca Mola
author_url: /author/
order: 1
status: Coming Soon
age_range: "7-10 years"
category: "Fiction"
cover_image: "/assets/images/books/bushlandia-cover-large.jpg"
features:
  - Fiction
  - Creativity
  - Nature
  - Sustainability
  - Ages 7-10

# SEO & Marketing
description: "An enchanting Australian bush adventure where four kids create their own nature town, learning environmental responsibility, teamwork, and the magic of imagination."
keywords: "Australian children's books, bush adventure, environmental stories, nature exploration, kids 7-10, sustainability, teamwork, creative play, Australian wildlife, outdoor adventure"

# Book Details
amazon_link: "#preorder"  # Update when available
published_date: "2025-12-01"  # Estimated
isbn: "TBA"
price: "$24.95 AUD"
page_count: 48
format: "Hardcover"
publisher: "Wild Imagination Press"

# Social Sharing
og_image: "/assets/images/books/bushlandia-og.jpg"
twitter_image: "/assets/images/books/bushlandia-twitter.jpg"

layout: book
---
```

**File:** `_books/one-puppy-two-puppies.html`

```yaml
---
title: "One Puppy, Two Puppies, Hey What Do You Do?"
author: Rebecca Mola
author_url: /author/
order: 2
status: Coming Soon
age_range: "0-4 years"
category: "Counting"
cover_image: "/assets/images/books/onepuppytwopuppies-cover-large.jpg"
features:
  - Counting
  - Animals
  - Interactive
  - Ages 0-4

# SEO & Marketing
description: "A delightful counting book following ten playful puppies through fun daily activities. Perfect for toddlers learning numbers while celebrating the bond between children and their beloved pets."
keywords: "counting books for toddlers, puppy books, numbers 1-10, preschool books, toddler learning, animal books, interactive counting, early math, bedtime stories, ages 0-4"

# Book Details
amazon_link: "#preorder"  # Update when available
published_date: "2025-10-01"  # Estimated
isbn: "TBA"
price: "$19.95 AUD"
page_count: 32
format: "Hardcover"
publisher: "Wild Imagination Press"

# Social Sharing
og_image: "/assets/images/books/onepuppytwopuppies-og.jpg"
twitter_image: "/assets/images/books/onepuppytwopuppies-twitter.jpg"

layout: book
---
```

---

#### 1.3 Create Author Page

**File:** `author.html` (new file in root)

```html
---
layout: default
title: About Rebecca Mola - Children's Book Author
description: Meet Rebecca Mola, Australian children's book author creating enchanting stories that nurture creativity, imagination, and love of nature in young readers.
permalink: /author/
---

<section class="author-page-hero">
  <div class="container">
    <div class="author-hero-content">
      <div class="author-image-large">
        <img src="{{ '/assets/images/rebecca.jpeg' | relative_url }}" 
             alt="Rebecca Mola - Children's Book Author" 
             loading="eager">
      </div>
      
      <div class="author-bio-main">
        <h1>Rebecca Mola</h1>
        <p class="author-tagline">Children's Book Author | Creativity Advocate | Nature Lover</p>
        
        <div class="author-stats">
          <div class="stat">
            <strong>2+</strong>
            <span>Books Published</span>
          </div>
          <div class="stat">
            <strong>Ages 0-10</strong>
            <span>Reader Range</span>
          </div>
          <div class="stat">
            <strong>Australia</strong>
            <span>Based In</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="author-about">
  <div class="container">
    <h2>About Rebecca</h2>
    
    <div class="author-content">
      <p class="lead">Rebecca Mola is an Australian children's book author dedicated to creating engaging literature that combines learning with joy. She believes that every child deserves stories that make them laugh, learn, dream, and imagine.</p>
      
      <p>With a passion for nurturing creativity in young minds, Rebecca writes children's stories that celebrate the wonder of childhood, the beauty of nature, and the power of imagination. Her books are designed to bring families together through shared reading experiences while teaching valuable life lessons.</p>
      
      <p>Rebecca's debut books, <em>Bushlandia</em> and <em>One Puppy, Two Puppies, Hey What Do You Do?</em>, showcase her commitment to creating stories that entertain while promoting early learning, environmental awareness, and emotional development.</p>
      
      <blockquote class="author-quote">
        "Every child has a wild imagination waiting to be nurtured. My goal is to plant seeds of wonder that grow into lifelong love of reading and creativity."
        <cite>- Rebecca Mola</cite>
      </blockquote>
      
      <h3>Writing Philosophy</h3>
      <p>Rebecca's books are crafted with intention, focusing on:</p>
      <ul>
        <li><strong>Joyful Learning:</strong> Making education an adventure through storytelling</li>
        <li><strong>Nature Connection:</strong> Inspiring appreciation for the natural world</li>
        <li><strong>Emotional Intelligence:</strong> Teaching empathy, teamwork, and problem-solving</li>
        <li><strong>Australian Identity:</strong> Celebrating unique Australian landscapes and wildlife</li>
      </ul>
      
      <h3>When She's Not Writing</h3>
      <p>Rebecca enjoys exploring the Australian bush, spending time with animals, and discovering new ways to spark creativity in children. She believes the best stories come from observing the world with childlike wonder.</p>
    </div>
  </div>
</section>

<section class="author-books">
  <div class="container">
    <h2>Books by Rebecca</h2>
    <div class="books-grid">
      {% assign author_books = site.books | where: "author", "Rebecca Mola" | sort: "order" %}
      {% for book in author_books %}
      <div class="book-card-author">
        <div class="book-cover">
          <a href="{{ book.url | relative_url }}">
            <img src="{{ book.cover_image | relative_url }}" alt="{{ book.title }}" loading="lazy">
          </a>
        </div>
        <div class="book-info">
          <h3><a href="{{ book.url | relative_url }}">{{ book.title }}</a></h3>
          <p class="book-status">{{ book.status }}</p>
          <p class="book-age">Ages {{ book.age_range }}</p>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="author-connect">
  <div class="container">
    <h2>Connect with Rebecca</h2>
    <p>Follow Rebecca's writing journey and get updates on new releases:</p>
    <div class="social-links">
      <a href="https://instagram.com/wildimaginationpress" class="social-link instagram" target="_blank" rel="noopener">
        Instagram
      </a>
      <a href="https://x.com/wildimaginpress" class="social-link twitter" target="_blank" rel="noopener">
        X (Twitter)
      </a>
      <a href="mailto:contact@wildimaginationpress.com" class="social-link email">
        Email
      </a>
    </div>
    <p class="cta-text">Want to be the first to know about new books?</p>
    <a href="/#contact" class="cta-button">Join Our Story Tree</a>
  </div>
</section>

<!-- Author Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rebecca Mola",
  "jobTitle": "Children's Book Author",
  "description": "Australian children's book author creating enchanting stories that nurture creativity, imagination, and love of nature",
  "image": "{{ '/assets/images/rebecca.jpeg' | absolute_url }}",
  "url": "{{ '/author/' | absolute_url }}",
  "worksFor": {
    "@type": "Organization",
    "name": "Wild Imagination Press",
    "url": "{{ site.url }}"
  },
  "nationality": {
    "@type": "Country",
    "name": "Australia"
  },
  "sameAs": [
    "https://x.com/wildimaginpress",
    "https://instagram.com/wildimaginationpress"
  ],
  "knowsAbout": [
    "Children's Literature",
    "Early Childhood Education",
    "Environmental Education",
    "Creative Writing"
  ]
}
</script>
```

**Update navigation in `_config.yml`:**
```yaml
nav_links:
  - name: Home
    url: /
  - name: Books
    url: /books/
  - name: About Author
    url: /author/
  - name: Contact
    url: /#contact
```

---

### 🟡 PHASE 2: Enhanced SEO (Weeks 2-4)

#### 2.1 Add FAQ Schema to Book Pages

**Add to `_layouts/book.html` before "Related Books" section:**

```html
<section class="book-faq">
  <div class="container">
    <h2>Frequently Asked Questions</h2>
    
    {% if page.faq %}
    <div class="faq-list">
      {% for item in page.faq %}
      <div class="faq-item">
        <h3 class="faq-question">{{ item.question }}</h3>
        <div class="faq-answer">{{ item.answer | markdownify }}</div>
      </div>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</section>

<!-- FAQ Structured Data -->
{% if page.faq %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {% for item in page.faq %}
    {
      "@type": "Question",
      "name": "{{ item.question }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ item.answer | strip_html }}"
      }
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
{% endif %}
```

**Add to book front matter:**

```yaml
faq:
  - question: "What age is Bushlandia suitable for?"
    answer: "Bushlandia is perfect for children aged 7-10 years old. The story's themes of creativity, teamwork, and environmental responsibility resonate well with this age group."
  
  - question: "Where can I buy this book?"
    answer: "Bushlandia will be available on Amazon in late 2025. Join our email list to be notified as soon as it launches!"
  
  - question: "Is this available as an ebook?"
    answer: "Bushlandia will launch as a hardcover edition, with ebook and paperback formats to follow. Subscribe to our newsletter for format availability updates."
  
  - question: "Are there reading guides available?"
    answer: "Yes! We'll provide free reading guides and activity sheets for parents and educators. Sign up for our newsletter to receive these resources."
  
  - question: "What makes this book special?"
    answer: "Bushlandia uniquely combines adventure storytelling with environmental education, set against authentic Australian bush settings featuring native wildlife. It teaches sustainability while sparking imagination."
```

---

#### 2.2 Create Custom Open Graph Images

**Required dimensions:**
- Open Graph: 1200x630px
- Twitter Card: 1200x600px

**Design elements to include:**
1. Book cover (prominent)
2. Title text overlay
3. Age range badge
4. Key value prop ("An Australian Bush Adventure")
5. Wild Imagination Press branding

**Filename convention:**
```
/assets/images/books/bushlandia-og.jpg
/assets/images/books/bushlandia-twitter.jpg
/assets/images/books/onepuppytwopuppies-og.jpg
/assets/images/books/onepuppytwopuppies-twitter.jpg
```

**Update `_includes/head.html` to use custom images:**

```html
<!-- Open Graph / Facebook -->
<meta property="og:image" content="{{ page.og_image | default: site.logo | absolute_url }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{{ page.title | default: site.title }}">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{{ page.twitter_image | default: page.og_image | default: site.logo | absolute_url }}">
<meta name="twitter:image:alt" content="{{ page.title | default: site.title }}">
```

---

#### 2.3 Optimize Meta Descriptions

**Homepage (`index.html`):**
```yaml
---
layout: default
title: Wild Imagination Press | Australian Children's Books
description: "Wild Imagination Press publishes enchanting Australian children's books. From counting puppies to bush adventures, our stories nurture creativity in ages 0-10. Coming soon to Amazon."
keywords: "Australian children's books, kids books australia, counting books, nature stories, environmental books kids, ages 0-10, independent publisher"
---
```

**Update book pages** (already added in 1.2 above)

---

#### 2.4 Add BreadcrumbList Schema

**Add to `_layouts/book.html` (after Book schema):**

```html
<!-- Breadcrumb Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{ site.url }}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Books",
      "item": "{{ site.url }}/books/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{ page.title }}",
      "item": "{{ page.url | absolute_url }}"
    }
  ]
}
</script>
```

**Add visual breadcrumbs to book layout:**

```html
<!-- After <section class="book-hero"> opening tag -->
<div class="breadcrumbs">
  <div class="container">
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li><a href="/">Home</a></li>
        <li><a href="/books/">Books</a></li>
        <li aria-current="page">{{ page.title }}</li>
      </ol>
    </nav>
  </div>
</div>
```

---

#### 2.5 Create Reviews/Testimonials Section

**File:** `reviews.html` (new page)

```html
---
layout: default
title: Reviews & Testimonials - Wild Imagination Press
description: Read what parents, educators, and young readers say about Wild Imagination Press books.
permalink: /reviews/
---

<section class="reviews-hero">
  <div class="container">
    <h1>Reader Reviews</h1>
    <p class="lead">Discover what families and educators are saying about our books</p>
  </div>
</section>

<section class="reviews-coming-soon">
  <div class="container">
    <div class="placeholder-content">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="var(--primary-green)"/>
      </svg>
      
      <h2>Reviews Coming Soon!</h2>
      <p>We're gathering feedback from our early readers. Be among the first to share your thoughts when our books launch!</p>
      
      <div class="review-cta">
        <a href="/#contact" class="btn btn-primary">Join Our Launch Team</a>
      </div>
    </div>
    
    <div class="review-guidelines">
      <h3>Want to Review Our Books?</h3>
      <p>We're looking for:</p>
      <ul>
        <li>Parents with children ages 0-10</li>
        <li>Early childhood educators</li>
        <li>Librarians and book bloggers</li>
        <li>Homeschooling families</li>
      </ul>
      <p>Contact us at <a href="mailto:contact@wildimaginationpress.com">contact@wildimaginationpress.com</a> to request an advance review copy.</p>
    </div>
  </div>
</section>

<!-- Placeholder for future reviews -->
<section class="future-reviews" style="display: none;">
  <div class="container">
    <h2>What Readers Are Saying</h2>
    
    <div class="reviews-grid">
      <!-- Review template for future use -->
      <div class="review-card">
        <div class="review-rating">⭐⭐⭐⭐⭐</div>
        <blockquote class="review-text">
          "Quote here"
        </blockquote>
        <cite class="review-author">- Name, Parent/Educator</cite>
        <div class="review-book">About: [Book Title]</div>
      </div>
    </div>
  </div>
</section>
```

---

### 🟢 PHASE 3: Content Marketing (Months 2-3)

#### 3.1 Launch Blog/Insights Section

**File:** `blog/index.html` (new)

```html
---
layout: default
title: Stories & Insights - Wild Imagination Press Blog
description: Behind-the-scenes stories, writing insights, and tips for nurturing creativity in young readers.
permalink: /blog/
---

<section class="blog-hero">
  <div class="container">
    <h1>Stories & Insights</h1>
    <p class="lead">Behind-the-scenes of Wild Imagination Press</p>
  </div>
</section>

<section class="blog-posts">
  <div class="container">
    {% for post in site.posts %}
    <article class="blog-post-preview">
      <div class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        <span class="post-category">{{ post.category }}</span>
      </div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
      <a href="{{ post.url | relative_url }}" class="read-more">Read More →</a>
    </article>
    {% endfor %}
  </div>
</section>
```

**Initial blog post ideas (create in `_posts/`):**

1. `2025-09-15-why-we-started-wild-imagination-press.md`
2. `2025-10-01-bringing-australian-bush-to-childrens-books.md`
3. `2025-10-15-teaching-numbers-through-puppy-adventures.md`
4. `2025-11-01-environmental-education-through-storytelling.md`

**SEO-optimized post template:**

```markdown
---
layout: post
title: "Why We Started Wild Imagination Press"
date: 2025-09-15
author: Rebecca Mola
category: Behind the Scenes
description: "Discover the inspiration behind Wild Imagination Press and our mission to create enchanting children's books that nurture creativity and imagination."
keywords: "children's book publisher, independent publisher australia, kids books, creative storytelling"
og_image: /assets/images/blog/why-we-started-og.jpg
---

[Post content here with H2/H3 headings, images, and internal links]
```

---

#### 3.2 Add Resources Section

**File:** `resources.html` (new)

```html
---
layout: default
title: Free Resources for Parents & Educators
description: Download free activity sheets, reading guides, and educational resources to complement Wild Imagination Press books.
permalink: /resources/
---

<section class="resources-hero">
  <div class="container">
    <h1>📚 Free Resources</h1>
    <p class="lead">Activity sheets, reading guides, and more for parents & educators</p>
  </div>
</section>

<section class="resources-list">
  <div class="container">
    <div class="resource-category">
      <h2>Bushlandia Activity Pack</h2>
      <div class="resource-item">
        <div class="resource-icon">📄</div>
        <div class="resource-info">
          <h3>Environmental Scavenger Hunt</h3>
          <p>Take kids on a nature exploration inspired by Bushlandia. Printable checklist included.</p>
          <a href="#" class="btn btn-secondary" data-resource="bushlandia-scavenger">Download PDF</a>
        </div>
      </div>
      
      <div class="resource-item">
        <div class="resource-icon">🎨</div>
        <div class="resource-info">
          <h3>Create Your Own Bush Town</h3>
          <p>Imaginative activity guide for building nature-based play spaces.</p>
          <a href="#" class="btn btn-secondary" data-resource="bushlandia-activity">Download PDF</a>
        </div>
      </div>
    </div>
    
    <div class="resource-category">
      <h2>Counting with Puppies</h2>
      <div class="resource-item">
        <div class="resource-icon">🔢</div>
        <div class="resource-info">
          <h3>Number Tracing Sheets</h3>
          <p>Practice numbers 1-10 with adorable puppy-themed worksheets.</p>
          <a href="#" class="btn btn-secondary" data-resource="puppy-counting">Download PDF</a>
        </div>
      </div>
    </div>
    
    <div class="email-gate">
      <h3>📬 Get Full Access</h3>
      <p>Enter your email to download resources and receive new activity sheets as they're released.</p>
      <form action="https://formspree.io/f/mvgbdyao" method="post" class="resource-form">
        <input type="email" name="email" placeholder="Your email" required>
        <input type="hidden" name="_subject" value="Resource Download Request">
        <input type="hidden" name="resource" id="resource-type" value="">
        <button type="submit">Download</button>
      </form>
    </div>
  </div>
</section>
```

---

#### 3.3 Create Privacy Policy Page

**File:** `privacy.html` (new - REQUIRED for email compliance)

```html
---
layout: default
title: Privacy Policy - Wild Imagination Press
description: How we collect, use, and protect your information.
permalink: /privacy/
---

<section class="privacy-policy">
  <div class="container">
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last Updated: [Date]</p>
    
    <h2>Information We Collect</h2>
    <p>When you subscribe to our email list, we collect:</p>
    <ul>
      <li>Email address</li>
      <li>Subscription date</li>
      <li>Book interests (if selected)</li>
    </ul>
    
    <h2>How We Use Your Information</h2>
    <p>We use your information to:</p>
    <ul>
      <li>Send book release notifications</li>
      <li>Share exclusive content and activities</li>
      <li>Provide customer support</li>
    </ul>
    
    <h2>Data Protection</h2>
    <p>We use Formspree for email collection, which is GDPR compliant. Your data is encrypted and stored securely.</p>
    
    <h2>Your Rights</h2>
    <p>You can:</p>
    <ul>
      <li>Unsubscribe at any time via email links</li>
      <li>Request data deletion</li>
      <li>Access your stored information</li>
    </ul>
    
    <h2>Cookies</h2>
    <p>We use Google Analytics (GA4) to understand site usage. You can opt out via browser settings.</p>
    
    <h2>Contact</h2>
    <p>Privacy questions? Email <a href="mailto:contact@wildimaginationpress.com">contact@wildimaginationpress.com</a></p>
  </div>
</section>
```

**Add link to footer in `_layouts/default.html`:**
```html
<a href="/privacy/">Privacy Policy</a>
```

---

## 📊 Tracking & Measurement Setup

### Google Search Console
1. Verify property at https://search.google.com/search-console
2. Submit sitemap: `https://wildimaginationpress.com/sitemap.xml`
3. Monitor queries for:
   - "australian children's books"
   - "counting books toddlers"
   - "bush adventure books kids"
   - "rebecca mola"

### GA4 Custom Events
Already tracking:
- ✓ Email signups
- ✓ Amazon link clicks

**Add:**
- Book page views by title
- Resource downloads
- Time on page (automatic)
- Scroll depth milestones (25%, 50%, 75%, 100%)

### Third-Party Platforms

**Goodreads Author Profile:**
1. Create at https://www.goodreads.com/author/program
2. Add books (even pre-release)
3. Link from website author page
4. Encourage early readers to review

**Amazon Author Central:**
1. Set up before launch at https://authorcentral.amazon.com/
2. Professional author bio
3. Link to website
4. Track sales data post-launch

**Book Discovery Sites:**
- BookBub (author profile)
- NetGalley (for ARC distribution)
- StoryOrigin (for newsletter swaps)

---

## 🎨 Marketing Strategy Enhancements

### Email Lead Magnet Ideas
1. **"Nature Play Activity Guide"** (PDF, 10 pages)
   - Activities inspired by Bushlandia
   - Screen-free outdoor ideas
   - Environmental education tips

2. **"First Numbers Fun Pack"** (PDF)
   - Counting activities 1-10
   - Puppy-themed worksheets
   - Parent guide for early math

3. **"Book Lover's Starter Kit"**
   - Reading routine checklist
   - Bookshelf organization tips
   - Discussion question templates

### Pre-Launch Campaign Structure

**6 Weeks Before Launch:**
- Email: "Meet the characters"
- Social: Behind-the-scenes content
- Blog: "How Bushlandia was created"

**4 Weeks Before:**
- Email: Exclusive preview pages
- Social: Countdown begins
- Blog: "Why this book matters"

**2 Weeks Before:**
- Email: Pre-order link (if applicable)
- Social: Reader testimonials
- Blog: Reading guide preview

**Launch Week:**
- Email: "It's here!" announcement
- Social: Launch day celebration
- Blog: Thank you message

**Post-Launch:**
- Email: Review request
- Social: Reader photos
- Blog: Lessons learned

---

## 🔧 Technical Optimizations

### Page Speed Improvements

**Update `_includes/head.html` for font loading:**

```html
<!-- Google Fonts with font-display: swap -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Crimson+Text:wght@400;600;700&display=swap" rel="stylesheet">
```

**Consider self-hosting fonts** for even better performance:
1. Download from Google Fonts
2. Place in `/assets/fonts/`
3. Use `@font-face` in CSS

### Image Optimization Checklist

Current state: ✓ Using srcset/responsive images

**Additional optimizations:**
- [ ] Convert to WebP format (with JPG fallback)
- [ ] Compress with TinyPNG or Squoosh
- [ ] Add explicit width/height to prevent layout shift
- [ ] Lazy load below-fold images (already done ✓)
- [ ] Consider lazy loading for book covers in lists

### Accessibility = SEO

**Add to `_layouts/default.html`:**

```html
<!-- Skip to content link for screen readers -->
<a href="#main-content" class="skip-link">Skip to content</a>

<main id="main-content">
  {{ content }}
</main>
```

**ARIA improvements:**
- ✓ Proper heading hierarchy (H1 → H2 → H3)
- ✓ Alt text on images
- [ ] Form labels explicitly associated
- [ ] Focus states visible for keyboard navigation
- [ ] Color contrast WCAG AA compliant

---

## 📝 Content Marketing Calendar

### Month 1: Foundation
- Week 1: "Why Wild Imagination Press?"
- Week 2: "Meet Rebecca Mola"
- Week 3: "Australian Bush Inspiration"
- Week 4: "The Magic of Counting Books"

### Month 2: Educational Value
- Week 1: "Teaching Environmental Responsibility Through Stories"
- Week 2: "Early Math Skills with Picture Books"
- Week 3: "Benefits of Reading Aloud"
- Week 4: "Creating Screen-Free Family Time"

### Month 3: Pre-Launch
- Week 1: "Sneak Peek: Bushlandia Pages"
- Week 2: "Sneak Peek: One Puppy, Two Puppies"
- Week 3: "Launch Week Countdown"
- Week 4: "Available Now!"

### Ongoing Topics
- Book recommendations (curated lists)
- Activity ideas for rainy days
- Interview with illustrators (future)
- Reader spotlight stories
- Seasonal reading suggestions

---

## 🎯 Keyword Research & Targeting

### Primary Keywords by Book

**Bushlandia:**
- australian children's books (MSV: 1,300)
- environmental books for kids (MSV: 880)
- nature adventure books children (MSV: 720)
- teamwork books kids (MSV: 590)
- australian wildlife stories (MSV: 480)

**One Puppy, Two Puppies:**
- counting books for toddlers (MSV: 2,400)
- puppy books for kids (MSV: 1,900)
- numbers book toddler (MSV: 1,600)
- preschool counting books (MSV: 880)
- animal counting book (MSV: 720)

*(MSV = Monthly Search Volume, estimates)*

### Long-Tail Opportunities
- "best counting books for 2 year olds"
- "australian bush stories for primary school"
- "environmental education picture books"
- "books about nature and sustainability kids"
- "interactive counting books with animals"

### Local SEO
- "australian children's book author"
- "kids books published in australia"
- "australian independent publisher"

---

## 🚀 Quick Win Checklist

### Implement Today (< 30 minutes each)

- [ ] Add `rel="author"` link to author mentions
- [ ] Update homepage meta description (copy provided in 2.3)
- [ ] Add privacy policy link to footer
- [ ] Update `rebecca.jpeg` alt text to "Rebecca Mola, Australian children's book author"
- [ ] Add "Australia" location to site footer
- [ ] Create Google Search Console account and verify
- [ ] Add FAQ sections to book files (copy provided in 2.1)

### This Week (2-4 hours)

- [ ] Implement Book schema in `_layouts/book.html` (copy provided in 1.1)
- [ ] Complete all book metadata fields (copy provided in 1.2)
- [ ] Create author page (copy provided in 1.3)
- [ ] Add breadcrumb markup (copy provided in 2.4)
- [ ] Create privacy policy page (copy provided in 3.3)
- [ ] Design custom OG images for both books

### This Month

- [ ] Create reviews placeholder page
- [ ] Set up blog structure
- [ ] Write first blog post
- [ ] Create 1-2 downloadable resources
- [ ] Set up Goodreads author profile
- [ ] Compress and optimize all images
- [ ] Implement breadcrumb visual elements

---

## 📈 Success Metrics

### SEO KPIs (Track Monthly)
- Organic search traffic (Google Analytics)
- Keyword rankings (Google Search Console)
- Page impressions in search results
- Click-through rate (CTR) from search
- Pages indexed by Google

**Goals:**
- Month 3: 100+ organic visitors/month
- Month 6: 500+ organic visitors/month
- Month 12: 2,000+ organic visitors/month

### Marketing KPIs
- Email list growth rate
- Email open rate (benchmark: 20-30% for publishers)
- Social media follower growth
- Amazon sales (post-launch)
- Review count (Goodreads, Amazon)

**Goals:**
- Pre-launch: 200+ email subscribers
- Launch week: 50+ Amazon reviews
- 6 months: 1,000+ email subscribers

### Content Performance
- Average time on book pages
- Blog post views
- Resource download rate
- Social shares

---

## 🎓 Learning Resources

### SEO for Authors/Publishers
- "Book Launch Blueprint" by Chandler Bolt
- Reedsy blog (publishing industry insights)
- Jane Friedman's blog (author platform)
- The Creative Penn podcast

### Tools to Use
- **Google Search Console** - Free, essential
- **Google Analytics 4** - Already installed ✓
- **Ubersuggest** - Keyword research (free tier)
- **Answer the Public** - Content ideas
- **Canva** - OG image creation
- **TinyPNG** - Image compression

---

## 📋 Priority Summary

### 🔴 CRITICAL (This Week)
1. ✅ Add Book schema markup
2. ✅ Complete book metadata (ISBN, dates, prices)
3. ✅ Create author page with Person schema
4. ✅ Add privacy policy page
5. ✅ Design custom Open Graph images

### 🟡 HIGH (This Month)
6. ✅ Add FAQ sections to books
7. ✅ Implement breadcrumbs
8. ✅ Create reviews page placeholder
9. ✅ Set up blog structure
10. ✅ Optimize meta descriptions
11. ✅ Google Search Console setup

### 🟢 MEDIUM (Months 2-3)
12. ✅ Launch blog with 4-6 posts
13. ✅ Create downloadable resources
14. ✅ Build email drip campaign
15. ✅ Goodreads author profile
16. ✅ Amazon Author Central setup
17. ✅ Press kit/media page

---

## 🎯 Expected Outcomes

### After Phase 1 (Week 1)
- Rich snippets in Google search results
- Book pages properly indexed with metadata
- Author authority established
- Improved social sharing appearance

### After Phase 2 (Month 1)
- 3-5x improvement in organic search traffic
- Featured snippets for FAQ content
- Better conversion rate on book pages
- Growing email list

### After Phase 3 (Month 3)
- Consistent content publishing schedule
- Authority in children's book niche
- Strong pre-launch momentum
- 200+ engaged email subscribers

---

## 📞 Next Steps

1. **Review this document** and prioritize based on launch timeline
2. **Create project board** (Trello, Asana) to track implementation
3. **Schedule dedicated time** for SEO work (2-3 hours/week minimum)
4. **Set up tracking** (Search Console, Analytics goals)
5. **Start with Quick Wins** for immediate impact
6. **Test structured data** with Google Rich Results Test
7. **Monitor progress** monthly with metrics dashboard

---

## 💡 Final Recommendations

Your website has an **excellent foundation** - the design is professional, the technical implementation is sound, and the branding is cohesive. The missing pieces are primarily:

1. **Structured data** for discoverability
2. **Complete metadata** for indexing
3. **Author platform** for credibility
4. **Content marketing** for ongoing traffic

By implementing the changes outlined in this document, you'll transform a good website into a **powerful marketing engine** that:

- Ranks well in search results
- Converts visitors to subscribers
- Builds author authority
- Creates sustainable traffic growth

The children's book market is competitive, but with proper SEO and marketing, Wild Imagination Press can establish a strong online presence and reach thousands of families looking for exactly the kind of books you're creating.

---

**Questions?** Contact the reviewer or refer to the implementation code provided throughout this document.

**Good luck with the launch! 🌳📚✨**
