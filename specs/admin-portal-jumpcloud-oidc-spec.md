# Admin Portal with Jumpcloud OIDC Integration Specification

## Overview

This specification outlines the implementation of a protected admin portal for the Next.js AI Survey application, integrating Jumpcloud OIDC authentication using Auth.js (NextAuth.js). The admin portal will allow authenticated users to create surveys with accompanying short codes.

## Architecture Overview

### Current State
- Next.js 15 application with AWS Amplify Gen2 backend
- Email-based authentication via AWS Amplify Auth
- GraphQL API with Todo model using public API key authorization
- TailwindCSS for styling, TypeScript for type safety

### Target State
- Dual authentication system:
  - Existing AWS Amplify Auth for public users
  - Auth.js with Jumpcloud OIDC for admin users
- Protected `/admin` route accessible only to authenticated admin users
- Survey management system with short code generation
- Extended database schema to support surveys and short codes

## Authentication Flow

### 1. Jumpcloud OIDC Configuration
```typescript
// Configuration in next-auth options
{
  providers: [
    {
      id: "jumpcloud",
      name: "Jumpcloud",
      type: "oauth",
      issuer: process.env.JUMPCLOUD_ISSUER_URL,
      clientId: process.env.JUMPCLOUD_CLIENT_ID,
      clientSecret: process.env.JUMPCLOUD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email"
        }
      }
    }
  ]
}
```

### 2. Authentication States
- **Unauthenticated**: Redirect to login screen at `/admin/login`
- **Authenticated**: Access granted to admin dashboard at `/admin`
- **Session Management**: JWT tokens with refresh capability

### 3. Route Protection
- Middleware-based protection for `/admin/*` routes
- Server-side session validation
- Client-side authentication checks for UI components

## Admin Portal Features

### 1. Login Screen (`/admin/login`)
**Components:**
- `LoginForm` component with Jumpcloud OIDC integration
- Branding consistent with existing design system
- Error handling for authentication failures
- Loading states during authentication process

**User Experience:**
- Clean, professional login interface
- "Sign in with Jumpcloud" button
- Automatic redirect to intended admin page after successful authentication
- Error messages for failed authentication attempts

### 2. Admin Dashboard (`/admin`)
**Layout Components:**
- `AdminLayout` wrapper with navigation and logout functionality
- `AdminHeader` with user profile display and logout option
- `AdminSidebar` for future feature expansion

**Main Features:**
- Survey creation form
- List of existing surveys with management options
- Dashboard statistics (surveys created, total responses, etc.)

### 3. Survey Creation Form
**Form Fields:**
- **Survey Title**: Text input (required)
- **Survey Description**: Textarea (optional)
- **Short Code**: Auto-generated 6-character alphanumeric code
- **Status**: Active/Inactive toggle
- **Created Date**: Auto-populated
- **Created By**: Auto-populated from session user

**Validation Rules:**
- Title: 3-100 characters, required
- Description: Max 500 characters, optional
- Short Code: Unique, auto-generated, format: [A-Z0-9]{6}
- Duplicate short code handling with retry mechanism

**Form Behavior:**
- Real-time validation feedback
- Short code generation on form load
- Option to regenerate short code
- Success/error notifications
- Form reset after successful submission

## Database Schema Extensions

### New Tables

#### Surveys Table
```typescript
type Survey = {
  id: string;
  title: string;
  description?: string;
  shortCode: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  createdBy: string; // Admin user ID from session
}
```

#### Survey Responses Table (Future Extension)
```typescript
type SurveyResponse = {
  id: string;
  surveyId: string;
  responses: any; // JSON field for flexible response data
  submittedAt: string;
  ipAddress?: string;
}
```

### Amplify Data Schema Updates
Update `amplify/data/resource.ts` to include:
- Survey model with public read access
- Admin-only write access through custom authorization
- Relationship between surveys and potential responses

## Technical Implementation

### 1. Dependencies to Install
```json
{
  "next-auth": "^4.24.5",
  "@auth/core": "^0.18.6",
  "jose": "^5.2.0"
}
```

### 2. Environment Variables
```env
# Jumpcloud OIDC Configuration
JUMPCLOUD_ISSUER_URL=https://oauth.jumpcloud.com
JUMPCLOUD_CLIENT_ID=your_client_id
JUMPCLOUD_CLIENT_SECRET=your_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. File Structure
```
app/
├── admin/
│   ├── layout.tsx              # Protected admin layout
│   ├── page.tsx                # Admin dashboard
│   ├── login/
│   │   └── page.tsx           # Login screen
│   └── components/
│       ├── AdminLayout.tsx     # Main admin wrapper
│       ├── AdminHeader.tsx     # Header with user info
│       ├── SurveyForm.tsx      # Survey creation form
│       └── SurveyList.tsx      # List of existing surveys
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts        # NextAuth configuration
└── middleware.ts               # Route protection middleware

lib/
├── auth.ts                     # Auth configuration
├── auth-options.ts             # NextAuth options
└── short-code.ts              # Short code generation utility
```

### 4. Middleware Implementation
```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Additional middleware logic if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user has admin access
        return token?.role === "admin" || token?.email?.endsWith("@yourcompany.com")
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
```

## Security Considerations

### 1. Authentication Security
- Secure JWT token handling
- Proper session management with secure cookies
- CSRF protection enabled by default in NextAuth
- Secure redirect handling to prevent open redirect attacks

### 2. Authorization Levels
- Role-based access control (future enhancement)
- Email domain-based access control
- Session timeout and refresh token handling

### 3. Data Protection
- Input sanitization for all form fields
- SQL injection prevention through parameterized queries
- XSS protection through proper data encoding

## User Experience Flow

### 1. Admin Access Attempt
1. User navigates to `/admin`
2. Middleware checks authentication status
3. If not authenticated, redirect to `/admin/login`
4. If authenticated, display admin dashboard

### 2. Login Process
1. User clicks "Sign in with Jumpcloud"
2. Redirect to Jumpcloud OIDC authorization endpoint
3. User completes authentication at Jumpcloud
4. Callback to NextAuth with authorization code
5. Token exchange and session creation
6. Redirect to admin dashboard

### 3. Survey Creation Flow
1. Authenticated admin accesses dashboard
2. Clicks "Create Survey" button
3. Form appears with auto-generated short code
4. Admin fills in survey details
5. Form validation provides real-time feedback
6. Successful submission creates survey and shows confirmation
7. Survey appears in the surveys list

## Testing Strategy

### 1. Authentication Testing
- Test successful Jumpcloud OIDC flow
- Test authentication failure scenarios
- Test session timeout and refresh
- Test unauthorized access attempts

### 2. Form Testing
- Test survey creation with valid data
- Test form validation with invalid data
- Test short code uniqueness and regeneration
- Test error handling and user feedback

### 3. Integration Testing
- Test end-to-end admin workflow
- Test database operations
- Test middleware protection
- Test logout functionality

## Performance Considerations

### 1. Authentication Performance
- Implement session caching
- Optimize JWT verification
- Use proper HTTP caching headers

### 2. Form Performance
- Debounce form validation
- Optimize short code generation
- Implement client-side caching for survey lists

## Future Enhancements

### 1. Survey Management
- Survey editing and deletion
- Survey duplication
- Bulk operations on surveys

### 2. Advanced Features
- Survey analytics and reporting
- Response management
- Export capabilities
- Survey templates

### 3. User Management
- Role-based permissions
- User invitation system
- Audit logging

## Success Criteria

1. **Authentication**: Users can successfully authenticate using Jumpcloud OIDC
2. **Protection**: `/admin` routes are properly protected from unauthorized access
3. **Survey Creation**: Admins can create surveys with unique short codes
4. **User Experience**: Clean, intuitive interface consistent with existing design
5. **Security**: All security best practices implemented and tested
6. **Performance**: Fast loading times and responsive interactions

## Timeline Estimate

- **Phase 1**: Auth.js setup and Jumpcloud OIDC integration (2-3 days)
- **Phase 2**: Protected route implementation and middleware (1-2 days)
- **Phase 3**: Admin UI components and login screen (2-3 days)
- **Phase 4**: Survey creation form and database schema (2-3 days)
- **Phase 5**: Testing and refinement (1-2 days)

**Total Estimated Time**: 8-13 days