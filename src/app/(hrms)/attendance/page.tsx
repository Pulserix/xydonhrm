'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface AttendanceRecord {
  id: string;
  name: string;
  empId: string;
  dept: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: string;
}


const records: AttendanceRecord[] = [
  { id: '1',  name: 'Priya Kumar',   empId: 'EMP-00142', dept: 'Operations',  date: 'Today',     checkIn: '09:02', checkOut: '18:15', hours: '9h 13m', status: 'Present'   },
  { id: '2',  name: 'Amit Verma',    empId: 'EMP-00138', dept: 'Sales',       date: 'Today',     checkIn: '—',     checkOut: '—',     hours: '—',      status: 'On Leave'  },
  { id: '3',  name: 'Rohan Gupta',   empId: 'EMP-00131', dept: 'Engineering', date: 'Today',     checkIn: '08:48', checkOut: '—',     hours: '—',      status: 'Present'   },
  { id: '4',  name: 'Kavya Nair',    empId: 'EMP-00127', dept: 'Sales',       date: 'Today',     checkIn: '10:31', checkOut: '19:00', hours: '8h 29m', status: 'Late'      },
  { id: '5',  name: 'Neha Singh',    empId: 'EMP-00119', dept: 'Product',     date: 'Today',     checkIn: '—',     checkOut: '—',     hours: '—',      status: 'Absent'    },
  { id: '6',  name: 'Manish Shah',   empId: 'EMP-00110', dept: 'Finance',     date: 'Today',     checkIn: '09:00', checkOut: '18:00', hours: '9h 00m', status: 'Present'   },
  { id: '7',  name: 'Divya Singh',   empId: 'EMP-00104', dept: 'Engineering', date: 'Today',     checkIn: '09:15', checkOut: '18:30', hours: '9h 15m', status: 'Present'   },
  { id: '8',  name: 'Vikram Rao',    empId: 'EMP-00098', dept: 'Operations',  date: 'Today',     checkIn: '08:55', checkOut: '18:10', hours: '9h 15m', status: 'Present'   },
  { id: '9',  name: 'Nisha Mehta',   empId: 'EMP-00092', dept: 'HR',          date: 'Today',     checkIn: '09:05', checkOut: '—',     hours: '—',      status: 'Present'   },
  { id: '10', name: 'Deepa Pillai',  empId: 'EMP-00086', dept: 'Operations',  date: 'Today',     checkIn: '—',     checkOut: '—',     hours: '—',      status: 'Inactive'  },
];


export default function AttendancePage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('');
  const [status, setStatus]   = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const filtered = records.filter((r) => {
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.empId.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !dept   || r.dept   === dept;
    const matchStatus = !status || r.status === status;
    return matchSearch && matchDept && matchStatus;
  });


  const columns: Column<AttendanceRecord>[] = [
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
      key: 'checkIn',
      label: 'Check In',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.checkIn}
        </Typography>
      ),
    },
    {
      key: 'checkOut',
      label: 'Check Out',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.checkOut}
        </Typography>
      ),
    },
    {
      key: 'hours',
      label: 'Hours',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.hours}
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
        <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton>
      ),
    },
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Attendance"
        subtitle="Track daily attendance, shifts, and working hours"
        actions={
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}>
            Export
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Present Today',  value: 218, sub: '88.3% attendance rate', icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'On Time',        value: 201, sub: 'Out of 218 present',    icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Late Arrivals',  value: 17,  sub: 'After 9:30 AM',         icon: <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Absent Today',   value: 12,  sub: 'Unplanned absences',    icon: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Daily Log"      />
        <Tab label="Monthly View"   />
        <Tab label="Corrections"    />
        <Tab label="Overtime"       />
        <Tab label="Shifts"         />
      </Tabs>


      {tab === 0 && (
        <>
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
                placeholder: 'All Statuses',
                options: [
                  { value: 'Present',   label: 'Present'   },
                  { value: 'Absent',    label: 'Absent'    },
                  { value: 'Late',      label: 'Late'      },
                  { value: 'On Leave',  label: 'On Leave'  },
                ],
              },
            ]}
            count={`${filtered.length} records`}
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
            emptyMessage="No attendance records match the current filters."
          />
        </>
      )}


      {tab !== 0 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">
            Select a date range to view this report.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
