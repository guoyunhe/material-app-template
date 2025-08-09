import { useLogout } from '@guoyunhe/react-auth';
import {
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import config from './config';

export interface LeftNavProps {
  drawerOpen: boolean;
  onDrawerClose: () => void;
}

export default function LeftNav({ drawerOpen, onDrawerClose }: LeftNavProps) {
  const logout = useLogout();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const { t } = useTranslation();
  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={drawerOpen}
      onClose={onDrawerClose}
      sx={{ width: config.drawerWidth }}
    >
      <List sx={{ width: config.drawerWidth }} onClick={onDrawerClose}>
        <ListItemButton component={Link} to="/app">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={t('Dashboard')} />
        </ListItemButton>
        <Divider />
        <ListItemButton component={Link} to="/app/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={t('Settings')} />
        </ListItemButton>
        <ListItemButton onClick={logout.submit}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t('Logout')} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
