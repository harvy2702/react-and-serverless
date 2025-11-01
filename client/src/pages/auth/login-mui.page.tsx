import { useCallback, useMemo, useState, useEffect } from 'react';
import { Box, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { materialLoginTheme } from '@/theme/material-login.theme';
import { ClassFlowOverviewPanel } from './components/classflow-overview-panel';
import { MaterialLoginFormCard } from './components/material-login-form-card';

export function MaterialLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const isSubmitDisabled = useMemo(
    () => isLoading || !email.trim() || !password.trim(),
    [email, isLoading, password],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      clearError();
      await login(email, password);
    },
    [clearError, email, login, password],
  );

  const handleGoogleLogin = useCallback(async () => {
    clearError();
    await loginWithGoogle();
  }, [clearError, loginWithGoogle]);

  const handleFieldFocus = useCallback(() => {
    if (error) {
      clearError();
    }
  }, [clearError, error]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleForgotPassword = useCallback(() => undefined, []);

  return (
    <ThemeProvider theme={materialLoginTheme}>
      <CssBaseline />
      <Box
        component="section"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          px: { xs: 2, sm: 4 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1120,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 6 }}
            alignItems="stretch"
          >
            <ClassFlowOverviewPanel />

            <MaterialLoginFormCard
              email={email}
              password={password}
              isLoading={isLoading}
              isSubmitDisabled={isSubmitDisabled}
              error={error}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onSubmit={handleSubmit}
              onGoogleLogin={handleGoogleLogin}
              onFieldFocus={handleFieldFocus}
              onForgotPassword={handleForgotPassword}
            />
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
