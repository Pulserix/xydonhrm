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
import Avatar from '@mui/material/Avatar';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface ApprovalItem {
  id: string;
  type: string;
  requestedBy: string;
  department: string;
  requestedOn: string;
  priority: string;
  summary: string;
  status: string;
}


const approvals: ApprovalItem[] = [
  { id: 'APR-012', type: 'Leave',        requestedBy: 'Ankit Verma',   department: 'Engineering', requestedOn: '26 Oct 2026', priority: 'Normal', summary: 'Casual Leave · 3 days (29–31 Oct)',      status: 'Pending'     },
  { id: 'APR-011', type: 'Expense',      requestedBy: 'Priya Sharma',  department: 'Sales',       requestedOn: '25 Oct 2026', priority: 'High',   summary: 'Client travel reimbursement · ₹12,400',  status: 'Pending'     },
  { id: 'APR-010', type: 'Regularisation',requestedBy: 'Rohan Joshi',  department: 'Marketing',   requestedOn: '24 Oct 2026', priority: 'Normal', summary: 'Missing punch · 22 Oct 2026',            status: 'Pending'     },
  { id: 'APR-009', type: 'Shift Change', requestedBy: 'Deepak Raj',    department: 'Operations',  requestedOn: '23 Oct 2026', priority: 'Normal', summary: 'Morning → Evening · 28 Oct onwards',     status: 'Pending'     },
  { id: 'APR-008', type: 'WFH',          requestedBy: 'Meera Pillai',  department: 'HR',          requestedOn: '22 Oct 2026', priority: 'Normal', summary: 'Work from home · 27–28 Oct',             status: 'Approved'    },
  { id: 'APR-007', type: 'Overtime',     requestedBy: 'Vikram Singh',  department: 'Operations',  requestedOn: '20 Oct 2026', priority: 'Normal', summary: 'OT approval · 4 hours · 19 Oct',         status: 'Approved'    },
  { id: 'APR-006', type: 'Leave',        requestedBy: 'Kavitha Nair',  department: 'Finance',     requestedOn: '18 Oct 2026', priority: 'High',   summary: 'Sick leave · 1 day (19 Oct)',            status: 'Approved'    },
  { id: 'APR-005', type: 'Expense',      requestedBy: 'Suresh Kumar',  department: 'Operations',  requestedOn: '17 Oct 2026', priority: 'Normal', summary: 'Stationery & office supplies · ₹3,200',  status: 'Rejected'    },
];

const pendingApprovals = approvals.filter((a) => a.status === 'Pending');
const processedApprovals = approvals.filter((a) => a.status !== 'Pending');


function buildColumns(showActions: boolean): Column<ApprovalItem>[] {
  const base: Column<ApprovalItem>[] = [
    {
      key: 'requestedBy', header: 'Requested By',
      render: (r) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: 'hsl(243,75%,44%)' }}>
            {r.requestedBy.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </Avatar>
          <Box>
            <Typography variant="body2">{r.requestedBy}</Typography>
            <Typography variant="caption" color="text.disabled">{r.department}</Typography>
          </Box>
        </Box>
      ),
    },
    { key: 'type',        header: 'Type',       render: (r) => <Chip label={r.type} size="small" variant="outlined" /> },
    { key: 'summary',     header: 'Summary',    render: (r) => <Typography variant="body2" color="text.secondary">{r.summary}</Typography> },
    { key: 'requestedOn', header: 'Requested',  render: (r) => <Typography variant="body2" color="text.disabled">{r.requestedOn}</Typography> },
    { key: 'priority',    header: 'Priority',   render: (r) => r.priority === 'High' ? <Chip label="High" size="small" color="error" /> : <Typography variant="caption" color="text.disabled">Normal</Typography> },
    { key: 'status',      header: 'Status',     render: (r) => <StatusBadge label={r.status} /> },
  ];

  if (showActions) {
    base.push({
      key: 'actions', header: '',
      render: () => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="contained" color="success" startIcon={<CheckOutlinedIcon sx={{ fontSize: 13 }} />}>Approve</Button>
          <Button size="small" variant="outlined" color="error" startIcon={<CloseOutlinedIcon sx={{ fontSize: 13 }} />}>Reject</Button>
        </Box>
      ),
    });
  }

  return base;
}


export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Approvals"
        subtitle="Pending requests awaiting your action"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Pending',        value: 4,  sub: 'Needs action',       icon: <PendingActionsOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Approved Today', value: 3,  sub: 'This week: 11',      icon: <TaskAltOutlinedIcon        sx={{ fontSize: 18 }} /> },
          { label: 'High Priority',  value: 1,  sub: 'Immediate action',   icon: <PendingActionsOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Avg. TAT',       value: '4h', sub: 'Resolution time',  icon: <TaskAltOutlinedIcon        sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label={`Pending (${pendingApprovals.length})`} />
            <Tab label="Processed" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <DataTable noCard rows={pendingApprovals} columns={buildColumns(true)} />
        )}

        {activeTab === 1 && (
          <DataTable noCard rows={processedApprovals} columns={buildColumns(false)} />
        )}
      </Card>
    </Box>
  );
}
