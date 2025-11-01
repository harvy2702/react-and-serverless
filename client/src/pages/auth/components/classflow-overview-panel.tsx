import { LockOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

export function ClassFlowOverviewPanel() {
  return (
    <Stack
      flex={1}
      justifyContent="center"
      spacing={{ xs: 2, md: 3 }}
      sx={{
        borderRadius: { xs: 0, md: 3 },
        bgcolor: { xs: 'transparent', md: 'rgba(224, 231, 255, 0.33)' },
        border: { xs: 'none', md: '1px solid rgba(37, 99, 235, 0.15)' },
        p: { xs: 2, sm: 3, md: 6 },
        backdropFilter: { xs: 'none', md: 'blur(12px)' },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: { xs: 36, md: 44 },
            height: { xs: 36, md: 44 },
            borderRadius: '14px',
            bgcolor: 'primary.main',
            display: 'grid',
            placeItems: 'center',
            color: 'common.white',
          }}
        >
          <LockOutlined sx={{ fontSize: { xs: 20, md: 24 } }} />
        </Box>
        <Typography variant="h6" component="p" color="secondary.main">
          ClassFlow
        </Typography>
      </Stack>

      <Stack spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" component="h1" color="secondary.main">
          Elevate every lesson
        </Typography>
        <Typography variant="body1">
          ClassFlow is a learning platform built for effective, joyful, and smooth growth for modern teams and classrooms.
        </Typography>
      </Stack>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Typography variant="body2" color="secondary.main">
          A learning platform built for effective growth.
        </Typography>
      </Box>

      <Stack spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="subtitle2" color="secondary.main" fontWeight={600}>
          Why teams choose ClassFlow
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">• Guided class journeys with real-time insights</Typography>
          <Typography variant="body2">• Seamless collaboration between mentors and learners</Typography>
          <Typography variant="body2">• Progress analytics that celebrate every milestone</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
