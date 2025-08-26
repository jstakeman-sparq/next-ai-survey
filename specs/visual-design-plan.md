# AI Survey Landing Page - Visual Design Specification

## Overview
This document outlines the visual design plan for an AI survey landing page based on the ai.teamsparq.com reference site. The design will be implemented using Next.js, React components, and Tailwind CSS, following the professional styling patterns from the reference materials.

## Design Foundation

### Color Palette
Based on the Sparq brand colors and Next.js reference:

**Primary Colors:**
- Brand Orange: `#E75437` (primary accent)
- Brand Orange Light: `#F9DDD8` (backgrounds)
- Brand Dark: `#16110F` (text, dark sections)
- Brand Light: `#F9F7F5` (light backgrounds)

**Interactive Colors:**
- CTA Green: `#B8F0A1` (call-to-action buttons)
- CTA Green Hover: `#A5E88E` (hover states)

**Neutral Palette:**
- Neutral Light: `#F9F7F5`, `#F2ECEA`, `#EBE5E2`, `#D9D1CE`, `#B8B0AD`
- Neutral Dark: `#71635C`, `#51453F`, `#392E27`, `#231A17`, `#16110F`

**Accent Colors:**
- Accent Light: `#E3EED8`
- Accent Primary: `#B8F0A1`

### Typography
**Font Family:** Satoshi (custom font)
- Regular: 400
- Medium: 500
- Bold: 700
- Black: 900

**Typography Scale:**
- Hero Text: `4.25rem` (68px) - Line height: 115%, Letter spacing: -0.03em
- Display: `3.5rem` (56px) - Line height: 110%, Letter spacing: -0.02em
- H1: `2.5rem` (40px) - Line height: 120%, Letter spacing: -0.01em
- H2: `2rem` (32px) - Line height: 125%, Letter spacing: -0.01em
- Lead: `1.375rem` (22px) - Line height: 135%, Letter spacing: -0.02em
- Body: `1rem` (16px) base size

## Page Structure & Components

### 1. Hero Section
**Layout:** Full-screen height with background image/video
**Components:**
- Header with logo (top-left)
- Main headline (bottom-anchored)
- Call-to-action button
- Progressive blur overlay system
- Gradient solid background at bottom

**Styling Features:**
- Complex layered blur system (6 layers with increasing blur: 0.5px → 4px → 8px → 16px → 32px → 64px)
- Dark overlay: `rgba(35, 20, 5, opacity)`
- Responsive padding: `px-4 sm:px-8 lg:px-16 xl:px-[165px]`
- Typography: Hero text with 100% line height, font-black weight

### 2. Value Proposition Section
**Background:** Brand orange (`#E75437`)
**Layout:** Two-column responsive grid
**Components:**
- Section eyebrow with uppercase styling and letter-spacing
- Large display headline
- Descriptive paragraphs
- Video/image content
- Logo band (partner logos)
- Pull quote

**Styling Features:**
- White text on orange background
- Responsive text sizing with detailed breakpoints
- Logo band with mix-blend-multiply effect
- Center-aligned pull quote with opacity styling

### 3. Stats Section
**Background:** Light orange (`#F9DDD8`)
**Layout:** Three-column stats grid
**Components:**
- Section header with eyebrow and headline
- Stat cards with large numbers and descriptions
- Icon integration

**Styling Features:**
- Large statistical numbers with brand orange color
- Font weight contrast (black numbers, light descriptive text)
- Responsive grid layout
- Centered alignment with consistent spacing

### 4. Features Section
**Components to implement:**
- AI capabilities breakdown
- Chip/icon representations
- Service area descriptions
- Process methodology visualization

### 5. Team/About Section
**Components:**
- Team member cards
- Company story/mission
- Social proof elements

### 6. Footer
**Components:**
- Contact information
- Navigation links
- Social media icons
- Legal/privacy links

## Component Architecture

### Core UI Components (from Next.js reference)

#### Button Component
```tsx
// Variants: default, primary, secondary, outline
// Sizes: sm, default, lg, icon
// Features: ripple effects, hover states, external link handling
```

#### Hero Component
```tsx
// Props: title, description, subtitle, media, actions, gradient
// Features: video/image background, responsive grid, divider
```

#### Typography Components
- Title (with variant support)
- Eyebrow (uppercase labels)
- Markdown (rich text support)
- Divider (section separators)

### Layout System
**Container:** 
- Responsive padding: `px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-32`
- Max-width with auto margins
- Centered alignment

**Grid System:**
- CSS Grid for complex layouts
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Flexible column spans

## Responsive Design Strategy

### Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `1024px - 1536px`
- Large Desktop: `> 1536px`

### Responsive Features
- Fluid typography scaling
- Adaptive layouts (single → multi-column)
- Progressive image/video loading
- Touch-friendly interactions on mobile
- Optimized spacing and padding

## Advanced Styling Features

### Noise Texture
- SVG-based noise overlay
- Configurable opacity and blend modes
- Applied to dark sections for texture

### Progressive Blur System
- Multiple blur layers with mask gradients
- Backdrop filters for glass morphism
- Complex layering for depth

### Animation & Interactions
- Button ripple effects on click
- Smooth transitions (300ms duration)
- Hover state animations
- Scroll-based reveals (intersection observer)

### Accessibility
- Focus-visible ring styles
- Semantic HTML structure
- ARIA labels and roles
- Color contrast compliance
- Keyboard navigation support

## Implementation Priority

### Phase 1: Foundation
1. Set up Tailwind configuration with custom colors and typography
2. Create core UI components (Button, Typography, Layout)
3. Implement Hero section with full styling

### Phase 2: Content Sections
1. Value Proposition section
2. Stats section with responsive grid
3. Features section

### Phase 3: Enhancement
1. Team/About section
2. Footer component
3. Animation and interaction polish

### Phase 4: Optimization
1. Performance optimization
2. Accessibility audit
3. Mobile experience refinement
4. SEO integration

## File Structure
```
app/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── title.tsx
│   │   ├── eyebrow.tsx
│   │   └── divider.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── value-proposition.tsx
│   │   ├── stats.tsx
│   │   └── features.tsx
│   └── layout/
│       ├── header.tsx
│       └── footer.tsx
├── globals.css (Tailwind + custom styles)
└── page.tsx (main landing page)
```

## Survey Integration Considerations
- Survey component will be embedded as a modal/overlay
- Question progression with visual feedback
- Result visualization with charts/graphs
- Completion states and user journey flows
- Data capture and analytics integration

This specification provides the foundation for building a professional, performant AI survey landing page that matches the visual quality and user experience of the ai.teamsparq.com reference site.