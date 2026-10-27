'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface ReviewCycle {
  id: string;
  name: string;
  period: string;
  participants: number;
  completed: number;
  status: string;
  dueDate: string;
}


interface Goal {
  id: string;
  title: string;
  owner: string;
  empId: string;
  dept: string;
  progress: number;
  dueDate: string;
  status: string;
}


const reviewCycles: ReviewCycle[] = [
  { id: '1', name: 'Q3 2026 Performance Review',  period: 'Jul – Sep 2026', participants: 247, completed: 231, status: 'Active',    dueDate: '30 Oct 2026' },
  { id: '2', name: 'Mid-Year Check-in',           period: 'Jan – Jun 2026', participants: 240, completed: 240, status: 'Completed', dueDate: '31 Jul 2026' },
  { id: '3', name: 'Annual Review 2025',          period: 'Jan – Dec 2025', participants: 215, completed: 215, status: 'Completed', dueDate: '31 Jan 2026' },
];


const goals: Goal[] = [
  { id: '1', title: 'Launch mobile app v2.0',         owner: 'Rohan Gupta',   empId: 'EMP-00131', dept: 'Engineering', progress: 85, dueDate: '31 Oct 2026', status: 'On Track'  },
  { id: '2', title: 'Increase sales quota by 20%',    owner: 'Amit Verma',    empId: 'EMP-00138', dept: 'Sales',       progress: 62, dueDate: '31 Dec 2026', status: 'On Track'  },
  { id: '3', title: 'Implement HR automation',        owner: 'Nisha Mehta',   empId: 'EMP-00092', dept: 'HR',          progress: 35, dueDate: '30 Nov 2026', status: 'At Risk'   },
  { id: '4', title: 'Reduce operational costs 15%',   owner: 'Vikram Rao',    empId: 'EMP-00098', dept: 'Operations',  progress: 90, dueDate: '31 Oct 2026', status: 'On Track'  },
  { id: '5', title: 'Product roadmap Q4 planning',    owner: 'Neha Singh',    empId: 'EMP-00119', dept: 'Product',     progress: 20, dueDate: '15 Nov 2026', status: 'Behind'    },
];


export default function PerformancePage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const filteredGoals = goals.filter((g) => {
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.owner.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !dept   || g.dept === dept;
    return matchSearch && matchDept;
  });


  const cycleColumns: Column<ReviewCycle>[] = [
    {
      key: 'name',
      label: 'Review Cycle',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.name}</Typography>
          <Typography variant="caption" color="text.disabled">{row.period}</Typography>
        </Box>
      ),
    },
    {
      key: 'completion',
      label: 'Completion',
      render: (row) => {
        const pct = Math.round((row.completed / row.participants) * 100);
        return (
          <Box sx={{ minWidth: 120 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.disabled">{row.completed}/{row.participants}</Typography>
              <Typography variant="caption" color="text.secondary">{pct}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={pct} sx={{ height: 4, borderRadius: 9999 }} />
          </Box>
        );
      },
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
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 15 }} /></IconButton>
      ),
    },
  ];


  const goalColumns: Column<Goal>[] = [
    {
      key: 'title',
      label: 'Goal',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.title}</Typography>
      ),
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (row) => <EmployeeCell name={row.owner} meta={row.dept} />,
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (row) => (
        <Box sx={{ minWidth: 100 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.disabled">{row.progress}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={row.progress} sx={{ height: 4, borderRadius: 9999 }} />
        </Box>
      ),
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
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 15 }} /></IconButton>
      ),
    },
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Performance"
        subtitle="Review cycles, goals, and employee ratings"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            New Cycle
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Cycles',      value: 1,    sub: 'Q3 2026 in progress',    icon: <TrendingUpOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Avg. Rating',        value: '4.1', sub: 'Out of 5.0',            icon: <StarBorderOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Reviews Done',       value: 231,  sub: '93.5% completion',        icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Pending Reviews',    value: 16,   sub: 'Due in 3 days',           icon: <PendingActionsOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Review Cycles" />
        <Tab label="Goals"         />
      </Tabs>


      {tab === 0 && (
        <DataTable
          columns={cycleColumns}
          rows={reviewCycles}
          rowKey={(r) => r.id}
          emptyMessage="No review cycles found."
        />
      )}


      {tab === 1 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search goals or owners…"
            filters={[
              {
                value: dept,
                onChange: setDept,
                placeholder: 'All Departments',
                options: [
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Sales',       label: 'Sales'       },
                  { value: 'Operations',  label: 'Operations'  },
                  { value: 'HR',          label: 'HR'          },
                  { value: 'Product',     label: 'Product'     },
                ],
              },
            ]}
            count={`${filteredGoals.length} goals`}
          />

          <DataTable
            columns={goalColumns}
            rows={filteredGoals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            rowKey={(r) => r.id}
            totalCount={filteredGoals.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
            emptyMessage="No goals match the current filters."
          />
        </>
      )}
    </Box>
  );
}
