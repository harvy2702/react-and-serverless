# Project Quick Reference

## 📂 Key Files & Directories

### Configuration Files
- `vite.config.ts` - Vite configuration with path aliases
- `tailwind.config.js` - Tailwind CSS theme and plugins
- `tsconfig.app.json` - TypeScript configuration with path mappings
- `.env.example` - Environment variables template

### Source Structure
```
src/
├── components/ui/          # Shadcn/ui components (Button, Input, Card, Label)
├── config/                 # Application configuration
│   └── msal.config.ts     # Azure AD/MSAL setup
├── lib/                    # Utilities and shared code
│   ├── api-client.ts      # Axios instance with interceptors
│   └── utils.ts           # Helper functions (cn)
├── pages/                  # Route-based page components
│   └── auth/
│       └── login.page.tsx # Login page with email/password + Google
├── stores/                 # Zustand state stores
│   └── auth.store.ts      # Authentication state management
├── App.tsx                # Main app with routing and providers
└── main.tsx               # Application entry point
```

## 🔑 Key Features Implemented

### 1. Authentication Store (Zustand)
Location: `src/stores/auth.store.ts`

**Available Methods:**
- `login(email, password)` - Email/password login (placeholder)
- `loginWithGoogle()` - Google OAuth login (placeholder)
- `loginWithMicrosoft()` - Microsoft/Azure AD login (placeholder)
- `logout()` - Clear user session
- `setUser(user)` - Set authenticated user
- `setLoading(boolean)` - Set loading state
- `setError(string)` - Set error message

**State:**
```typescript
{
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
```

### 2. API Client (Axios)
Location: `src/lib/api-client.ts`

**Features:**
- Automatic token injection
- Request/response logging (dev mode)
- Error handling with retry logic
- 401 auto-redirect to login

**Usage:**
```typescript
import { api } from '@/lib/api-client';

const response = await api.get('/users');
await api.post('/users', { name: 'John' });
```

### 3. MSAL Configuration
Location: `src/config/msal.config.ts`

**Required Environment Variables:**
```env
VITE_AZURE_AD_CLIENT_ID=your-client-id
VITE_AZURE_AD_AUTHORITY=https://login.microsoftonline.com/tenant-id
VITE_AZURE_AD_REDIRECT_URI=http://localhost:5173
```

### 4. Routing
Location: `src/App.tsx`

**Routes:**
- `/login` - Login page (public)
- `/dashboard` - Dashboard (protected)
- `/` - Redirects to dashboard
- `*` - Catch-all redirects to dashboard

**Protected Route Pattern:**
```typescript
<Route
  path="/protected"
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  }
/>
```

## 🎨 UI Components (Shadcn/ui)

All components are located in `src/components/ui/`

**Available Components:**
1. **Button** - `<Button variant="default|outline|ghost" size="sm|default|lg" />`
2. **Input** - `<Input type="text" placeholder="..." />`
3. **Label** - `<Label htmlFor="input-id">Label Text</Label>`
4. **Card** - `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>`

**Adding More Components:**
Visit [Shadcn/ui](https://ui.shadcn.com/) and copy component code into `src/components/ui/`

## 🔧 Common Tasks

### Add a New Page
1. Create file in `src/pages/your-feature/page-name.page.tsx`
2. Add route in `src/App.tsx`:
```typescript
<Route path="/your-path" element={<YourPage />} />
```

### Add a New API Endpoint
```typescript
// src/services/user.service.ts
import { api } from '@/lib/api-client';

export const userService = {
  getUsers: () => api.get('/users'),
  createUser: (data) => api.post('/users', data),
};
```

### Use TanStack Query
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

function YourComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  const mutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      // Handle success
    },
  });
}
```

### Create a New Store
```typescript
// src/stores/your-store.ts
import { create } from 'zustand';

interface YourState {
  value: string;
  setValue: (value: string) => void;
}

export const useYourStore = create<YourState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}));
```

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## 🔗 Useful Links

- **Vite Docs**: https://vitejs.dev/
- **React 19 Docs**: https://react.dev/
- **Shadcn/ui**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **TanStack Query**: https://tanstack.com/query/latest
- **Zustand**: https://zustand-demo.pmnd.rs/
- **Axios**: https://axios-http.com/
- **React Router**: https://reactrouter.com/

## 📝 Next Steps

1. **Connect to Real Backend**
   - Update `VITE_API_BASE_URL` in `.env`
   - Implement actual API calls in auth store
   - Add real authentication logic

2. **Azure AD Setup**
   - Register app in Azure Portal
   - Configure redirect URIs
   - Update MSAL config with real credentials

3. **Add More Features**
   - Create additional pages (Dashboard, Profile, Settings)
   - Implement data fetching with TanStack Query
   - Add form validation (React Hook Form + Zod)
   - Implement file upload to Azure Blob Storage

4. **Testing**
   - Add Vitest for unit tests
   - Add React Testing Library for component tests
   - Add Playwright for E2E tests
