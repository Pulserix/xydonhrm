'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface PromotionRequest {
  id: string;
  name: string;
  empId: string;
  dept: string;
  currentRole: string;
  proposedRole: string;
  hikePercent: string;
  effectiveDate: string;
  status: string;
}


const promotions: PromotionRequest[] = [
  { id: '1', name: 'Rohan Gupta',   empId: 'EMP-00131', dept: 'Engineering', currentRole: 'Software Engineer',   proposedRole: 'Senior Engineer',    hikePercent: '20%', effectiveDate: '01 Nov 2026', status: 'Pending'   },
  { id: '2', name: 'Kavya Nair',    empId: 'EMP-00127', dept: 'Sales',       currentRole: 'Sales Executive',     proposedRole: 'Senior Executive',   hikePercent: '15%', effectiveDate: '01 Nov 2026', status: 'Approved'  },
  { id: '3', name: 'Manish Shah',   empId: 'EMP-00110', dept: 'Finance',     currentRole: 'Finance Analyst',     proposedRole: 'Senior Analyst',     hikePercent: '18%', effectiveDate: '01 Dec 2026', status: 'Pending'   },
  { id: '4', name: 'Divya Singh',   empId: 'EMP-00104', dept: 'Engineering', currentRole: 'UI/UX Designer',      proposedRole: 'Lead Designer',      hikePercent: '22%', effectiveDate: '01 Dec 2026', status: 'Rejected'  },
  { id: '5', name: 'Priya Kumar',   empId: 'EMP-00142', dept: 'Operations',  currentRole: 'Senior Manager',      proposedRole: 'Operations Director', hikePercent: '25%', effectiveDate: '01 Jan 2027', status: 'Pending'   },
];


export default function PromotionsPage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('');
  const [status, setStatus]   = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const filtered = promotions.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !dept   || p.dept   === dept;
    const matchStatus = !status || p.status === status;
    return matchSearch && matchDept && matchStatus;
  });


  const columns: Column<PromotionRequest>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (row) => <EmployeeCell name={row.name} meta={row.empId} />,
    },
    {
      key: 'roles',
      label: 'Promotion',
      render: (row) => (
        <Box>
          <Typography variant="body2" color="text.disabled" sx={{ fontSize: 11 }}>{row.currentRole}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>→ {row.proposedRole}</Typography>
        </Box>
      ),
    },
    {
      key: 'dept',
      label: 'Department',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.dept}</Typography>,
    },
    {
      key: 'hikePercent',
      label: 'Hike',
      render: (row) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: 12, color: 'success.light', fontWeight: 600 }}>
          {row.hikePercent}
        </Typography>
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


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Promotions"
        subtitle="Manage promotion requests and compensation changes"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Raise Promotion
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Pending Promotions', value: 3,     sub: 'Awaiting approval',    icon: <TrendingUpOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Approved This Qtr',  value: 8,     sub: 'Out of 11 requested',  icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Total Impacted',     value: 11,    sub: 'Employees promoted',   icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Avg. Hike',          value: '18%', sub: 'Across all approvals', icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Pending"      />
        <Tab label="Compensation" />
        <Tab label="History"      />
      </Tabs>


      {tab === 0 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search employees…"
            filters={[
              {
                value: dept,
                onChange: setDept,
                placeholder: 'All Departments',
                options: [
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Sales',       label: 'Sales'       },
                  { value: 'Finance',     label: 'Finance'     },
                  { value: 'Operations',  label: 'Operations'  },
                ],
              },
              {
                value: status,
                onChange: setStatus,
                placeholder: 'All Statuses',
                options: [
                  { value: 'Pending',  label: 'Pending'  },
                  { value: 'Approved', label: 'Approved' },
                  { value: 'Rejected', label: 'Rejected' },
                ],
              },
            ]}
            count={`${filtered.length} requests`}
          />
          <DataTable
            columns={columns}
            rows={filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            rowKey={(r) => r.id}
            totalCount={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
            emptyMessage="No promotion requests match the current filters."
          />
        </>
      )}


      {tab !== 0 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">No data available.</Typography>
        </Box>
      )}
    </Box>
  );
}
