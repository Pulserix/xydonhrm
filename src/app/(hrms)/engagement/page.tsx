'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, StatusBadge, DataTable } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Survey {
  id: string;
  title: string;
  type: string;
  responses: number;
  target: number;
  createdAt: string;
  status: string;
}


interface Recognition {
  id: string;
  from: string;
  to: string;
  message: string;
  badge: string;
  date: string;
}


const surveys: Survey[] = [
  { id: '1', title: 'Q3 Employee Satisfaction',     type: 'Pulse',    responses: 198, target: 247, createdAt: '01 Oct 2026', status: 'Active'    },
  { id: '2', title: 'Remote Work Preferences',      type: 'One-time', responses: 240, target: 240, createdAt: '15 Sep 2026', status: 'Completed' },
  { id: '3', title: 'Manager Effectiveness 2026',   type: 'Annual',   responses: 12,  target: 247, createdAt: '20 Oct 2026', status: 'Draft'     },
];


const recognitions: Recognition[] = [
  { id: '1', from: 'Nisha Mehta',   to: 'Rohan Gupta',  message: 'Outstanding work on the mobile app launch!',            badge: '🚀 Innovator',  date: '26 Oct 2026' },
  { id: '2', from: 'Priya Kumar',   to: 'Divya Singh',  message: 'Beautiful UI work on the dashboard redesign.',           badge: '🎨 Creative',   date: '24 Oct 2026' },
  { id: '3', from: 'Vikram Rao',    to: 'Kavya Nair',   message: 'Consistently exceeding sales targets this quarter!',     badge: '⭐ Star',       date: '22 Oct 2026' },
  { id: '4', from: 'Manish Shah',   to: 'Amit Verma',   message: 'Great collaboration on the financial audit.',            badge: '🤝 Team Player', date: '20 Oct 2026' },
];


export default function EngagementPage() {
  const [tab, setTab] = useState(0);


  const surveyColumns: Column<Survey>[] = [
    {
      key: 'title',
      label: 'Survey',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.title}</Typography>
          <Typography variant="caption" color="text.disabled">{row.type} · Created {row.createdAt}</Typography>
        </Box>
      ),
    },
    {
      key: 'responses',
      label: 'Responses',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.responses}/{row.target}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge label={row.status} />,
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 15 }} /></IconButton>,
    },
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Engagement"
        subtitle="Surveys, recognition, and announcements"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            New Survey
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'eNPS Score',         value: '42',  sub: 'Industry avg: 35',     icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Active Surveys',     value: 1,     sub: '2 completed, 1 draft', icon: <PollOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Announcements',      value: 6,     sub: 'This month',           icon: <CampaignOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Recognitions',       value: 24,    sub: 'Given this quarter',   icon: <StarBorderOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Surveys"       />
        <Tab label="Recognition"   />
        <Tab label="Announcements" />
      </Tabs>


      {tab === 0 && (
        <DataTable
          columns={surveyColumns}
          rows={surveys}
          rowKey={(r) => r.id}
          emptyMessage="No surveys found."
        />
      )}


      {tab === 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recognitions.map((r) => (
            <Card key={r.id}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: 'primary.dark' }}>
                      {r.from.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600 }}>{r.from}</Box>
                        {' recognized '}
                        <Box component="span" sx={{ fontWeight: 600 }}>{r.to}</Box>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {r.message}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, flexShrink: 0 }}>
                    <Chip label={r.badge} size="small" />
                    <Typography variant="caption" color="text.disabled">{r.date}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}


      {tab === 2 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">No announcements yet.</Typography>
        </Box>
      )}
    </Box>
  );
}
