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
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PageHeader, KpiCard, StatusBadge } from '@/components/hrms';


interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  lastSync: string;
  isConnected: boolean;
  status: string;
}


const integrations: Integration[] = [
  { id: 'INT-01', name: 'Slack',              category: 'Communication',  description: 'HR notifications and bot commands in Slack channels',    lastSync: '2 min ago',   isConnected: true,  status: 'Active' },
  { id: 'INT-02', name: 'Google Workspace',   category: 'Directory',      description: 'Sync employee profiles with Google directory',          lastSync: '15 min ago',  isConnected: true,  status: 'Active' },
  { id: 'INT-03', name: 'Jira',               category: 'Project Mgmt',   description: 'Link employee tasks and time tracking with Jira',       lastSync: '1 hr ago',    isConnected: true,  status: 'Active' },
  { id: 'INT-04', name: 'Razorpay Payroll',   category: 'Payroll',        description: 'Direct payroll disbursement via Razorpay',              lastSync: 'Oct 01',      isConnected: true,  status: 'Active' },
  { id: 'INT-05', name: 'Darwinbox',          category: 'ATS',            description: 'Candidate pipeline sync from Darwinbox ATS',            lastSync: 'Never',       isConnected: false, status: 'Not Connected' },
  { id: 'INT-06', name: 'Quickbooks',         category: 'Finance',        description: 'Push payroll journals to Quickbooks',                   lastSync: 'Sep 30',      isConnected: true,  status: 'Active' },
  { id: 'INT-07', name: 'Greytip / Greythr',  category: 'Payroll',        description: 'Legacy payroll system migration bridge',                lastSync: 'Never',       isConnected: false, status: 'Not Connected' },
  { id: 'INT-08', name: 'BambooHR',           category: 'HRMS',           description: 'Two-way employee data sync for dual-system setups',     lastSync: 'Never',       isConnected: false, status: 'Not Connected' },
];

const categories = ['All', 'Communication', 'Directory', 'Payroll', 'Finance', 'ATS', 'Project Mgmt', 'HRMS'];


export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? integrations
    : integrations.filter((i) => i.category === activeCategory);

  const connected    = integrations.filter((i) => i.isConnected).length;
  const notConnected = integrations.filter((i) => !i.isConnected).length;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Integrations"
        subtitle="Connect your HRMS with third-party tools"
        actions={
          <Button variant="outlined" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Browse Catalog
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Connected',      value: connected,    sub: 'Active integrations', icon: <CheckCircleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Available',      value: notConnected, sub: 'Not yet connected',   icon: <ExtensionOutlinedIcon  sx={{ fontSize: 18 }} /> },
          { label: 'Last Sync',      value: '2m ago',     sub: 'Slack',               icon: <SyncOutlinedIcon       sx={{ fontSize: 18 }} /> },
          { label: 'Sync Events',    value: 1284,         sub: 'This month',          icon: <SyncOutlinedIcon       sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      {/* Category filter chips */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            size="small"
            variant={activeCategory === cat ? 'filled' : 'outlined'}
            color={activeCategory === cat ? 'primary' : 'default'}
            onClick={() => setActiveCategory(cat)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Grid container spacing={2}>
        {filtered.map((integration) => (
          <Grid key={integration.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box>
                    <Typography variant="body2">{integration.name}</Typography>
                    <Chip label={integration.category} size="small" variant="outlined" sx={{ mt: 0.5, fontSize: 10 }} />
                  </Box>
                  <Switch
                    size="small"
                    checked={integration.isConnected}
                    onChange={() => {}}
                    color="success"
                  />
                </Box>

                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 1.5, lineHeight: 1.5 }}>
                  {integration.description}
                </Typography>

                <Divider sx={{ mb: 1.5 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.disabled">
                    {integration.isConnected ? `Last sync: ${integration.lastSync}` : 'Not connected'}
                  </Typography>
                  <Button
                    size="small"
                    variant={integration.isConnected ? 'outlined' : 'contained'}
                    sx={{ minWidth: 80 }}
                  >
                    {integration.isConnected ? 'Configure' : 'Connect'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
