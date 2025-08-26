# Product Requirements Document
## Sparq AI Platform - AI-Driven Solutions Showcase

### Document Information
- **Version**: 1.0
- **Date**: August 25, 2025
- **Status**: Draft
- **Target Implementation**: Claude Code with Next.js & AWS Amplify

---

## 1. Executive Summary

### 1.1 Product Overview
A Next.js web application showcasing Sparq's differentiated approach to building AI solutions using AI-driven coding best practices. The platform features case studies, an AI-readiness assessment tool, and analytics dashboard for tracking engagement with existing contacts and clients.

### 1.2 Key Objectives
- Demonstrate Sparq's AI methodology through real-world case studies
- Assess organizational AI readiness through structured surveys
- Track engagement metrics for business development
- Enable client partners to efficiently share and monitor survey distribution

### 1.3 Success Metrics
- Survey completion rate (target: >70%)
- Case study engagement time (target: >2 minutes average)
- Survey-to-consultation conversion rate
- Time to survey completion (<5 minutes)

---

## 2. Technical Architecture

### 2.1 Technology Stack
- **Frontend**: Next.js 14+ (App Router)
- **Deployment**: AWS Amplify Hosting
- **Backend**: AWS Amplify Gen 2 (Managed Backend)
- **Database**: Amplify Data (DynamoDB via GraphQL)
- **Authentication**: JumpCloud OIDC for admin users
- **Email Service**: SendGrid for transactional emails
- **Styling**: TailwindCSS with custom design system
- **Content**: Markdown-based case studies

### 2.2 Infrastructure Requirements
- **Region**: US-East-2 (primary)
- **Performance**: <2s page load time
- **Availability**: 99.5% uptime SLA
- **Scale**: Support 100 concurrent users
- **Security**: HTTPS only, SOC 2 compliant practices

---

## 3. Data Models

### 3.1 Survey Response
```typescript
interface SurveyResponse {
  id: string; // UUID
  shortLinkId?: string; // Reference to ShortLink
  responses: QuestionResponse[];
  totalScore: number; // Sum of all responses (6-30)
  respondentEmail?: string;
  startedAt: DateTime;
  completedAt?: DateTime;
  timeToComplete?: number; // seconds
  ipAddress?: string;
  userAgent?: string;
}

interface QuestionResponse {
  questionId: string;
  questionText: string;
  answer: number; // 1-5 scale
  answeredAt: DateTime;
}
```

### 3.2 ShortLink
```typescript
interface ShortLink {
  id: string; // UUID
  code: string; // Unique 6-8 character code
  clientPartner: string; // Admin who created
  clientPartnerId: string; // JumpCloud user ID
  clientName: string; // Recipient organization
  clientContact?: string; // Recipient email
  featuredCaseStudySlug?: string; // Case study to highlight
  createdAt: DateTime;
  clickCount: number;
  lastClickedAt?: DateTime;
  surveyResponses: SurveyResponse[]; // Relationship
}
```

### 3.3 Case Study (Static)
```typescript
interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  publishedDate: string;
  readTime: number; // minutes
  heroImage: string;
  content: string; // Markdown
}
```

### 3.4 Admin User
```typescript
interface AdminUser {
  id: string; // JumpCloud ID
  email: string;
  name: string;
  role: 'admin' | 'client_partner';
  lastLogin: DateTime;
  createdAt: DateTime;
}
```

---

## 4. Functional Requirements

### 4.1 Public Website

#### 4.1.1 Landing Page
**Purpose**: Introduce Sparq's AI methodology and value proposition

**Requirements**:
- Hero section with clear value proposition
- Overview of Sparq's differentiated approach
- Featured case studies carousel (3 most recent)
- Call-to-action for AI readiness assessment
- Navigation to all sections
- Responsive design for mobile/tablet/desktop

#### 4.1.2 Case Studies Section
**Purpose**: Showcase real-world applications of Sparq's methodology

**Requirements**:
- Grid/list view of all case studies
- Filter by industry, technology, or outcome
- Individual case study pages rendered from Markdown
- Structured presentation:
  - Client overview
  - Challenge statement
  - Solution approach
  - Measurable results
  - Technologies used
- Social sharing capabilities
- Related case studies suggestion
- Read time indicator
- Print-friendly version

#### 4.1.3 AI Readiness Survey
**Purpose**: Assess organizational AI maturity

**Survey Structure**:
1. **Data Foundation** (1-5 scale)
   - "How would you rate your organization's data quality and accessibility?"

2. **Technical Infrastructure** (1-5 scale)
   - "How prepared is your technical infrastructure for AI workloads?"

3. **Talent & Skills** (1-5 scale)
   - "How would you assess your team's AI/ML expertise?"

4. **Strategy & Vision** (1-5 scale)
   - "How clear is your organization's AI strategy?"

5. **Governance & Ethics** (1-5 scale)
   - "How mature are your AI governance and ethical frameworks?"

6. **Implementation Experience** (1-5 scale)
   - "What is your organization's experience with AI implementation?"

**Scoring Logic**:
- Total Score: 6-30 points
- Categories:
  - 6-12: Beginning (Foundational stage)
  - 13-18: Developing (Building capabilities)
  - 19-24: Advancing (Scaling initiatives)
  - 25-30: Leading (AI-driven organization)

**Survey Flow**:
1. Landing with value proposition
2. Optional: Enter email for results
3. Question progression with progress bar
4. Results page with:
   - Score visualization
   - Maturity level description
   - Personalized recommendations
   - Download PDF option
   - Schedule consultation CTA
5. Thank you confirmation

**Survey Access**:
- Direct URL: `/ai-readiness`
- ShortLink URL: `/s/[code]`
  - Pre-populate client information if available
  - Track source attribution

### 4.2 Admin Dashboard

#### 4.2.1 Authentication
**Requirements**:
- JumpCloud OIDC integration
- Session management (8-hour timeout)
- Secure token storage
- Redirect to login on unauthorized access

#### 4.2.2 Dashboard Home
**Requirements**:
- Summary statistics:
  - Total surveys sent
  - Completion rate
  - Average score
  - Recent activity feed
- Quick actions:
  - Create new shortlink
  - View recent responses
  - Export data

#### 4.2.3 ShortLink Management
**Create ShortLink**:
- Form fields:
  - Client name (required)
  - Client contact email (optional)
  - Featured case study (dropdown, optional)
  - Custom message (optional)
- Auto-generate unique code
- Copy link button
- Email invite option

**View ShortLinks**:
- Table view with columns:
  - Code
  - Client
  - Created date
  - Clicks
  - Responses
  - Completion rate
  - Actions (view, copy, delete)
- Search/filter capabilities
- Pagination (25 per page)

#### 4.2.4 Survey Analytics
**Response Details**:
- Individual response view:
  - All answers
  - Score breakdown
  - Time spent
  - Recommendation generated
- Aggregate analytics:
  - Score distribution
  - Question-wise analysis
  - Completion funnel
  - Time-to-complete distribution

**Export Capabilities**:
- CSV export of responses
- PDF report generation
- Email report to stakeholders

### 4.3 Email Notifications

#### 4.3.1 Survey Invitation
**Trigger**: Admin creates shortlink with email
**Content**:
- Personalized greeting
- Purpose of assessment
- Estimated time (5 minutes)
- Direct link to survey
- Sender signature

#### 4.3.2 Survey Results - To Sender
**Trigger**: Survey completion
**Content**:
- Client name and completion notification
- Score and category
- Key insights
- Link to detailed view in dashboard
- Suggested follow-up actions

#### 4.3.3 Survey Results - To Respondent
**Trigger**: Survey completion (if email provided)
**Content**:
- Thank you message
- Score and interpretation
- Personalized recommendations
- PDF attachment with detailed results
- Contact information for consultation

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Page Load Time: <2 seconds (LCP)
- Time to Interactive: <3 seconds
- API Response Time: <500ms for 95th percentile
- Survey Completion: No timeouts, save progress locally

### 5.2 Security
- All data encrypted in transit (TLS 1.3)
- Encryption at rest for sensitive data
- OWASP Top 10 compliance
- Input validation and sanitization
- Rate limiting on public endpoints
- CORS properly configured

### 5.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels
- Color contrast ratios met

### 5.4 Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### 5.5 SEO Requirements
- Server-side rendering for public pages
- Proper meta tags and Open Graph data
- XML sitemap generation
- Structured data for case studies
- Clean URL structure

---

## 6. Design System

### 6.1 Component Library
- **Navigation**: Responsive header, mobile menu
- **Buttons**: Primary, secondary, text variants
- **Forms**: Input, select, radio, checkbox components
- **Cards**: Case study, metric, feature cards
- **Modals**: Confirmation, forms, notifications
- **Tables**: Sortable, filterable, paginated
- **Charts**: Score visualization, analytics

### 6.2 Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### 6.3 Theme Structure
```javascript
{
  colors: {
    primary: { /* From brand guide */ },
    secondary: { /* From brand guide */ },
    neutral: { /* Grays */ },
    success: { /* Greens */ },
    warning: { /* Yellows */ },
    error: { /* Reds */ }
  },
  typography: {
    fontFamily: { /* From brand guide */ },
    fontSize: { /* Scale */ },
    fontWeight: { /* Weights */ }
  },
  spacing: { /* 4px base unit */ },
  borderRadius: { /* Consistent radii */ }
}
```

---

## 7. Development Phases

### Phase 1: Foundation (Week 1-2)
- Next.js project setup with Amplify
- Authentication integration (JumpCloud)
- Basic routing and layout
- Design system implementation

### Phase 2: Public Website (Week 3-4)
- Landing page
- Case study rendering from Markdown
- Basic survey flow (no shortlinks)
- Responsive design implementation

### Phase 3: Survey Enhancement (Week 5-6)
- Complete survey logic and scoring
- Results visualization
- PDF generation
- SendGrid integration for emails

### Phase 4: Admin Dashboard (Week 7-8)
- Dashboard authentication
- ShortLink creation and management
- Basic analytics views
- Survey response tracking

### Phase 5: Analytics & Polish (Week 9-10)
- Advanced analytics
- Export functionality
- Performance optimization
- Testing and bug fixes

---

## 8. Testing Requirements

### 8.1 Unit Testing
- Component testing with Jest/React Testing Library
- API endpoint testing
- Business logic validation
- 80% code coverage target

### 8.2 Integration Testing
- End-to-end survey flow
- Authentication flow
- Email delivery verification
- Data persistence validation

### 8.3 Performance Testing
- Lighthouse scores >90
- Load testing for 100 concurrent users
- API stress testing

### 8.4 User Acceptance Testing
- Survey completion flow
- Admin dashboard workflows
- Cross-browser testing
- Mobile responsiveness

---

## 9. Deployment & DevOps

### 9.1 Environments
- **Development**: Feature branch deployments
- **Staging**: Main branch, production data copy
- **Production**: Tagged releases

### 9.2 CI/CD Pipeline
```yaml
Pipeline:
  - Lint & Format Check
  - Unit Tests
  - Build Application
  - Integration Tests
  - Deploy to Environment
  - Smoke Tests
  - Performance Tests (staging/prod)
```

### 9.3 Monitoring
- Application Performance Monitoring (APM)
- Error tracking (Sentry or similar)
- Analytics (Google Analytics or similar)
- Uptime monitoring
- Database performance metrics

---

## 10. Future Enhancements (Post-MVP)

### 10.1 Advanced Features
- Multi-language support
- Industry-specific survey variants
- AI-powered recommendations
- Integration with CRM systems
- Advanced role-based access control
- Survey templates and customization
- Comparative benchmarking
- Real-time collaboration features

### 10.2 Analytics Enhancements
- Predictive scoring models
- Trend analysis over time
- Cohort analysis
- Custom report builder
- Automated insights generation

### 10.3 Content Management
- Admin UI for case study management
- Dynamic content personalization
- A/B testing framework
- Content versioning

---

## Appendix A: API Endpoints

### Public Endpoints
```
GET  /api/case-studies
GET  /api/case-studies/[slug]
POST /api/survey/start
POST /api/survey/complete
GET  /api/survey/results/[id]
GET  /api/shortlink/[code]
```

### Protected Endpoints (Admin)
```
GET  /api/admin/dashboard
POST /api/admin/shortlinks
GET  /api/admin/shortlinks
GET  /api/admin/surveys
GET  /api/admin/surveys/[id]
GET  /api/admin/analytics
POST /api/admin/export
```

---

## Appendix B: Environment Variables

```env
# Amplify
NEXT_PUBLIC_AWS_REGION=
NEXT_PUBLIC_USER_POOL_ID=
NEXT_PUBLIC_USER_POOL_CLIENT_ID=
NEXT_PUBLIC_GRAPHQL_ENDPOINT=

# JumpCloud OIDC
JUMPCLOUD_CLIENT_ID=
JUMPCLOUD_CLIENT_SECRET=
JUMPCLOUD_ISSUER=

# SendGrid
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
SENDGRID_SURVEY_TEMPLATE_ID=

# Application
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_ANALYTICS_ID=
```

---

## Appendix C: File Structure

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                 # Landing page
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── ai-readiness/
│   │   │   ├── page.tsx
│   │   │   └── results/[id]/page.tsx
│   │   └── s/[code]/page.tsx       # ShortLink redirect
│   ├── (admin)/
│   │   ├── layout.tsx               # Protected layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── shortlinks/page.tsx
│   │   │   ├── surveys/page.tsx
│   │   │   └── analytics/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── survey/route.ts
│       └── admin/
├── components/
│   ├── ui/                          # Design system components
│   ├── survey/                      # Survey components
│   └── dashboard/                   # Admin components
├── lib/
│   ├── amplify/                     # Amplify configuration
│   ├── email/                       # SendGrid integration
│   └── utils/                       # Utilities
├── content/
│   └── case-studies/                # Markdown files
└── styles/
    └── globals.css                   # TailwindCSS
```

---

## Document Sign-off

This PRD serves as the authoritative specification for the Sparq AI Platform development using Claude Code. All implementation decisions should align with these requirements.

**Next Steps**:
1. Review and approve PRD
2. Finalize brand guidelines and design system
3. Set up AWS Amplify project
4. Configure JumpCloud and SendGrid accounts
5. Begin Phase 1 development

---

*End of Document*