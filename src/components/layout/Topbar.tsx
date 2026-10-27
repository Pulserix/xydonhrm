'use client';

import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { SIDEBAR_WIDTH } from './Sidebar';

const breadcrumbMap: Record<string, string> = {
  '/dashboard':      'Dashboard',
  '/employees':      'Employees',
  '/organization':   'Organization',
  '/attendance':     'Attendance',
  '/leave':          'Leave Management',
  '/shifts':         'Shift Management',
  '/documents':      'Documents',
  '/performance':    'Performance',
  '/training':       'Training & Development',
  '/engagement':     'Employee Engagement',
  '/recruitment':    'Recruitment',
  '/onboarding':     'Onboarding',
  '/payroll':        'Payroll',
  '/compensation':   'Compensation',
  '/expenses':       'Expenses',
  '/statutory':      'Statutory Compliance',
  '/compliance':     'Compliance',
  '/timesheets':     'Timesheets',
  '/assets':         'Asset Management',
  '/approvals':      'Approvals',
  '/helpdesk':       'HR Helpdesk',
  '/data-import':    'Data Import',
  '/promotions':     'Promotions & Transfers',
  '/disciplinary':   'Disciplinary',
  '/offboarding':    'Offboarding',
  '/analytics':      'Analytics & Reports',
  '/insights':       'People Insights',
  '/ai-assistant':   'AI Assistant',
  '/benefits':       'Benefits',
  '/headcount':      'Headcount Planning',
  '/contractors':    'Contractors',
  '/workflows':      'Workflows',
  '/integrations':   'Integrations',
  '/communications': 'Communications',
  '/security':       'Security & Access',
  '/billing':        'Billing',
  '/settings':       'Settings',
};

interface TopbarProps {
  onMenuToggle: () => void;
}

export default function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const pageTitle = breadcrumbMap[pathname] ?? 'XydonHRM';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
        height: 48,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ minHeight: '48px !important', px: { xs: 1.5, md: 2.5 }, gap: { xs: 1, md: 2 } }}>

        {/* Hamburger — mobile only */}
        <IconButton
          size="small"
          onClick={onMenuToggle}
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary', mr: 0.5 }}
        >
          <MenuIcon sx={{ fontSize: 20 }} />
        </IconButton>

        {/* Breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled', display: { xs: 'none', sm: 'block' } }}>
            PeopleOS
          </Typography>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled', display: { xs: 'none', sm: 'block' } }}>
            /
          </Typography>
          <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500 }}>
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Search — hidden on xs */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 1,
            bgcolor: 'hsl(0,0%,14%)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '7px',
            px: 1.5,
            height: 30,
            width: { sm: 180, md: 220 },
          }}
        >
          <SearchIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
          <InputBase
            placeholder="Search employees..."
            sx={{
              fontSize: '12px',
              color: 'text.secondary',
              flex: 1,
              '& input::placeholder': { color: 'hsl(0,0%,33%)', opacity: 1 },
            }}
          />
        </Box>

        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <NotificationsNoneOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'flex' } }}>
          <HelpOutlineOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
