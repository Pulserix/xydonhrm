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
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Contractor {
  id: string;
  name: string;
  type: string;
  department: string;
  engagedThrough: string;
  startDate: string;
  endDate: string;
  rate: string;
  status: string;
}


const contractors: Contractor[] = [
  { id: 'CON-001', name: 'Aditya Sinha',    type: 'Individual', department: 'Engineering', engagedThrough: 'Toptal',         startDate: '01 Jul 2026', endDate: '31 Dec 2026', rate: '₹120/hr', status: 'Active'   },
  { id: 'CON-002', name: 'TechBridge LLP',  type: 'Agency',     department: 'Operations',  engagedThrough: 'Direct',         startDate: '01 Apr 2026', endDate: '31 Mar 2027', rate: '₹1.8L/mo',status: 'Active'   },
  { id: 'CON-003', name: 'Sneha Khanna',    type: 'Individual', department: 'Marketing',   engagedThrough: 'Upwork',         startDate: '15 Aug 2026', endDate: '15 Nov 2026', rate: '₹80/hr',  status: 'Expiring' },
  { id: 'CON-004', name: 'DataSoft Pvt Ltd',type: 'Agency',     department: 'Engineering', engagedThrough: 'Direct',         startDate: '01 Jan 2026', endDate: '31 Oct 2026', rate: '₹2.4L/mo',status: 'Expired'  },
  { id: 'CON-005', name: 'Karan Mehta',     type: 'Individual', department: 'Finance',     engagedThrough: 'Freelancer.com', startDate: '01 Sep 2026', endDate: '28 Feb 2027', rate: '₹75/hr',  status: 'Active'   },
  { id: 'CON-006', name: 'Nimble Works',    type: 'Agency',     department: 'Sales',       engagedThrough: 'Direct',         startDate: '01 Oct 2026', endDate: '31 Mar 2027', rate: '₹1.2L/mo',status: 'Active'   },
];


const contractorColumns: Column<Contractor>[] = [
  { key: 'name',          header: 'Name / Agency',    render: (r) => <Box><Typography variant="body2">{r.name}</Typography><Typography variant="caption" color="text.disabled">{r.engagedThrough}</Typography></Box> },
  { key: 'type',          header: 'Type',              render: (r) => <Chip label={r.type} size="small" variant="outlined" /> },
  { key: 'department',    header: 'Department',        render: (r) => <Typography variant="body2" color="text.secondary">{r.department}</Typography> },
  { key: 'startDate',     header: 'Start',             render: (r) => <Typography variant="body2" color="text.disabled">{r.startDate}</Typography> },
  { key: 'endDate',       header: 'End',               render: (r) => <Typography variant="body2" color={r.status === 'Expiring' ? 'warning.light' : 'text.disabled'}>{r.endDate}</Typography> },
  { key: 'rate',          header: 'Rate',              render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.rate}</Typography> },
  { key: 'status',        header: 'Status',            render: (r) => <StatusBadge label={r.status} /> },
];


export default function ContractorsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const active   = contractors.filter((c) => c.status === 'Active');
  const expiring = contractors.filter((c) => c.status === 'Expiring');

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Contractors"
        subtitle="External contractors and agency engagements"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Contractor
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Contractors',   value: active.length,   sub: '3 agencies, 2 individuals', icon: <HandshakeOutlinedIcon    sx={{ fontSize: 18 }} /> },
          { label: 'Expiring (30d)',        value: expiring.length, sub: 'Renewal needed',            icon: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Monthly Cost',         value: '₹5.4L',         sub: 'All contractors',           icon: <HandshakeOutlinedIcon    sx={{ fontSize: 18 }} /> },
          { label: 'Depts Covered',        value: 5,               sub: 'Departments',               icon: <PeopleOutlinedIcon       sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="All Contractors" />
            <Tab label={expiring.length > 0 ? `Expiring (${expiring.length})` : 'Expiring'} />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={contractors} columns={contractorColumns} />}
        {activeTab === 1 && <DataTable noCard rows={expiring}    columns={contractorColumns} />}
      </Card>
    </Box>
  );
}
