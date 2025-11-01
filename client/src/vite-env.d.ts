/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_BASE_URL: string;
  
  // Azure AD Configuration
  readonly VITE_AZURE_AD_CLIENT_ID: string;
  readonly VITE_AZURE_AD_AUTHORITY: string;
  readonly VITE_AZURE_AD_REDIRECT_URI: string;
  readonly VITE_AZURE_AD_POST_LOGOUT_REDIRECT_URI: string;
  
  // Azure Services
  readonly VITE_AZURE_STORAGE_ACCOUNT: string;
  readonly VITE_AZURE_STORAGE_SAS_TOKEN: string;
  
  // Google OAuth (optional)
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
