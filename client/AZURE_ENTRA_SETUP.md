# Azure Entra ID External Tenant - Google Login Setup

This document provides complete setup instructions for implementing Google login using Azure Entra ID External tenant with the `signUpOrSignInWithGoogle` user flow.

## 📋 Overview

- **Tenant**: Classflow.onmicrosoft.com (External tenant)
- **User Flow**: signUpOrSignInWithGoogle
- **App Registration**: Classflow React App
- **Client ID**: `51dea61c-db2d-492a-bcd6-17130e349dd1`
- **Identity Provider**: Google (already configured in user flow)

## ✅ Completed Steps

### 1. App Registration Created ✓
- **App Name**: Classflow React App
- **Client ID**: `51dea61c-db2d-492a-bcd6-17130e349dd1`
- **Sign-in audience**: AzureADMyOrg (External tenant users)
- **Platform**: Single-Page Application (SPA)
- **Redirect URIs (SPA platform)**: 
  - `http://localhost:5173`
  - `http://localhost:5173/auth/callback`
- **ID Token**: Enabled
- **Service Principal**: Created in Classflow tenant

### 2. Code Implementation ✓
- MSAL configuration updated for External tenant
- Auth store updated with MSAL integration
- Login component configured for Google login
- Environment variables configured

## 🌐 Google Cloud Console Configuration

### Required Redirect URI
In your Google Cloud Console OAuth 2.0 Client, add this redirect URI:

```
https://classflow.ciamlogin.com/9444a5ee-3305-4a66-86d3-792619de731e/federation/oauth2
```

**Note**: External tenants use `ciamlogin.com` domain, not `login.microsoftonline.com`.

## 🔧 Required Manual Step

### Link Application to User Flow

Since the Azure Graph API is returning errors when attempting to link the app programmatically, you need to complete this step manually via the Azure Portal:

#### Steps:
1. Go to [Microsoft Entra admin center](https://entra.microsoft.com)
2. Navigate to **Entra ID** → **External Identities** → **User flows**
3. Select the user flow: **signUpOrSignInWithGoogle**
4. In the left menu, under **Use**, select **Applications**
5. Click **Add application**
6. Search for and select: **Classflow React App**
7. Click **Select**

#### Verification:
After completing the above steps, you should see "Classflow React App" listed under the applications for the `signUpOrSignInWithGoogle` user flow.

## 🚀 Configuration Files

### Environment Variables (.env)
```env
# Azure Entra ID External Tenant Configuration
VITE_AZURE_AD_CLIENT_ID=51dea61c-db2d-492a-bcd6-17130e349dd1
VITE_AZURE_TENANT_NAME=Classflow
VITE_AZURE_AD_REDIRECT_URI=http://localhost:5173
VITE_AZURE_AD_POST_LOGOUT_REDIRECT_URI=http://localhost:5173

# Note: User flow is linked in Azure Portal, not in authority URL
```

### MSAL Configuration
The MSAL configuration uses the External tenant authority (without user flow in URL):
```typescript
authority: `https://Classflow.ciamlogin.com/Classflow.onmicrosoft.com`
knownAuthorities: [`Classflow.ciamlogin.com`]
```

**Important**: The user flow is associated via the Azure Portal app linking, not in the authority URL.

## 🔐 Authentication Flow

1. User clicks "Sign in with Google" button
2. MSAL triggers login popup
3. User is redirected to the user flow page
4. User flow presents authentication options:
   - **Google** (configured identity provider)
   - **Email One-Time Passcode** (OTP)
5. User selects Google and authenticates
6. Google returns user information to Azure Entra ID
7. Azure Entra ID creates/updates user account
8. Token is issued and returned to the React app
9. User is authenticated in the application

## 📦 Dependencies

The following MSAL packages are already installed:
- `@azure/msal-browser`: ^4.26.0
- `@azure/msal-react`: ^3.0.21

## 🧪 Testing

### Local Development
1. Ensure you've completed the manual step to link the app to the user flow
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:5173`
4. Click "Sign in with Google"
5. You should see the user flow page with Google as an option
6. Select Google and complete authentication

### Expected Behavior
- Login popup opens
- User flow page displays with Google option
- After Google authentication, user is redirected back to the app
- User information is available in the app state

## 🔍 Troubleshooting

### Issue: "Application not found in user flow"
**Solution**: Complete the manual linking step above via Azure Portal

### Issue: "AADB2C90075: The scope 'User.Read' specified in the request does not exist"
**Solution**: The scopes have been updated to use External tenant compatible scopes (openid, offline_access, profile, email)

### Issue: "Redirect URI mismatch"
**Solution**: Verify that the redirect URI in `.env` matches one of the registered redirect URIs in the app registration

### Issue: Login popup blocked
**Solution**: Allow popups for localhost in your browser settings

## 📚 Additional Resources

- [Microsoft Entra External ID Documentation](https://learn.microsoft.com/en-us/entra/external-id/)
- [Add Google as an identity provider](https://learn.microsoft.com/en-us/entra/external-id/customers/how-to-google-federation-customers)
- [Add your application to the user flow](https://learn.microsoft.com/en-us/entra/external-id/customers/how-to-user-flow-add-application)
- [MSAL.js Configuration](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md)

## 🎯 Next Steps

After completing the manual linking step:

1. **Test the Integration**: Follow the testing steps above
2. **Add Production Redirect URIs**: When deploying to production, add your production URL to the app registration's redirect URIs
3. **Update Environment Variables**: Create separate `.env.production` file with production values
4. **Monitor Authentication**: Use Azure Portal to monitor sign-in logs and user activity

## 📝 Notes

- The user flow is configured with both Google and Email OTP as identity providers
- Users can choose either authentication method during sign-in
- User accounts are created in the Classflow External tenant upon first sign-in
- The app uses popup-based authentication (can be changed to redirect if needed)
- Tokens are stored in localStorage (configured in MSAL config)

---

**Status**: ✅ Implementation Complete (Pending manual app linking step)
**Last Updated**: November 1, 2025
