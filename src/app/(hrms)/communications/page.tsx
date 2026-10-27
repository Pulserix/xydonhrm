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
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Announcement {
  id: string;
  title: string;
  category: string;
  audience: string;
  publishedBy: string;
  publishedOn: string;
  views: number;
  status: string;
}

interface Newsletter {
  id: string;
  subject: string;
  sentTo: number;
  opened: number;
  sentOn: string;
  status: string;
}


const announcements: Announcement[] = [
  { id: 'ANN-014', title: 'Q3 Town Hall – Recording Available',      category: 'Company',    audience: 'All Employees',  publishedBy: 'CEO',         publishedOn: '22 Oct 2026', views: 212, status: 'Published' },
  { id: 'ANN-013', title: 'Diwali Holiday – 20 Oct 2026',            category: 'Holiday',    audience: 'All Employees',  publishedBy: 'HR',          publishedOn: '15 Oct 2026', views: 247, status: 'Published' },
  { id: 'ANN-012', title: 'New Leave Policy – Effective Nov 2026',   category: 'Policy',     audience: 'All Employees',  publishedBy: 'HR',          publishedOn: '10 Oct 2026', views: 198, status: 'Published' },
  { id: 'ANN-011', title: 'Engineering All-Hands – 28 Oct',          category: 'Meeting',    audience: 'Engineering',    publishedBy: 'Ankit Verma', publishedOn: '27 Oct 2026', views: 68,  status: 'Published' },
  { id: 'ANN-010', title: 'Year-End Review Timelines',               category: 'Policy',     audience: 'All Employees',  publishedBy: 'HR',          publishedOn: '05 Oct 2026', views: 221, status: 'Published' },
  { id: 'ANN-XXX', title: 'Benefits Enrollment – Open Nov 1–15',    category: 'Benefits',   audience: 'All Employees',  publishedBy: 'HR',          publishedOn: 'Scheduled',   views: 0,   status: 'Scheduled' },
];

const newsletters: Newsletter[] = [
  { id: 'NL-04', subject: 'People Pulse – October 2026',     sentTo: 247, opened: 189, sentOn: '01 Oct 2026', status: 'Sent'     },
  { id: 'NL-03', subject: 'People Pulse – September 2026',   sentTo: 244, opened: 201, sentOn: '01 Sep 2026', status: 'Sent'     },
  { id: 'NL-02', subject: 'Mid-Year Benefits Update',         sentTo: 244, opened: 178, sentOn: '15 Aug 2026', status: 'Sent'     },
  { id: 'NL-01', subject: 'Q2 HR Wrap-Up',                   sentTo: 241, opened: 196, sentOn: '01 Jul 2026', status: 'Sent'     },
];

const annColumns: Column<Announcement>[] = [
  { key: 'title',       header: 'Title',      render: (r) => <Typography variant="body2">{r.title}</Typography> },
  { key: 'category',    header: 'Category',   render: (r) => <Chip label={r.category} size="small" variant="outlined" /> },
  { key: 'audience',    header: 'Audience',   render: (r) => <Typography variant="body2" color="text.secondary">{r.audience}</Typography> },
  { key: 'publishedBy', header: 'By',         render: (r) => <Typography variant="body2" color="text.disabled">{r.publishedBy}</Typography> },
  { key: 'publishedOn', header: 'Date',       render: (r) => <Typography variant="body2" color="text.disabled">{r.publishedOn}</Typography> },
  { key: 'views',       header: 'Views',      render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.views}</Typography> },
  { key: 'status',      header: 'Status',     render: (r) => <StatusBadge label={r.status} /> },
];

const nlColumns: Column<Newsletter>[] = [
  { key: 'subject', header: 'Subject',    render: (r) => <Typography variant="body2">{r.subject}</Typography> },
  { key: 'sentTo',  header: 'Sent To',   render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.sentTo}</Typography> },
  { key: 'opened',  header: 'Opened',    render: (r) => (
    <Box>
      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.opened} <Typography component="span" variant="caption" color="text.disabled">({Math.round((r.opened / r.sentTo) * 100)}%)</Typography></Typography>
    </Box>
  )},
  { key: 'sentOn',  header: 'Sent On',   render: (r) => <Typography variant="body2" color="text.disabled">{r.sentOn}</Typography> },
  { key: 'status',  header: 'Status',    render: (r) => <StatusBadge label={r.status} /> },
];


export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Communications"
        subtitle="Announcements, newsletters, and internal broadcasts"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            New Announcement
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Announcements (Oct)', value: 5,    sub: '1 scheduled',         icon: <CampaignOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Total Views',         value: 946,  sub: 'Oct announcements',   icon: <PeopleOutlinedIcon   sx={{ fontSize: 18 }} /> },
          { label: 'Newsletter Open Rate',value: '77%',sub: 'Oct 2026',            icon: <CampaignOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Engagement Rate',     value: '84%',sub: '↑ 4% vs last month', icon: <ThumbUpOutlinedIcon  sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Announcements" />
            <Tab label="Newsletters" />
          </Tabs>
        </Box>

        {activeTab === 0 && <DataTable noCard rows={announcements} columns={annColumns} />}
        {activeTab === 1 && <DataTable noCard rows={newsletters}   columns={nlColumns}  />}
      </Card>
    </Box>
  );
}
