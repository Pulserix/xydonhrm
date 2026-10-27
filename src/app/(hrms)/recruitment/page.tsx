'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface JobOpening {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  applicants: number;
  posted: string;
  status: string;
}


interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  stage: string;
  appliedDate: string;
  source: string;
}


const jobOpenings: JobOpening[] = [
  { id: '1', title: 'Senior Software Engineer',  dept: 'Engineering', location: 'Bangalore',  type: 'Full-time', applicants: 42, posted: '15 Oct 2026', status: 'Active'  },
  { id: '2', title: 'Product Manager',           dept: 'Product',     location: 'Remote',     type: 'Full-time', applicants: 28, posted: '10 Oct 2026', status: 'Active'  },
  { id: '3', title: 'Sales Executive',           dept: 'Sales',       location: 'Delhi',      type: 'Full-time', applicants: 67, posted: '05 Oct 2026', status: 'Active'  },
  { id: '4', title: 'UI/UX Designer',            dept: 'Engineering', location: 'Bangalore',  type: 'Full-time', applicants: 19, posted: '01 Oct 2026', status: 'Paused'  },
  { id: '5', title: 'Finance Analyst',           dept: 'Finance',     location: 'Mumbai HQ',  type: 'Full-time', applicants: 11, posted: '25 Sep 2026', status: 'Active'  },
];


const candidates: Candidate[] = [
  { id: '1', name: 'Arjun Mehta',    email: 'arjun@email.com',    role: 'Senior Software Engineer', stage: 'Interview',   appliedDate: '20 Oct 2026', source: 'LinkedIn'   },
  { id: '2', name: 'Preethi Rao',    email: 'preethi@email.com',  role: 'Product Manager',          stage: 'Screening',   appliedDate: '18 Oct 2026', source: 'Referral'   },
  { id: '3', name: 'Suresh Iyer',    email: 'suresh@email.com',   role: 'Sales Executive',          stage: 'Applied',     appliedDate: '17 Oct 2026', source: 'Naukri'     },
  { id: '4', name: 'Lakshmi Devi',   email: 'lakshmi@email.com',  role: 'UI/UX Designer',           stage: 'Offer',       appliedDate: '12 Oct 2026', source: 'LinkedIn'   },
  { id: '5', name: 'Rahul Sharma',   email: 'rahul@email.com',    role: 'Finance Analyst',          stage: 'Interview',   appliedDate: '10 Oct 2026', source: 'Indeed'     },
];


export default function RecruitmentPage() {
  const [tab, setTab]           = useState(0);
  const [search, setSearch]     = useState('');
  const [deptFilter, setDept]   = useState('');
  const [page, setPage]         = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const filteredJobs = jobOpenings.filter((j) => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !deptFilter || j.dept === deptFilter;
    return matchSearch && matchDept;
  });


  const jobColumns: Column<JobOpening>[] = [
    {
      key: 'title',
      label: 'Job Title',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.title}</Typography>
          <Typography variant="caption" color="text.disabled">{row.dept} · {row.location}</Typography>
        </Box>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.type}</Typography>,
    },
    {
      key: 'applicants',
      label: 'Applicants',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.applicants}
        </Typography>
      ),
    },
    {
      key: 'posted',
      label: 'Posted',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.posted}
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
      render: () => (
        <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 15 }} /></IconButton>
      ),
    },
  ];


  const candidateColumns: Column<Candidate>[] = [
    {
      key: 'candidate',
      label: 'Candidate',
      render: (row) => <EmployeeCell name={row.name} meta={row.email} />,
    },
    {
      key: 'role',
      label: 'Applied For',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.role}</Typography>,
    },
    {
      key: 'stage',
      label: 'Stage',
      render: (row) => <StatusBadge label={row.stage} />,
    },
    {
      key: 'source',
      label: 'Source',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.source}</Typography>,
    },
    {
      key: 'appliedDate',
      label: 'Applied',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.appliedDate}
        </Typography>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 15 }} /></IconButton>
      ),
    },
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Recruitment"
        subtitle="Manage job openings, candidates, and hiring pipeline"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Post Job
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Open Positions',    value: 8,   sub: 'Across 5 departments',   icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Total Applicants',  value: 167, sub: 'This quarter',            icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Interviews Today',  value: 4,   sub: '2 technical, 2 HR',       icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Offers Extended',   value: 3,   sub: '2 accepted, 1 pending',   icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Job Openings" />
        <Tab label="Pipeline"     />
        <Tab label="Interviews"   />
        <Tab label="Offers"       />
      </Tabs>


      {tab === 0 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search job titles…"
            filters={[
              {
                value: deptFilter,
                onChange: setDept,
                placeholder: 'All Departments',
                options: [
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Sales',       label: 'Sales'       },
                  { value: 'Product',     label: 'Product'     },
                  { value: 'Finance',     label: 'Finance'     },
                ],
              },
            ]}
            count={`${filteredJobs.length} openings`}
          />

          <DataTable
            columns={jobColumns}
            rows={filteredJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            rowKey={(r) => r.id}
            totalCount={filteredJobs.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
            emptyMessage="No job openings match the current filters."
          />
        </>
      )}


      {tab === 1 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search candidates…"
            count={`${candidates.length} candidates`}
          />

          <DataTable
            columns={candidateColumns}
            rows={candidates}
            rowKey={(r) => r.id}
            emptyMessage="No candidates in pipeline."
          />
        </>
      )}


      {tab > 1 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">
            No data available for this view yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
