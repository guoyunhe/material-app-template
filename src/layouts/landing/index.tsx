import Footer from '#components/footer';
import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import LeftNav from './LeftNav';
import TopNav from './TopNav';

// Layout of static landing pages for guests
export default function LandingLayout({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <LeftNav drawerOpen={drawerOpen} onDrawerClose={() => setDrawerOpen(false)} />
      <TopNav onMenuButtonClick={() => setDrawerOpen((prev) => !prev)} />
      <Box sx={{ flex: '1 1 auto' }}>{children}</Box>
      <Footer />
    </Box>
  );
}
