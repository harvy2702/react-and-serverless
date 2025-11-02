# React + Azure Cloud Application

A modern, full-stack application built with React 19, TypeScript, and Azure services following clean architecture principles and best practices.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **UI Components**: 
  - Material UI (MUI) v6 - Login and auth pages
  - Tailwind CSS v4 - Home page and general styling
  - Shadcn/ui - Utility components
- **State Management**: 
  - TanStack Query (Server State)
  - Zustand (Client State)
- **Routing**: React Router v7
- **Authentication**: 
  - @azure/msal-browser - MSAL for SPA
  - Azure Entra ID External Tenant
  - Google OAuth via Azure identity provider
- **HTTP Client**: Axios with interceptors

### Backend (Azure Services)
- **Authentication**: Azure Entra ID External Tenant
- **Identity Provider**: Google (configured in user flow)
- **Future**: Azure Functions, Azure SQL Database, Azure Blob Storage

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ui/             # Shadcn/ui components
│   ├── config/             # Configuration files
│   │   └── msal.config.ts  # Azure Entra ID MSAL configuration
│   ├── lib/                # Utility functions and helpers
│   │   ├── api-client.ts   # Axios configuration with interceptors
│   │   └── utils.ts        # Common utilities (cn, etc.)
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages (Material UI)
│   │   │   ├── login-mui.page.tsx
│   │   │   └── components/ # Login form components
│   │   └── home.page.tsx   # Home page (Tailwind CSS)
│   ├── stores/             # Zustand stores
│   │   └── auth.store.ts   # Authentication state with MSAL
│   ├── theme/              # Material UI themes
│   │   └── material-login.theme.ts
│   ├── App.tsx             # Main application with protected routes
│   └── index.css           # Global styles with Tailwind
├── .env                    # Environment variables (gitignored)
├── AZURE_ENTRA_SETUP.md    # Azure setup documentation
└── GOOGLE_LOGIN_QUICKSTART.md # Quick start guide
```

## 🛠️ Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

## 🎯 Features

- ✅ Modern React 19 with TypeScript
- ✅ Material UI v6 + Tailwind CSS v4 hybrid approach
- ✅ **Google Login** via Azure Entra ID External Tenant
- ✅ MSAL authentication with popup flow
- ✅ Protected routes with authentication guards
- ✅ Zustand for client state management
- ✅ TanStack Query for server state (ready to use)
- ✅ Axios with interceptors
- ✅ Automatic redirect after successful login
- ✅ User profile display on home page
- ✅ Secure logout with MSAL

## 🔐 Authentication

This application uses **Azure Entra ID External Tenant** with Google as an identity provider:

- **Sign in with Google**: Users authenticate via their Google accounts
- **User Flow**: `signUpOrSignInWithGoogle` handles the authentication process
- **Token Management**: MSAL automatically handles token refresh and caching
- **Security**: SPA redirect URIs, PKCE flow, and secure token storage

See [AZURE_ENTRA_SETUP.md](./AZURE_ENTRA_SETUP.md) for complete setup details.

## 📝 Development

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
