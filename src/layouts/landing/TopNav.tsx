import LanguageMenu from '#components/LanguageMenu';
import { AuthStatus, useAuthStatus, useAuthUser, useLogout } from '@guoyunhe/react-auth';
import {
  AutoAwesome as AutoAwesomeIcon,
  CreditCard,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
  SupportAgent as SupportAgentIcon,
} from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { ThemeToggle } from 'material-app';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';

export interface TopNavProps {
  onMenuButtonClick: () => void;
}

export default function TopNav({ onMenuButtonClick }: TopNavProps) {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [status] = useAuthStatus();
  const [user] = useAuthUser();
  const logout = useLogout();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuButtonClick}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component={Link}
          to="/"
          style={{ display: 'flex', color: 'inherit', textDecoration: 'none' }}
        >
          <Box
            component="img"
            src="/logo.svg"
            width={32}
            height={32}
            sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}
          />
          <Typography fontSize={20} color="inherit" component="div">
            {import.meta.env.VITE_APP_NAME}
          </Typography>
        </Box>
        <Stack direction="row" ml={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button
            variant={location === '/features' ? 'contained' : 'text'}
            color="inherit"
            disableElevation
            component={Link}
            to="/features"
            startIcon={<AutoAwesomeIcon />}
          >
            {t('Features')}
          </Button>
          <Button
            variant={location === '/pricing' ? 'contained' : 'text'}
            color="inherit"
            disableElevation
            startIcon={<CreditCard />}
            component={Link}
            to="/pricing"
          >
            {t('Pricing')}
          </Button>
          <Button
            variant={location === '/support' ? 'contained' : 'text'}
            color="inherit"
            disableElevation
            startIcon={<SupportAgentIcon />}
            component={Link}
            to="/support"
          >
            {t('Support')}
          </Button>
        </Stack>
        <Box flex="1 1 auto" />
        <ThemeToggle />
        {status === AuthStatus.LoggedIn && user ? (
          <Stack direction="row">
            <Button
              variant="text"
              color="inherit"
              disableElevation
              startIcon={
                <Avatar src={user.avatar?.url} alt={user.name} sx={{ width: 24, height: 24 }} />
              }
              component={Link}
              to="/app/settings"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {user.name}
            </Button>
            <Button
              variant="text"
              color="inherit"
              disableElevation
              startIcon={<DashboardIcon />}
              component={Link}
              to="/app"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('Dashboard')}
            </Button>
            <Button
              variant="text"
              color="inherit"
              disableElevation
              startIcon={<SettingsIcon />}
              component={Link}
              to="/app"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('Settings')}
            </Button>
            <Button
              variant="text"
              color="inherit"
              disableElevation
              startIcon={<LogoutIcon />}
              onClick={logout.submit}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('Logout')}
            </Button>
          </Stack>
        ) : (
          <Stack direction="row">
            <LanguageMenu />
            <Button
              variant="text"
              color="inherit"
              disableElevation
              startIcon={<LoginIcon />}
              component={Link}
              to="/login"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('Login')}
            </Button>
            <Button
              variant="text"
              color="inherit"
              disableElevation
              startIcon={<PersonAddIcon />}
              component={Link}
              to="/register"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('Register')}
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
