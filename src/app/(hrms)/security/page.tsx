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
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  mfaEnabled: boolean;
  status: string;
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  timestamp: string;
  status: string;
}

interface SecuritySetting {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
}


const adminUsers: AdminUser[] = [
  { id: 'USR-01', name: 'Meera Pillai',   email: 'meera@xydon.com',  role: 'HR Manager',     lastLogin: '27 Oct 2026 09:10', mfaEnabled: true,  status: 'Active' },
  { id: 'USR-02', name: 'Rajat Joshi',    email: 'rajat@xydon.com',  role: 'Super Admin',    lastLogin: '27 Oct 2026 08:44', mfaEnabled: true,  status: 'Active' },
  { id: 'USR-03', name: 'Ankit Verma',    email: 'ankit@xydon.com',  role: 'Dept Head',      lastLogin: '26 Oct 2026 17:22', mfaEnabled: false, status: 'Active' },
  { id: 'USR-04', name: 'Kavitha Nair',   email: 'kavitha@xydon.com',role: 'Finance Admin',  lastLogin: '25 Oct 2026 11:05', mfaEnabled: true,  status: 'Active' },
  { id: 'USR-05', name: 'Old Admin',      email: 'oldadmin@xydon.com',role: 'HR Admin',      lastLogin: 'Sep 2025',          mfaEnabled: false, status: 'Inactive' },
];

const auditLogs: AuditLog[] = [
  { id: 'LOG-001', user: 'Meera Pillai', action: 'Updated Employee',   resource: 'EMP-082 – Priya Sharma', ip: '192.168.1.10', timestamp: '27 Oct 09:12', status: 'Success' },
  { id: 'LOG-002', user: 'Rajat Joshi',  action: 'Approved Payroll',   resource: 'Payroll – Oct 2026',     ip: '192.168.1.4',  timestamp: '27 Oct 08:50', status: 'Success' },
  { id: 'LOG-003', user: 'Unknown',      action: 'Login Failed',       resource: 'Auth',                   ip: '45.22.118.7',  timestamp: '26 Oct 23:44', status: 'Failed'  },
  { id: 'LOG-004', user: 'Kavitha Nair', action: 'Exported Report',    resource: 'Payroll Summary',        ip: '192.168.1.22', timestamp: '25 Oct 14:10', status: 'Success' },
  { id: 'LOG-005', user: 'Ankit Verma',  action: 'Bulk Import',        resource: 'Employees (Oct)',        ip: '192.168.1.18', timestamp: '15 Oct 09:05', status: 'Success' },
];

const adminColumns: Column<AdminUser>[] = [
  { key: 'name',      header: 'Name',       render: (r) => <Box><Typography variant="body2">{r.name}</Typography><Typography variant="caption" color="text.disabled">{r.email}</Typography></Box> },
  { key: 'role',      header: 'Role',       render: (r) => <Chip label={r.role} size="small" variant="outlined" /> },
  { key: 'lastLogin', header: 'Last Login', render: (r) => <Typography variant="body2" color="text.disabled">{r.lastLogin}</Typography> },
  { key: 'mfaEnabled',header: 'MFA',       render: (r) => r.mfaEnabled ? <Chip label="Enabled" size="small" color="success" /> : <Chip label="Disabled" size="small" color="error" /> },
  { key: 'status',    header: 'Status',     render: (r) => <StatusBadge label={r.status} /> },
];

const auditColumns: Column<AuditLog>[] = [
  { key: 'user',      header: 'User',      render: (r) => <Typography variant="body2">{r.user}</Typography> },
  { key: 'action',    header: 'Action',    render: (r) => <Typography variant="body2">{r.action}</Typography> },
  { key: 'resource',  header: 'Resource',  render: (r) => <Typography variant="body2" color="text.secondary">{r.resource}</Typography> },
  { key: 'ip',        header: 'IP',        render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{r.ip}</Typography> },
  { key: 'timestamp', header: 'Time',      render: (r) => <Typography variant="body2" color="text.disabled">{r.timestamp}</Typography> },
  { key: 'status',    header: 'Status',    render: (r) => <StatusBadge label={r.status} /> },
];


export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState([
    { key: 'mfa',        label: 'MFA Required for Admins', description: 'Force all admin users to enable 2-factor authentication', enabled: true  },
    { key: 'sso',        label: 'SSO (Google)',            description: 'Allow Google Workspace SSO for employee login',           enabled: true  },
    { key: 'ipRestrict', label: 'IP Restriction',          description: 'Restrict admin access to office IPs only',               enabled: false },
    { key: 'sessionLog', label: 'Session Logging',         description: 'Log all login sessions and durations',                   enabled: true  },
    { key: 'dataExport', label: 'Restrict Data Export',    description: 'Only Super Admin can export sensitive reports',          enabled: false },
  ]);

  function toggleSetting(key: string) {
    setSettings((prev) => prev.map((s) => s.key === key ? { ...s, enabled: !s.enabled } : s));
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Security & Access"
        subtitle="Manage roles, permissions, and audit logs"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Admin Users',       value: adminUsers.filter((u) => u.status === 'Active').length, sub: '1 inactive',          icon: <PeopleOutlinedIcon       sx={{ fontSize: 18 }} /> },
          { label: 'MFA Coverage',      value: '80%',  sub: '4 of 5 admins',        icon: <ShieldOutlinedIcon       sx={{ fontSize: 18 }} /> },
          { label: 'Failed Logins',     value: 1,      sub: 'Last 7 days',          icon: <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Audit Events',      value: 284,    sub: 'This month',           icon: <LockOutlinedIcon         sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Admin Users" />
            <Tab label="Audit Log" />
            <Tab label="Security Settings" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={adminUsers}  columns={adminColumns} />}
        {activeTab === 1 && <DataTable noCard rows={auditLogs}   columns={auditColumns} />}

        {activeTab === 2 && (
          <Box sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {settings.map((s, i) => (
                <Box key={s.key}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                    <Box>
                      <Typography variant="body2">{s.label}</Typography>
                      <Typography variant="caption" color="text.disabled">{s.description}</Typography>
                    </Box>
                    <Switch checked={s.enabled} onChange={() => toggleSetting(s.key)} size="small" color="success" />
                  </Box>
                  {i < settings.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" size="small">Save Settings</Button>
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
}
