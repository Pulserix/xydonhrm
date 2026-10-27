'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';

interface Employee {
  id: string;
  name: string;
  empId: string;
  dept: string;
  designation: string;
  branch: string;
  status: string;
  joined: string;
}

const employees: Employee[] = [
  { id: '1', name: 'Priya Kumar',   empId: 'EMP-00142', dept: 'Operations',  designation: 'Senior Manager',    branch: 'Mumbai HQ', status: 'Active',    joined: '14 Mar 2024' },
  { id: '2', name: 'Amit Verma',    empId: 'EMP-00138', dept: 'Sales',       designation: 'Executive',          branch: 'Delhi',     status: 'On Leave',  joined: '07 Jan 2023' },
  { id: '3', name: 'Rohan Gupta',   empId: 'EMP-00131', dept: 'Engineering', designation: 'Software Engineer',  branch: 'Bangalore', status: 'Active',    joined: '22 Aug 2022' },
  { id: '4', name: 'Kavya Nair',    empId: 'EMP-00127', dept: 'Sales',       designation: 'Executive',          branch: 'Mumbai HQ', status: 'Active',    joined: '01 May 2022' },
  { id: '5', name: 'Neha Singh',    empId: 'EMP-00119', dept: 'Product',     designation: 'Product Manager',    branch: 'Bangalore', status: 'Probation', joined: '10 Sep 2026' },
  { id: '6', name: 'Manish Shah',   empId: 'EMP-00110', dept: 'Finance',     designation: 'Finance Analyst',    branch: 'Mumbai HQ', status: 'Active',    joined: '03 Mar 2021' },
  { id: '7', name: 'Divya Singh',   empId: 'EMP-00104', dept: 'Engineering', designation: 'UI/UX Designer',     branch: 'Bangalore', status: 'Active',    joined: '15 Nov 2021' },
  { id: '8', name: 'Vikram Rao',    empId: 'EMP-00098', dept: 'Operations',  designation: 'Operations Lead',    branch: 'Delhi',     status: 'Active',    joined: '20 Jul 2020' },
  { id: '9', name: 'Nisha Mehta',   empId: 'EMP-00092', dept: 'HR',          designation: 'HR Executive',       branch: 'Mumbai HQ', status: 'Active',    joined: '02 Feb 2020' },
  { id: '10', name: 'Deepa Pillai', empId: 'EMP-00086', dept: 'Operations',  designation: 'Operations Manager', branch: 'Bangalore', status: 'Inactive',  joined: '11 Oct 2019' },
];

export default function EmployeesPage() {
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('');
  const [status, setStatus]   = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = employees.filter((e) => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.empId.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !dept   || e.dept   === dept;
    const matchStatus = !status || e.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  const columns: Column<Employee>[] = [
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
      key: 'designation',
      label: 'Designation',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.designation}</Typography>,
    },
    {
      key: 'branch',
      label: 'Branch',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.branch}</Typography>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge label={row.status} />,
    },
    {
      key: 'joined',
      label: 'Joined',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.joined}
        </Typography>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
          <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton>
          <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 15 }} /></IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Employee Directory"
        subtitle={`${employees.length} employees across 6 departments`}
        actions={
          <>
            <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}>Export</Button>
            <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>Add Employee</Button>
          </>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Employees', value: 247, sub: '+3 this month',       icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Departments',     value: 6,   sub: 'Active departments',  icon: <BusinessOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'On Probation',    value: 12,  sub: 'Review due in 30d',   icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Attrition (YTD)', value: '4.2%', sub: 'vs 5.1% last year', icon: <TrendingDownOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, ID…"
        filters={[
          {
            value: dept,
            onChange: setDept,
            placeholder: 'All Departments',
            options: [
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Sales',       label: 'Sales' },
              { value: 'Operations',  label: 'Operations' },
              { value: 'Finance',     label: 'Finance' },
              { value: 'Product',     label: 'Product' },
              { value: 'HR',          label: 'HR' },
            ],
          },
          {
            value: status,
            onChange: setStatus,
            placeholder: 'All Status',
            options: [
              { value: 'Active',    label: 'Active' },
              { value: 'On Leave',  label: 'On Leave' },
              { value: 'Probation', label: 'Probation' },
              { value: 'Inactive',  label: 'Inactive' },
            ],
          },
        ]}
        count={`${filtered.length} employees`}
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
        emptyMessage="No employees match the current filters."
      />
    </Box>
  );
}
