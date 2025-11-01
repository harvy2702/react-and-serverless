# React + Azure Cloud Application

A modern, full-stack application built with React 19, TypeScript, and Azure services following clean architecture principles and best practices.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **UI Components**: Shadcn/ui with Tailwind CSS v4
- **State Management**: 
  - TanStack Query (Server State)
  - Zustand (Client State)
- **Routing**: React Router v6
- **Authentication**: @azure/msal-react
- **HTTP Client**: Axios with interceptors

### Backend (Azure Services)
- **Functions**: Azure Functions (Serverless)
- **Database**: Azure SQL Database
- **Authentication**: Azure AD (Microsoft Entra ID)
- **Storage**: Azure Blob Storage

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ui/             # Shadcn/ui components
│   ├── config/             # Configuration files
│   │   └── msal.config.ts  # Azure AD/MSAL configuration
│   ├── lib/                # Utility functions and helpers
│   │   ├── api-client.ts   # Axios configuration with interceptors
│   │   └── utils.ts        # Common utilities (cn, etc.)
│   ├── pages/              # Page components
│   │   └── auth/           # Authentication pages
│   ├── stores/             # Zustand stores
│   │   └── auth.store.ts   # Authentication state
│   ├── App.tsx             # Main application component
│   └── index.css           # Global styles with Tailwind
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
- ✅ Tailwind CSS v4 + Shadcn/ui components (with performance improvements)
- ✅ Authentication UI (Login page with Google option)
- ✅ Zustand for client state
- ✅ TanStack Query for server state
- ✅ Axios with interceptors
- ✅ Protected routes
- ✅ MSAL configuration for Azure AD

## 📝 Development

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
