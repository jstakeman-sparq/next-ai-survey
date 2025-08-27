# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server

### Amplify Backend
- Backend commands should be run from the `amplify/` directory using `npx ampx <command>`

## Architecture

This is a **Next.js 15 AI Readiness Survey Application** integrated with AWS Amplify Gen2. The app provides a complete survey platform for assessing organizational AI readiness with cohort-based results.

### Frontend Stack
- **Next.js 15** with App Router and React 19
- **TailwindCSS v4** for styling with custom Satoshi font
- **TypeScript** for type safety
- **Turbopack** for fast builds and development
- **NextAuth v5** for authentication

### Backend (AWS Amplify Gen2)
- **Database**: GraphQL API with Survey and SurveyResponse models
- **Authentication**: Public API key for survey submissions, authenticated access for admin functions
- **Data Schema**: Located in `amplify/data/resource.ts`

### Core Application Features

#### AI Readiness Survey System
- **6-question assessment** across key AI dimensions (Strategic, Leadership, Data, Technology, Culture, Process)
- **Dynamic question flow** with progress tracking and localStorage persistence
- **Cohort analysis** that categorizes respondents into 4 groups: AI Skeptic, AI Curious, AI Ready, AI User
- **Shortcode system** for tracking survey campaigns and linking responses to specific Survey records
- **Results page** with personalized recommendations and conversation starters

#### Key Architecture Patterns

**Survey State Management**:
- `useSurvey` hook manages survey state with localStorage persistence
- `useSurveyStorage` provides localStorage operations with proper SSR handling
- `useSurveyContext` handles survey initialization from shortcodes
- `SurveyProvider` wraps survey components and manages survey context

**Data Flow**:
1. Survey creation via admin panel generates unique shortcodes
2. Users access survey via shortcode URLs (`/survey?code=ABC123`)
3. Responses saved to localStorage during progression
4. Final submission saves to Amplify database and shows results
5. Results page performs cohort analysis and clears localStorage

**Survey Components Architecture**:
- `SurveyLayout` - Common layout with progress and navigation
- `QuestionCard` - Individual question display with options
- `SurveyNavigation` - Previous/Next buttons with validation
- `ProgressIndicator` - Visual progress tracking

### Data Models

**Survey Model** (`amplify/data/resource.ts`):
- `title`, `type`, `shortCode`, `status`, `createdBy`, `createdFor`, `companyName`
- Has-one relationship with SurveyResponse

**SurveyResponse Model**:
- `surveyId`, `responses` (JSON), `submittedAt`, `ipAddress`
- Belongs-to Survey via `surveyId`

**TypeScript Types** (`types/survey.ts`):
- `SurveyQuestion`, `SurveyAnswers`, `SurveyState`, `CohortResult`
- Complete type definitions for survey flow and cohort analysis

### Route Structure

- `/` - Marketing homepage
- `/survey` - Survey landing page (accepts `?code=` parameter)
- `/survey/question/[id]` - Individual question pages (1-6)
- `/survey/results` - Results display with cohort analysis
- `/admin` - Admin portal for survey management
- `/case-studies` - Case study content pages

### Key Libraries and Utilities

**Survey Logic**:
- `lib/survey-data.ts` - Question management and validation
- `lib/cohort-analysis.ts` - Algorithm for determining user cohort
- `lib/cohort-definitions.ts` - Cohort descriptions and recommendations
- `lib/amplify-client.ts` - Database operations with lazy client initialization

**Authentication**:
- NextAuth v5 configured in `auth.ts` with multiple providers
- Admin routes protected via middleware (`middleware.ts`)
- Session management through `useSession` hook

### Important Implementation Notes

**localStorage Management**:
- Survey answers persist across page refreshes using `aiReadinessAnswers` key
- Progress tracking prevents data loss during navigation
- Results page clears localStorage after successful analysis

**Race Condition Prevention**:
- Amplify client uses lazy initialization pattern to avoid configuration races
- Survey hooks use `useCallback` for stable function references
- Results page uses timeout delay to ensure localStorage synchronization

**Shortcode System**:
- Admin can generate surveys with unique shortcodes
- URLs with `?code=` parameter initialize survey context
- Shortcodes link survey responses to specific Survey records for tracking

### Development Notes

**Common localStorage Keys**:
- `aiReadinessAnswers` - Survey responses
- `aiReadinessProgress` - Current question index  
- `aiReadinessShortcode` - Survey shortcode
- `aiReadinessSurveyId` - Survey database ID

**Survey Question Flow**:
- Questions are 1-indexed (URLs use `/survey/question/1` through `/survey/question/6`)
- Internal state uses 0-indexed arrays
- Final question triggers submission to database and navigation to results

**Debugging Survey Issues**:
- Check browser localStorage for survey state persistence
- Verify Amplify client initialization in Network tab
- Monitor console logs for survey state transitions and localStorage operations

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.