import { PublicClientApplication } from '@azure/msal-browser';
import type { Configuration } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For External tenant with user flows, use the authority format:
 * https://{tenant-name}.ciamlogin.com/{tenant-name}.onmicrosoft.com/
 * 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

const tenantName = import.meta.env.VITE_AZURE_TENANT_NAME || 'Classflow';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID || '51dea61c-db2d-492a-bcd6-17130e349dd1', // Application (client) ID
    authority: `https://${tenantName}.ciamlogin.com/${tenantName}.onmicrosoft.com`, // External tenant authority
    redirectUri: import.meta.env.VITE_AZURE_AD_REDIRECT_URI || 'http://localhost:5173', // Must be registered as a redirect URI
    postLogoutRedirectUri: import.meta.env.VITE_AZURE_AD_POST_LOGOUT_REDIRECT_URI || 'http://localhost:5173', // Redirect after logout
    knownAuthorities: [`${tenantName}.ciamlogin.com`], // Required for external tenants
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
// For External tenants, use openid, offline_access, and profile scopes
export const loginRequest = {
  scopes: ['openid', 'offline_access', 'profile', 'email'],
  // Prompt user to select account (useful for Google login)
  prompt: 'select_account',
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
