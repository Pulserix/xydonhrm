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
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Expense {
  id: string;
  submittedBy: string;
  department: string;
  category: string;
  description: string;
  amount: string;
  submittedOn: string;
  status: string;
}


const expenses: Expense[] = [
  { id: 'EXP-082', submittedBy: 'Priya Sharma',  department: 'Sales',       category: 'Travel',        description: 'Flight + hotel – Delhi client visit',   amount: '₹18,400', submittedOn: '25 Oct 2026', status: 'Pending'     },
  { id: 'EXP-081', submittedBy: 'Ankit Verma',   department: 'Engineering', category: 'Training',      description: 'AWS certification course fee',          amount: '₹12,000', submittedOn: '22 Oct 2026', status: 'Pending'     },
  { id: 'EXP-080', submittedBy: 'Deepak Raj',    department: 'Operations',  category: 'Food & Meals',  description: 'Team lunch – Q3 wrap-up',               amount: '₹4,800',  submittedOn: '20 Oct 2026', status: 'Under Review'},
  { id: 'EXP-079', submittedBy: 'Kavitha Nair',  department: 'Finance',     category: 'Office Supplies',description: 'Stationery and desk accessories',       amount: '₹2,100',  submittedOn: '18 Oct 2026', status: 'Approved'    },
  { id: 'EXP-078', submittedBy: 'Rohan Joshi',   department: 'Marketing',   category: 'Travel',        description: 'Local cab – client meetings (Oct)',     amount: '₹3,200',  submittedOn: '17 Oct 2026', status: 'Reimbursed'  },
  { id: 'EXP-077', submittedBy: 'Meera Pillai',  department: 'HR',          category: 'Events',        description: 'Team offsite catering',                 amount: '₹24,000', submittedOn: '10 Oct 2026', status: 'Approved'    },
  { id: 'EXP-076', submittedBy: 'Vikram Singh',  department: 'Operations',  category: 'Fuel',          description: 'Fuel reimbursement – Oct 1st week',    amount: '₹1,850',  submittedOn: '08 Oct 2026', status: 'Reimbursed'  },
  { id: 'EXP-075', submittedBy: 'Suresh Kumar',  department: 'Operations',  category: 'Office Supplies',description: 'Printer cartridges',                   amount: '₹3,600',  submittedOn: '05 Oct 2026', status: 'Rejected'    },
];


const expenseColumns: Column<Expense>[] = [
  { key: 'id',          header: 'ID',          render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>{r.id}</Typography> },
  { key: 'submittedBy', header: 'Employee',    render: (r) => <Box><Typography variant="body2">{r.submittedBy}</Typography><Typography variant="caption" color="text.disabled">{r.department}</Typography></Box> },
  { key: 'category',    header: 'Category',    render: (r) => <Chip label={r.category} size="small" variant="outlined" /> },
  { key: 'description', header: 'Description', render: (r) => <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 260 }}>{r.description}</Typography> },
  { key: 'amount',      header: 'Amount',      render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{r.amount}</Typography> },
  { key: 'submittedOn', header: 'Date',        render: (r) => <Typography variant="body2" color="text.disabled">{r.submittedOn}</Typography> },
  { key: 'status',      header: 'Status',      render: (r) => <StatusBadge label={r.status} /> },
];


export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const pending    = expenses.filter((e) => e.status === 'Pending' || e.status === 'Under Review');
  const reimbursed = expenses.filter((e) => e.status === 'Reimbursed');

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Expenses"
        subtitle="Employee expense claims and reimbursements"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            New Claim
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Pending Approval',    value: 2,       sub: '+ 1 under review',    icon: <PendingActionsOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Claimed This Month',  value: '₹69.9K',sub: '8 claims',            icon: <ReceiptOutlinedIcon        sx={{ fontSize: 18 }} /> },
          { label: 'Reimbursed (Oct)',    value: '₹5.1K', sub: '2 settled',           icon: <CheckCircleOutlinedIcon     sx={{ fontSize: 18 }} /> },
          { label: 'Avg. Processing Time',value: '2.4d',  sub: 'This month',          icon: <PendingActionsOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label={`Pending (${pending.length})`} />
            <Tab label="All Claims" />
            <Tab label="Reimbursed" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={pending}    columns={expenseColumns} />}
        {activeTab === 1 && <DataTable noCard rows={expenses}   columns={expenseColumns} />}
        {activeTab === 2 && <DataTable noCard rows={reimbursed} columns={expenseColumns} />}
      </Card>
    </Box>
  );
}
