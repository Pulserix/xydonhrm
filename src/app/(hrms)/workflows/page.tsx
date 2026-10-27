'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Workflow {
  id: string;
  name: string;
  trigger: string;
  category: string;
  steps: number;
  lastRun: string;
  runsThisMonth: number;
  isEnabled: boolean;
  status: string;
}

interface WorkflowRun {
  id: string;
  workflow: string;
  triggeredBy: string;
  startedAt: string;
  duration: string;
  status: string;
}


const workflows: Workflow[] = [
  { id: 'WF-01', name: 'New Employee Onboarding',      trigger: 'Employee Created',      category: 'Onboarding',   steps: 8, lastRun: '27 Oct 2026', runsThisMonth: 3,  isEnabled: true,  status: 'Active' },
  { id: 'WF-02', name: 'Leave Approval Chain',         trigger: 'Leave Request Raised',  category: 'Leave',        steps: 3, lastRun: '27 Oct 2026', runsThisMonth: 24, isEnabled: true,  status: 'Active' },
  { id: 'WF-03', name: 'Expense Approval',             trigger: 'Expense Submitted',     category: 'Finance',      steps: 2, lastRun: '25 Oct 2026', runsThisMonth: 8,  isEnabled: true,  status: 'Active' },
  { id: 'WF-04', name: 'Offboarding Clearance',        trigger: 'Resignation Accepted',  category: 'Offboarding',  steps: 6, lastRun: '20 Oct 2026', runsThisMonth: 1,  isEnabled: true,  status: 'Active' },
  { id: 'WF-05', name: 'Probation Completion Alert',   trigger: 'Scheduled (90d)',       category: 'Lifecycle',    steps: 2, lastRun: '15 Oct 2026', runsThisMonth: 4,  isEnabled: true,  status: 'Active' },
  { id: 'WF-06', name: 'Payroll Lock Notification',    trigger: 'Payroll Locked',        category: 'Payroll',      steps: 1, lastRun: '01 Oct 2026', runsThisMonth: 1,  isEnabled: false, status: 'Paused' },
];

const runs: WorkflowRun[] = [
  { id: 'RUN-018', workflow: 'New Employee Onboarding',    triggeredBy: 'System (auto)', startedAt: '27 Oct 2026 09:10', duration: '2m 14s', status: 'Completed'  },
  { id: 'RUN-017', workflow: 'Leave Approval Chain',       triggeredBy: 'Ankit Verma',   startedAt: '27 Oct 2026 08:55', duration: '14s',    status: 'Completed'  },
  { id: 'RUN-016', workflow: 'Expense Approval',           triggeredBy: 'Priya Sharma',  startedAt: '25 Oct 2026 14:20', duration: '11s',    status: 'Completed'  },
  { id: 'RUN-015', workflow: 'Leave Approval Chain',       triggeredBy: 'Rohan Joshi',   startedAt: '24 Oct 2026 10:30', duration: '8s',     status: 'Completed'  },
  { id: 'RUN-014', workflow: 'Offboarding Clearance',      triggeredBy: 'System (auto)', startedAt: '20 Oct 2026 16:05', duration: '5m 02s', status: 'In Progress'},
];

const wfColumns: Column<Workflow>[] = [
  { key: 'name',          header: 'Workflow',     render: (r) => <Box><Typography variant="body2">{r.name}</Typography><Typography variant="caption" color="text.disabled">{r.trigger}</Typography></Box> },
  { key: 'category',      header: 'Category',     render: (r) => <Chip label={r.category} size="small" variant="outlined" /> },
  { key: 'steps',         header: 'Steps',        render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.steps}</Typography> },
  { key: 'runsThisMonth', header: 'Runs (Mo)',    render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.runsThisMonth}</Typography> },
  { key: 'lastRun',       header: 'Last Run',     render: (r) => <Typography variant="body2" color="text.disabled">{r.lastRun}</Typography> },
  { key: 'isEnabled',     header: 'Enabled',      render: (r) => <Switch size="small" checked={r.isEnabled} onChange={() => {}} /> },
  { key: 'status',        header: 'Status',       render: (r) => <StatusBadge label={r.status} /> },
];

const runColumns: Column<WorkflowRun>[] = [
  { key: 'id',          header: 'Run ID',     render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>{r.id}</Typography> },
  { key: 'workflow',    header: 'Workflow',   render: (r) => <Typography variant="body2">{r.workflow}</Typography> },
  { key: 'triggeredBy', header: 'Triggered',  render: (r) => <Typography variant="body2" color="text.secondary">{r.triggeredBy}</Typography> },
  { key: 'startedAt',   header: 'Started At', render: (r) => <Typography variant="body2" color="text.disabled">{r.startedAt}</Typography> },
  { key: 'duration',    header: 'Duration',   render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{r.duration}</Typography> },
  { key: 'status',      header: 'Status',     render: (r) => <StatusBadge label={r.status} /> },
];


export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Workflows"
        subtitle="Automate approvals, notifications, and HR processes"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            New Workflow
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Workflows', value: 5,   sub: '1 paused',           icon: <AccountTreeOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Runs This Month',  value: 41,  sub: 'Across all workflows',icon: <PlayArrowOutlinedIcon   sx={{ fontSize: 18 }} /> },
          { label: 'Avg Run Time',     value: '38s',sub: 'All completed',      icon: <PlayArrowOutlinedIcon   sx={{ fontSize: 18 }} /> },
          { label: 'Success Rate',     value: '98%',sub: 'Last 30 days',       icon: <AccountTreeOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="All Workflows" />
            <Tab label="Run History" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={workflows} columns={wfColumns} />}
        {activeTab === 1 && <DataTable noCard rows={runs}      columns={runColumns} />}
      </Card>
    </Box>
  );
}
