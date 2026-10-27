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
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface StatutoryRecord {
  id: string;
  component: string;
  type: string;
  period: string;
  dueDate: string;
  amount: string;
  status: string;
}

interface TdsRecord {
  id: string;
  month: string;
  employeeCount: number;
  grossSalary: string;
  taxDeducted: string;
  challans: string;
  filedDate: string;
  status: string;
}


const statutory: StatutoryRecord[] = [
  { id: 'S1', component: 'EPF',  type: 'Provident Fund',   period: 'Sep 2026', dueDate: '15 Oct 2026', amount: '₹4.82L', status: 'Filed'  },
  { id: 'S2', component: 'ESI',  type: 'State Insurance',  period: 'Sep 2026', dueDate: '15 Oct 2026', amount: '₹1.24L', status: 'Filed'  },
  { id: 'S3', component: 'TDS',  type: 'Tax Deduction',    period: 'Sep 2026', dueDate: '07 Oct 2026', amount: '₹9.65L', status: 'Filed'  },
  { id: 'S4', component: 'PT',   type: 'Professional Tax', period: 'Sep 2026', dueDate: '20 Oct 2026', amount: '₹14.8K', status: 'Due'    },
  { id: 'S5', component: 'LWF',  type: 'Labour Welfare',   period: 'Sep 2026', dueDate: '31 Oct 2026', amount: '₹3.7K',  status: 'Not Due'},
  { id: 'S6', component: 'EPF',  type: 'Provident Fund',   period: 'Oct 2026', dueDate: '15 Nov 2026', amount: '₹4.85L', status: 'Not Due'},
];

const tdsRecords: TdsRecord[] = [
  { id: 'T1', month: 'Sep 2026', employeeCount: 247, grossSalary: '₹2.4Cr', taxDeducted: '₹9.65L', challans: '1',  filedDate: '05 Oct 2026', status: 'Filed' },
  { id: 'T2', month: 'Aug 2026', employeeCount: 244, grossSalary: '₹2.37Cr',taxDeducted: '₹9.41L', challans: '1',  filedDate: '06 Sep 2026', status: 'Filed' },
  { id: 'T3', month: 'Jul 2026', employeeCount: 241, grossSalary: '₹2.35Cr',taxDeducted: '₹9.28L', challans: '1',  filedDate: '04 Aug 2026', status: 'Filed' },
  { id: 'T4', month: 'Jun 2026', employeeCount: 238, grossSalary: '₹2.31Cr',taxDeducted: '₹9.12L', challans: '1',  filedDate: '05 Jul 2026', status: 'Filed' },
];

const statutoryColumns: Column<StatutoryRecord>[] = [
  { key: 'component', header: 'Component', render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}>{r.component}</Typography> },
  { key: 'type',      header: 'Type',      render: (r) => <Typography variant="body2" color="text.secondary">{r.type}</Typography> },
  { key: 'period',    header: 'Period',    render: (r) => <Typography variant="body2">{r.period}</Typography> },
  { key: 'dueDate',   header: 'Due Date',  render: (r) => <Typography variant="body2" color="text.disabled">{r.dueDate}</Typography> },
  { key: 'amount',    header: 'Amount',    render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.amount}</Typography> },
  { key: 'status',    header: 'Status',    render: (r) => <StatusBadge label={r.status} /> },
  {
    key: 'action', header: '',
    render: (r) => r.status === 'Due'
      ? <Button size="small" variant="contained" color="warning">File Now</Button>
      : <Button size="small" variant="outlined" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 13 }} />}>Challan</Button>,
  },
];

const tdsColumns: Column<TdsRecord>[] = [
  { key: 'month',         header: 'Month',     render: (r) => <Typography variant="body2">{r.month}</Typography> },
  { key: 'employeeCount', header: 'Employees', render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.employeeCount}</Typography> },
  { key: 'grossSalary',   header: 'Gross',     render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.grossSalary}</Typography> },
  { key: 'taxDeducted',   header: 'TDS',       render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'warning.light' }}>{r.taxDeducted}</Typography> },
  { key: 'filedDate',     header: 'Filed On',  render: (r) => <Typography variant="body2" color="text.disabled">{r.filedDate}</Typography> },
  { key: 'status',        header: 'Status',    render: (r) => <StatusBadge label={r.status} /> },
];


export default function StatutoryPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Statutory Compliance"
        subtitle="EPF, ESI, TDS, and professional tax filings"
        actions={
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}>
            Export Returns
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Filed This Month',   value: 3,       sub: 'EPF · ESI · TDS',        icon: <CheckCircleOutlinedIcon          sx={{ fontSize: 18 }} /> },
          { label: 'Due This Month',     value: 1,       sub: 'PT by 20 Oct',            icon: <WarningAmberOutlinedIcon        sx={{ fontSize: 18 }} /> },
          { label: 'Total Liability',    value: '₹15.8L',sub: 'Sep 2026',               icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Compliance Rate',    value: '98.2%', sub: 'Last 12 months',          icon: <CheckCircleOutlinedIcon          sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="All Components" />
            <Tab label="TDS (24Q)" />
            <Tab label="ECR (EPF)" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <DataTable noCard rows={statutory} columns={statutoryColumns} />
        )}

        {activeTab === 1 && (
          <DataTable noCard rows={tdsRecords} columns={tdsColumns} />
        )}

        {activeTab === 2 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body2" color="text.disabled">ECR generation and upload coming soon.</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
