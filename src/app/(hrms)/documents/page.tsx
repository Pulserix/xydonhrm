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
import IconButton from '@mui/material/IconButton';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  owner: string;
  uploadedAt: string;
  size: string;
  status: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
  lastUsed: string;
  uses: number;
}


const documents: Document[] = [
  { id: 'DOC-001', name: 'Offer Letter – Amit Singh',         type: 'PDF',  category: 'Offer Letters',   owner: 'HR',          uploadedAt: '12 Oct 2026', size: '142 KB', status: 'Active' },
  { id: 'DOC-002', name: 'NDA – Priya Sharma',                type: 'PDF',  category: 'Agreements',      owner: 'Legal',       uploadedAt: '08 Oct 2026', size: '98 KB',  status: 'Active' },
  { id: 'DOC-003', name: 'Payslip – Sep 2026 – Rohan Joshi',  type: 'PDF',  category: 'Payslips',        owner: 'Payroll',     uploadedAt: '01 Oct 2026', size: '64 KB',  status: 'Active' },
  { id: 'DOC-004', name: 'Experience Letter – Neha Gupta',    type: 'PDF',  category: 'Letters',         owner: 'HR',          uploadedAt: '28 Sep 2026', size: '55 KB',  status: 'Active' },
  { id: 'DOC-005', name: 'Training Certificate – ISO 27001',  type: 'PDF',  category: 'Certificates',    owner: 'Training',    uploadedAt: '20 Sep 2026', size: '210 KB', status: 'Active' },
  { id: 'DOC-006', name: 'Appraisal Letter – FY25-26',        type: 'DOCX', category: 'Appraisals',      owner: 'HR',          uploadedAt: '15 Sep 2026', size: '78 KB',  status: 'Archived' },
];

const templates: Template[] = [
  { id: 'T1', name: 'Offer Letter',          category: 'Hiring',      lastUsed: '12 Oct 2026', uses: 34 },
  { id: 'T2', name: 'Appointment Letter',    category: 'Hiring',      lastUsed: '10 Oct 2026', uses: 28 },
  { id: 'T3', name: 'Experience Letter',     category: 'Separation',  lastUsed: '28 Sep 2026', uses: 19 },
  { id: 'T4', name: 'Confirmation Letter',   category: 'HR Letters',  lastUsed: '22 Sep 2026', uses: 15 },
  { id: 'T5', name: 'Warning Letter',        category: 'Disciplinary',lastUsed: '14 Sep 2026', uses: 7  },
  { id: 'T6', name: 'Salary Revision Letter',category: 'Compensation',lastUsed: '01 Sep 2026', uses: 22 },
];


const docColumns: Column<Document>[] = [
  {
    key: 'name', header: 'Document',
    render: (r) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <InsertDriveFileOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
        <Box>
          <Typography variant="body2">{r.name}</Typography>
          <Typography variant="caption" color="text.disabled">{r.category}</Typography>
        </Box>
      </Box>
    ),
  },
  { key: 'type',       header: 'Type',     render: (r) => <Chip label={r.type} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: 10 }} /> },
  { key: 'owner',      header: 'Owner',    render: (r) => <Typography variant="body2" color="text.secondary">{r.owner}</Typography> },
  { key: 'uploadedAt', header: 'Uploaded', render: (r) => <Typography variant="body2" color="text.disabled">{r.uploadedAt}</Typography> },
  { key: 'size',       header: 'Size',     render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{r.size}</Typography> },
  { key: 'status',     header: 'Status',   render: (r) => <StatusBadge label={r.status} /> },
  {
    key: 'actions', header: '',
    render: () => (
      <IconButton size="small" sx={{ color: 'text.disabled' }}>
        <DownloadOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    ),
  },
];

const templateColumns: Column<Template>[] = [
  { key: 'name',     header: 'Template',  render: (r) => <Typography variant="body2">{r.name}</Typography> },
  { key: 'category', header: 'Category',  render: (r) => <Chip label={r.category} size="small" variant="outlined" /> },
  { key: 'uses',     header: 'Uses',      render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.uses}</Typography> },
  { key: 'lastUsed', header: 'Last Used', render: (r) => <Typography variant="body2" color="text.disabled">{r.lastUsed}</Typography> },
  {
    key: 'action', header: '',
    render: () => <Button size="small" variant="outlined">Use</Button>,
  },
];



export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Documents"
        subtitle="Employee files, letters, and templates"
        actions={
          <Button variant="contained" size="small" startIcon={<UploadFileOutlinedIcon sx={{ fontSize: 14 }} />}>
            Upload
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Documents',  value: 1840, sub: 'Across all employees',   icon: <InsertDriveFileOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Templates',        value: 24,   sub: '6 categories',           icon: <FolderOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Uploaded This Month', value: 138, sub: '+12% vs last month',   icon: <UploadFileOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Pending Signing',  value: 7,    sub: 'Awaiting signature',     icon: <InsertDriveFileOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="All Documents" />
            <Tab label="Templates" />
            <Tab label="Pending Signatures" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            <DataTable noCard rows={documents} columns={docColumns} />
          </>
        )}

        {activeTab === 1 && (
          <DataTable noCard rows={templates} columns={templateColumns} />
        )}

        {activeTab === 2 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="body2" color="text.disabled">No documents pending signature.</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
