# AI Readiness Survey Implementation Plan

## Overview

This plan outlines the implementation of a 6-question AI readiness survey using the existing Next.js 15 application with AWS Amplify Gen2 backend. The survey will assess organizations across six key dimensions to determine their AI readiness cohort.

## Project Structure Analysis

### Current State
- **Framework**: Next.js 15 with App Router and React 19
- **Backend**: AWS Amplify Gen2 with existing Survey and SurveyResponse models
- **Styling**: TailwindCSS with custom brand colors
- **Database**: GraphQL API with public API key authorization
- **Data Schema**: Already includes Survey and SurveyResponse models

### Reference Materials
- `reference/AISurveyFlow.astro` - Complete survey flow implementation
- `reference/surveyQuestions.json` - Question data structure
- `reference/AIResultsDisplay.astro` - Results page implementation

## Implementation Plan

### Phase 1: Survey Data Structure and Types

#### 1.1 Create TypeScript Interfaces
**File**: `types/survey.ts`
```typescript
export interface SurveyQuestion {
  id: number;
  dimension: string;
  question: string;
  options: SurveyOption[];
}

export interface SurveyOption {
  value: 'A' | 'B' | 'C' | 'D';
  text: string;
  description: string;
}

export interface SurveyAnswers {
  [questionId: number]: 'A' | 'B' | 'C' | 'D';
}

export interface SurveyState {
  currentQuestionIndex: number;
  answers: SurveyAnswers;
  isComplete: boolean;
  surveyId?: string;
  shortCode?: string;
}

export interface CohortResult {
  name: 'AI Skeptic' | 'AI Curious' | 'AI Ready' | 'AI User';
  distribution: { [key in 'A' | 'B' | 'C' | 'D']: number };
  predominantAnswer: string;
}

export interface SurveyContext {
  surveyId: string;
  shortCode: string;
  surveyData?: any; // Survey record from Amplify
}
```

#### 1.2 Question Data Management
**File**: `lib/survey-data.ts`
- Import questions from `reference/surveyQuestions.json`
- Export validated question data
- Provide utility functions for question navigation

### Phase 2: Survey Flow Components

#### 2.1 Survey Layout Component
**File**: `app/components/survey/SurveyLayout.tsx`
- Header with progress indicator and back navigation
- Progress bar showing completion percentage
- Question counter (e.g., "Question 1 of 6")

#### 2.2 Question Component
**File**: `app/components/survey/QuestionCard.tsx`
- Display question dimension and text
- Render multiple choice options with radio buttons
- Handle option selection and validation
- Visual feedback for selected options

#### 2.3 Navigation Component
**File**: `app/components/survey/SurveyNavigation.tsx`
- Previous/Next button logic
- Disabled state management
- "View Results" button for final question
- Keyboard navigation support (arrow keys)

#### 2.4 Progress Component
**File**: `app/components/survey/ProgressIndicator.tsx`
- Visual progress bar
- Current question indicator
- Completion percentage display

### Phase 3: Survey Pages Implementation

#### 3.1 Survey Entry Page
**File**: `app/survey/page.tsx`
- Survey introduction and instructions
- Start survey button
- Route to first question
- Handle returning users with localStorage check

#### 3.2 Survey Question Pages
**File**: `app/survey/question/[id]/page.tsx`
- Dynamic routing for each question (1-6)
- Question rendering with SurveyLayout
- Answer persistence to localStorage
- Navigation handling with browser history support
- Error handling for invalid question IDs

#### 3.3 Survey Results Page
**File**: `app/survey/results/page.tsx`
- Client information form for report generation
- Cohort result display with visual indicators
- Response summary grid
- Next steps and conversation starters
- Action buttons (PDF generation, email report)

### Phase 4: State Management and Persistence

#### 4.1 Local Storage Management
**File**: `hooks/useSurveyStorage.ts`
```typescript
export const useSurveyStorage = () => {
  const saveAnswers = (answers: SurveyAnswers) => { ... }
  const loadAnswers = (): SurveyAnswers | null => { ... }
  const clearAnswers = () => { ... }
  const saveProgress = (questionIndex: number) => { ... }
  const loadProgress = (): number => { ... }
}
```

#### 4.2 Survey State Hook
**File**: `hooks/useSurvey.ts`
```typescript
export const useSurvey = () => {
  const [surveyState, setSurveyState] = useState<SurveyState>({ ... })
  const updateAnswer = (questionId: number, answer: string) => { ... }
  const navigateToQuestion = (index: number) => { ... }
  const canNavigateNext = () => boolean
  const canNavigatePrevious = () => boolean
}
```

### Phase 5: Results Analysis and Cohort Determination

#### 5.1 Cohort Analysis Logic
**File**: `lib/cohort-analysis.ts`
```typescript
export const determineCohort = (answers: SurveyAnswers): CohortResult => {
  // Count answer distribution (A, B, C, D)
  // Determine predominant answer type
  // Map to cohort categories:
  // A = AI Skeptic, B = AI Curious, C = AI Ready, D = AI User
  // Return cohort result with distribution data
}
```

#### 5.2 Cohort Definitions
**File**: `lib/cohort-definitions.ts`
- Define cohort characteristics, colors, icons
- Next steps recommendations for each cohort
- Conversation starters for sales teams

### Phase 6: AWS Amplify Integration and Shortcode Handling

#### 6.1 Survey Lookup by Shortcode
**File**: `lib/amplify-client.ts`
```typescript
export const getSurveyByShortCode = async (shortCode: string) => {
  // Query Survey table by shortCode
  // Return Survey record with ID and metadata
  // Handle case where shortCode doesn't exist
  const client = generateClient<Schema>();
  const result = await client.models.Survey.list({
    filter: { shortCode: { eq: shortCode } }
  });
  return result.data[0] || null;
}

export const createSurvey = async (surveyData: {
  title: string;
  shortCode: string;
  createdBy: string;
  createdFor: string;
  companyName: string;
}) => {
  // Create Survey record using Amplify client
  // Return survey ID for response submission
}
```

#### 6.2 Response Submission with Survey Linking
```typescript
export const submitSurveyResponse = async (
  surveyId: string,
  responses: SurveyAnswers,
  ipAddress?: string
) => {
  // Create SurveyResponse record linked to Survey via surveyId
  // Include timestamp, IP address if available
  // Update Survey status to 'completed' if needed
  // Handle success/error states
  const client = generateClient<Schema>();
  
  const response = await client.models.SurveyResponse.create({
    surveyId,
    responses: JSON.stringify(responses),
    submittedAt: new Date().toISOString(),
    ipAddress: ipAddress || null
  });
  
  return response;
}
```

#### 6.3 Shortcode URL Parameter Handling
**File**: `hooks/useSurveyContext.ts`
```typescript
export const useSurveyContext = () => {
  const [surveyContext, setSurveyContext] = useState<SurveyContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const initializeSurveyFromShortCode = async (shortCode: string) => {
    try {
      setLoading(true);
      const surveyData = await getSurveyByShortCode(shortCode);
      
      if (!surveyData) {
        setError(`Survey with shortcode "${shortCode}" not found`);
        return false;
      }
      
      setSurveyContext({
        surveyId: surveyData.id,
        shortCode: shortCode,
        surveyData: surveyData
      });
      
      return true;
    } catch (err) {
      setError('Failed to load survey data');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    surveyContext,
    loading,
    error,
    initializeSurveyFromShortCode
  };
}
```

### Phase 7: Routing and Navigation with Shortcode Support

#### 7.1 Route Structure with Shortcode Parameter
```
/survey?code=ABC123                    - Survey landing/intro page with shortcode
/survey/question/1?code=ABC123         - Question 1 with shortcode context
/survey/question/2?code=ABC123         - Question 2 with shortcode context
...
/survey/question/6?code=ABC123         - Question 6 with shortcode context  
/survey/results?code=ABC123            - Results and cohort analysis with shortcode
```

**Alternative Route Structure (if preferred):**
```
/survey/[shortcode]                    - Survey landing for specific shortcode
/survey/[shortcode]/question/1         - Question 1 for specific survey
/survey/[shortcode]/question/2         - Question 2 for specific survey
...
/survey/[shortcode]/question/6         - Question 6 for specific survey
/survey/[shortcode]/results            - Results for specific survey
```

#### 7.2 URL State Management with Shortcode Preservation
- Shortcode persistence across all survey pages
- Question navigation via URL parameters while maintaining shortcode context
- Browser back/forward button support with shortcode preservation
- Handle direct URL access to questions with shortcode validation
- Redirect to error page if invalid shortcode is provided

#### 7.3 Shortcode Flow Implementation
**Survey Entry Process:**
1. User visits `/survey?code=ABC123` or `/survey/ABC123`
2. Extract shortcode from URL parameters or path
3. Validate shortcode exists in database via `getSurveyByShortCode()`
4. If valid: Initialize survey context and proceed to first question
5. If invalid: Show error message or redirect to generic survey creation

**Question Navigation Process:**
1. Maintain shortcode in URL throughout navigation
2. Store shortcode in localStorage as backup
3. Validate survey context on each page load
4. Link all survey responses to the correct Survey record via surveyId

### Phase 7.5: Detailed Shortcode Implementation Process

#### 7.5.1 URL Parameter Extraction
**Implementation in each page component:**
```typescript
// Extract shortcode from URL query parameters
const searchParams = useSearchParams();
const shortCode = searchParams.get('code');

// Alternative: Extract from dynamic route
const { shortcode } = useParams();
```

#### 7.5.2 Survey Context Provider Pattern
**File**: `app/components/survey/SurveyProvider.tsx`
```typescript
export const SurveyProvider = ({ children, shortCode }: { children: React.ReactNode, shortCode: string }) => {
  const { surveyContext, loading, error, initializeSurveyFromShortCode } = useSurveyContext();
  
  useEffect(() => {
    if (shortCode) {
      initializeSurveyFromShortCode(shortCode);
    }
  }, [shortCode]);
  
  if (loading) return <SurveyLoadingState />;
  if (error) return <SurveyErrorState error={error} />;
  if (!surveyContext) return <InvalidShortcodeError shortCode={shortCode} />;
  
  return (
    <SurveyContextProvider value={surveyContext}>
      {children}
    </SurveyContextProvider>
  );
};
```

#### 7.5.3 Response Submission Process
**Updated submission flow:**
```typescript
const handleSurveySubmission = async (answers: SurveyAnswers) => {
  try {
    // Get survey context (includes surveyId from shortcode lookup)
    const { surveyId } = useSurveyContext();
    
    // Submit response linked to the specific survey
    const response = await submitSurveyResponse(surveyId, answers);
    
    // Update original Survey status to 'completed'
    await updateSurveyStatus(surveyId, 'completed');
    
    // Navigate to results with shortcode preserved
    router.push(`/survey/results?code=${shortCode}`);
    
  } catch (error) {
    // Handle submission errors
    setSubmissionError(error.message);
  }
};
```

#### 7.5.4 Error Handling for Invalid Shortcodes
**File**: `app/survey/error/page.tsx`
- Display user-friendly error message for invalid shortcodes
- Provide options to:
  - Contact admin to verify shortcode
  - Return to main site
  - Create a new survey (if applicable)

#### 7.5.5 Shortcode Persistence Strategy
1. **Primary**: URL query parameters maintained across navigation
2. **Secondary**: localStorage backup in case of URL manipulation
3. **Validation**: Re-validate shortcode on each page load
4. **Cleanup**: Clear localStorage after successful submission

### Phase 8: User Experience Enhancements

#### 8.1 Responsive Design
- Mobile-first approach with TailwindCSS
- Touch-friendly option selection
- Optimized layout for different screen sizes

#### 8.2 Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

#### 8.3 Loading and Error States
- Loading indicators during data submission
- Error handling for API failures
- Retry mechanisms for failed submissions
- User feedback for all states

### Phase 9: Integration with Existing Features

#### 9.1 Admin Portal Integration
- Link survey creation from admin panel
- Display survey responses in admin interface
- Export functionality for survey data

#### 9.2 Authentication Context
- Leverage existing useSession hook
- Handle both authenticated and anonymous users
- Optional user tracking for analytics

## Technical Implementation Details

### Data Flow with Shortcode Integration
1. **Survey Access**: User visits survey URL with shortcode parameter (`?code=ABC123`)
2. **Survey Validation**: System validates shortcode against existing Survey records in Amplify
3. **Context Initialization**: If valid, initialize survey context with surveyId and metadata
4. **Question Navigation**: User answers questions → Save to localStorage with shortcode context
5. **Response Submission**: Complete survey → Submit SurveyResponse to Amplify linked to correct Survey record
6. **Results Display**: View results → Calculate cohort and display recommendations
7. **Survey Status Update**: Mark original Survey record as 'completed'

### Shortcode Validation Process
1. **Extract Shortcode**: From URL query parameter or path segment
2. **Database Lookup**: Query Survey table for matching shortCode
3. **Validation Results**:
   - **Valid**: Return Survey record with ID and metadata
   - **Invalid**: Return null and show appropriate error message
4. **Error Handling**: Redirect to error page or survey creation if shortcode not found

### Error Handling Strategy
- API connection failures: Retry with exponential backoff
- Data validation errors: Show inline validation messages
- Session timeouts: Restore from localStorage
- Network issues: Queue submissions for retry

### Performance Considerations
- Lazy load question components
- Optimize bundle size with dynamic imports
- Cache survey data and cohort definitions
- Minimize API calls during navigation

### Security Considerations
- Sanitize user inputs before storage
- Use public API key for anonymous access
- Implement rate limiting on survey submissions
- Validate question IDs and answer formats

## Deployment and Testing Strategy

### Testing Phases
1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Survey flow testing
3. **E2E Tests**: Complete user journey testing
4. **Cross-browser Testing**: Ensure compatibility
5. **Mobile Testing**: Responsive design validation

### Deployment Steps
1. Deploy Amplify backend changes
2. Test survey creation and response submission
3. Validate cohort analysis accuracy
4. Perform load testing
5. Deploy frontend application

## Success Metrics

### Technical Metrics
- Page load times < 2 seconds
- Survey completion rate > 80%
- Error rate < 1%
- Mobile responsiveness score > 95

### User Experience Metrics
- Time to complete survey (target: 5-8 minutes)
- User drop-off by question
- Cohort distribution accuracy
- Results page engagement

## Implementation Timeline

### Week 1: Foundation
- Set up TypeScript interfaces and data structures
- Implement basic survey components
- Create survey routing structure

### Week 2: Core Features
- Implement question navigation
- Add localStorage persistence
- Create cohort analysis logic

### Week 3: Integration
- Integrate AWS Amplify data submission
- Implement results page
- Add error handling and loading states

### Week 4: Polish and Testing
- Responsive design refinements
- Accessibility improvements
- Comprehensive testing
- Documentation and deployment

## Files to be Created/Modified

### New Files
- `types/survey.ts`
- `lib/survey-data.ts`
- `lib/cohort-analysis.ts`
- `lib/cohort-definitions.ts`
- `lib/amplify-client.ts`
- `hooks/useSurvey.ts`
- `hooks/useSurveyStorage.ts`
- `hooks/useSurveyContext.ts` *(new for shortcode handling)*
- `app/survey/page.tsx`
- `app/survey/question/[id]/page.tsx`
- `app/survey/results/page.tsx`
- `app/survey/error/page.tsx` *(new for invalid shortcode errors)*
- `app/components/survey/SurveyLayout.tsx`
- `app/components/survey/QuestionCard.tsx`
- `app/components/survey/SurveyNavigation.tsx`
- `app/components/survey/ProgressIndicator.tsx`
- `app/components/survey/ShortcodeValidator.tsx` *(new for shortcode validation)*

### Modified Files
- Update navigation in existing layout components
- Add survey links to main navigation
- Extend middleware if needed for survey routes

## Dependencies
All required dependencies are already available in the project:
- Next.js 15 with App Router
- AWS Amplify Gen2 client libraries
- TailwindCSS for styling
- TypeScript for type safety
- React 19 for component development

This comprehensive plan ensures a robust, user-friendly, and scalable implementation of the AI readiness survey that integrates seamlessly with the existing Next.js application architecture.