# Case Study Template and Layout Implementation Specification

## Overview
This specification outlines the implementation of a comprehensive case study system for the Next.js application, based on the existing Astro implementation. The system will support markdown-based content with frontmatter metadata, server-side rendering, and a rich, responsive layout that matches the existing design system.

## Architecture Overview

### 1. Data Structure and Content Management
- **Content Format**: Markdown files with YAML frontmatter
- **Storage Location**: `content/case-studies/`
- **Processing**: Next.js App Router with Server Components
- **Routing**: Dynamic routes using `[slug].tsx`

### 2. Core Components Architecture
```
app/
├── case-studies/
│   ├── [slug]/
│   │   └── page.tsx          # Dynamic case study page
│   └── page.tsx              # Case studies index page
├── components/
│   └── case-studies/
│       ├── CaseStudyHero.tsx
│       ├── CaseStudyContent.tsx
│       ├── CaseStudyLayout.tsx
│       ├── KeyHighlights.tsx
│       ├── TechnologiesSection.tsx
│       └── ServicesSection.tsx
├── lib/
│   └── case-studies.ts       # Content processing utilities
└── types/
    └── case-study.ts         # TypeScript interfaces
```

### 3. Content Processing Pipeline
- **Markdown Parser**: `remark` + `remark-html` for content processing
- **Frontmatter**: `gray-matter` for metadata extraction
- **Static Generation**: ISR (Incremental Static Regeneration) support
- **Type Safety**: Full TypeScript support with generated types

## Data Schema

### Case Study Interface
```typescript
interface CaseStudy {
  // Metadata
  slug: string
  title: string
  subtitle: string
  publishDate: string
  readTime: string
  tags: string[]
  
  // Author information
  author: {
    name: string
    avatar: string
    bio: string
  }
  
  // Key metrics
  keyHighlights: Array<{
    value: string
    description: string
  }>
  
  // Content sections
  overview: string
  industry: string[]
  challenge: string
  approach: string
  solution: string
  results: string
  
  // Optional quote
  quote?: {
    text: string
    attribution: string
  }
  
  // Technical details
  technologies: string[]
  services: string[]
  
  // Related content
  relatedArticles: Array<{
    title: string
    date: string
    readTime: string
    tag: string
    slug: string
  }>
  
  // SEO
  seo?: {
    description: string
    keywords: string[]
    ogImage?: string
  }
}
```

### Markdown Frontmatter Structure
```yaml
---
title: "Using AI to Solve a Stadium's Biggest Entry Headache"
subtitle: "How AI technology transformed stadium entry processes and improved fan experience."
publishDate: "2025-03-15"
readTime: "5 minute read"
tags: ["AI IN THE WILD", "CASE STUDY"]

author:
  name: "Sparq Team"
  avatar: "/images/authors/sparq-team.jpg"
  bio: "AI-accelerated product execution specialists focused on delivering business breakthroughs through innovative solutions."

keyHighlights:
  - value: "75%"
    description: "Reduction in entry wait times during peak events"
  - value: "3X"
    description: "Faster processing of fan credentials and tickets"
  - value: "95%"
    description: "Fan satisfaction improvement with entry experience"

industry: ["Sports & Entertainment", "Venue Management"]

quote:
  text: "AI as a multiplier transforms operational challenges into competitive advantages."
  attribution: "Solutions with Impact"

technologies:
  - "Computer Vision"
  - "Machine Learning"
  - "Real-time Analytics"
  - "Cloud Infrastructure"
  - "Mobile Integration"
  - "IoT Sensors"

services:
  - "AI Strategy & Implementation"
  - "Computer Vision Solutions"
  - "Real-time Data Processing"
  - "System Integration"

relatedArticles:
  - title: "AI in Sports: Transforming Fan Experiences"
    date: "2025-03-10"
    readTime: "4 min"
    tag: "AI IN SPORTS"
    slug: "ai-in-sports-transforming-fan-experiences"

seo:
  description: "Learn how AI transformed stadium entry processes, reducing wait times by 75% and improving fan satisfaction by 95%."
  keywords: ["AI", "stadium technology", "crowd management", "computer vision"]
  ogImage: "/images/case-studies/stadium-ai-og.jpg"
---
```

## Component Specifications

### 1. CaseStudyHero Component
**Purpose**: Header section with branding, title, subtitle, tags, and metadata

**Design Requirements**:
- Dark brand background (`bg-brand-dark`)
- Sparq logo/brand link in upper left
- Large, impactful headline using display typography
- Horizontal divider line
- Subtitle with responsive typography
- Tag badges with brand CTA color (`bg-brand-cta`)
- Author attribution and metadata at bottom
- Responsive layout adjustments

**Tailwind Classes**:
```typescript
// Background and layout
className="relative bg-brand-dark text-white min-h-screen flex flex-col"

// Container
className="max-w-6xl mx-auto px-4 py-8 lg:py-16"

// Typography
className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-brand-light leading-tight tracking-tight mb-8"

// Tags
className="px-3 py-2 bg-brand-cta text-brand-dark text-sm font-bold uppercase rounded tracking-wide"
```

### 2. CaseStudyContent Component
**Purpose**: Main content area with sidebar and structured sections

**Layout Structure**:
- Two-column layout (desktop) with sidebar on left, content on right
- Mobile-first responsive design that stacks on smaller screens
- Sidebar order changes on mobile (moved below main content)

**Content Sections**:
1. **Key Highlights Sidebar**
   - Green accent boxes (`bg-brand-cta`)
   - Large metric typography
   - Responsive layout (stacked on mobile, single box on desktop)

2. **Main Content Sections**:
   - Overview
   - Industry
   - Challenge
   - The Approach
   - The Solution
   - Results
   - Optional Quote (highlighted in brand CTA color)

3. **Technical Sidebar**:
   - Services/Solutions tags
   - Technology list

**Design Requirements**:
- Light brand background (`bg-brand-light`)
- Consistent section spacing and typography hierarchy
- Prose-style content rendering with HTML support
- Quote callouts with brand CTA styling
- Tag-style elements for technologies and services

### 3. CaseStudyLayout Component
**Purpose**: Main layout wrapper that combines hero and content

**Features**:
- SEO meta tag generation
- Structured data for search engines
- Responsive container classes
- Footer integration

## Implementation Steps

### Phase 1: Foundation (1-2 hours)
1. **Install Dependencies**
   ```bash
   npm install gray-matter remark remark-html
   npm install @types/remark @types/remark-html --save-dev
   ```

2. **Create TypeScript Interfaces**
   - Create `types/case-study.ts` with comprehensive interfaces
   - Include proper typing for all data structures

3. **Content Processing Utilities**
   - Create `lib/case-studies.ts` with functions:
     - `getAllCaseStudies()`: Get all case study metadata
     - `getCaseStudyBySlug(slug: string)`: Get specific case study
     - `getCaseStudyPaths()`: For static generation
     - `processCaseStudyContent(content: string)`: Parse markdown

### Phase 2: Core Components (2-3 hours)
4. **CaseStudyHero Component**
   - Create responsive hero section
   - Implement brand styling with Tailwind v4 colors
   - Add proper typography hierarchy
   - Include tag rendering and metadata display

5. **KeyHighlights Component**
   - Implement responsive highlight boxes
   - Desktop: single column stacked layout
   - Mobile: individual boxes in grid
   - Brand CTA color styling

6. **CaseStudyContent Component**
   - Two-column responsive layout
   - Content sections with proper typography
   - HTML content rendering with `dangerouslySetInnerHTML`
   - Quote callout styling

### Phase 3: Layout and Routing (1-2 hours)
7. **CaseStudyLayout Component**
   - Combine hero and content components
   - Add SEO meta tags
   - Include structured data for rich snippets

8. **Dynamic Routing**
   - Create `app/case-studies/[slug]/page.tsx`
   - Implement `generateStaticParams()` for ISR
   - Add proper error handling and 404s

9. **Index Page**
   - Create `app/case-studies/page.tsx`
   - Case study listing with cards
   - Search and filtering capabilities

### Phase 4: Content and Testing (1 hour)
10. **Create Content Directory**
    - Set up `content/case-studies/` folder
    - Create sample case study markdown files
    - Include proper frontmatter structure

11. **SEO Optimization**
    - Meta tags generation
    - Open Graph images
    - Structured data for rich snippets
    - XML sitemap integration

12. **Testing and Validation**
    - Test responsive design across breakpoints
    - Validate markdown processing
    - Check accessibility compliance
    - Performance optimization

## Content Management

### Directory Structure
```
content/
└── case-studies/
    ├── stadium-ai-entry-system.md
    ├── retail-inventory-optimization.md
    └── healthcare-diagnosis-acceleration.md
```

### Content Creation Workflow
1. Create new `.md` file in `content/case-studies/`
2. Add comprehensive frontmatter with all required fields
3. Write content sections as markdown
4. Include images in `public/images/case-studies/`
5. Test locally with development server
6. Deploy - Next.js will automatically generate static pages

### Content Guidelines
- **Headlines**: Use sentence case, focus on outcomes
- **Metrics**: Specific, quantifiable results
- **Structure**: Follow the Overview → Challenge → Approach → Solution → Results flow
- **Tone**: Professional but accessible, emphasizing impact
- **Images**: High-quality, relevant visuals with proper alt text

## Styling Guidelines

### Typography Hierarchy
```css
/* Section Headers */
h3: text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark leading-tight

/* Body Text */
p: text-lg sm:text-xl lg:text-xl text-brand-dark leading-relaxed

/* Metrics */
.metric-value: text-6xl lg:text-7xl font-light text-brand-dark leading-none

/* Tags */
.tag: px-3 py-2 bg-brand-cta text-brand-dark text-sm font-bold uppercase rounded tracking-wide
```

### Color Usage
- **Primary Background**: `bg-brand-light` (#F9F7F5)
- **Hero Background**: `bg-brand-dark` (#16110F)
- **Text**: `text-brand-dark` (#16110F)
- **Accent/CTA**: `bg-brand-cta` (#B8F0A1)
- **Tags/Secondary**: `bg-accent-100` (#E3EED8)

### Responsive Breakpoints
- **Mobile**: 320px - 767px (single column, stacked layout)
- **Tablet**: 768px - 1023px (transition layouts)
- **Desktop**: 1024px+ (full two-column layout)

## SEO and Performance

### Meta Tags Template
```tsx
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const caseStudy = getCaseStudyBySlug(params.slug)
  
  return {
    title: `${caseStudy.title} | Sparq Case Studies`,
    description: caseStudy.seo?.description || caseStudy.subtitle,
    keywords: caseStudy.seo?.keywords,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.subtitle,
      images: [{ url: caseStudy.seo?.ogImage || '/images/og-default.jpg' }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.subtitle,
    }
  }
}
```

### Performance Optimizations
- **Static Generation**: Pre-generate all case study pages at build time
- **Image Optimization**: Use Next.js Image component with proper sizing
- **Code Splitting**: Lazy load non-critical components
- **Font Loading**: Optimize Satoshi font loading with font-display: swap

## Success Criteria
- [ ] Case study pages render correctly on all device sizes
- [ ] Markdown content processes without errors
- [ ] All brand colors and typography match design system
- [ ] SEO meta tags generate properly
- [ ] Page load performance under 2 seconds
- [ ] Accessibility score above 95
- [ ] Content management workflow is straightforward
- [ ] Related articles functionality works
- [ ] Search engine rich snippets display correctly

## Future Enhancements
- **Search Functionality**: Full-text search across case studies
- **Filtering**: Filter by technology, industry, or service type
- **Analytics**: Track engagement metrics and popular content
- **CMS Integration**: Connect to headless CMS for non-technical editing
- **Internationalization**: Multi-language support for global content
- **Social Sharing**: Enhanced social media integration
- **Comments System**: Community engagement features

This specification provides a comprehensive roadmap for implementing a robust, scalable case study system that maintains design consistency while providing excellent user experience and content management capabilities.