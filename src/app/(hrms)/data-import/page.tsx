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
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { PageHeader, KpiCard, DataTable, StatusBadge } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface ImportJob {
  id: string;
  entity: string;
  fileName: string;
  totalRows: number;
  imported: number;
  failed: number;
  importedBy: string;
  importedOn: string;
  status: string;
}


const importJobs: ImportJob[] = [
  { id: 'IMP-012', entity: 'Employees',   fileName: 'employees_oct2026.xlsx',    totalRows: 12, imported: 12, failed: 0, importedBy: 'Meera Pillai', importedOn: '15 Oct 2026', status: 'Completed' },
  { id: 'IMP-011', entity: 'Attendance',  fileName: 'attendance_sep2026.csv',    totalRows: 4740, imported: 4720, failed: 20, importedBy: 'HR Admin', importedOn: '02 Oct 2026', status: 'Completed' },
  { id: 'IMP-010', entity: 'Leave Balance',fileName: 'leave_bal_2026.xlsx',      totalRows: 247, imported: 247, failed: 0, importedBy: 'HR Admin',    importedOn: '01 Oct 2026', status: 'Completed' },
  { id: 'IMP-009', entity: 'Employees',   fileName: 'employees_sep2026.xlsx',    totalRows: 8, imported: 6, failed: 2, importedBy: 'Meera Pillai',  importedOn: '15 Sep 2026', status: 'Completed' },
  { id: 'IMP-008', entity: 'Payroll Data',fileName: 'payroll_aug2026.csv',       totalRows: 244, imported: 0, failed: 244, importedBy: 'HR Admin',  importedOn: '01 Sep 2026', status: 'Failed'    },
];

const importColumns: Column<ImportJob>[] = [
  { key: 'entity',   header: 'Entity',    render: (r) => <Chip label={r.entity} size="small" variant="outlined" /> },
  { key: 'fileName', header: 'File',      render: (r) => <Typography variant="body2" color="text.secondary">{r.fileName}</Typography> },
  {
    key: 'progress', header: 'Progress',
    render: (r) => (
      <Box sx={{ minWidth: 120 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="success.light">{r.imported} ok</Typography>
          {r.failed > 0 && <Typography variant="caption" color="error.light">{r.failed} err</Typography>}
        </Box>
        <LinearProgress
          variant="determinate"
          value={(r.imported / r.totalRows) * 100}
          color={r.failed > 0 ? 'warning' : 'success'}
          sx={{ height: 4, borderRadius: 9999 }}
        />
      </Box>
    ),
  },
  { key: 'importedBy', header: 'By',         render: (r) => <Typography variant="body2" color="text.disabled">{r.importedBy}</Typography> },
  { key: 'importedOn', header: 'Date',       render: (r) => <Typography variant="body2" color="text.disabled">{r.importedOn}</Typography> },
  { key: 'status',     header: 'Status',     render: (r) => <StatusBadge label={r.status} /> },
  {
    key: 'action', header: '',
    render: (r) => r.failed > 0
      ? <Button size="small" variant="outlined" color="error" startIcon={<ErrorOutlinedIcon sx={{ fontSize: 13 }} />}>View Errors</Button>
      : null,
  },
];


const importableEntities = [
  { entity: 'Employees',      description: 'Add/update employee master records',       template: 'employees_template.xlsx'   },
  { entity: 'Attendance',     description: 'Bulk import daily attendance records',     template: 'attendance_template.csv'   },
  { entity: 'Leave Balance',  description: 'Set opening leave balances',               template: 'leave_balance_template.xlsx'},
  { entity: 'Salary Revision',description: 'Bulk CTC revisions',                       template: 'salary_revision_template.xlsx'},
  { entity: 'Assets',         description: 'Asset inventory and assignments',          template: 'assets_template.xlsx'      },
  { entity: 'Documents',      description: 'Bulk document metadata',                   template: 'documents_template.xlsx'   },
];


export default function DataImportPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Data Import"
        subtitle="Bulk upload employees, attendance, and payroll data"
        actions={
          <Button variant="contained" size="small" startIcon={<UploadFileOutlinedIcon sx={{ fontSize: 14 }} />}>
            New Import
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Imports',    value: 12,    sub: 'All time',           icon: <UploadFileOutlinedIcon  sx={{ fontSize: 18 }} /> },
          { label: 'Successful',       value: 10,    sub: 'No errors',          icon: <CheckCircleOutlinedIcon  sx={{ fontSize: 18 }} /> },
          { label: 'With Errors',      value: 2,     sub: 'Partial imports',    icon: <ErrorOutlinedIcon        sx={{ fontSize: 18 }} /> },
          { label: 'Rows Imported',    value: '5.0K',sub: 'This month',         icon: <UploadFileOutlinedIcon  sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Import History" />
            <Tab label="Templates" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <DataTable noCard rows={importJobs} columns={importColumns} />
        )}

        {activeTab === 1 && (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {importableEntities.map((e) => (
                <Grid key={e.entity} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{e.entity}</Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 1.5 }}>{e.description}</Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                      startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 13 }} />}
                    >
                      Download Template
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Card>
    </Box>
  );
}
