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

This is a Next.js 15 application integrated with AWS Amplify Gen2 for backend services. The project uses:

### Frontend Stack
- **Next.js 15** with App Router and React 19
- **TailwindCSS** for styling
- **TypeScript** for type safety
- **Turbopack** for fast builds and development

### Backend (AWS Amplify)
- **Authentication**: Email-based auth configured in `amplify/auth/resource.ts`
- **Database**: GraphQL API with a Todo model using public API key authorization
- **Backend Definition**: Main backend config in `amplify/backend.ts`

### Project Structure
- `app/` - Next.js App Router pages and components
- `amplify/` - AWS Amplify backend configuration
  - `auth/resource.ts` - Authentication setup
  - `data/resource.ts` - Data schema and API configuration
  - `backend.ts` - Main backend definition
- `amplify_outputs.json` - Generated Amplify configuration (auto-generated)

### Key Implementation Details
- Amplify is configured in `app/page.tsx` using `amplify_outputs.json`
- Data client is generated with `apiKey` auth mode for public access
- The current schema includes a basic Todo model with public CRUD operations
- The app uses TypeScript throughout with proper type definitions from Amplify

### Data Layer
The GraphQL schema defines a Todo model with public API key authorization, allowing unauthenticated CRUD operations. To extend the schema, modify `amplify/data/resource.ts` and the types will be automatically generated.