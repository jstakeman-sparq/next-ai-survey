# AWS Amplify Gen2 Deployment Guide

## Environment Variables Setup

For AWS Amplify Gen2 deployments, environment variables must be set as **secrets** in the Amplify console, not as regular environment variables.

### Required Secrets

Set these as **secrets** (not environment variables) in your Amplify app:

1. **AUTH_SECRET**
   - Generate with: `openssl rand -base64 32`
   - Example: `tWKyClyF8lLuTXqSbGmRtvLPQk+abc123def`

2. **AUTH_JUMPCLOUD_ISSUER** 
   - Value: `https://oauth.id.jumpcloud.com/`

3. **AUTH_JUMPCLOUD_ID**
   - Your JumpCloud OIDC application client ID

4. **AUTH_JUMPCLOUD_SECRET**
   - Your JumpCloud OIDC application client secret

### How to Set Secrets in Amplify Console

**Important**: Environment variables in Amplify Gen2 must be set as **secrets**, not plain text variables.

1. Go to your Amplify app in AWS Console
2. Navigate to **Environment variables** in the left sidebar  
3. Click **Manage variables**
4. For each variable, click **Add variable**:
   - Enter the variable name (e.g., `AUTH_SECRET`)
   - Set **Type** to **Secret** (not Plain text) 
   - Enter the value
   - Click **Save**

**Alternative Method via AWS CLI:**
```bash
aws amplify put-app-settings \
  --app-id YOUR_APP_ID \
  --environment-variables AUTH_SECRET=your-secret-value
```

**Verification**: After setting secrets, check the deployment logs for:
```
Environment check:
AUTH_SECRET present: true
```

### Environment Variables (Optional)

These can be set as regular environment variables:

- `NEXTAUTH_URL` - Your production domain (e.g., `https://yourapp.amplifyapp.com`)
- `NODE_ENV` - Set to `production`

## JumpCloud Configuration

Make sure your JumpCloud OIDC application is configured with:

1. **Redirect URI**: `https://yourapp.amplifyapp.com/api/auth/callback/jumpcloud`
2. **Grant Types**: `authorization_code`
3. **Response Types**: `code` 
4. **Scopes**: `openid profile email`

## Deployment Commands

The `amplify.yml` file handles deployment automatically. The build process:

1. **Backend Phase**: Deploys Amplify backend resources
2. **Frontend Phase**: Builds and deploys the Next.js app

## Troubleshooting

### Build Fails with "MissingSecret" Error
- **Error**: `[auth][error] MissingSecret: Please define a 'secret'`
- **Solution**: Set `AUTH_SECRET` as a **secret** in Amplify console
- **Note**: Must use "Secret" type, not "Plain text"

### Environment Variables Not Loading
- **Issue**: Logs show `AUTH_SECRET present: false`
- **Solution**: Double-check that variables are set as **secrets**
- **Verify**: Variables show as masked (•••••) in Amplify console

### 500 Error on Login After Deployment  
- **Solution**: Verify all 4 secrets are set correctly in Amplify console
- Check JumpCloud redirect URI matches your Amplify domain

### Amplify Domain Issues
- **Solution**: Update `NEXTAUTH_URL` to match your Amplify app domain
- Update JumpCloud redirect URI to use Amplify domain

### Testing Deployment
1. Visit your Amplify app URL
2. Navigate to `/admin/login` 
3. Click "Sign in with JumpCloud"
4. Should redirect to JumpCloud login
5. After login, should redirect back to `/admin`

## Reference Links
- [Amplify Gen2 Secrets Documentation](https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/secrets-and-vars/)
- [NextAuth.js with Amplify](https://next-auth.js.org/deployment#amplify)