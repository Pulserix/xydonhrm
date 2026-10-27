'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import MenuIcon from '@mui/icons-material/Menu';


const BOTTOM_NAV_HEIGHT = 60;

export { BOTTOM_NAV_HEIGHT };


const navItems = [
  { label: 'Home',      href: '/dashboard',  icon: DashboardOutlinedIcon,         badge: 0 },
  { label: 'Employees', href: '/employees',  icon: PeopleOutlinedIcon,            badge: 0 },
  { label: 'Leave',     href: '/leave',      icon: BeachAccessOutlinedIcon,       badge: 8 },
  { label: 'Payroll',   href: '/payroll',    icon: AccountBalanceOutlinedIcon,    badge: 0 },
];


interface BottomNavProps {
  onMoreClick: () => void;
}


export default function BottomNav({ onMoreClick }: BottomNavProps) {
  const pathname = usePathname();


  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: BOTTOM_NAV_HEIGHT,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      {navItems.map(({ label, href, icon: Icon, badge }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');

        return (
          <Box
            key={href}
            component={Link}
            href={href}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              textDecoration: 'none',
              color: isActive ? 'primary.light' : 'text.disabled',
              transition: 'color 0.15s',
              '&:active': { opacity: 0.7 },
            }}
          >
            <Badge
              badgeContent={badge || undefined}
              color="error"
              sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 14, height: 14, padding: '0 3px' } }}
            >
              <Icon sx={{ fontSize: 22 }} />
            </Badge>
            <Typography sx={{ fontSize: '10px', fontWeight: isActive ? 600 : 400, lineHeight: 1 }}>
              {label}
            </Typography>
          </Box>
        );
      })}


      {/* More — opens sidebar drawer */}
      <Box
        onClick={onMoreClick}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          cursor: 'pointer',
          color: 'text.disabled',
          '&:active': { opacity: 0.7 },
        }}
      >
        <MenuIcon sx={{ fontSize: 22 }} />
        <Typography sx={{ fontSize: '10px', lineHeight: 1 }}>More</Typography>
      </Box>
    </Box>
  );
}
