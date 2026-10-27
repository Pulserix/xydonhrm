'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LinearProgress from '@mui/material/LinearProgress';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface TimesheetRecord {
  id: string;
  employee: string;
  department: string;
  weekEnding: string;
  totalHours: number;
  billableHours: number;
  projects: string;
  status: string;
}


const timesheets: TimesheetRecord[] = [
  { id: 'TS-001', employee: 'Ankit Verma',   department: 'Engineering', weekEnding: '26 Oct 2026', totalHours: 45, billableHours: 40, projects: 'ProjectX, Internal', status: 'Submitted'     },
  { id: 'TS-002', employee: 'Rohan Joshi',   department: 'Marketing',   weekEnding: '26 Oct 2026', totalHours: 42, billableHours: 38, projects: 'Campaign-Q4',        status: 'Approved'      },
  { id: 'TS-003', employee: 'Deepak Raj',    department: 'Operations',  weekEnding: '26 Oct 2026', totalHours: 48, billableHours: 48, projects: 'OpsCore',             status: 'Submitted'     },
  { id: 'TS-004', employee: 'Kavitha Nair',  department: 'Finance',     weekEnding: '26 Oct 2026', totalHours: 40, billableHours: 35, projects: 'FinReporting',        status: 'Approved'      },
  { id: 'TS-005', employee: 'Priya Sharma',  department: 'Sales',       weekEnding: '26 Oct 2026', totalHours: 0,  billableHours: 0,  projects: '—',                   status: 'Not Submitted' },
  { id: 'TS-006', employee: 'Vikram Singh',  department: 'Operations',  weekEnding: '26 Oct 2026', totalHours: 22, billableHours: 20, projects: 'OpsCore',             status: 'Partially Submitted' },
  { id: 'TS-007', employee: 'Meera Pillai',  department: 'HR',          weekEnding: '19 Oct 2026', totalHours: 40, billableHours: 32, projects: 'HR-Automation',       status: 'Approved'      },
  { id: 'TS-008', employee: 'Suresh Kumar',  department: 'Operations',  weekEnding: '19 Oct 2026', totalHours: 44, billableHours: 44, projects: 'OpsCore',             status: 'Approved'      },
];


const tsColumns: Column<TimesheetRecord>[] = [
  { key: 'employee',      header: 'Employee',     render: (r) => <Box><Typography variant="body2">{r.employee}</Typography><Typography variant="caption" color="text.disabled">{r.department}</Typography></Box> },
  { key: 'weekEnding',    header: 'Week Ending',  render: (r) => <Typography variant="body2" color="text.secondary">{r.weekEnding}</Typography> },
  {
    key: 'totalHours', header: 'Total Hours',
    render: (r) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', width: 28, flexShrink: 0 }}>{r.totalHours}h</Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min((r.totalHours / 48) * 100, 100)}
          sx={{ flex: 1, height: 4, borderRadius: 9999, minWidth: 60 }}
        />
      </Box>
    ),
  },
  { key: 'billableHours', header: 'Billable',     render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'success.light' }}>{r.billableHours}h</Typography> },
  { key: 'projects',      header: 'Projects',     render: (r) => <Typography variant="body2" color="text.secondary">{r.projects}</Typography> },
  { key: 'status',        header: 'Status',       render: (r) => <StatusBadge label={r.status} /> },
];


export default function TimesheetsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const pending = timesheets.filter((t) => t.status === 'Submitted');

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Timesheets"
        subtitle="Weekly hours, project allocation, and approvals"
        actions={
          <Button variant="contained" size="small">Submit Timesheet</Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Submitted',      value: 2,    sub: 'Pending approval',   icon: <TaskAltOutlinedIcon  sx={{ fontSize: 18 }} /> },
          { label: 'Not Submitted',  value: 1,    sub: 'Action needed',      icon: <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Avg Hours/Week', value: '41h',sub: 'Team average',       icon: <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Billable Rate',  value: '89%',sub: 'This week',          icon: <PeopleOutlinedIcon   sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label={`Pending Approval (${pending.length})`} />
            <Tab label="All Timesheets" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={pending}    columns={tsColumns} />}
        {activeTab === 1 && <DataTable noCard rows={timesheets} columns={tsColumns} />}
      </Card>
    </Box>
  );
}
