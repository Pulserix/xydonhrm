'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge } from '@/components/hrms';


interface Separation {
  id: string;
  name: string;
  role: string;
  dept: string;
  lastDay: string;
  reason: string;
  progress: number;
  status: string;
}


interface ClearanceItem {
  label: string;
  done: boolean;
  owner: string;
}


const separations: Separation[] = [
  { id: '1', name: 'Deepa Pillai',  role: 'Operations Manager',  dept: 'Operations', lastDay: '31 Oct 2026', reason: 'Resignation',   progress: 65, status: 'Active'    },
  { id: '2', name: 'Arjun Seth',    role: 'Sales Executive',     dept: 'Sales',      lastDay: '15 Nov 2026', reason: 'Resignation',   progress: 20, status: 'Active'    },
  { id: '3', name: 'Preethi Balan', role: 'Finance Analyst',     dept: 'Finance',    lastDay: '30 Nov 2026', reason: 'Resignation',   progress: 10, status: 'Upcoming'  },
];


const clearanceItems: ClearanceItem[] = [
  { label: 'Resignation letter received',  done: true,  owner: 'HR'         },
  { label: 'Exit interview scheduled',     done: true,  owner: 'HR'         },
  { label: 'Knowledge transfer completed', done: false, owner: 'Manager'    },
  { label: 'Assets returned',              done: false, owner: 'IT'         },
  { label: 'Access cards revoked',         done: false, owner: 'IT'         },
  { label: 'Email deactivated',            done: false, owner: 'IT'         },
  { label: 'Final settlement calculated',  done: true,  owner: 'Finance'    },
  { label: 'Full & final payment done',    done: false, owner: 'Finance'    },
  { label: 'Experience letter issued',     done: false, owner: 'HR'         },
];


export default function OffboardingPage() {
  const [selectedId, setSelectedId]   = useState<string>('1');
  const [checklist, setChecklist]     = useState<ClearanceItem[]>(clearanceItems);


  const selectedEmployee = separations.find((s) => s.id === selectedId) ?? separations[0];


  const toggleItem = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item))
    );
  };


  const owners = Array.from(new Set(clearanceItems.map((c) => c.owner)));


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Offboarding"
        subtitle="Manage employee separations and exit clearances"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Initiate Offboarding
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Separations',  value: 2,   sub: 'In exit process',      icon: <ExitToAppOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Tasks Completed',     value: 4,   sub: 'Out of 9',             icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Tasks Pending',       value: 5,   sub: 'Require action',       icon: <PendingActionsOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Upcoming Exits',      value: 1,   sub: 'Next 30 days',         icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      {/* Split layout */}
      <Grid container spacing={2}>

        {/* Separation list */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Active Separations</Typography>
            </Box>
            {separations.map((sep) => {
              const isSelected = sep.id === selectedId;
              return (
                <Box
                  key={sep.id}
                  onClick={() => setSelectedId(sep.id)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: isSelected ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' },
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <EmployeeCell name={sep.name} meta={sep.role} />
                    <StatusBadge label={sep.status} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.disabled">Last day: {sep.lastDay}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {sep.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={sep.progress} sx={{ height: 3, borderRadius: 9999 }} />
                </Box>
              );
            })}
          </Card>
        </Grid>


        {/* Clearance checklist */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{selectedEmployee.name}</Typography>
                <Typography variant="caption" color="text.disabled">
                  {selectedEmployee.role} · Last day {selectedEmployee.lastDay}
                </Typography>
              </Box>
              <Chip
                label={`${checklist.filter((c) => c.done).length}/${checklist.length} done`}
                size="small"
                color="primary"
              />
            </Box>

            <Box sx={{ p: 2 }}>
              {owners.map((owner, ownerIdx) => (
                <Box key={owner} sx={{ mb: ownerIdx < owners.length - 1 ? 2 : 0 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.disabled', display: 'block', mb: 1 }}
                  >
                    {owner}
                  </Typography>
                  {checklist.map((item, i) => {
                    if (item.owner !== owner) return null;
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={item.done}
                            onChange={() => toggleItem(i)}
                            size="small"
                            color="success"
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            sx={{ color: item.done ? 'text.disabled' : 'text.primary', textDecoration: item.done ? 'line-through' : 'none' }}
                          >
                            {item.label}
                          </Typography>
                        }
                        sx={{ display: 'flex', ml: 0, mb: 0.5 }}
                      />
                    );
                  })}
                  {ownerIdx < owners.length - 1 && <Divider sx={{ mt: 1.5 }} />}
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
