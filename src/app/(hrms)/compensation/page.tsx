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
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface CompensationRecord {
  id: string;
  employee: string;
  department: string;
  role: string;
  band: string;
  ctc: string;
  lastRevision: string;
  nextDue: string;
  status: string;
}

interface BandRange {
  band: string;
  min: string;
  max: string;
  midpoint: string;
  employees: number;
  avgCTC: string;
}


const records: CompensationRecord[] = [
  { id: 'EMP-001', employee: 'Ankit Verma',   department: 'Engineering', role: 'Senior Engineer',    band: 'L4', ctc: '₹24L',  lastRevision: 'Apr 2026', nextDue: 'Apr 2027', status: 'Active' },
  { id: 'EMP-002', employee: 'Priya Sharma',  department: 'Sales',       role: 'Sales Manager',      band: 'L5', ctc: '₹32L',  lastRevision: 'Apr 2026', nextDue: 'Apr 2027', status: 'Active' },
  { id: 'EMP-003', employee: 'Rohan Joshi',   department: 'Marketing',   role: 'Marketing Analyst',  band: 'L3', ctc: '₹14L',  lastRevision: 'Apr 2026', nextDue: 'Apr 2027', status: 'Active' },
  { id: 'EMP-004', employee: 'Kavitha Nair',  department: 'Finance',     role: 'Finance Lead',       band: 'L5', ctc: '₹28L',  lastRevision: 'Jan 2026', nextDue: 'Jan 2027', status: 'Active' },
  { id: 'EMP-005', employee: 'Meera Pillai',  department: 'HR',          role: 'HR Manager',         band: 'L5', ctc: '₹22L',  lastRevision: 'Apr 2026', nextDue: 'Apr 2027', status: 'Active' },
  { id: 'EMP-006', employee: 'Deepak Raj',    department: 'Operations',  role: 'Ops Executive',      band: 'L2', ctc: '₹8.5L', lastRevision: 'Oct 2025', nextDue: 'Oct 2026', status: 'Revision Due' },
];

const bands: BandRange[] = [
  { band: 'L1', min: '₹3L',  max: '₹6L',   midpoint: '₹4.5L',  employees: 28, avgCTC: '₹4.8L'  },
  { band: 'L2', min: '₹6L',  max: '₹10L',  midpoint: '₹8L',    employees: 52, avgCTC: '₹8.2L'  },
  { band: 'L3', min: '₹10L', max: '₹16L',  midpoint: '₹13L',   employees: 71, avgCTC: '₹13.4L' },
  { band: 'L4', min: '₹16L', max: '₹26L',  midpoint: '₹21L',   employees: 58, avgCTC: '₹22.1L' },
  { band: 'L5', min: '₹26L', max: '₹42L',  midpoint: '₹34L',   employees: 29, avgCTC: '₹31.8L' },
  { band: 'L6', min: '₹42L', max: '₹80L',  midpoint: '₹61L',   employees: 9,  avgCTC: '₹58.4L' },
];


const compensationColumns: Column<CompensationRecord>[] = [
  { key: 'employee',     header: 'Employee',       render: (r) => <Typography variant="body2">{r.employee}</Typography> },
  { key: 'role',         header: 'Role',           render: (r) => <Typography variant="body2" color="text.secondary">{r.role}</Typography> },
  { key: 'department',   header: 'Dept',           render: (r) => <Typography variant="caption" color="text.disabled">{r.department}</Typography> },
  { key: 'band',         header: 'Band',           render: (r) => <Chip label={r.band} size="small" variant="outlined" sx={{ fontFamily: 'monospace' }} /> },
  { key: 'ctc',          header: 'CTC (Annual)',   render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{r.ctc}</Typography> },
  { key: 'lastRevision', header: 'Last Revised',   render: (r) => <Typography variant="body2" color="text.disabled">{r.lastRevision}</Typography> },
  { key: 'status',       header: 'Status',         render: (r) => <StatusBadge label={r.status} /> },
];

const bandColumns: Column<BandRange>[] = [
  { key: 'band',      header: 'Band',       render: (r) => <Chip label={r.band} size="small" variant="outlined" sx={{ fontFamily: 'monospace' }} /> },
  { key: 'min',       header: 'Min',        render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{r.min}</Typography> },
  { key: 'midpoint',  header: 'Midpoint',   render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.midpoint}</Typography> },
  { key: 'max',       header: 'Max',        render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{r.max}</Typography> },
  { key: 'employees', header: 'Employees',  render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.employees}</Typography> },
  { key: 'avgCTC',    header: 'Avg CTC',    render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'success.light' }}>{r.avgCTC}</Typography> },
];


export default function CompensationPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Compensation"
        subtitle="Salary bands, CTC records, and revision planning"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Revision Cycle
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Payroll (Ann.)', value: '₹28.6Cr', sub: 'All employees',       icon: <MonetizationOnOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Avg. CTC',             value: '₹11.6L',  sub: 'Across all bands',    icon: <TrendingUpOutlinedIcon     sx={{ fontSize: 18 }} /> },
          { label: 'Revision Due',         value: 18,        sub: 'In next 90 days',     icon: <PeopleOutlinedIcon         sx={{ fontSize: 18 }} /> },
          { label: 'Avg. Hike (FY26)',     value: '9.4%',    sub: 'vs 8.1% FY25',        icon: <TrendingUpOutlinedIcon     sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Employee CTC" />
            <Tab label="Salary Bands" />
            <Tab label="Revision History" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            <DataTable noCard rows={records} columns={compensationColumns} />
          </>
        )}

        {activeTab === 1 && (
          <DataTable noCard rows={bands} columns={bandColumns} />
        )}

        {activeTab === 2 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="body2" color="text.disabled">Revision history and audit trail coming soon.</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
