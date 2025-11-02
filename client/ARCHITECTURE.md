# Project Architecture Overview

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         React Application                        │
│                          (Port 5173)                             │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼─────────┐    ┌─────────▼──────────┐
         │   Client State     │    │   Server State      │
         │    (Zustand)       │    │  (TanStack Query)   │
         │                    │    │                     │
         │ • Auth Store       │    │ • API Queries       │
         │ • UI State         │    │ • Mutations         │
         │ • Preferences      │    │ • Cache Management  │
         └────────────────────┘    └─────────────────────┘
                    │                         │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     API Client (Axios)   │
                    │                          │
                    │ • Token Management       │
                    │ • Request Interceptors   │
                    │ • Error Handling         │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    Azure Services        │
                    │                          │
                    │ • Azure Functions        │
                    │ • Azure SQL Database     │
                    │ • Azure Blob Storage     │
                    │ • Azure AD (MSAL)        │
                    └──────────────────────────┘
```

## 📊 Component Hierarchy

```
App (QueryClientProvider + BrowserRouter)
│
├── Routes
│   ├── /login → MaterialLoginPage (Material UI)
│   │   └── ThemeProvider (materialLoginTheme)
│   │       └── Box (Full-height container)
│   │           └── Stack (Responsive layout)
│   │               ├── ClassFlowOverviewPanel (Left side)
│   │               │   └── Brand info + Features
│   │               │
│   │               └── MaterialLoginFormCard (Right side)
│   │                   ├── Email Input (MUI TextField)
│   │                   ├── Password Input (MUI TextField)
│   │                   ├── Sign In Button (MUI Button)
│   │                   ├── Divider
│   │                   └── Google Sign In Button (MUI Button)
│   │
│   ├── / → HomePage (Protected, Tailwind CSS)
│   │   └── User Profile Display
│   │       ├── Avatar
│   │       ├── Welcome Message
│   │       ├── User Name & Email
│   │       └── Sign Out Button
│   │
│   └── /* → Redirect to /
│
└── ReactQueryDevtools (Development only)
```

## 🔄 Data Flow

### Authentication Flow (Google Login via Azure Entra ID)
```
1. User clicks "Sign in with Google" in MaterialLoginPage
   ↓
2. LoginPage calls useAuthStore.loginWithGoogle()
   ↓
3. Auth Store initializes MSAL and opens popup
   ↓
4. MSAL redirects to Azure Entra ID user flow
   ↓
5. User flow displays Google login option
   ↓
6. User authenticates with Google
   ↓
7. Azure Entra ID creates/updates user account
   ↓
8. Azure returns token to MSAL
   ↓
9. MSAL closes popup and returns account info
   ↓
10. Auth Store updates with user data
   ↓
11. useEffect detects isAuthenticated = true
   ↓
12. Navigate to HomePage (/)
   ↓
13. Protected route allows access
   ↓
14. HomePage displays user profile
```

### API Request Flow
```
Component
   ↓
TanStack Query (useQuery/useMutation)
   ↓
API Service Function
   ↓
Axios Client (with interceptors)
   ├─→ Add Authorization Header
   ├─→ Add Custom Headers
   ├─→ Log Request (dev)
   ↓
Azure Functions API
   ↓
Response
   ├─→ Log Response (dev)
   ├─→ Handle 401 (token refresh)
   ├─→ Error transformation
   ↓
TanStack Query Cache
   ↓
Component Re-render
```

## 🎨 Styling Architecture (Hybrid Approach)

```
┌──────────────────────────────────────────────────────────────┐
│                  Styling Strategy                             │
└──────────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                                 │
┌───────▼────────────┐         ┌─────────▼──────────┐
│   Material UI (MUI)│         │  Tailwind CSS v4   │
│                    │         │                    │
│ Used for:          │         │ Used for:          │
│ • Login pages      │         │ • Home page        │
│ • Auth UI          │         │ • Utility classes  │
│ • Form components  │         │ • Layout           │
│ • Material theme   │         │ • Gradients        │
│                    │         │ • Responsive       │
│ Components:        │         │                    │
│ • TextField        │         │ Shadcn/ui:         │
│ • Button           │         │ • Label            │
│ • Box, Stack       │         │ • Other utilities  │
│ • ThemeProvider    │         │                    │
└────────────────────┘         └────────────────────┘

Why hybrid?
• MUI provides polished, accessible auth components
• Tailwind offers flexibility for custom pages
• Each tool used where it excels
```

## 📦 State Management Strategy

### Client State (Zustand) - Ephemeral UI State
- User authentication status
- UI preferences (theme, sidebar state)
- Form state (complex multi-step forms)
- Modal/dialog open states

### Server State (TanStack Query) - Backend Data
- User profiles
- Application data (lists, entities)
- API responses with caching
- Background data synchronization

## 🔐 Security Layers

```
┌──────────────────────────────────────────────────┐
│  1. Route Protection (React Router Guards)        │
│     • ProtectedRoute component                   │
│     • Check isAuthenticated from Zustand         │
│     • Redirect to /login if not authenticated    │
└──────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────┐
│  2. MSAL Browser (SPA Authentication)             │
│     • Popup-based OAuth flow                     │
│     • PKCE (Proof Key for Code Exchange)         │
│     • Automatic token caching in localStorage    │
│     • Silent token refresh                       │
└──────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────┐
│  3. Azure Entra ID External Tenant                │
│     • User flow: signUpOrSignInWithGoogle        │
│     • Google as identity provider                │
│     • OAuth 2.0 / OpenID Connect                 │
│     • User account management                    │
└──────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────┐
│  4. Google OAuth                                  │
│     • Secure redirect URI validation             │
│     • Google Cloud Console configuration         │
│     • User consent screen                        │
└──────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────┐
│  5. Token Management (Future - Axios)             │
│     • Inject Bearer token in API requests        │
│     • Auto-refresh on 401 errors                 │
│     • Clear tokens on logout                     │
└──────────────────────────────────────────────────┘
```

## 🚀 Build & Deployment Pipeline

```
Development
    ↓
┌─────────────┐
│ npm run dev │ → Vite Dev Server (HMR)
└─────────────┘

Production
    ↓
┌────────────────┐
│ npm run build  │ → Optimized Static Assets
└────────────────┘
    ↓
┌────────────────┐
│ dist/ folder   │ → HTML, CSS, JS bundles
└────────────────┘
    ↓
┌─────────────────────────┐
│ Azure Static Web Apps   │ → CDN + Edge Deployment
└─────────────────────────┘
```

## 📱 Responsive Design

```
Mobile First Approach (Tailwind CSS Breakpoints)

Mobile (< 640px)
    ↓
    sm: (640px)
    ↓
    md: (768px)  ← Login Card adapts here
    ↓
    lg: (1024px)
    ↓
    xl: (1280px)
    ↓
    2xl: (1400px) ← Container max-width
```

## 🧪 Testing Strategy (To Be Implemented)

```
Unit Tests (Vitest)
    ├── Components
    ├── Utilities
    └── Stores

Integration Tests (React Testing Library)
    ├── User Flows
    ├── Form Submissions
    └── API Mocking

E2E Tests (Playwright)
    ├── Login Flow
    ├── Protected Routes
    └── User Journeys
```
