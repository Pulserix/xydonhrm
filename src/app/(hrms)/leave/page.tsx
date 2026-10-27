'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


/* ─── KPI card ───────────────────────────────────────────────── */

function KpiCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500 }}>{label}</Typography>
          <Box sx={{ color: 'text.disabled' }}>{icon}</Box>
        </Box>
        <Typography sx={{ fontSize: '24px', fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>{value}</Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.disabled', mt: 0.75 }}>{sub}</Typography>
      </CardContent>
    </Card>
  );
}


/* ─── Leave type badge ───────────────────────────────────────── */

const leaveTypeColors: Record<string, { bg: string; color: string }> = {
  Annual: { bg: 'hsl(243,75%,60%,0.12)', color: 'hsl(243,75%,70%)' },
  Sick:   { bg: 'rgba(239,68,68,0.1)',   color: '#f87171' },
  Casual: { bg: 'rgba(34,197,94,0.1)',   color: '#4ade80' },
  'Comp Off': { bg: 'rgba(255,255,255,0.06)', color: 'hsl(0,0%,57%)' },
};

const balanceAccent: Record<string, string> = {
  Annual: 'hsl(243,75%,60%)',
  Sick:   '#f87171',
  Casual: '#4ade80',
  'Comp Off': 'hsl(0,0%,40%)',
};

function LeaveTypeBadge({ type }: { type: string }) {
  const style = leaveTypeColors[type] ?? leaveTypeColors['Annual'];
  return (
    <Chip
      label={type}
      size="small"
      sx={{
        height: 20,
        fontSize: '10px',
        fontWeight: 600,
        bgcolor: style.bg,
        color: style.color,
        border: 'none',
      }}
    />
  );
}


/* ─── Requests table ─────────────────────────────────────────── */

const pendingRequests = [
  { initials: 'PK', name: 'Priya Kumar',  dept: 'Operations',  type: 'Annual',   from: 'Nov 5',  to: 'Nov 6',  days: 2, reason: 'Personal travel',     applied: '3h ago',  balance: 11, balanceColor: '#4ade80' },
  { initials: 'AV', name: 'Amit Verma',   dept: 'Sales',       type: 'Sick',     from: 'Oct 23', to: 'Oct 24', days: 2, reason: 'Medical appointment', applied: '5h ago',  balance: 2,  balanceColor: '#fbbf24' },
  { initials: 'RG', name: 'Rohan Gupta',  dept: 'Engineering', type: 'Casual',   from: 'Oct 28', to: 'Oct 28', days: 1, reason: 'Family event',        applied: '1d ago',  balance: 4,  balanceColor: '#4ade80' },
  { initials: 'KN', name: 'Kavya Nair',   dept: 'Sales',       type: 'Annual',   from: 'Nov 1',  to: 'Nov 5',  days: 4, reason: 'Diwali holiday',      applied: '2d ago',  balance: 18, balanceColor: '#4ade80' },
  { initials: 'MS', name: 'Manish Shah',  dept: 'Finance',     type: 'Sick',     from: 'Oct 27', to: 'Oct 28', days: 2, reason: 'Fever',               applied: '6h ago',  balance: 5,  balanceColor: '#4ade80' },
  { initials: 'DS', name: 'Divya Singh',  dept: 'Engineering', type: 'Casual',   from: 'Nov 4',  to: 'Nov 4',  days: 1, reason: 'Personal work',       applied: '3d ago',  balance: 3,  balanceColor: '#4ade80' },
  { initials: 'VR', name: 'Vikram Rao',   dept: 'Operations',  type: 'Annual',   from: 'Nov 10', to: 'Nov 14', days: 5, reason: 'Family trip',         applied: '4d ago',  balance: 8,  balanceColor: '#4ade80' },
  { initials: 'NM', name: 'Nisha Mehta',  dept: 'HR',          type: 'Comp Off', from: 'Nov 3',  to: 'Nov 3',  days: 1, reason: 'Weekend comp off',    applied: '1d ago',  balance: 1,  balanceColor: '#4ade80' },
];

function RequestsTab() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [approved, setApproved] = useState<Set<number>>(new Set());
  const [rejected, setRejected] = useState<Set<number>>(new Set());

  const filtered = pendingRequests.filter((r, idx) => {
    const isProcessed = approved.has(idx) || rejected.has(idx);
    const matchesType = typeFilter === 'All' || r.type === typeFilter;
    const matchesDept = deptFilter === 'All' || r.dept === deptFilter;
    return !isProcessed && matchesType && matchesDept;
  });

  return (
    <Box>

      {/* Filter bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            displayEmpty
            sx={{ fontSize: '12px', height: 30 }}
          >
            <MenuItem value="All">All Leave Types</MenuItem>
            <MenuItem value="Annual">Annual</MenuItem>
            <MenuItem value="Sick">Sick</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Comp Off">Comp Off</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            displayEmpty
            sx={{ fontSize: '12px', height: 30 }}
          >
            <MenuItem value="All">All Departments</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Operations">Operations</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </Select>
        </FormControl>

        <Typography sx={{ fontSize: '12px', color: 'text.disabled', ml: 'auto' }}>
          {filtered.length} pending request{filtered.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Table — scroll on mobile */}
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 680 }}>
            <TableHead>
              <TableRow sx={{ '& th': { fontSize: '11px', fontWeight: 600, color: 'text.disabled', py: 1.5, borderColor: 'divider' } }}>
                <TableCell>Employee</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Applied</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row, idx) => {
                const originalIdx = pendingRequests.indexOf(row);
                return (
                  <TableRow
                    key={originalIdx}
                    sx={{
                      '& td': { py: 1.5, borderColor: 'divider', fontSize: '13px' },
                      '&:last-child td': { border: 0 },
                      '&:hover': { bgcolor: 'hsl(0,0%,14%)' },
                    }}
                  >

                    {/* Employee */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 28, height: 28, borderRadius: '50%',
                            bgcolor: 'hsl(243,75%,44%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '10px', fontWeight: 700, color: '#fff', flexShrink: 0,
                          }}
                        >
                          {row.initials}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'text.primary', whiteSpace: 'nowrap' }}>
                            {row.name}
                          </Typography>
                          <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{row.dept}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Leave type */}
                    <TableCell><LeaveTypeBadge type={row.type} /></TableCell>

                    {/* Duration */}
                    <TableCell>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                        {row.from === row.to ? row.from : `${row.from} – ${row.to}`}
                      </Typography>
                    </TableCell>

                    {/* Days */}
                    <TableCell>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{row.days}d</Typography>
                    </TableCell>

                    {/* Reason */}
                    <TableCell sx={{ maxWidth: 160 }}>
                      <Typography sx={{ fontSize: '12px', color: 'text.disabled', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.reason}
                      </Typography>
                    </TableCell>

                    {/* Applied */}
                    <TableCell>
                      <Typography sx={{ fontSize: '11px', color: 'text.disabled', fontFamily: 'monospace' }}>{row.applied}</Typography>
                    </TableCell>

                    {/* Balance */}
                    <TableCell>
                      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: row.balanceColor }}>
                        {row.balance} left
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.75 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setApproved((prev) => new Set(prev).add(originalIdx))}
                          sx={{ height: 24, fontSize: '11px', px: 1.5, minWidth: 0 }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          color="inherit"
                          onClick={() => setRejected((prev) => new Set(prev).add(originalIdx))}
                          sx={{ height: 24, fontSize: '11px', px: 1.5, minWidth: 0, color: 'text.disabled' }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} sx={{ py: 4, textAlign: 'center', border: 0 }}>
                    <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>No pending requests</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}


/* ─── Balance card ───────────────────────────────────────────── */

function BalanceBar({ type, used, total }: { type: string; used: number; total: number }) {
  const isZero = total === 0;
  const pct = isZero ? 0 : (used / total) * 100;
  const remaining = total - used;
  const accent = balanceAccent[type] ?? balanceAccent['Annual'];
  const remainingColor = remaining <= 2 ? '#fbbf24' : 'text.disabled';

  return (
    <Box sx={{ p: 2, bgcolor: 'hsl(0,0%,14%)', borderRadius: '7px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.secondary' }}>{type}</Typography>
        <Typography sx={{ fontSize: '10px', fontWeight: 600, color: accent }}>{type.substring(0, 2).toUpperCase()}</Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 4,
          borderRadius: '9999px',
          bgcolor: 'hsl(0,0%,20%)',
          mb: 1,
          '& .MuiLinearProgress-bar': { bgcolor: accent, borderRadius: '9999px' },
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: accent }}>
          {used}
          <Box component="span" sx={{ fontWeight: 400, color: 'text.disabled', fontSize: '11px' }}> / {total}d</Box>
        </Typography>
        <Typography sx={{ fontSize: '11px', color: remainingColor }}>
          {isZero ? 'None accrued' : `${remaining} left`}
        </Typography>
      </Box>
    </Box>
  );
}

const employeeBalances = [
  {
    initials: 'PK', name: 'Priya Kumar', role: 'Senior Manager · Operations',
    balances: [
      { type: 'Annual', used: 11, total: 20 },
      { type: 'Sick', used: 2, total: 6 },
      { type: 'Casual', used: 1, total: 4 },
      { type: 'Comp Off', used: 0, total: 0 },
    ],
  },
  {
    initials: 'AV', name: 'Amit Verma', role: 'Executive · Sales',
    balances: [
      { type: 'Annual', used: 18, total: 20 },
      { type: 'Sick', used: 4, total: 6 },
      { type: 'Casual', used: 3, total: 4 },
      { type: 'Comp Off', used: 0, total: 2 },
    ],
  },
  {
    initials: 'RG', name: 'Rohan Gupta', role: 'Engineer · Engineering',
    balances: [
      { type: 'Annual', used: 5, total: 20 },
      { type: 'Sick', used: 0, total: 6 },
      { type: 'Casual', used: 2, total: 4 },
      { type: 'Comp Off', used: 1, total: 3 },
    ],
  },
  {
    initials: 'KN', name: 'Kavya Nair', role: 'Executive · Sales',
    balances: [
      { type: 'Annual', used: 2, total: 20 },
      { type: 'Sick', used: 1, total: 6 },
      { type: 'Casual', used: 0, total: 4 },
      { type: 'Comp Off', used: 0, total: 0 },
    ],
  },
];

function BalancesTab() {
  return (
    <Grid container spacing={3}>
      {employeeBalances.map((emp) => (
        <Grid key={emp.initials} size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>

              {/* Employee header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 32, height: 32, borderRadius: '50%',
                    bgcolor: 'hsl(243,75%,44%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}
                >
                  {emp.initials}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>{emp.name}</Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{emp.role}</Typography>
                </Box>
              </Box>

              {/* Balance grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                {emp.balances.map((b) => (
                  <BalanceBar key={b.type} {...b} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}


/* ─── Calendar tab (placeholder) ────────────────────────────── */

const calendarEvents = [
  { date: 'Nov 1',  label: 'Diwali',       type: 'holiday' },
  { date: 'Nov 5',  label: 'Priya Kumar',  type: 'annual' },
  { date: 'Nov 6',  label: 'Priya Kumar',  type: 'annual' },
  { date: 'Nov 10', label: 'Vikram Rao',   type: 'annual' },
  { date: 'Nov 11', label: 'Vikram Rao',   type: 'annual' },
  { date: 'Nov 14', label: 'Vikram Rao',   type: 'annual' },
];

const calendarEventColors: Record<string, { bg: string; color: string }> = {
  holiday: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
  annual:  { bg: 'hsl(243,75%,60%,0.12)', color: 'hsl(243,75%,70%)' },
  sick:    { bg: 'rgba(239,68,68,0.1)',   color: '#f87171' },
  casual:  { bg: 'rgba(34,197,94,0.1)',   color: '#4ade80' },
};

function CalendarTab() {
  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'text.primary' }}>November 2026</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" sx={{ height: 28, fontSize: '11px', px: 1.5, minWidth: 0 }}>‹</Button>
            <Button variant="outlined" size="small" sx={{ height: 28, fontSize: '11px', px: 1.5, minWidth: 0 }}>›</Button>
          </Box>
        </Box>

        {/* Day names */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <Typography key={d} sx={{ fontSize: '11px', color: 'text.disabled', fontWeight: 600, textAlign: 'center', py: 1 }}>
              {d}
            </Typography>
          ))}
        </Box>

        {/* Calendar grid — November 2026 starts on Sunday */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const dateStr = `Nov ${day}`;
            const events = calendarEvents.filter((e) => e.date === dateStr);
            const isWeekend = (i % 7 === 0 || i % 7 === 6);

            return (
              <Box
                key={day}
                sx={{
                  minHeight: 52,
                  p: 0.75,
                  borderRadius: '5px',
                  bgcolor: isWeekend ? 'hsl(0,0%,8%)' : 'transparent',
                  '&:hover': { bgcolor: 'hsl(0,0%,14%)' },
                  cursor: 'default',
                }}
              >
                <Typography sx={{ fontSize: '11px', color: isWeekend ? 'text.disabled' : 'text.secondary', mb: 0.5 }}>
                  {day}
                </Typography>
                {events.map((ev, ei) => {
                  const evStyle = calendarEventColors[ev.type];
                  return (
                    <Box
                      key={ei}
                      sx={{
                        fontSize: '9px',
                        fontWeight: 600,
                        bgcolor: evStyle.bg,
                        color: evStyle.color,
                        borderRadius: '3px',
                        px: 0.5,
                        py: '1px',
                        mb: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ev.label}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
          {Object.entries(calendarEventColors).map(([key, style]) => (
            <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: style.bg, border: `1px solid ${style.color}` }} />
              <Typography sx={{ fontSize: '11px', color: 'text.disabled', textTransform: 'capitalize' }}>{key}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}


/* ─── Policy tab ─────────────────────────────────────────────── */

const policies = [
  {
    title: 'Annual Leave (EL)',
    desc: '20 days per year. Accrued monthly at 1.67 days/month. Carry-forward up to 10 days. Minimum 3 days notice required.',
    color: 'hsl(243,75%,60%)',
    bg: 'hsl(243,75%,60%,0.10)',
  },
  {
    title: 'Sick Leave (SL)',
    desc: '6 days per year. No carry-forward. Medical certificate required for 3+ consecutive days. Half-pay after exhaustion.',
    color: '#f87171',
    bg: 'rgba(239,68,68,0.08)',
  },
  {
    title: 'Casual Leave (CL)',
    desc: '4 days per year. Cannot be carried forward or encashed. Maximum 2 consecutive days. Pre-approval required.',
    color: '#4ade80',
    bg: 'rgba(34,197,94,0.08)',
  },
  {
    title: 'Comp Off',
    desc: 'Earned for working on weekends/holidays. Must be availed within 30 days of accrual. Subject to manager approval.',
    color: 'hsl(0,0%,50%)',
    bg: 'hsl(0,0%,14%)',
  },
  {
    title: 'Maternity Leave',
    desc: '26 weeks (182 days) fully paid for the first two children. 12 weeks for subsequent children. As per Maternity Benefit Act 1961.',
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.08)',
  },
  {
    title: 'Paternity Leave',
    desc: '5 days within 3 months of child\'s birth. Fully paid. Does not affect annual leave balance.',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.08)',
  },
];

function PolicyTab() {
  return (
    <Grid container spacing={2}>
      {policies.map((p) => (
        <Grid key={p.title} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32, height: 32, borderRadius: '7px',
                    bgcolor: p.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: p.color }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary', mb: 0.5 }}>{p.title}</Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.disabled', lineHeight: 1.6 }}>{p.desc}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}


/* ─── Page ───────────────────────────────────────────────────── */

export default function LeavePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>

      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
            Leave Management
          </Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.disabled', mt: 0.5 }}>
            Manage team leave requests, balances, and the holiday calendar.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}
            sx={{ height: 32, fontSize: '12px' }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}
            sx={{ height: 32, fontSize: '12px' }}
          >
            Apply Leave
          </Button>
        </Box>
      </Box>

      {/* KPI cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            label="Pending Requests"
            value={8}
            sub="Awaiting your action"
            icon={<AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            label="On Leave Today"
            value={22}
            sub="7 returning tomorrow"
            icon={<EventOutlinedIcon sx={{ fontSize: 16 }} />}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            label="Approved This Month"
            value={41}
            sub="+12% vs last month"
            icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            label="Upcoming Holidays"
            value={3}
            sub="Next: Diwali (Nov 1)"
            icon={<StarOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
          />
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            minHeight: 36,
            '& .MuiTab-root': {
              minHeight: 36,
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'none',
              px: 2,
              py: 0,
              color: 'text.disabled',
              '&.Mui-selected': { color: 'text.primary' },
            },
            '& .MuiTabs-indicator': { bgcolor: 'hsl(243,75%,60%)' },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Pending Requests
                <Box
                  sx={{
                    minWidth: 18, height: 18, borderRadius: '9999px',
                    bgcolor: 'hsl(243,75%,60%)', color: '#fff',
                    fontSize: '10px', fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    px: 0.5,
                  }}
                >
                  8
                </Box>
              </Box>
            }
          />
          <Tab label="Balances" />
          <Tab label="Calendar" />
          <Tab label="Policy" />
        </Tabs>
      </Box>

      {/* Tab content */}
      {activeTab === 0 && <RequestsTab />}
      {activeTab === 1 && <BalancesTab />}
      {activeTab === 2 && <CalendarTab />}
      {activeTab === 3 && <PolicyTab />}
    </Box>
  );
}
