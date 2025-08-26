# Homepage Implementation Specification
## Recreating ai.teamsparq.com Landing Page

### Document Information
- **Purpose**: Step-by-step implementation guide for recreating ai.teamsparq.com homepage
- **Target**: Next.js 15 with App Router, Tailwind CSS, TypeScript
- **Reference**: @specs/sparq-ai-prd.md, @specs/visual-design-plan.md, @reference/landing/, @reference/web/
- **Goal**: Professional landing page matching ai.teamsparq.com design and functionality

---

## Phase 1: Foundation Setup

### Step 1: Configure Tailwind CSS with Brand System
1.1. **Update tailwind.config.ts** with Sparq brand colors and typography:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E75437",
          "orange-light": "#F9DDD8", 
          dark: "#16110F",
          light: "#F9F7F5",
          cta: "#B8F0A1",
          "cta-hover": "#A5E88E",
        },
        neutral: {
          light: {
            100: "#F9F7F5",
            200: "#F2ECEA", 
            300: "#EBE5E2",
            400: "#D9D1CE",
            500: "#B8B0AD",
          },
          dark: {
            100: "#71635C",
            200: "#51453F",
            300: "#392E27",
            400: "#231A17", 
            500: "#16110F",
          }
        },
        accent: {
          100: "#E3EED8",
          200: "#B8F0A1",
        }
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        display: ["Satoshi", "sans-serif"],
      },
      fontSize: {
        hero: ["4.25rem", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
        display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }], 
        lead: ["1.375rem", { lineHeight: "1.35", letterSpacing: "-0.02em" }],
      },
      fontWeight: {
        black: "900",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "4rem",
          "2xl": "8rem",
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

1.2. **Update app/globals.css** with font imports and custom utilities:
```css
@import "tailwindcss";

/* Satoshi Font Import */
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* Global Styles */
html {
  @apply antialiased;
}

body {
  @apply bg-brand-light text-brand-dark;
}

/* Custom Utilities */
.blur-progressive {
  position: relative;
}

.blur-progressive::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(35, 20, 5, 0.15);
  backdrop-filter: blur(0.5px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 12.5%,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 0) 37.5%
  );
}

.container-custom {
  @apply mx-auto px-4 sm:px-8 lg:px-16 xl:px-[165px];
}
```

### Step 2: Create Core UI Components

2.1. **Create app/components/ui/button.tsx**:
```typescript
import { VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold disabled:pointer-events-none disabled:opacity-50 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange",
  {
    variants: {
      variant: {
        default: "bg-brand-dark text-white hover:bg-brand-dark/90",
        primary: "bg-brand-cta text-brand-dark hover:bg-brand-cta-hover",
        secondary: "bg-brand-orange text-white hover:bg-brand-orange/90",
        outline: "border border-current hover:bg-current hover:text-white",
      },
      size: {
        sm: "h-[2.625rem] px-4 py-2 text-sm",
        default: "h-[2.625rem] px-6 py-3 text-base",
        lg: "h-[3.125rem] px-8 py-4 text-lg md:text-xl",
        xl: "h-[3.75rem] px-10 py-5 text-xl md:text-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}
```

2.2. **Create app/components/ui/title.tsx**:
```typescript
import { cn } from "@/lib/utils"

interface TitleProps {
  children: React.ReactNode
  variant?: "hero" | "display" | "h1" | "h2" | "h3"
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function Title({
  children,
  variant = "h1",
  className,
  as: Component = "h1",
}: TitleProps) {
  const variants = {
    hero: "text-2xl md:text-4xl lg:text-6xl xl:text-hero font-black leading-tight tracking-tight",
    display: "text-xl md:text-3xl lg:text-5xl xl:text-display font-black leading-tight tracking-tight",
    h1: "text-lg md:text-2xl lg:text-4xl xl:text-h1 font-bold leading-tight tracking-tight",
    h2: "text-base md:text-xl lg:text-2xl xl:text-h2 font-bold leading-tight tracking-tight",
    h3: "text-base md:text-lg lg:text-xl font-semibold leading-tight",
  }

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  )
}
```

2.3. **Create app/components/ui/eyebrow.tsx**:
```typescript
import { cn } from "@/lib/utils"

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p 
      className={cn(
        "text-sm md:text-base lg:text-lg uppercase tracking-[0.3em] font-medium opacity-80 mb-4",
        className
      )}
    >
      {children}
    </p>
  )
}
```

2.4. **Create app/components/ui/divider.tsx**:
```typescript
import { cn } from "@/lib/utils"

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={cn("w-full mb-8", className)}>
      <svg
        width="100%"
        height="1"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          className="stroke-current opacity-50"
          strokeWidth="0.875"
        />
      </svg>
    </div>
  )
}
```

2.5. **Create lib/utils.ts**:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Phase 2: Layout Components

### Step 3: Create Header Component

3.1. **Create app/components/layout/header.tsx**:
```typescript
import { Title } from "@/components/ui/title"
import Link from "next/link"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container-custom py-8">
        <Title 
          variant="h2"
          as="h1"
          className="text-white font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          <Link href="/">Sparq</Link>
        </Title>
      </div>
    </header>
  )
}
```

### Step 4: Create Hero Section Component

4.1. **Create app/components/sections/hero.tsx**:
```typescript
"use client"

import { Title } from "@/components/ui/title"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { Eyebrow } from "@/components/ui/eyebrow"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero1.jpg')",
        }}
      />
      
      {/* Progressive Blur Overlay System */}
      <div className="absolute left-0 right-0 z-10" style={{ bottom: '12rem', height: '14rem' }}>
        {/* Blur Layer 1 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.15)',
            backdropFilter: 'blur(0.5px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)',
          }}
        />
        {/* Blur Layer 2 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.25)',
            backdropFilter: 'blur(4px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
          }}
        />
        {/* Blur Layer 3 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.35)',
            backdropFilter: 'blur(8px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
          }}
        />
        {/* Blur Layer 4 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.45)',
            backdropFilter: 'blur(16px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
          }}
        />
        {/* Blur Layer 5 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.45)',
            backdropFilter: 'blur(32px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
          }}
        />
        {/* Blur Layer 6 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.45)',
            backdropFilter: 'blur(64px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
      </div>

      {/* Solid Background at Bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-54"
        style={{ background: '#231405' }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex items-end">
        <div className="container-custom pb-20 w-full">
          <div className="text-left">
            {/* Main Headline */}
            <Title 
              variant="hero"
              className="mb-8"
              style={{ lineHeight: '100%' }}
            >
              Move Fast. Ship Even Faster. AI-accelerated product execution for
              when speed isn't optional.
            </Title>

            {/* Divider */}
            <Divider />

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-16 items-baseline">
              {/* Left: CTA Button */}
              <div className="xl:col-span-2">
                <Button 
                  variant="primary"
                  size="xl"
                  href="/case-studies/ai-success-story"
                  className="font-semibold"
                >
                  Explore an AI Success Story
                </Button>
              </div>

              {/* Right: Label */}
              <div className="xl:col-span-1 hidden lg:block">
                <Eyebrow className="text-gray-200 text-lg md:text-xl lg:text-2xl">
                  SOLUTIONS WITH IMPACT
                </Eyebrow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Step 5: Create Value Proposition Section

5.1. **Create app/components/sections/value-proposition.tsx**:
```typescript
import { Title } from "@/components/ui/title"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "next/image"

export function ValueProposition() {
  return (
    <section className="bg-brand-orange min-h-screen text-white py-24 lg:py-32 xl:py-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-16">
          {/* Left Content */}
          <div className="flex-1">
            <Eyebrow className="text-white mb-6">
              WHAT WE SOLVE
            </Eyebrow>

            <Title 
              variant="display"
              className="mb-8 text-white"
              style={{ fontWeight: 900 }}
            >
              We don't just deliver services, we deliver transformative outcomes.
            </Title>

            <div className="space-y-6 max-w-2xl">
              <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                Sparq blends strategy, design, engineering, and AI to cut through the
                complexity and create measurable impact, fast.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                Our approach is modular and adaptive: whether you're building from
                scratch, scaling, or modernizing, we meet you where you are and move
                you where you need to go.
              </p>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="flex-1 flex 2xl:justify-center">
            <Image
              src="/images/videoThumbnail.jpg"
              alt="Product Demo Video"
              width={800}
              height={600}
              className="w-full 2xl:max-w-2xl h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Logo Band */}
        <div className="w-full mt-16 hidden sm:block">
          <Image
            src="/images/logo-band.png"
            alt="Partner Logos"
            width={1200}
            height={100}
            className="w-full object-cover mix-blend-multiply"
          />
        </div>

        {/* Pull Quote */}
        <div className="mt-16">
          <p className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl opacity-80 font-normal max-w-4xl mx-auto">
            "Reduced mechanical engineering time for a leading manufacturer by over 95%."
          </p>
        </div>
      </div>
    </section>
  )
}
```

### Step 6: Create Stats Section

6.1. **Create app/components/sections/stats.tsx**:
```typescript
import { Title } from "@/components/ui/title"
import { Eyebrow } from "@/components/ui/eyebrow"

interface StatCardProps {
  number: string
  label: string
  description: string
}

function StatCard({ number, label, description }: StatCardProps) {
  return (
    <div className="text-center">
      <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-brand-orange mb-6">
        <span className="font-black">{number}</span>
        <br />
        <span className="font-light text-lg md:text-xl lg:text-2xl xl:text-3xl">
          {label}
        </span>
      </p>
      <p className="text-neutral-dark-200 leading-relaxed text-base md:text-lg lg:text-xl">
        {description}
      </p>
    </div>
  )
}

export function Stats() {
  return (
    <section 
      className="py-24 lg:py-32 xl:py-40"
      style={{ backgroundColor: '#F9DDD8' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Eyebrow className="text-neutral-dark-200 mb-8">
            REAL OUTCOMES
          </Eyebrow>
          
          <div className="max-w-4xl mx-auto">
            <Title 
              variant="display"
              className="text-brand-dark"
              style={{ fontWeight: 900 }}
            >
              Built. Shipped. Delivered. Because slick products mean nothing without
              measurable results.
            </Title>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <StatCard
            number="40%"
            label="Faster Speed-to-Impact"
            description="From concept to market, our AI-accelerated approach cuts product development time without compromising quality."
          />
          
          <StatCard
            number="30%"
            label="Cost Savings"
            description="Our AI-enabled teams cost less than traditional teams without compromising on the quality and speed vital to success."
          />
          
          <StatCard
            number="78%"
            label="Client Retention"
            description="Our clients stay with us because we deliver consistent results that drive real business impact."
          />
        </div>
      </div>
    </section>
  )
}
```

### Step 7: Create Features Section

7.1. **Create app/components/sections/features.tsx**:
```typescript
import { Title } from "@/components/ui/title"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "next/image"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <Image
          src={icon}
          alt={title}
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </div>
      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-brand-dark">
        {title}
      </h3>
      <p className="text-neutral-dark-200 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export function Features() {
  return (
    <section className="py-24 lg:py-32 xl:py-40 bg-brand-light">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Eyebrow className="text-neutral-dark-200 mb-8">
            AI-ACCELERATED CAPABILITIES
          </Eyebrow>
          
          <Title 
            variant="display"
            className="text-brand-dark max-w-4xl mx-auto"
          >
            Four key service areas where AI multiplies our impact
          </Title>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FeatureCard
            icon="/images/chip.png"
            title="Strategy & Vision"
            description="AI-powered market analysis and strategic roadmapping that identifies opportunities faster than traditional methods."
          />
          
          <FeatureCard
            icon="/images/chip.png"
            title="Design & Experience"
            description="Rapid prototyping and user testing accelerated by AI, delivering exceptional experiences in record time."
          />
          
          <FeatureCard
            icon="/images/chip.png"
            title="Engineering & Development"
            description="AI-assisted development workflows that maintain quality while dramatically increasing velocity."
          />
          
          <FeatureCard
            icon="/images/chip.png"
            title="Data & Intelligence"
            description="Advanced analytics and machine learning solutions that turn data into competitive advantages."
          />
        </div>
      </div>
    </section>
  )
}
```

### Step 8: Create Team Section

8.1. **Create app/components/sections/team.tsx**:
```typescript
import { Title } from "@/components/ui/title"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Team() {
  return (
    <section className="py-24 lg:py-32 xl:py-40 bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <Eyebrow className="text-white/80 mb-8">
              METHODOLOGY & DELIVERY
            </Eyebrow>
            
            <Title 
              variant="display"
              className="text-white mb-8"
            >
              Our product engineering system is built to ship, not just prototype.
            </Title>

            <div className="space-y-6 mb-8">
              <p className="text-lg md:text-xl text-white/90">
                We combine proven methodologies with cutting-edge AI tools to deliver
                production-ready solutions that scale.
              </p>
              <p className="text-lg md:text-xl text-white/90">
                Every project follows our systematic approach: strategy, design,
                engineering, and intelligence working in harmony.
              </p>
            </div>

            <Button 
              variant="primary"
              size="lg"
              href="/contact"
            >
              Start Your Project
            </Button>
          </div>

          {/* Right Content */}
          <div className="relative">
            <Image
              src="/images/teamImage.jpg"
              alt="Sparq Team"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Step 9: Create Footer

9.1. **Create app/components/layout/footer.tsx**:
```typescript
import { Title } from "@/components/ui/title"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Title variant="h2" className="text-white mb-4">
              Sparq
            </Title>
            <p className="text-white/80 mb-6">
              AI-accelerated product execution for when speed isn't optional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/ai-readiness" className="hover:text-white transition-colors">AI Readiness Assessment</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">Our Methodology</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="mailto:hello@teamsparq.com" className="hover:text-white transition-colors">hello@teamsparq.com</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 Sparq. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## Phase 3: Page Assembly

### Step 10: Update Main Page

10.1. **Replace app/page.tsx** with complete homepage:
```typescript
import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { ValueProposition } from "@/components/sections/value-proposition"
import { Stats } from "@/components/sections/stats"
import { Features } from "@/components/sections/features"
import { Team } from "@/components/sections/team"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueProposition />
      <Stats />
      <Features />
      <Team />
      <Footer />
    </main>
  )
}
```

### Step 11: Add Required Assets

11.1. **Add image assets to public/images/**:
- Copy hero1.jpg from @reference/landing/ai-landing-page-master/public/images/
- Copy videoThumbnail.jpg from @reference/landing/ai-landing-page-master/public/images/
- Copy logo-band.png from @reference/landing/ai-landing-page-master/public/images/
- Copy teamImage.jpg from @reference/landing/ai-landing-page-master/public/images/
- Copy chip.png from @reference/landing/ai-landing-page-master/public/images/

11.2. **Add Satoshi font files to public/fonts/**:
- Copy all Satoshi font files from @reference/landing/ai-landing-page-master/public/fonts/

### Step 12: Install Dependencies

12.1. **Install required packages**:
```bash
npm install clsx tailwind-merge class-variance-authority
npm install -D @types/node
```

### Step 13: Update Layout and Metadata

13.1. **Update app/layout.tsx**:
```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sparq - AI-Accelerated Product Execution",
  description: "Move fast. Ship even faster. AI-accelerated product execution for when speed isn't optional.",
  keywords: "AI, product development, engineering, strategy, design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

## Phase 4: Verification & Testing

### Step 14: Development Testing

14.1. **Run development server**:
```bash
npm run dev
```

14.2. **Verify responsive behavior**:
- Test on mobile (320px-767px)
- Test on tablet (768px-1023px)  
- Test on desktop (1024px+)

14.3. **Check component functionality**:
- Hero section with progressive blur
- Value proposition with image display
- Stats section with proper grid layout
- Features section with centered icons
- Team section with content alignment
- Footer with proper link structure

### Step 15: Performance Optimization

15.1. **Optimize images**:
- Ensure all images are properly sized
- Add loading="lazy" to non-critical images
- Consider WebP format for better compression

15.2. **Check accessibility**:
- Verify keyboard navigation
- Check color contrast ratios
- Ensure proper heading hierarchy
- Add alt tags to all images

### Step 16: Final Polish

16.1. **Review spacing and typography**:
- Ensure consistent spacing throughout
- Verify font weights and sizes match design
- Check line heights and letter spacing

16.2. **Mobile experience**:
- Test touch interactions
- Verify readability on small screens
- Ensure proper button sizes for mobile

---

## Success Criteria

Upon completion, the homepage should:

✅ **Visual Match**: Closely recreate the ai.teamsparq.com design and layout
✅ **Responsive Design**: Work seamlessly across all device sizes  
✅ **Performance**: Load in under 2 seconds with optimized images
✅ **Accessibility**: Meet WCAG 2.1 AA standards
✅ **Code Quality**: Use TypeScript, follow React best practices, maintain clean component structure
✅ **Brand Consistency**: Implement Sparq brand colors, typography, and visual elements

This specification provides Claude Code with the complete roadmap to recreate the ai.teamsparq.com homepage with professional quality and maintainable code structure.