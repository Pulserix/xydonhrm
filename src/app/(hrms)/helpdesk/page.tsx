'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Ticket {
  id: string;
  ticketId: string;
  subject: string;
  category: string;
  raisedBy: string;
  empId: string;
  priority: string;
  createdAt: string;
  status: string;
}


interface TicketMessage {
  from: string;
  message: string;
  time: string;
  isStaff: boolean;
}


const tickets: Ticket[] = [
  { id: '1', ticketId: 'HD-0047', subject: 'Payslip not generated for Sep 2026',    category: 'Payroll',     raisedBy: 'Rohan Gupta',  empId: 'EMP-00131', priority: 'High',   createdAt: '24 Oct 2026', status: 'Open'        },
  { id: '2', ticketId: 'HD-0046', subject: 'Unable to apply for casual leave',       category: 'Leave',       raisedBy: 'Kavya Nair',   empId: 'EMP-00127', priority: 'Medium', createdAt: '23 Oct 2026', status: 'In Progress' },
  { id: '3', ticketId: 'HD-0045', subject: 'Wrong bank account in profile',          category: 'Profile',     raisedBy: 'Amit Verma',   empId: 'EMP-00138', priority: 'High',   createdAt: '22 Oct 2026', status: 'Resolved'    },
  { id: '4', ticketId: 'HD-0044', subject: 'Attendance correction for 18 Oct',       category: 'Attendance',  raisedBy: 'Neha Singh',   empId: 'EMP-00119', priority: 'Low',    createdAt: '20 Oct 2026', status: 'Closed'      },
  { id: '5', ticketId: 'HD-0043', subject: 'Form 16 not received',                   category: 'Tax',         raisedBy: 'Manish Shah',  empId: 'EMP-00110', priority: 'Medium', createdAt: '19 Oct 2026', status: 'Open'        },
];


const ticketMessages: TicketMessage[] = [
  { from: 'Rohan Gupta',  message: 'My September payslip is not visible in the portal. Other months are fine.',    time: '24 Oct, 10:12 AM', isStaff: false },
  { from: 'HR Support',   message: 'Hi Rohan, we are checking with the payroll team. We will update you shortly.', time: '24 Oct, 11:30 AM', isStaff: true  },
  { from: 'Rohan Gupta',  message: 'Thank you, please let me know as soon as possible.',                            time: '24 Oct, 11:45 AM', isStaff: false },
];


export default function HelpdeskPage() {
  const [selectedId, setSelectedId]   = useState<string>('1');
  const [search, setSearch]           = useState('');
  const [category, setCategory]       = useState('');
  const [status, setStatus]           = useState('');


  const filtered = tickets.filter((t) => {
    const matchSearch   = !search   || t.subject.toLowerCase().includes(search.toLowerCase()) || t.ticketId.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || t.category === category;
    const matchStatus   = !status   || t.status   === status;
    return matchSearch && matchCategory && matchStatus;
  });


  const selectedTicket = tickets.find((t) => t.id === selectedId) ?? tickets[0];


  const columns: Column<Ticket>[] = [
    {
      key: 'ticket',
      label: 'Ticket',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace', fontSize: 11 }}>{row.ticketId}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.subject}</Typography>
          <Typography variant="caption" color="text.disabled">{row.category}</Typography>
        </Box>
      ),
    },
    {
      key: 'raisedBy',
      label: 'Raised By',
      render: (row) => <EmployeeCell name={row.raisedBy} meta={row.empId} />,
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (row) => <StatusBadge label={row.priority} />,
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.createdAt}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge label={row.status} />,
    },
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Helpdesk"
        subtitle="Employee support tickets and requests"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Raise Ticket
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Open Tickets',      value: 2,  sub: 'Awaiting response',    icon: <SupportOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'In Progress',       value: 1,  sub: 'Being handled',        icon: <HourglassEmptyOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Resolved (7d)',     value: 8,  sub: 'Last 7 days',          icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Avg. Resolution',   value: '4h', sub: 'Response time',      icon: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      {/* Split layout: ticket list + detail */}
      <Grid container spacing={2}>

        {/* Ticket list */}
        <Grid size={{ xs: 12, md: 7 }}>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search tickets…"
            filters={[
              {
                value: category,
                onChange: setCategory,
                placeholder: 'All Categories',
                options: [
                  { value: 'Payroll',    label: 'Payroll'    },
                  { value: 'Leave',      label: 'Leave'      },
                  { value: 'Profile',    label: 'Profile'    },
                  { value: 'Attendance', label: 'Attendance' },
                  { value: 'Tax',        label: 'Tax'        },
                ],
              },
              {
                value: status,
                onChange: setStatus,
                placeholder: 'All Statuses',
                options: [
                  { value: 'Open',        label: 'Open'        },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Resolved',    label: 'Resolved'    },
                  { value: 'Closed',      label: 'Closed'      },
                ],
              },
            ]}
            count={`${filtered.length} tickets`}
          />
          <DataTable
            columns={columns}
            rows={filtered}
            rowKey={(r) => r.id}
            onRowClick={(r) => setSelectedId(r.id)}
            emptyMessage="No tickets match the current filters."
          />
        </Grid>


        {/* Ticket detail */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>
                    {selectedTicket.ticketId}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 0.25 }}>
                    {selectedTicket.subject}
                  </Typography>
                </Box>
                <StatusBadge label={selectedTicket.status} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={selectedTicket.category} size="small" />
                <Chip label={selectedTicket.priority} size="small" />
              </Box>
            </Box>

            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {ticketMessages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: msg.isStaff ? 'action.selected' : 'action.hover',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: msg.isStaff ? 'primary.light' : 'text.primary' }}>
                      {msg.from}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">{msg.time}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{msg.message}</Typography>
                </Box>
              ))}
            </Box>

            <Divider />
            <Box sx={{ p: 2 }}>
              <Button variant="contained" size="small" fullWidth>Reply</Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
