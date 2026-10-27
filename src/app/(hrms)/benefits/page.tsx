'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface BenefitPlan {
  id: string;
  name: string;
  category: string;
  enrolled: number;
  eligible: number;
  costPerEmployee: string;
  totalCost: string;
  renewalDate: string;
}

interface ClaimRecord {
  id: string;
  employee: string;
  benefit: string;
  amount: string;
  submittedOn: string;
  status: string;
}


const plans: BenefitPlan[] = [
  { id: 'B1', name: 'Group Health Insurance',     category: 'Health',    enrolled: 247, eligible: 247, costPerEmployee: '₹8,400/yr',  totalCost: '₹20.8L/yr',  renewalDate: 'Mar 2027' },
  { id: 'B2', name: 'Group Term Life',            category: 'Insurance', enrolled: 247, eligible: 247, costPerEmployee: '₹1,200/yr',  totalCost: '₹2.96L/yr',  renewalDate: 'Mar 2027' },
  { id: 'B3', name: 'NPS (National Pension)',     category: 'Retirement',enrolled: 189, eligible: 247, costPerEmployee: '₹5,000/yr',  totalCost: '₹9.45L/yr',  renewalDate: 'Ongoing'  },
  { id: 'B4', name: 'Meal Card (Sodexo)',         category: 'Perks',     enrolled: 222, eligible: 247, costPerEmployee: '₹2,400/yr',  totalCost: '₹5.33L/yr',  renewalDate: 'Dec 2026' },
  { id: 'B5', name: 'Flexi Benefit Plan',         category: 'Perks',     enrolled: 201, eligible: 247, costPerEmployee: '₹12,000/yr', totalCost: '₹24.1L/yr',  renewalDate: 'Mar 2027' },
  { id: 'B6', name: 'OPD Reimbursement',          category: 'Health',    enrolled: 247, eligible: 247, costPerEmployee: '₹5,000/yr',  totalCost: '₹12.35L/yr', renewalDate: 'Mar 2027' },
];

const claims: ClaimRecord[] = [
  { id: 'CLM-014', employee: 'Ankit Verma',   benefit: 'OPD Reimbursement',  amount: '₹2,400', submittedOn: '24 Oct 2026', status: 'Pending'    },
  { id: 'CLM-013', employee: 'Kavitha Nair',  benefit: 'Flexi Benefit',      amount: '₹4,800', submittedOn: '20 Oct 2026', status: 'Approved'   },
  { id: 'CLM-012', employee: 'Priya Sharma',  benefit: 'OPD Reimbursement',  amount: '₹1,800', submittedOn: '15 Oct 2026', status: 'Reimbursed' },
  { id: 'CLM-011', employee: 'Rohan Joshi',   benefit: 'Flexi Benefit',      amount: '₹3,200', submittedOn: '10 Oct 2026', status: 'Reimbursed' },
];

const planColumns: Column<BenefitPlan>[] = [
  { key: 'name',            header: 'Plan',         render: (r) => <Typography variant="body2">{r.name}</Typography> },
  { key: 'category',        header: 'Category',     render: (r) => <Chip label={r.category} size="small" variant="outlined" /> },
  {
    key: 'enrollment', header: 'Enrollment',
    render: (r) => (
      <Box sx={{ minWidth: 100 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption">{r.enrolled}</Typography>
          <Typography variant="caption" color="text.disabled">/{r.eligible}</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(r.enrolled / r.eligible) * 100}
          sx={{ height: 4, borderRadius: 9999 }}
        />
      </Box>
    ),
  },
  { key: 'costPerEmployee', header: 'Cost/Employee', render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.costPerEmployee}</Typography> },
  { key: 'totalCost',       header: 'Total Cost',    render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'warning.light' }}>{r.totalCost}</Typography> },
  { key: 'renewalDate',     header: 'Renewal',       render: (r) => <Typography variant="body2" color="text.disabled">{r.renewalDate}</Typography> },
];

const claimColumns: Column<ClaimRecord>[] = [
  { key: 'id',          header: 'Claim ID',  render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>{r.id}</Typography> },
  { key: 'employee',    header: 'Employee',  render: (r) => <Typography variant="body2">{r.employee}</Typography> },
  { key: 'benefit',     header: 'Benefit',   render: (r) => <Typography variant="body2" color="text.secondary">{r.benefit}</Typography> },
  { key: 'amount',      header: 'Amount',    render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.amount}</Typography> },
  { key: 'submittedOn', header: 'Submitted', render: (r) => <Typography variant="body2" color="text.disabled">{r.submittedOn}</Typography> },
  { key: 'status',      header: 'Status',    render: (r) => <StatusBadge label={r.status} /> },
];


export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Benefits"
        subtitle="Health, insurance, and employee perks"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Plan
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Plans',        value: 6,         sub: '4 categories',         icon: <CardGiftcardOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Total Benefits Cost', value: '₹74.9L',  sub: 'Annual (all plans)',   icon: <CardGiftcardOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Enrolled Employees',  value: 247,       sub: '100% health coverage', icon: <PeopleOutlinedIcon       sx={{ fontSize: 18 }} /> },
          { label: 'Claims This Month',   value: 4,         sub: '₹12.2K total',         icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Benefit Plans" />
            <Tab label="Claims" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={plans}  columns={planColumns}  />}
        {activeTab === 1 && <DataTable noCard rows={claims} columns={claimColumns} />}
      </Card>
    </Box>
  );
}
