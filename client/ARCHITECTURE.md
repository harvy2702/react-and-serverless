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
│   ├── /login → LoginPage
│   │   └── Card
│   │       ├── CardHeader (Title + Description)
│   │       ├── CardContent
│   │       │   ├── Login Form
│   │       │   │   ├── Input (Email)
│   │       │   │   ├── Input (Password)
│   │       │   │   └── Button (Sign In)
│   │       │   └── Button (Google Login)
│   │       └── CardFooter
│   │
│   ├── /dashboard → DashboardPage (Protected)
│   │   └── User Dashboard Content
│   │
│   └── / → Redirect to Dashboard
│
└── ReactQueryDevtools (Development only)
```

## 🔄 Data Flow

### Authentication Flow
```
1. User enters credentials in LoginPage
   ↓
2. LoginPage calls useAuthStore.login()
   ↓
3. Auth Store updates loading state
   ↓
4. API call via Axios (placeholder)
   ↓
5. Store updates with user data
   ↓
6. Route guard redirects to Dashboard
   ↓
7. Protected content loads
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

## 🎨 Styling Architecture

```
┌──────────────────────────────────────────────────┐
│              Tailwind CSS (Utility-First)         │
│                                                   │
│  • Base Styles (index.css)                       │
│  • CSS Variables for theming                     │
│  • Dark mode support                             │
└──────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼─────┐  ┌──────▼──────┐  ┌─────▼──────┐
│   Shadcn/ui │  │  Custom CSS │  │   Inline   │
│  Components │  │  (minimal)  │  │  Classes   │
│             │  │             │  │            │
│ • Button    │  │ • Gradients │  │ className= │
│ • Input     │  │ • Animations│  │  "..."     │
│ • Card      │  │             │  │            │
│ • Label     │  │             │  │            │
└─────────────┘  └─────────────┘  └────────────┘
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
│     • Check isAuthenticated                      │
│     • Redirect unauthenticated users             │
└──────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────┐
│  2. Token Management (Axios Interceptors)         │
│     • Inject Bearer token in requests            │
│     • Auto-refresh on 401 errors                 │
│     • Clear tokens on logout                     │
└──────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────┐
│  3. Azure AD Authentication (MSAL)                │
│     • OAuth 2.0 / OpenID Connect                 │
│     • SSO support                                │
│     • MFA enabled                                │
└──────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────┐
│  4. API Gateway (Azure Functions)                 │
│     • Request validation                         │
│     • Rate limiting                              │
│     • CORS configuration                         │
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
