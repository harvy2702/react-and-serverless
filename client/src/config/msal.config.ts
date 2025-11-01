import { PublicClientApplication } from '@azure/msal-browser';
import type { Configuration } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

// TODO: Replace these values with your actual Azure AD configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID || 'YOUR_CLIENT_ID_HERE', // Application (client) ID
    authority: import.meta.env.VITE_AZURE_AD_AUTHORITY || 'https://login.microsoftonline.com/YOUR_TENANT_ID_HERE', // Directory (tenant) ID
    redirectUri: import.meta.env.VITE_AZURE_AD_REDIRECT_URI || 'http://localhost:5173', // Must be registered as a redirect URI
    postLogoutRedirectUri: import.meta.env.VITE_AZURE_AD_POST_LOGOUT_REDIRECT_URI || 'http://localhost:5173', // Redirect after logout
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set to true for IE 11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0: // LogLevel.Error
            console.error(message);
            return;
          case 1: // LogLevel.Warning
            console.warn(message);
            return;
          case 2: // LogLevel.Info
            console.info(message);
            return;
          case 3: // LogLevel.Verbose
            console.debug(message);
            return;
        }
      },
    },
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

/**
 * Create MSAL instance
 * This should be exported and used throughout the application
 */
export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for your app.
export const getAccount = () => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  }
  return null;
};
