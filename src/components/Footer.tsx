import { Box, colors, Link, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'wouter';

const date = new Date();

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Box component="footer" p={3} display="flex" fontSize="14px" color={colors.grey[700]}>
      <Box>
        &copy; {date.getFullYear()} {import.meta.env.VITE_APP_NAME}
      </Box>
      <Box flex="1 1 auto" />
      <Stack direction="row" spacing={2}>
        <Link component={RouterLink} to="/terms" color="inherit" underline="hover">
          {t('Terms')}
        </Link>
        <Link component={RouterLink} to="/privacy" color="inherit" underline="hover">
          {t('Privacy')}
        </Link>
        <Link component={RouterLink} to="/about" color="inherit" underline="hover">
          {t('About')}
        </Link>
      </Stack>
    </Box>
  );
}
