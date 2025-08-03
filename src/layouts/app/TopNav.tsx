import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ThemeToggle } from 'material-app';

export interface TopNavProps {
  onMenuButtonClick: () => void;
}

export default function TopNav({ onMenuButtonClick }: TopNavProps) {
  return (
    <AppBar position="sticky" color="inherit" sx={{ display: { sm: 'none' } }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuButtonClick}>
          <MenuIcon />
        </IconButton>
        <Typography fontSize={20} noWrap component="div">
          {import.meta.env.VITE_APP_NAME}
        </Typography>
        <Box flexGrow={1} />
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
