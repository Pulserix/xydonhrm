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
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface HeadcountPlan {
  id: string;
  department: string;
  current: number;
  approved: number;
  open: number;
  target: number;
  quarter: string;
  status: string;
}

interface Position {
  id: string;
  title: string;
  department: string;
  band: string;
  budgeted: boolean;
  priority: string;
  openedOn: string;
  status: string;
}


const plans: HeadcountPlan[] = [
  { id: 'HC-01', department: 'Engineering', current: 72, approved: 80, open: 5,  target: 80,  quarter: 'Q4 FY26', status: 'Active' },
  { id: 'HC-02', department: 'Sales',       current: 54, approved: 65, open: 8,  target: 65,  quarter: 'Q4 FY26', status: 'Active' },
  { id: 'HC-03', department: 'Operations',  current: 47, approved: 50, open: 2,  target: 50,  quarter: 'Q4 FY26', status: 'Active' },
  { id: 'HC-04', department: 'Finance',     current: 31, approved: 33, open: 1,  target: 33,  quarter: 'Q4 FY26', status: 'Active' },
  { id: 'HC-05', department: 'HR',          current: 18, approved: 20, open: 0,  target: 20,  quarter: 'Q4 FY26', status: 'Active' },
  { id: 'HC-06', department: 'Marketing',   current: 25, approved: 30, open: 3,  target: 30,  quarter: 'Q4 FY26', status: 'Active' },
];

const positions: Position[] = [
  { id: 'POS-001', title: 'Sr. Software Engineer',  department: 'Engineering', band: 'L4', budgeted: true,  priority: 'High',   openedOn: '01 Oct 2026', status: 'Open'       },
  { id: 'POS-002', title: 'Software Engineer',       department: 'Engineering', band: 'L3', budgeted: true,  priority: 'High',   openedOn: '01 Oct 2026', status: 'Open'       },
  { id: 'POS-003', title: 'Sales Manager',           department: 'Sales',       band: 'L5', budgeted: true,  priority: 'High',   openedOn: '15 Sep 2026', status: 'Open'       },
  { id: 'POS-004', title: 'Sales Executive (x5)',    department: 'Sales',       band: 'L2', budgeted: true,  priority: 'Normal', openedOn: '15 Sep 2026', status: 'Open'       },
  { id: 'POS-005', title: 'Ops Analyst',             department: 'Operations',  band: 'L3', budgeted: true,  priority: 'Normal', openedOn: '20 Sep 2026', status: 'In Progress'},
  { id: 'POS-006', title: 'Finance Analyst',         department: 'Finance',     band: 'L3', budgeted: false, priority: 'Low',    openedOn: '10 Oct 2026', status: 'Pending Approval'},
];


const planColumns: Column<HeadcountPlan>[] = [
  { key: 'department', header: 'Department',  render: (r) => <Typography variant="body2">{r.department}</Typography> },
  { key: 'current',    header: 'Current',     render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.current}</Typography> },
  { key: 'approved',   header: 'Approved',    render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.approved}</Typography> },
  { key: 'open',       header: 'Open Roles',  render: (r) => r.open > 0 ? <Chip label={r.open} size="small" color="warning" /> : <Typography variant="caption" color="text.disabled">—</Typography> },
  {
    key: 'fill', header: 'Fill Rate',
    render: (r) => (
      <Box sx={{ minWidth: 100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption">{Math.round((r.current / r.target) * 100)}%</Typography>
          <Typography variant="caption" color="text.disabled">{r.quarter}</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(r.current / r.target) * 100}
          sx={{ height: 4, borderRadius: 9999 }}
        />
      </Box>
    ),
  },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge label={r.status} /> },
];

const positionColumns: Column<Position>[] = [
  { key: 'id',         header: 'ID',          render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>{r.id}</Typography> },
  { key: 'title',      header: 'Position',    render: (r) => <Typography variant="body2">{r.title}</Typography> },
  { key: 'department', header: 'Dept',        render: (r) => <Typography variant="body2" color="text.secondary">{r.department}</Typography> },
  { key: 'band',       header: 'Band',        render: (r) => <Chip label={r.band} size="small" variant="outlined" sx={{ fontFamily: 'monospace' }} /> },
  { key: 'budgeted',   header: 'Budgeted',    render: (r) => r.budgeted ? <Chip label="Yes" size="small" color="success" /> : <Chip label="No" size="small" color="default" /> },
  { key: 'priority',   header: 'Priority',    render: (r) => r.priority === 'High' ? <Chip label="High" size="small" color="error" /> : <Typography variant="caption" color="text.disabled">{r.priority}</Typography> },
  { key: 'openedOn',   header: 'Opened',      render: (r) => <Typography variant="body2" color="text.disabled">{r.openedOn}</Typography> },
  { key: 'status',     header: 'Status',      render: (r) => <StatusBadge label={r.status} /> },
];


export default function HeadcountPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Headcount Planning"
        subtitle="Approved positions, open roles, and hiring targets"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Position
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Current Headcount', value: 247,  sub: '+3 this month',      icon: <GroupsOutlinedIcon       sx={{ fontSize: 18 }} /> },
          { label: 'Approved Target',   value: 278,  sub: 'Q4 FY26',            icon: <TrendingUpOutlinedIcon   sx={{ fontSize: 18 }} /> },
          { label: 'Open Positions',    value: 19,   sub: 'Across all depts',   icon: <GroupsOutlinedIcon       sx={{ fontSize: 18 }} /> },
          { label: 'Fill Rate',         value: '89%',sub: 'vs target',          icon: <TrendingUpOutlinedIcon   sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Department Plan" />
            <Tab label="Open Positions" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={plans}     columns={planColumns}     />}

        {activeTab === 1 && (
          <>
            <DataTable noCard rows={positions} columns={positionColumns} />
          </>
        )}
      </Card>
    </Box>
  );
}
