'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageHeader, KpiCard, EmployeeCell, StatusBadge, DataTable, FilterBar } from '@/components/hrms';
import type { Column } from '@/components/hrms';


interface Asset {
  id: string;
  assetId: string;
  name: string;
  category: string;
  assignedTo: string | null;
  empId: string | null;
  condition: string;
  purchasedOn: string;
  status: string;
}


const assets: Asset[] = [
  { id: '1',  assetId: 'AST-0041', name: 'MacBook Pro 14"',      category: 'Laptop',   assignedTo: 'Rohan Gupta',  empId: 'EMP-00131', condition: 'Good',      purchasedOn: '12 Jan 2024', status: 'Assigned'   },
  { id: '2',  assetId: 'AST-0039', name: 'Dell Monitor 27"',      category: 'Monitor',  assignedTo: 'Divya Singh',  empId: 'EMP-00104', condition: 'Good',      purchasedOn: '05 Mar 2023', status: 'Assigned'   },
  { id: '3',  assetId: 'AST-0035', name: 'iPhone 15 Pro',         category: 'Mobile',   assignedTo: 'Priya Kumar',  empId: 'EMP-00142', condition: 'Good',      purchasedOn: '20 Sep 2023', status: 'Assigned'   },
  { id: '4',  assetId: 'AST-0030', name: 'Lenovo ThinkPad X1',    category: 'Laptop',   assignedTo: null,           empId: null,        condition: 'Good',      purchasedOn: '01 Aug 2022', status: 'Available'  },
  { id: '5',  assetId: 'AST-0028', name: 'Ergonomic Chair',       category: 'Furniture',assignedTo: 'Kavya Nair',   empId: 'EMP-00127', condition: 'Fair',      purchasedOn: '15 Apr 2021', status: 'Assigned'   },
  { id: '6',  assetId: 'AST-0022', name: 'iPad Air',              category: 'Tablet',   assignedTo: null,           empId: null,        condition: 'Needs Repair', purchasedOn: '10 Feb 2022', status: 'Maintenance'},
];


export default function AssetsPage() {
  const [tab, setTab]         = useState(0);
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus]   = useState('');
  const [page, setPage]       = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const filtered = assets.filter((a) => {
    const matchSearch   = !search   || a.name.toLowerCase().includes(search.toLowerCase()) || a.assetId.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || a.category === category;
    const matchStatus   = !status   || a.status   === status;
    return matchSearch && matchCategory && matchStatus;
  });


  const columns: Column<Asset>[] = [
    {
      key: 'asset',
      label: 'Asset',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.name}</Typography>
          <Typography variant="caption" color="text.disabled">{row.assetId} · {row.category}</Typography>
        </Box>
      ),
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      render: (row) =>
        row.assignedTo && row.empId
          ? <EmployeeCell name={row.assignedTo} meta={row.empId} />
          : <Typography variant="body2" color="text.disabled">Unassigned</Typography>,
    },
    {
      key: 'condition',
      label: 'Condition',
      render: (row) => <Typography variant="body2" color="text.secondary">{row.condition}</Typography>,
    },
    {
      key: 'purchasedOn',
      label: 'Purchased',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
          {row.purchasedOn}
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
        title="Assets"
        subtitle="Track company assets, assignments, and maintenance"
        actions={
          <Button variant="contained" size="small" startIcon={<AddOutlinedIcon sx={{ fontSize: 14 }} />}>
            Add Asset
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Assets',     value: 84,  sub: 'Across all categories', icon: <LaptopOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Assigned',         value: 71,  sub: 'To employees',          icon: <AssignmentOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Available',        value: 9,   sub: 'Ready to assign',        icon: <LaptopOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'In Maintenance',   value: 4,   sub: 'Being repaired',         icon: <BuildOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Inventory"   />
        <Tab label="Assignments" />
        <Tab label="Returns"     />
        <Tab label="Maintenance" />
      </Tabs>


      {tab === 0 && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search assets…"
            filters={[
              {
                value: category,
                onChange: setCategory,
                placeholder: 'All Categories',
                options: [
                  { value: 'Laptop',    label: 'Laptop'    },
                  { value: 'Monitor',   label: 'Monitor'   },
                  { value: 'Mobile',    label: 'Mobile'    },
                  { value: 'Tablet',    label: 'Tablet'    },
                  { value: 'Furniture', label: 'Furniture' },
                ],
              },
              {
                value: status,
                onChange: setStatus,
                placeholder: 'All Statuses',
                options: [
                  { value: 'Assigned',    label: 'Assigned'    },
                  { value: 'Available',   label: 'Available'   },
                  { value: 'Maintenance', label: 'Maintenance' },
                ],
              },
            ]}
            count={`${filtered.length} assets`}
          />
          <DataTable
            columns={columns}
            rows={filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            rowKey={(r) => r.id}
            totalCount={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
            emptyMessage="No assets match the current filters."
          />
        </>
      )}


      {tab !== 0 && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">No data available.</Typography>
        </Box>
      )}
    </Box>
  );
}
