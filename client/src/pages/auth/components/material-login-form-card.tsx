import { useCallback } from 'react';
import { Google } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { ChangeEvent, FormEventHandler } from 'react';

export type MaterialLoginFormCardProps = {
  email: string;
  password: string;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  error?: string | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onGoogleLogin: () => void;
  onFieldFocus?: () => void;
  onForgotPassword?: () => void;
};

export function MaterialLoginFormCard({
  email,
  password,
  isLoading,
  isSubmitDisabled,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
  onFieldFocus,
  onForgotPassword,
}: MaterialLoginFormCardProps) {
  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onEmailChange(event.target.value);
    },
    [onEmailChange],
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onPasswordChange(event.target.value);
    },
    [onPasswordChange],
  );

  const handleFieldFocus = useCallback(() => {
    onFieldFocus?.();
  }, [onFieldFocus]);

  return (
    <Paper
      sx={{
        flex: 1,
        p: { xs: 4, sm: 5 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        justifyContent: 'center',
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="h5" component="h2" color="secondary.main">
          Welcome back
        </Typography>
        <Typography variant="body2">
          Sign in to continue guiding your class with clarity and delight.
        </Typography>
      </Stack>

      {error && (
        <Box
          role="alert"
          aria-live="assertive"
          sx={{
            borderRadius: 2,
            border: '1px solid rgba(220, 38, 38, 0.25)',
            bgcolor: 'rgba(248, 113, 113, 0.12)',
            color: '#b91c1c',
            px: 2.5,
            py: 1.5,
            fontSize: 14,
          }}
        >
          {error}
        </Box>
      )}

      <Stack component="form" spacing={2.5} onSubmit={onSubmit} aria-busy={isLoading}>
        <TextField
          label="Work email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onFocus={handleFieldFocus}
          fullWidth
          size="medium"
          autoComplete="email"
          disabled={isLoading}
          required
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onFocus={handleFieldFocus}
          fullWidth
          size="medium"
          autoComplete="current-password"
          disabled={isLoading}
          required
        />

        <Stack direction="row" justifyContent="flex-end">
          <Link
            component="button"
            type="button"
            underline="none"
            color="primary"
            onClick={onForgotPassword}
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            Forgot password?
          </Link>
        </Stack>

        <Button type="submit" variant="contained" size="large" disabled={isSubmitDisabled}>
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>
      </Stack>

      <Divider>
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 2 }}>
          OR
        </Typography>
      </Divider>

      <Button
        variant="outlined"
        size="large"
        startIcon={<Google />}
        onClick={onGoogleLogin}
        disabled={isLoading}
      >
        Continue with Google
      </Button>

      <Typography variant="caption" sx={{ color: '#6b7280', textAlign: 'center' }}>
        Need an account?{' '}
        <Link
          component="button"
          type="button"
          underline="always"
          color="secondary"
          sx={{ fontWeight: 600 }}
        >
          Contact the ClassFlow team
        </Link>
        .
      </Typography>
    </Paper>
  );
}
