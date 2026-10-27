'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { navGroups } from './navItems';
import NavIcon from './NavIcon';

export const SIDEBAR_WIDTH = 228;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export default function Sidebar({ open, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();

  const drawerContent = (
    <>
      {/* Brand */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          height: 48,
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '6px',
            background: 'hsl(243,75%,60%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          H
        </Box>
        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary', letterSpacing: '-0.01em' }}>
          xydonhrm
        </Typography>
        <Typography
          sx={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', color: 'hsl(243,75%,60%)', ml: 'auto', opacity: 0.8 }}
        >
          HRMS
        </Typography>
      </Box>

      {/* Nav */}
      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, py: 1 }}>
        {navGroups.map((group) => (
          <List
            key={group.group}
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'text.disabled',
                  lineHeight: 1,
                  px: 2.5,
                  pt: 2,
                  pb: 0.75,
                  bgcolor: 'transparent',
                }}
              >
                {group.group}
              </ListSubheader>
            }
          >
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <ListItemButton
                  key={item.href}
                  component={Link}
                  href={item.href}
                  selected={isActive}
                  onClick={isMobile ? onClose : undefined}
                  sx={{ mx: 1, px: 1.5, py: 0.75, minHeight: 32, borderRadius: '7px' }}
                >
                  <ListItemIcon sx={{ minWidth: 28, color: isActive ? 'hsl(243,75%,70%)' : 'text.disabled' }}>
                    <NavIcon label={item.label} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '13px',
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? 'text.primary' : 'text.secondary',
                        },
                      },
                    }}
                  />
                  {item.badge ? (
                    <Box
                      sx={{
                        minWidth: 18,
                        height: 18,
                        borderRadius: '9999px',
                        bgcolor: 'hsl(243,75%,60%)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 0.5,
                        flexShrink: 0,
                      }}
                    >
                      {item.badge}
                    </Box>
                  ) : null}
                </ListItemButton>
              );
            })}
          </List>
        ))}
      </Box>

      {/* User */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            bgcolor: 'hsl(243,75%,44%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
            letterSpacing: '0.02em',
          }}
        >
          RJ
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.primary', lineHeight: 1.3 }}>
            Rajat Joshi
          </Typography>
          <Typography sx={{ fontSize: '10px', color: 'text.disabled', lineHeight: 1.3 }}>
            HR Manager
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile: temporary drawer */}
      <Drawer
        variant="temporary"
        open={isMobile ? open : false}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop: permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
