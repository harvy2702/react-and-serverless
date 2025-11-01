# Quick Start: Google Login with Azure Entra ID

## 🚀 One-Time Setup (Manual)

You need to complete this step **once** via the Azure Portal:

### Link App to User Flow
1. Go to https://entra.microsoft.com
2. Navigate: **Entra ID** → **External Identities** → **User flows**
3. Select: **signUpOrSignInWithGoogle**
4. Click: **Applications** (left sidebar under "Use")
5. Click: **Add application**
6. Select: **Classflow React App**
7. Click: **Select**

✅ **That's it!** The app is now linked to the user flow.

---

## 💻 Running the Application

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Navigate to: `http://localhost:5173`

---

## 🧪 Testing Google Login

1. Click the **"Sign in with Google"** button on the login page
2. A popup window will open showing the Azure Entra ID user flow
3. You'll see two authentication options:
   - **Google** ← Click this
   - Email One-Time Passcode
4. Sign in with your Google account
5. You'll be redirected back to the app, now authenticated!

---

## 📁 Key Files Modified

| File | Purpose |
|------|---------|
| `src/config/msal.config.ts` | MSAL configuration for External tenant |
| `src/stores/auth.store.ts` | Authentication logic using MSAL |
| `.env` | Environment variables (tenant, client ID, etc.) |
| `AZURE_ENTRA_SETUP.md` | Complete documentation |

---

## 🔑 Configuration Summary

**App Registration:**
- Name: Classflow React App
- Client ID: `51dea61c-db2d-492a-bcd6-17130e349dd1`

**Tenant:**
- Name: Classflow
- Domain: Classflow.onmicrosoft.com
- Type: External tenant

**User Flow:**
- Name: signUpOrSignInWithGoogle
- Providers: Google, Email OTP

**Authority URL:**
```
https://Classflow.ciamlogin.com/Classflow.onmicrosoft.com/signUpOrSignInWithGoogle
```

---

## ❓ Troubleshooting

**Problem:** Popup blocked
- **Fix:** Allow popups for localhost in browser settings

**Problem:** "Application not found"
- **Fix:** Complete the manual linking step above

**Problem:** Redirect URI mismatch
- **Fix:** Verify `.env` redirect URI matches app registration

---

## 📚 More Info

See `AZURE_ENTRA_SETUP.md` for:
- Complete setup details
- Authentication flow explanation
- Troubleshooting guide
- Production deployment steps

---

**Ready to test?** Complete the one-time setup above, then run `npm run dev`! 🎉
