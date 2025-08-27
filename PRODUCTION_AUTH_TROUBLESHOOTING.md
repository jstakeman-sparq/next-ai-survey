# Production Authentication Troubleshooting

## 500 Error on Login - Checklist

### 1. Environment Variables
Verify all required environment variables are set in production:

```bash
# Required NextAuth variables
AUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://yourdomain.com

# Required JumpCloud OIDC variables
AUTH_JUMPCLOUD_ISSUER=https://oauth.id.jumpcloud.com/
AUTH_JUMPCLOUD_ID=your-jumpcloud-client-id
AUTH_JUMPCLOUD_SECRET=your-jumpcloud-client-secret
```

### 2. JumpCloud Configuration
Verify JumpCloud app settings:

- **Redirect URI**: Must include `https://yourdomain.com/api/auth/callback/jumpcloud`
- **Grant Types**: Must include `authorization_code`
- **Response Types**: Must include `code`
- **Scopes**: Must include `openid profile email`

### 3. Common Issues & Solutions

#### Missing AUTH_SECRET
**Error**: 500 error on any auth route
**Solution**: Generate a secure secret:
```bash
openssl rand -base64 32
```

#### Incorrect NEXTAUTH_URL
**Error**: Redirect mismatch errors
**Solution**: Ensure NEXTAUTH_URL matches your production domain exactly

#### JumpCloud Client Misconfiguration
**Error**: `invalid_client` or `unauthorized_client`
**Solution**: Verify client ID/secret and redirect URI in JumpCloud admin

#### Trust Host Issues
**Error**: Host validation errors in production
**Solution**: Added `trustHost: true` to NextAuth config (already implemented)

### 4. Debug Steps

1. **Check server logs** for specific error messages
2. **Verify environment variables** are loaded correctly
3. **Test JumpCloud configuration** using a tool like Postman
4. **Enable debug mode** by setting `NODE_ENV=development` temporarily

### 5. Production Deployment Notes

- Environment variables must be set in your hosting platform (Vercel, Netlify, etc.)
- JumpCloud app must be configured with production domain
- HTTPS is required for OIDC in production
- Consider using a service like Vercel's environment variable encryption

### 6. Testing Authentication

Test the OIDC flow manually:
```
1. GET https://yourdomain.com/api/auth/signin/jumpcloud
2. Should redirect to JumpCloud login
3. After login, should redirect back to /api/auth/callback/jumpcloud
4. Should then redirect to /admin
```

If any step fails, check the corresponding configuration above.