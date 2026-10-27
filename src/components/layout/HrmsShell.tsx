'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import Topbar from './Topbar';
import BottomNav, { BOTTOM_NAV_HEIGHT } from './BottomNav';

const TOPBAR_HEIGHT = 48;

export default function HrmsShell({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      <Topbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: `${TOPBAR_HEIGHT}px`,
          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
          overflow: 'auto',
          minWidth: 0,
          pb: { xs: `${BOTTOM_NAV_HEIGHT}px`, md: 0 },
        }}
      >
        {children}
      </Box>

      <BottomNav onMoreClick={() => setSidebarOpen((prev) => !prev)} />
    </Box>
  );
}
