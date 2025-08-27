# Amplify Build Memory Issues - SIGKILL Fix

## Problem
Next.js build worker exits with `code: null and signal: SIGKILL` indicating memory exhaustion during build.

## Root Causes
1. **Memory Limit**: Amplify build environments have memory constraints
2. **Turbopack**: May consume more memory in production builds
3. **Large Bundle**: Complex applications can exceed memory limits
4. **Node.js Heap**: Default heap size may be insufficient

## Applied Fixes

### 1. Updated `amplify.yml`
- **Increased Node.js memory limit**: `NODE_OPTIONS="--max_old_space_size=4096"`
- **Added preBuild phase** to clean previous builds
- **Clean .next directory** before build to prevent conflicts

### 2. Updated `next.config.ts`
- **Standalone output**: Optimized for deployment
- **SWC Minifier**: Better performance and lower memory usage
- **Image optimization**: Reduced bundle size
- **Webpack optimizations**: Removed unnecessary dependencies

### 3. Updated `package.json`
- **Removed Turbopack from production build**: Use stable webpack for production
- **Added separate turbo command**: Available for development if needed

## Verification Steps

### Check Build Logs
Look for these indicators of success:
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Collecting page data
✓ Finalizing page optimization
```

### Memory Usage Monitoring
Build should show memory usage staying under limits:
```
Memory usage: ~2-3GB (within 4GB limit)
Build time: 3-5 minutes (reasonable)
```

## Alternative Solutions (if issues persist)

### Option 1: Enable Amplify Build Performance Mode
In Amplify Console → App Settings → Build Settings:
- Enable "Performance mode" for larger compute instances

### Option 2: Split Build Process
```yml
# In amplify.yml, split build into phases
frontend:
  phases:
    preBuild:
      commands:
        - export NODE_OPTIONS="--max_old_space_size=6144"
        - npm ci --production=false
    build:
      commands:
        - npm run build
```

### Option 3: Use Different Build Command
```json
// In package.json
"build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
```

## Monitoring
- Watch build logs for memory warnings
- Monitor build duration (should be 3-5 minutes)
- Check for successful artifact generation

## Reference
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Amplify Build Settings](https://docs.amplify.aws/cli/usage/build-settings/)
- [Node.js Memory Management](https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes)