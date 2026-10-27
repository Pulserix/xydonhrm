'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Policy {
  id: string;
  title: string;
  category: string;
  version: string;
  effectiveDate: string;
  acknowledged: number;
  total: number;
  status: string;
}


interface ComplianceTask {
  id: string;
  task: string;
  assignedTo: string;
  empId: string;
  dueDate: string;
  status: string;
}


const policies: Policy[] = [
  { id: '1', title: 'Code of Conduct',           category: 'HR',         version: 'v3.1', effectiveDate: '01 Jan 2026', acknowledged: 247, total: 247, status: 'Active'   },
  { id: '2', title: 'Data Privacy Policy',       category: 'Legal',      version: 'v2.0', effectiveDate: '15 Mar 2026', acknowledged: 231, total: 247, status: 'Active'   },
  { id: '3', title: 'Anti-Harassment Policy',    category: 'HR',         version: 'v1.5', effectiveDate: '01 Jan 2026', acknowledged: 245, total: 247, status: 'Active'   },
  { id: '4', title: 'IT Security Policy',        category: 'IT',         version: 'v4.0', effectiveDate: '01 Jun 2026', acknowledged: 180, total: 247, status: 'Active'   },
  { id: '5', title: 'Travel & Expense Policy',   category: 'Finance',    version: 'v2.2', effectiveDate: '01 Apr 2026', acknowledged: 247, total: 247, status: 'Active'   },
];


const tasks: ComplianceTask[] = [
  { id: '1', task: 'Complete Data Privacy training',       assignedTo: 'Rohan Gupta',  empId: 'EMP-00131', dueDate: '31 Oct 2026', status: 'Overdue'     },
  { id: '2', task: 'Sign updated Code of Conduct v3.1',   assignedTo: 'Neha Singh',   empId: 'EMP-00119', dueDate: '05 Nov 2026', status: 'Pending'     },
  { id: '3', task: 'Annual compliance certification',     assignedTo: 'Manish Shah',  empId: 'EMP-00110', dueDate: '30 Nov 2026', status: 'In Progress' },
];


export default function CompliancePage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('');


  const filteredPolicies = policies.filter((p) => {
    const matchSearch   = !search   || p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || p.category === category;
    return matchSearch && matchCategory;
  });


  const policyColumns: Column<Policy>[] = [
    {
      key: 'policy',
      label: 'Policy',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.title}</Typography>
          <Typography variant="caption" color="text.disabled">{row.category} · {row.version}</Typography>
        </Box>
      ),
    },
    {
      key: 'effectiveDate',
      label: 'Effective',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.effectiveDate}
        </Typography>
      ),
    },
    {
      key: 'acknowledged',
      label: 'Acknowledged',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.acknowledged}/{row.total}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge label={row.status} />,
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 15 }} /></IconButton>,
    },
  ];


  const taskColumns: Column<ComplianceTask>[] = [
    {
      key: 'task',
      label: 'Task',
      render: (row) => <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.task}</Typography>,
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      render: (row) => <EmployeeCell name={row.assignedTo} meta={row.empId} />,
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.dueDate}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge label={row.status} />,
    },
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Compliance"
        subtitle="Policies, acknowledgments, and compliance tasks"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Policy
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Policies',    value: 5,    sub: 'In effect',                 icon: <VerifiedOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Fully Acknowledged', value: 3,    sub: '100% completion',           icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Pending Tasks',      value: 3,    sub: 'Need employee action',      icon: <HourglassEmptyOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Overdue',            value: 1,    sub: 'Past due date',             icon: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Policies"         />
        <Tab label="Acknowledgments"  />
        <Tab label="Tasks"            />
      </Tabs>


      {tab === 0 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search policies…"
            filters={[
              {
                value: category,
                onChange: setCategory,
                placeholder: 'All Categories',
                options: [
                  { value: 'HR',      label: 'HR'      },
                  { value: 'Legal',   label: 'Legal'   },
                  { value: 'IT',      label: 'IT'      },
                  { value: 'Finance', label: 'Finance' },
                ],
              },
            ]}
            count={`${filteredPolicies.length} policies`}
          />
          <DataTable
            columns={policyColumns}
            rows={filteredPolicies}
            rowKey={(r) => r.id}
            emptyMessage="No policies match the current filters."
          />
        </>
      )}


      {tab === 1 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">Acknowledgment tracker coming soon.</Typography>
        </Box>
      )}


      {tab === 2 && (
        <DataTable
          columns={taskColumns}
          rows={tasks}
          rowKey={(r) => r.id}
          emptyMessage="No compliance tasks."
        />
      )}
    </Box>
  );
}
