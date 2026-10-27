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
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Invoice {
  id: string;
  period: string;
  employees: number;
  plan: string;
  amount: string;
  dueDate: string;
  paidOn: string;
  status: string;
}


const invoices: Invoice[] = [
  { id: 'INV-2026-10', period: 'October 2026',   employees: 247, plan: 'Business',  amount: '₹49,400', dueDate: '01 Nov 2026', paidOn: '—',           status: 'Due'  },
  { id: 'INV-2026-09', period: 'September 2026', employees: 244, plan: 'Business',  amount: '₹48,800', dueDate: '01 Oct 2026', paidOn: '28 Sep 2026', status: 'Paid' },
  { id: 'INV-2026-08', period: 'August 2026',    employees: 241, plan: 'Business',  amount: '₹48,200', dueDate: '01 Sep 2026', paidOn: '30 Aug 2026', status: 'Paid' },
  { id: 'INV-2026-07', period: 'July 2026',      employees: 238, plan: 'Business',  amount: '₹47,600', dueDate: '01 Aug 2026', paidOn: '29 Jul 2026', status: 'Paid' },
  { id: 'INV-2026-06', period: 'June 2026',      employees: 235, plan: 'Business',  amount: '₹47,000', dueDate: '01 Jul 2026', paidOn: '27 Jun 2026', status: 'Paid' },
];

const invoiceColumns: Column<Invoice>[] = [
  { key: 'id',        header: 'Invoice',  render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>{r.id}</Typography> },
  { key: 'period',    header: 'Period',   render: (r) => <Typography variant="body2">{r.period}</Typography> },
  { key: 'employees', header: 'Seats',    render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.employees}</Typography> },
  { key: 'amount',    header: 'Amount',   render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{r.amount}</Typography> },
  { key: 'dueDate',   header: 'Due',      render: (r) => <Typography variant="body2" color="text.disabled">{r.dueDate}</Typography> },
  { key: 'paidOn',    header: 'Paid On',  render: (r) => <Typography variant="body2" color="text.disabled">{r.paidOn}</Typography> },
  { key: 'status',    header: 'Status',   render: (r) => <StatusBadge label={r.status} /> },
  {
    key: 'action', header: '',
    render: (r) => r.status === 'Due'
      ? <Button size="small" variant="contained">Pay Now</Button>
      : <Button size="small" variant="outlined" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 13 }} />}>PDF</Button>,
  },
];


export default function BillingPage() {
  const [activeTab, setActiveTab] = useState(0);

  const totalSeats = 300;
  const usedSeats  = 247;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Billing"
        subtitle="Subscription, invoices, and seat management"
        actions={
          <Button variant="outlined" size="small">Upgrade Plan</Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Current Plan',    value: 'Business', sub: '₹200/employee/mo',    icon: <CreditCardOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Active Seats',    value: `${usedSeats}/${totalSeats}`, sub: 'of 300 seats used', icon: <CheckCircleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Monthly Spend',   value: '₹49.4K',   sub: 'Oct 2026',            icon: <CreditCardOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Annual Total',    value: '₹5.67L',   sub: 'Projected FY26',      icon: <CreditCardOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      {/* Plan summary */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="subtitle2">Business Plan</Typography>
              <Typography variant="caption" color="text.disabled">Renews on 1 November 2026 · ₹200/employee/mo · Monthly billing</Typography>
            </Box>
            <Chip label="Active" color="success" size="small" />
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
              <Typography variant="body2">Seat usage</Typography>
              <Typography variant="body2">{usedSeats} / {totalSeats}</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(usedSeats / totalSeats) * 100}
              sx={{ height: 6, borderRadius: 9999 }}
            />
          </Box>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[
              'Unlimited HR modules',
              'Priority support',
              'Custom workflows',
              'Advanced analytics',
              'API access',
              'SSO (Google/SAML)',
            ].map((feature) => (
              <Grid key={feature} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ fontSize: 14, color: 'success.light' }} />
                  <Typography variant="caption" color="text.secondary">{feature}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Invoices" />
            <Tab label="Payment Methods" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={invoices} columns={invoiceColumns} />}

        {activeTab === 1 && (
          <Box sx={{ p: 2.5 }}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body2">HDFC Corporate Card •••• 4219</Typography>
                <Typography variant="caption" color="text.disabled">Expires 09/2028 · Default</Typography>
              </Box>
              <Chip label="Default" color="primary" size="small" />
            </Box>
            <Button variant="outlined" size="small" startIcon={<CreditCardOutlinedIcon sx={{ fontSize: 14 }} />}>
              Add Payment Method
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}
