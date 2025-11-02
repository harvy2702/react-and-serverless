# GitHub Copilot Instructions

## Project Context

This is a **React 19 + TypeScript** application with **Google authentication** via **Azure Entra ID External Tenant**. The project uses a hybrid UI approach combining Material UI for authentication pages and Tailwind CSS for general pages.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Libraries**: Material UI v6 (auth), Tailwind CSS v4 (general)
- **State**: Zustand (client), TanStack Query (server)
- **Auth**: MSAL Browser, Azure Entra ID External Tenant, Google OAuth
- **Routing**: React Router v7

## Key Implementation Details

### Authentication Flow
- Users authenticate via **Google** through Azure Entra ID External tenant
- MSAL popup flow with PKCE for SPA security
- Authority: `https://Classflow.ciamlogin.com/Classflow.onmicrosoft.com`
- App linked to `signUpOrSignInWithGoogle` user flow in Azure Portal
- Tokens cached in localStorage, auto-refresh handled by MSAL

### UI Strategy
- **Material UI**: Login page (`/login`), auth components, forms
- **Tailwind CSS**: Home page (`/`), layouts, utilities
- **Reason**: Use each library where it excels - MUI for polished auth UI, Tailwind for flexibility

### State Management
- **Zustand** (`auth.store.ts`): Authentication state, user profile
- **TanStack Query**: Server state (configured, ready to use)
- **Protected Routes**: `ProtectedRoute` component checks `isAuthenticated`

### File Organization
```
src/
├── pages/
│   ├── auth/login-mui.page.tsx     # Material UI login page
│   └── home.page.tsx                # Tailwind home page
├── stores/auth.store.ts             # MSAL integration
├── config/msal.config.ts            # External tenant config
└── theme/material-login.theme.ts   # MUI theme
```

## Code Generation Guidelines

### When Adding Auth Features
1. Import MSAL types from `@azure/msal-browser`
2. Use `msalInstance` from `@/config/msal.config`
3. Handle popup cancellation gracefully (user_cancelled error)
4. Update Zustand store, not MSAL directly

### When Creating Pages
- **Auth pages**: Use Material UI components, ThemeProvider
- **Other pages**: Use Tailwind CSS classes
- Always check authentication with `useAuthStore`
- Navigate using `useNavigate` from react-router-dom

### When Working with API
- Use Axios client from `@/lib/api-client.ts`
- Wrap calls in TanStack Query hooks
- Token injection will be added to interceptors later

### Styling Conventions
- Material UI: `sx` prop for MUI components
- Tailwind: `className` for standard elements
- Responsive: Mobile-first, use MUI breakpoints or Tailwind utilities

## Important Notes

- **Port 5173 is fixed** (`--strictPort`) to match Azure redirect URIs
- App registration is SPA platform type (not Web)
- Google redirect URI in Google Cloud Console must use `ciamlogin.com` domain
- User flow linked in Azure Portal, not in authority URL

## Reference Documentation

- **Full setup**: See `AZURE_ENTRA_SETUP.md`
- **Quick start**: See `GOOGLE_LOGIN_QUICKSTART.md`
- **Architecture**: See `ARCHITECTURE.md`
- **MSAL docs**: https://github.com/AzureAD/microsoft-authentication-library-for-js

## Common Patterns

### Protected Route
```typescript
<Route path="/" element={
  <ProtectedRoute>
    <HomePage />
  </ProtectedRoute>
} />
```

### MSAL Login
```typescript
const { loginWithGoogle } = useAuthStore();
await loginWithGoogle(); // Opens popup, handles auth
```

### Check Authentication
```typescript
const { isAuthenticated, user } = useAuthStore();
if (isAuthenticated) {
  // User is logged in
}
```

---

**Last Updated**: November 1, 2025
**Azure Tenant**: Classflow.onmicrosoft.com (External)
**Client ID**: 51dea61c-db2d-492a-bcd6-17130e349dd1
