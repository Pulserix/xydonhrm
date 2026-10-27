'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import { PageHeader } from '@/components/hrms';


interface SettingsSection {
  id: string;
  label: string;
  icon: React.ElementType;
}


const sections: SettingsSection[] = [
  { id: 'organization',    label: 'Organization',     icon: BusinessOutlinedIcon            },
  { id: 'hr-policies',     label: 'HR Policies',      icon: PeopleOutlinedIcon              },
  { id: 'payroll',         label: 'Payroll',          icon: AccountBalanceOutlinedIcon      },
  { id: 'notifications',   label: 'Notifications',    icon: NotificationsOutlinedIcon       },
  { id: 'security',        label: 'Security',         icon: SecurityOutlinedIcon            },
  { id: 'integrations',    label: 'Integrations',     icon: IntegrationInstructionsOutlinedIcon },
];


function OrganizationSettings() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Company Information</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Company Name" defaultValue="Xydon Technologies Pvt Ltd" size="small" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Company Email" defaultValue="hr@xydon.com" size="small" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Industry" defaultValue="Technology" size="small" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Company Size" defaultValue="201–500" size="small" fullWidth />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField label="Registered Address" defaultValue="5th Floor, Tech Park, Bangalore - 560001" size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Work Week</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Work Days" defaultValue="Monday – Friday" size="small" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Work Hours" defaultValue="9:00 AM – 6:00 PM" size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="small">Save Changes</Button>
      </Box>
    </Box>
  );
}


function NotificationSettings() {
  const [settings, setSettings] = useState({
    leaveRequests:       true,
    payrollAlerts:       true,
    attendanceAlerts:    false,
    birthdayReminders:   true,
    complianceReminders: true,
    systemUpdates:       false,
  });


  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Email Notifications</Typography>
      {(Object.entries(settings) as [keyof typeof settings, boolean][]).map(([key, value]) => {
        const labels: Record<keyof typeof settings, string> = {
          leaveRequests:       'Leave requests',
          payrollAlerts:       'Payroll alerts',
          attendanceAlerts:    'Attendance alerts',
          birthdayReminders:   'Birthday reminders',
          complianceReminders: 'Compliance reminders',
          systemUpdates:       'System updates',
        };
        return (
          <FormControlLabel
            key={key}
            control={<Switch checked={value} onChange={() => toggle(key)} size="small" />}
            label={<Typography variant="body2">{labels[key]}</Typography>}
            sx={{ mx: 0 }}
          />
        );
      })}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button variant="contained" size="small">Save Preferences</Button>
      </Box>
    </Box>
  );
}


function PlaceholderSettings({ label }: { label: string }) {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="body2" color="text.disabled">{label} settings coming soon.</Typography>
    </Box>
  );
}


export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('organization');


  const renderContent = () => {
    switch (activeSection) {
      case 'organization':  return <OrganizationSettings />;
      case 'notifications': return <NotificationSettings />;
      default:              return <PlaceholderSettings label={sections.find((s) => s.id === activeSection)?.label ?? ''} />;
    }
  };


  const activeLabel = sections.find((s) => s.id === activeSection)?.label ?? '';


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader title="Settings" subtitle="Configure your HRMS workspace" />


      <Grid container spacing={2}>

        {/* Side nav */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <List disablePadding>
              {sections.map((section, i) => {
                const Icon = section.icon;
                const isActive = section.id === activeSection;
                return (
                  <Box key={section.id}>
                    <ListItemButton
                      selected={isActive}
                      onClick={() => setActiveSection(section.id)}
                      sx={{ py: 1.25, px: 2 }}
                    >
                      <Icon sx={{ fontSize: 16, mr: 1.5, color: isActive ? 'primary.main' : 'text.secondary' }} />
                      <ListItemText
                        primary={section.label}
                        slotProps={{ primary: { variant: 'body2', sx: { fontWeight: isActive ? 600 : 400 } } }}
                      />
                    </ListItemButton>
                    {i < sections.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </List>
          </Card>
        </Grid>


        {/* Content */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <Box sx={{ px: 2.5, py: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{activeLabel}</Typography>
            </Box>
            <Box sx={{ p: 2.5 }}>
              {renderContent()}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
