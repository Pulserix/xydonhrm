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
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge } from '@/components/hrms';


interface Joiner {
  id: string;
  name: string;
  role: string;
  dept: string;
  joiningDate: string;
  progress: number;
  status: string;
}


interface ChecklistItem {
  label: string;
  done: boolean;
  category: string;
}


const joiners: Joiner[] = [
  { id: '1', name: 'Sanya Mehta',    role: 'Software Engineer', dept: 'Engineering', joiningDate: '25 Oct 2026', progress: 75, status: 'Active'    },
  { id: '2', name: 'Kavya Nair',     role: 'Product Designer',  dept: 'Product',     joiningDate: '01 Nov 2026', progress: 40, status: 'Active'    },
  { id: '3', name: 'Dev Patel',      role: 'Business Analyst',  dept: 'Operations',  joiningDate: '10 Nov 2026', progress: 20, status: 'Upcoming'  },
];


const checklistItems: ChecklistItem[] = [
  { label: 'Offer letter signed',         done: true,  category: 'Documentation' },
  { label: 'ID proof collected',          done: true,  category: 'Documentation' },
  { label: 'Background verification',     done: true,  category: 'Documentation' },
  { label: 'Bank account details',        done: false, category: 'Payroll'       },
  { label: 'PF/ESI enrollment',           done: false, category: 'Payroll'       },
  { label: 'Laptop allocated',            done: true,  category: 'IT Setup'      },
  { label: 'Email account created',       done: true,  category: 'IT Setup'      },
  { label: 'Access cards issued',         done: false, category: 'IT Setup'      },
  { label: 'Induction session completed', done: true,  category: 'Training'      },
  { label: 'Buddy assigned',              done: true,  category: 'Training'      },
  { label: 'Team introduction done',      done: false, category: 'Training'      },
];


export default function OnboardingPage() {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [checklist, setChecklist]   = useState<ChecklistItem[]>(checklistItems);


  const selectedJoiner = joiners.find((j) => j.id === selectedId) ?? joiners[0];


  const toggleItem = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item))
    );
  };


  const categories = Array.from(new Set(checklist.map((c) => c.category)));


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Onboarding"
        subtitle="Track new joiners and their onboarding progress"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Joiner
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Joiners',    value: 3,  sub: 'In onboarding',        icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Tasks Completed',   value: 7,  sub: 'Out of 11 total',      icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Tasks Pending',     value: 4,  sub: 'Require action',       icon: <PendingActionsOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Upcoming Joiners',  value: 1,  sub: 'Next 14 days',         icon: <ScheduleOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      {/* Split layout: joiner list + checklist */}
      <Grid container spacing={2}>

        {/* Joiner list */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Active Joiners</Typography>
            </Box>
            {joiners.map((joiner) => {
              const isSelected = joiner.id === selectedId;
              return (
                <Box
                  key={joiner.id}
                  onClick={() => setSelectedId(joiner.id)}
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
                    <EmployeeCell name={joiner.name} meta={joiner.role} />
                    <StatusBadge label={joiner.status} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.disabled">{joiner.dept}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {joiner.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={joiner.progress} sx={{ height: 3, borderRadius: 9999 }} />
                </Box>
              );
            })}
          </Card>
        </Grid>


        {/* Checklist detail */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{selectedJoiner.name}</Typography>
                <Typography variant="caption" color="text.disabled">
                  {selectedJoiner.role} · Joining {selectedJoiner.joiningDate}
                </Typography>
              </Box>
              <Chip
                label={`${checklist.filter((c) => c.done).length}/${checklist.length} done`}
                size="small"
                color="primary"
              />
            </Box>

            <Box sx={{ p: 2 }}>
              {categories.map((cat, catIdx) => (
                <Box key={cat} sx={{ mb: catIdx < categories.length - 1 ? 2 : 0 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.disabled', display: 'block', mb: 1 }}
                  >
                    {cat}
                  </Typography>
                  {checklist.map((item, i) => {
                    if (item.category !== cat) return null;
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
                  {catIdx < categories.length - 1 && <Divider sx={{ mt: 1.5 }} />}
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
