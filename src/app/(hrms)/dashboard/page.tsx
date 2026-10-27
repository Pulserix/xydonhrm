import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({
  label,
  value,
  sub,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub: string;
  trend?: string;
  icon: React.ElementType;
}) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'text.disabled' }}>
            {label}
          </Typography>
          <Icon sx={{ fontSize: 16, color: 'text.disabled' }} />
        </Box>
        <Typography sx={{ fontSize: '30.528px', fontWeight: 700, color: 'text.primary', lineHeight: 1, mb: 0.75 }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
          {trend && <Box component="span" sx={{ color: 'success.light', mr: 0.5 }}>{trend}</Box>}
          {sub}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* ─── Approval row ───────────────────────────────────────────── */
const leaveTypeColors: Record<string, string> = {
  Annual:  'hsl(243,75%,60%)',
  Sick:    '#f59e0b',
  Casual:  '#22c55e',
};

function ApprovalRow({
  name, dept, type, duration, appliedAgo,
}: {
  name: string; dept: string; type: string; duration: string; appliedAgo: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1.5,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
        '&:hover': { bgcolor: 'hsl(0,0%,14%)' },
      }}
    >
      {/* Avatar — always anchored left */}
      <Box
        sx={{
          width: 28, height: 28, borderRadius: '50%',
          bgcolor: 'hsl(243,75%,44%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '10px', fontWeight: 700, color: '#fff', flexShrink: 0,
          alignSelf: 'flex-start', mt: 0.25,
        }}
      >
        {name.split(' ').map((n) => n[0]).join('')}
      </Box>

      {/* Content column: info + mobile actions */}
      <Box sx={{ flex: 1, minWidth: 0 }}>

        {/* Top row: info + chip + duration + desktop actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'text.primary' }}>{name}</Typography>
            <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{dept} · {appliedAgo}</Typography>
          </Box>

          <Chip
            label={type}
            size="small"
            sx={{
              height: 20,
              fontSize: '10px',
              fontWeight: 600,
              bgcolor: `${leaveTypeColors[type] ?? '#3b82f6'}22`,
              color: leaveTypeColors[type] ?? '#60a5fa',
              flexShrink: 0,
            }}
          />

          <Typography sx={{ fontSize: '11px', color: 'text.secondary', flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>
            {duration}
          </Typography>

          {/* Desktop actions */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, flexShrink: 0 }}>
            <Button variant="contained" size="small" sx={{ height: 24, fontSize: '11px', px: 1.5 }}>
              Approve
            </Button>
            <Button variant="outlined" size="small" sx={{ height: 24, fontSize: '11px', px: 1.5 }}>
              Reject
            </Button>
          </Box>
        </Box>

        {/* Mobile actions — second row, xs only */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1, mt: 1 }}>
          <Button variant="contained" size="small" sx={{ height: 24, fontSize: '11px', px: 1.5 }}>
            Approve
          </Button>
          <Button variant="outlined" size="small" sx={{ height: 24, fontSize: '11px', px: 1.5 }}>
            Reject
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* ─── Department bar ─────────────────────────────────────────── */
function DeptBar({ dept, count, max }: { dept: string; count: number; max: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Typography sx={{ fontSize: '12px', color: 'text.secondary', width: 100, flexShrink: 0 }}>{dept}</Typography>
      <LinearProgress
        variant="determinate"
        value={(count / max) * 100}
        sx={{
          flex: 1, height: 5, borderRadius: '9999px',
          bgcolor: 'hsl(0,0%,14%)',
          '& .MuiLinearProgress-bar': { bgcolor: 'hsl(243,75%,60%)', borderRadius: '9999px' },
        }}
      />
      <Typography sx={{ fontSize: '11px', color: 'text.disabled', width: 24, textAlign: 'right', fontFamily: 'monospace', flexShrink: 0 }}>
        {count}
      </Typography>
    </Box>
  );
}

/* ─── Activity item ──────────────────────────────────────────── */
function ActivityItem({ avatar, text, time }: { avatar: string; text: React.ReactNode; time: string }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}>
      <Box
        sx={{
          width: 28, height: 28, borderRadius: '50%', bgcolor: 'hsl(0,0%,20%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '10px', fontWeight: 700, color: 'text.secondary', flexShrink: 0,
        }}
      >
        {avatar}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5 }}>{text}</Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.disabled', mt: 0.25 }}>{time}</Typography>
      </Box>
    </Box>
  );
}

/* ─── Onboarding item ────────────────────────────────────────── */
function OnboardingItem({ name, role, progress }: { name: string; role: string; progress: number }) {
  return (
    <Box sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.primary' }}>{name}</Typography>
          <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{role}</Typography>
        </Box>
        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: progress >= 70 ? 'success.light' : 'warning.light' }}>
          {progress}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 4, borderRadius: '9999px',
          bgcolor: 'hsl(0,0%,14%)',
          '& .MuiLinearProgress-bar': {
            bgcolor: progress >= 70 ? 'success.main' : 'warning.main',
            borderRadius: '9999px',
          },
        }}
      />
    </Box>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Good morning, Rajat
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here&apos;s what&apos;s happening across your organization today.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button variant="outlined" size="small">Reports</Button>
          <Button variant="contained" size="small">+ Add Employee</Button>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Employees',    value: 247, sub: '+3 this month',       trend: undefined,  icon: PeopleOutlinedIcon },
          { label: 'Present Today',      value: 218, sub: '88.3% attendance rate', trend: undefined, icon: AccessTimeOutlinedIcon },
          { label: 'On Approved Leave',  value: 22,  sub: '7 returning tomorrow', trend: undefined, icon: BeachAccessOutlinedIcon },
          { label: 'Pending Approvals',  value: 8,   sub: 'Awaiting your action', trend: undefined, icon: PendingActionsOutlinedIcon },
        ].map((card) => (
          <Grid key={card.label} size={{ xs: 6, md: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Middle row: Approvals + Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>

        {/* Pending Approvals */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>
                Pending Approvals
              </Typography>
              <Chip label="8 urgent" size="small" sx={{ height: 20, fontSize: '10px', bgcolor: 'error.dark', color: '#fff' }} />
            </Box>
            {[
              { name: 'Priya Kumar',  dept: 'Operations', type: 'Annual',  duration: 'Nov 5 – Nov 6',   appliedAgo: '3h ago' },
              { name: 'Amit Verma',   dept: 'Sales',       type: 'Sick',    duration: 'Oct 23 – Oct 24', appliedAgo: '5h ago' },
              { name: 'Neha Singh',   dept: 'Engineering', type: 'Casual',  duration: 'Oct 28',           appliedAgo: '1d ago' },
              { name: 'Rohan Gupta',  dept: 'Sales',       type: 'Annual',  duration: 'Nov 1 – Nov 5',   appliedAgo: '2d ago' },
            ].map((row) => (
              <ApprovalRow key={row.name} {...row} />
            ))}
            <Box sx={{ px: 2, py: 1 }}>
              <Button variant="text" size="small" sx={{ fontSize: '12px' }}>
                View all 8 pending requests →
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Quick Actions + Alerts */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>

            {/* Quick Actions */}
            <Card>
              <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>Quick Actions</Typography>
              </Box>
              <Box sx={{ p: 1 }}>
                {[
                  { label: 'Add New Employee', icon: PersonAddOutlinedIcon },
                  { label: 'Run Payroll',       icon: AccountBalanceOutlinedIcon },
                  { label: 'Post Job Opening',  icon: WorkOutlineOutlinedIcon },
                  { label: 'Generate Report',   icon: BarChartOutlinedIcon },
                ].map(({ label, icon: Icon }) => (
                  <Button
                    key={label}
                    variant="text"
                    fullWidth
                    startIcon={<Icon sx={{ fontSize: 15 }} />}
                    sx={{
                      justifyContent: 'flex-start',
                      fontSize: '12px',
                      color: 'text.secondary',
                      py: 1,
                      px: 1.5,
                      borderRadius: '7px',
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Card>

            {/* Alerts */}
            <Card sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>Alerts</Typography>
                <Chip label="3" size="small" sx={{ height: 18, fontSize: '10px', bgcolor: 'error.dark', color: '#fff' }} />
              </Box>
              <Box sx={{ p: 2 }}>
                {[
                  { text: 'Payroll cutoff in 3 days',      sub: 'Pending inputs from 6 people', color: 'error.light' },
                  { text: '2 documents expiring soon',     sub: 'Review before Nov 1',           color: 'warning.light' },
                  { text: '3 probations ending Nov',       sub: 'Requires appraisal decision',   color: 'warning.light' },
                ].map(({ text, sub, color }) => (
                  <Box key={text} sx={{ display: 'flex', gap: 1.5, mb: 1.5, '&:last-child': { mb: 0 } }}>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: 14, color, mt: 0.2, flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.primary' }}>{text}</Typography>
                      <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{sub}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom row */}
      <Grid container spacing={2}>

        {/* Headcount by dept */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>Headcount by Department</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              {[
                { dept: 'Engineering', count: 72 },
                { dept: 'Sales',       count: 54 },
                { dept: 'Operations',  count: 47 },
                { dept: 'Finance',     count: 31 },
                { dept: 'HR',          count: 18 },
                { dept: 'Marketing',   count: 25 },
              ].map(({ dept, count }) => (
                <DeptBar key={dept} dept={dept} count={count} max={72} />
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>Recent Activity</Typography>
            </Box>
            <Box sx={{ px: 2 }}>
              <ActivityItem
                avatar="SM"
                text={<><Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>Sanya Mehta</Box> joined the Engineering team</>}
                time="2h ago"
              />
              <ActivityItem
                avatar="AV"
                text={<><Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>Amit Verma</Box> submitted an expense claim</>}
                time="4h ago"
              />
              <ActivityItem
                avatar="SY"
                text={<>Payroll draft generated for <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>Oct 2026</Box></>}
                time="Yesterday"
              />
              <ActivityItem
                avatar="TR"
                text={<><Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>3 employees</Box> completed Safety Training</>}
                time="2d ago"
              />
            </Box>
          </Card>
        </Grid>

        {/* Onboarding */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>Onboarding</Typography>
              <Chip label="3 active" size="small" sx={{ height: 20, fontSize: '10px', bgcolor: 'hsl(243,75%,60%)', color: '#fff' }} />
            </Box>
            <Box sx={{ p: 2 }}>
              <OnboardingItem name="Sanya Mehta" role="Software Engineer"    progress={75} />
              <Divider sx={{ my: 1.5 }} />
              <OnboardingItem name="Kavya Nair"  role="Product Designer"     progress={40} />
              <Divider sx={{ my: 1.5 }} />
              <OnboardingItem name="Dev Patel"   role="Business Analyst"     progress={20} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
