'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface PayrollRow {
  id: string;
  name: string;
  empId: string;
  dept: string;
  grossSalary: string;
  deductions: string;
  netSalary: string;
  status: string;
}


const payrollRows: PayrollRow[] = [
  { id: '1',  name: 'Priya Kumar',   empId: 'EMP-00142', dept: 'Operations',  grossSalary: '₹1,20,000', deductions: '₹18,500', netSalary: '₹1,01,500', status: 'Processed' },
  { id: '2',  name: 'Amit Verma',    empId: 'EMP-00138', dept: 'Sales',       grossSalary: '₹85,000',   deductions: '₹12,300', netSalary: '₹72,700',   status: 'Processed' },
  { id: '3',  name: 'Rohan Gupta',   empId: 'EMP-00131', dept: 'Engineering', grossSalary: '₹1,40,000', deductions: '₹22,100', netSalary: '₹1,17,900', status: 'Pending'   },
  { id: '4',  name: 'Kavya Nair',    empId: 'EMP-00127', dept: 'Sales',       grossSalary: '₹78,000',   deductions: '₹10,900', netSalary: '₹67,100',   status: 'Processed' },
  { id: '5',  name: 'Neha Singh',    empId: 'EMP-00119', dept: 'Product',     grossSalary: '₹1,10,000', deductions: '₹16,800', netSalary: '₹93,200',   status: 'Pending'   },
  { id: '6',  name: 'Manish Shah',   empId: 'EMP-00110', dept: 'Finance',     grossSalary: '₹92,000',   deductions: '₹13,600', netSalary: '₹78,400',   status: 'Processed' },
  { id: '7',  name: 'Divya Singh',   empId: 'EMP-00104', dept: 'Engineering', grossSalary: '₹1,05,000', deductions: '₹15,900', netSalary: '₹89,100',   status: 'Processed' },
  { id: '8',  name: 'Vikram Rao',    empId: 'EMP-00098', dept: 'Operations',  grossSalary: '₹98,000',   deductions: '₹14,700', netSalary: '₹83,300',   status: 'On Hold'   },
];


const payrollSteps = ['Input Collection', 'Calculation', 'Review & Approval', 'Bank Transfer', 'Payslips'];


export default function PayrollPage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('');
  const [status, setStatus]   = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const filtered = payrollRows.filter((r) => {
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.empId.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !dept   || r.dept   === dept;
    const matchStatus = !status || r.status === status;
    return matchSearch && matchDept && matchStatus;
  });


  const columns: Column<PayrollRow>[] = [
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
      key: 'grossSalary',
      label: 'Gross Salary',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.grossSalary}
        </Typography>
      ),
    },
    {
      key: 'deductions',
      label: 'Deductions',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.deductions}
        </Typography>
      ),
    },
    {
      key: 'netSalary',
      label: 'Net Salary',
      render: (row) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600 }}>
          {row.netSalary}
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
        title="Payroll"
        subtitle="October 2026 payroll cycle"
        actions={
          <>
            <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}>
              Export
            </Button>
            <Button variant="contained" size="small">
              Run Payroll
            </Button>
          </>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Payout',       value: '₹2.4Cr', sub: 'This month',           icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Employees Paid',     value: 241,       sub: 'Out of 247',            icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Processed',          value: 235,       sub: 'Bank transfer done',    icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Pending Inputs',     value: 6,         sub: 'Blocking payroll run',  icon: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      {/* Payroll pipeline stepper */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Payroll Pipeline — Oct 2026</Typography>
            <Chip label="In Progress" size="small" color="warning" />
          </Box>
        </Box>
        <Box sx={{ px: 3, py: 3 }}>
          <Stepper activeStep={2} alternativeLabel>
            {payrollSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Card>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Employee Breakdown" />
        <Tab label="Salary Structures"  />
        <Tab label="History"            />
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
                  { value: 'Sales',       label: 'Sales'       },
                  { value: 'Operations',  label: 'Operations'  },
                  { value: 'Finance',     label: 'Finance'     },
                  { value: 'Product',     label: 'Product'     },
                ],
              },
              {
                value: status,
                onChange: setStatus,
                placeholder: 'All Statuses',
                options: [
                  { value: 'Processed', label: 'Processed' },
                  { value: 'Pending',   label: 'Pending'   },
                  { value: 'On Hold',   label: 'On Hold'   },
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
            emptyMessage="No payroll records match the current filters."
          />
        </>
      )}


      {tab !== 0 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">
            No data available for this view yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
