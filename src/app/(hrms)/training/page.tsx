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
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Course {
  id: string;
  title: string;
  category: string;
  enrolled: number;
  completed: number;
  duration: string;
  status: string;
}


interface Assignment {
  id: string;
  name: string;
  empId: string;
  dept: string;
  course: string;
  progress: number;
  dueDate: string;
  status: string;
}


const courses: Course[] = [
  { id: '1', title: 'Safety & Compliance 2026',        category: 'Compliance',   enrolled: 247, completed: 231, duration: '2h',   status: 'Active'   },
  { id: '2', title: 'Leadership Fundamentals',         category: 'Leadership',   enrolled: 45,  completed: 32,  duration: '8h',   status: 'Active'   },
  { id: '3', title: 'Advanced Excel for Finance',      category: 'Technical',    enrolled: 18,  completed: 15,  duration: '4h',   status: 'Active'   },
  { id: '4', title: 'Customer Success Bootcamp',       category: 'Sales',        enrolled: 54,  completed: 50,  duration: '6h',   status: 'Completed'},
  { id: '5', title: 'Code Review Best Practices',      category: 'Technical',    enrolled: 28,  completed: 10,  duration: '3h',   status: 'Active'   },
];


const assignments: Assignment[] = [
  { id: '1', name: 'Priya Kumar',  empId: 'EMP-00142', dept: 'Operations',  course: 'Safety & Compliance 2026',   progress: 100, dueDate: '31 Oct 2026', status: 'Completed' },
  { id: '2', name: 'Rohan Gupta',  empId: 'EMP-00131', dept: 'Engineering', course: 'Code Review Best Practices', progress: 60,  dueDate: '15 Nov 2026', status: 'In Progress'},
  { id: '3', name: 'Neha Singh',   empId: 'EMP-00119', dept: 'Product',     course: 'Leadership Fundamentals',    progress: 30,  dueDate: '30 Nov 2026', status: 'In Progress'},
  { id: '4', name: 'Manish Shah',  empId: 'EMP-00110', dept: 'Finance',     course: 'Advanced Excel for Finance', progress: 0,   dueDate: '20 Oct 2026', status: 'Overdue'   },
];


export default function TrainingPage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const courseColumns: Column<Course>[] = [
    {
      key: 'course',
      label: 'Course',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.title}</Typography>
          <Typography variant="caption" color="text.disabled">{row.category} · {row.duration}</Typography>
        </Box>
      ),
    },
    {
      key: 'enrollment',
      label: 'Enrollment',
      render: (row) => {
        const pct = Math.round((row.completed / row.enrolled) * 100);
        return (
          <Box sx={{ minWidth: 120 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.disabled">{row.completed}/{row.enrolled}</Typography>
              <Typography variant="caption" color="text.secondary">{pct}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={pct} sx={{ height: 4, borderRadius: 9999 }} />
          </Box>
        );
      },
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


  const assignmentColumns: Column<Assignment>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (row) => <EmployeeCell name={row.name} meta={row.empId} />,
    },
    {
      key: 'course',
      label: 'Course',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.course}</Typography>,
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (row) => (
        <Box sx={{ minWidth: 100 }}>
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 0.5 }}>{row.progress}%</Typography>
          <LinearProgress variant="determinate" value={row.progress} sx={{ height: 4, borderRadius: 9999 }} />
        </Box>
      ),
    },
    {
      key: 'dueDate',
      label: 'Due',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.dueDate}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge label={row.status} />,
    },
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Training"
        subtitle="Courses, assignments, and certifications"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Course
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Active Courses',      value: 4,    sub: 'Across departments',   icon: <SchoolOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Enrolled',            value: 392,  sub: 'Employee enrollments', icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Completed',           value: 338,  sub: '86.2% completion',     icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Certifications',      value: 28,   sub: 'Issued this quarter',  icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Courses"        />
        <Tab label="Assignments"    />
        <Tab label="Assessments"    />
        <Tab label="Certifications" />
      </Tabs>


      {tab === 0 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search courses…"
            count={`${courses.length} courses`}
          />
          <DataTable
            columns={courseColumns}
            rows={courses}
            rowKey={(r) => r.id}
            emptyMessage="No courses found."
          />
        </>
      )}


      {tab === 1 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search assignments…"
            count={`${assignments.length} assignments`}
          />
          <DataTable
            columns={assignmentColumns}
            rows={assignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            rowKey={(r) => r.id}
            totalCount={assignments.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
            emptyMessage="No assignments found."
          />
        </>
      )}


      {tab > 1 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">No data available.</Typography>
        </Box>
      )}
    </Box>
  );
}
