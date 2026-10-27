'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { PageHeader, KpiCard, DataTable } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Department {
  id: string;
  name: string;
  head: string;
  headcount: number;
  openPositions: number;
  location: string;
}

interface Location {
  id: string;
  name: string;
  city: string;
  type: string;
  headcount: number;
}

interface CostCenter {
  id: string;
  code: string;
  name: string;
  department: string;
  budget: string;
  spent: string;
}


const departments: Department[] = [
  { id: 'D1', name: 'Engineering',    head: 'Ankit Verma',    headcount: 72, openPositions: 5, location: 'Bangalore'  },
  { id: 'D2', name: 'Sales',          head: 'Priya Sharma',   headcount: 54, openPositions: 8, location: 'Mumbai'     },
  { id: 'D3', name: 'Operations',     head: 'Suresh Kumar',   headcount: 47, openPositions: 2, location: 'Hyderabad'  },
  { id: 'D4', name: 'Finance',        head: 'Kavitha Nair',   headcount: 31, openPositions: 1, location: 'Bangalore'  },
  { id: 'D5', name: 'HR',             head: 'Meera Pillai',   headcount: 18, openPositions: 0, location: 'Bangalore'  },
  { id: 'D6', name: 'Marketing',      head: 'Rohan Joshi',    headcount: 25, openPositions: 3, location: 'Mumbai'     },
];

const locations: Location[] = [
  { id: 'L1', name: 'HQ – Bangalore',  city: 'Bangalore', type: 'HQ',           headcount: 131 },
  { id: 'L2', name: 'Mumbai Office',   city: 'Mumbai',    type: 'Branch',       headcount: 79  },
  { id: 'L3', name: 'Hyderabad Office',city: 'Hyderabad', type: 'Branch',       headcount: 37  },
];

const costCenters: CostCenter[] = [
  { id: 'C1', code: 'CC-ENG-01', name: 'Engineering Core',   department: 'Engineering', budget: '₹85L', spent: '₹61L' },
  { id: 'C2', code: 'CC-SAL-01', name: 'Sales – North',      department: 'Sales',       budget: '₹40L', spent: '₹38L' },
  { id: 'C3', code: 'CC-OPS-01', name: 'Operations',         department: 'Operations',  budget: '₹30L', spent: '₹22L' },
  { id: 'C4', code: 'CC-FIN-01', name: 'Finance & Accounts', department: 'Finance',     budget: '₹20L', spent: '₹14L' },
  { id: 'C5', code: 'CC-HR-01',  name: 'People & Culture',   department: 'HR',          budget: '₹15L', spent: '₹9L'  },
];


const deptColumns: Column<Department>[] = [
  { key: 'name',          header: 'Department',       render: (r) => <Typography variant="body2">{r.name}</Typography> },
  { key: 'head',          header: 'Head',             render: (r) => <Typography variant="body2" color="text.secondary">{r.head}</Typography> },
  { key: 'location',      header: 'Location',         render: (r) => <Typography variant="body2" color="text.secondary">{r.location}</Typography> },
  { key: 'headcount',     header: 'Headcount',        render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.headcount}</Typography> },
  { key: 'openPositions', header: 'Open Positions',   render: (r) => r.openPositions > 0 ? <Chip label={r.openPositions} size="small" color="warning" /> : <Typography variant="caption" color="text.disabled">—</Typography> },
];

const locationColumns: Column<Location>[] = [
  { key: 'name',      header: 'Office',     render: (r) => <Typography variant="body2">{r.name}</Typography> },
  { key: 'city',      header: 'City',       render: (r) => <Typography variant="body2" color="text.secondary">{r.city}</Typography> },
  { key: 'type',      header: 'Type',       render: (r) => <Chip label={r.type} size="small" variant="outlined" /> },
  { key: 'headcount', header: 'Headcount',  render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.headcount}</Typography> },
];

const costCenterColumns: Column<CostCenter>[] = [
  { key: 'code',       header: 'Code',       render: (r) => <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>{r.code}</Typography> },
  { key: 'name',       header: 'Cost Center',render: (r) => <Typography variant="body2">{r.name}</Typography> },
  { key: 'department', header: 'Department', render: (r) => <Typography variant="body2" color="text.secondary">{r.department}</Typography> },
  { key: 'budget',     header: 'Budget',     render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.budget}</Typography> },
  { key: 'spent',      header: 'Spent',      render: (r) => <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{r.spent}</Typography> },
];



export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Organization"
        subtitle="Departments, offices, and cost centers"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Department
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Departments', value: 6,   sub: 'Active',              icon: <AccountTreeOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Locations',         value: 3,   sub: '2 cities',            icon: <LocationOnOutlinedIcon  sx={{ fontSize: 18 }} /> },
          { label: 'Total Headcount',   value: 247, sub: '+3 this month',       icon: <BusinessOutlinedIcon    sx={{ fontSize: 18 }} /> },
          { label: 'Open Positions',    value: 19,  sub: 'Across departments',  icon: <AddOutlinedIcon         sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Departments" />
            <Tab label="Locations" />
            <Tab label="Cost Centers" />
            <Tab label="Org Chart" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            <DataTable noCard rows={departments} columns={deptColumns} />
          </>
        )}

        {activeTab === 1 && (
          <DataTable noCard rows={locations} columns={locationColumns} />
        )}

        {activeTab === 2 && (
          <DataTable noCard rows={costCenters} columns={costCenterColumns} />
        )}

        {activeTab === 3 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <AccountTreeOutlinedIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body2" color="text.disabled">Interactive org chart coming soon.</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
