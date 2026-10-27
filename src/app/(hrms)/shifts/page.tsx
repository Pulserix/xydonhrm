'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: string;
  type: string;
  assigned: number;
  status: string;
}

interface ShiftAssignment {
  id: string;
  employee: string;
  department: string;
  shift: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
}


const shifts: Shift[] = [
  { id: 'SH-01', name: 'Morning',        startTime: '07:00', endTime: '15:00', duration: '8h', type: 'Fixed',    assigned: 48, status: 'Active' },
  { id: 'SH-02', name: 'General',        startTime: '09:00', endTime: '18:00', duration: '9h', type: 'Fixed',    assigned: 131, status: 'Active' },
  { id: 'SH-03', name: 'Evening',        startTime: '14:00', endTime: '22:00', duration: '8h', type: 'Fixed',    assigned: 35, status: 'Active' },
  { id: 'SH-04', name: 'Night',          startTime: '22:00', endTime: '06:00', duration: '8h', type: 'Fixed',    assigned: 22, status: 'Active' },
  { id: 'SH-05', name: 'Rotational A',   startTime: 'Varies', endTime: 'Varies', duration: '8h', type: 'Rotational', assigned: 11, status: 'Active' },
];

const assignments: ShiftAssignment[] = [
  { id: 'SA-01', employee: 'Rahul Mehta',    department: 'Engineering', shift: 'General',  effectiveFrom: '01 Oct 2026', effectiveTo: 'Ongoing', status: 'Active' },
  { id: 'SA-02', employee: 'Ananya Iyer',    department: 'Operations',  shift: 'Morning',  effectiveFrom: '15 Sep 2026', effectiveTo: 'Ongoing', status: 'Active' },
  { id: 'SA-03', employee: 'Vikram Singh',   department: 'Operations',  shift: 'Night',    effectiveFrom: '01 Oct 2026', effectiveTo: 'Ongoing', status: 'Active' },
  { id: 'SA-04', employee: 'Kavitha Nair',   department: 'Finance',     shift: 'General',  effectiveFrom: '01 Jul 2026', effectiveTo: 'Ongoing', status: 'Active' },
  { id: 'SA-05', employee: 'Deepak Raj',     department: 'Sales',       shift: 'Evening',  effectiveFrom: '01 Oct 2026', effectiveTo: '31 Dec 2026', status: 'Active' },
];



const shiftColumns: Column<Shift>[] = [
  { key: 'name',      header: 'Shift Name', render: (r) => <Typography variant="body2">{r.name}</Typography> },
  { key: 'startTime', header: 'Start',      render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.startTime}</Typography> },
  { key: 'endTime',   header: 'End',        render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.endTime}</Typography> },
  { key: 'duration',  header: 'Duration',   render: (r) => <Typography variant="body2" color="text.secondary">{r.duration}</Typography> },
  { key: 'type',      header: 'Type',       render: (r) => <Chip label={r.type} size="small" variant="outlined" /> },
  { key: 'assigned',  header: 'Assigned',   render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.assigned}</Typography> },
  { key: 'status',    header: 'Status',     render: (r) => <StatusBadge label={r.status} /> },
];

const assignmentColumns: Column<ShiftAssignment>[] = [
  { key: 'employee',      header: 'Employee',    render: (r) => <Typography variant="body2">{r.employee}</Typography> },
  { key: 'department',    header: 'Department',  render: (r) => <Typography variant="body2" color="text.secondary">{r.department}</Typography> },
  { key: 'shift',         header: 'Shift',       render: (r) => <Chip label={r.shift} size="small" variant="outlined" /> },
  { key: 'effectiveFrom', header: 'From',        render: (r) => <Typography variant="body2" color="text.disabled">{r.effectiveFrom}</Typography> },
  { key: 'effectiveTo',   header: 'To',          render: (r) => <Typography variant="body2" color="text.disabled">{r.effectiveTo}</Typography> },
  { key: 'status',        header: 'Status',      render: (r) => <StatusBadge label={r.status} /> },
];


export default function ShiftsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Shift Management"
        subtitle="Define and assign work shifts"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            New Shift
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Shift Types',       value: 5,   sub: '1 rotational',        icon: <WatchLaterOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Employees Assigned',value: 247, sub: '100% coverage',       icon: <PeopleOutlinedIcon    sx={{ fontSize: 18 }} /> },
          { label: 'Night Shift',       value: 22,  sub: 'Active employees',    icon: <WatchLaterOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Shift Changes',     value: 8,   sub: 'Pending this week',   icon: <PeopleOutlinedIcon    sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Shift Types" />
            <Tab label="Assignments" />
            <Tab label="Schedule" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            <DataTable noCard rows={shifts} columns={shiftColumns} />
          </>
        )}

        {activeTab === 1 && (
          <>
            <DataTable noCard rows={assignments} columns={assignmentColumns} />
          </>
        )}

        {activeTab === 2 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <WatchLaterOutlinedIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body2" color="text.disabled">Weekly schedule view coming soon.</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
