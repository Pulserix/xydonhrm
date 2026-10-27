'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface DisciplinaryCase {
  id: string;
  caseId: string;
  name: string;
  empId: string;
  dept: string;
  type: string;
  severity: string;
  openedOn: string;
  status: string;
}


const cases: DisciplinaryCase[] = [
  { id: '1', caseId: 'DC-0014', name: 'Amit Verma',    empId: 'EMP-00138', dept: 'Sales',       type: 'Attendance',          severity: 'Minor',   openedOn: '15 Oct 2026', status: 'Under Review' },
  { id: '2', caseId: 'DC-0013', name: 'Deepa Pillai',  empId: 'EMP-00086', dept: 'Operations',  type: 'Code of Conduct',     severity: 'Moderate', openedOn: '10 Oct 2026', status: 'Hearing'      },
  { id: '3', caseId: 'DC-0012', name: 'Vikram Rao',    empId: 'EMP-00098', dept: 'Operations',  type: 'Performance',         severity: 'Minor',   openedOn: '01 Sep 2026', status: 'Resolved'     },
  { id: '4', caseId: 'DC-0011', name: 'Neha Singh',    empId: 'EMP-00119', dept: 'Product',     type: 'Policy Violation',    severity: 'Minor',   openedOn: '20 Aug 2026', status: 'Closed'       },
];


export default function DisciplinaryPage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const activeCases  = cases.filter((c) => c.status !== 'Closed' && c.status !== 'Resolved');
  const closedCases  = cases.filter((c) => c.status === 'Closed' || c.status === 'Resolved');


  const currentRows  = tab === 0 ? activeCases : closedCases;
  const filtered     = currentRows.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.caseId.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !dept   || c.dept === dept;
    return matchSearch && matchDept;
  });


  const columns: Column<DisciplinaryCase>[] = [
    {
      key: 'case',
      label: 'Case',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace', fontSize: 12 }}>{row.caseId}</Typography>
          <Typography variant="caption" color="text.disabled">{row.type}</Typography>
        </Box>
      ),
    },
    {
      key: 'employee',
      label: 'Employee',
      render: (row) => <EmployeeCell name={row.name} meta={row.empId} />,
    },
    {
      key: 'dept',
      label: 'Department',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.dept}</Typography>,
    },
    {
      key: 'severity',
      label: 'Severity',
      render: (row) => <StatusBadge label={row.severity} />,
    },
    {
      key: 'openedOn',
      label: 'Opened',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.openedOn}
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
        title="Disciplinary"
        subtitle="Manage disciplinary cases and proceedings"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Raise Case
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Cases',       value: 2,  sub: 'Under review or hearing', icon: <GavelOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Hearings Scheduled', value: 1,  sub: 'This week',               icon: <HourglassEmptyOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Resolved (YTD)',     value: 9,  sub: 'Closed this year',         icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Warnings Issued',    value: 14, sub: 'This year',                icon: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => { setTab(v); setPage(0); }} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Active Cases" />
        <Tab label="Closed Cases" />
      </Tabs>


      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or case ID…"
        filters={[
          {
            value: dept,
            onChange: setDept,
            placeholder: 'All Departments',
            options: [
              { value: 'Sales',      label: 'Sales'      },
              { value: 'Operations', label: 'Operations' },
              { value: 'Product',    label: 'Product'    },
            ],
          },
        ]}
        count={`${filtered.length} cases`}
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
        emptyMessage="No cases found."
      />
    </Box>
  );
}
