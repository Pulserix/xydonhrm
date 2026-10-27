'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { PageHeader, KpiCard, SectionCard } from '@/components/hrms';


interface DeptStat {
  dept: string;
  headcount: number;
  attrition: string;
  avgTenure: string;
}


const deptStats: DeptStat[] = [
  { dept: 'Engineering', headcount: 72,  attrition: '3.1%', avgTenure: '2.4y' },
  { dept: 'Sales',       headcount: 54,  attrition: '8.2%', avgTenure: '1.8y' },
  { dept: 'Operations',  headcount: 47,  attrition: '4.5%', avgTenure: '3.1y' },
  { dept: 'Finance',     headcount: 31,  attrition: '2.0%', avgTenure: '4.2y' },
  { dept: 'HR',          headcount: 18,  attrition: '5.5%', avgTenure: '2.8y' },
  { dept: 'Marketing',   headcount: 25,  attrition: '6.0%', avgTenure: '2.1y' },
];


interface ReportCard {
  title: string;
  description: string;
  category: string;
}


const reports: ReportCard[] = [
  { title: 'Headcount Report',          description: 'Department-wise headcount breakdown and trends',  category: 'Workforce'  },
  { title: 'Attrition Report',          description: 'Voluntary/involuntary attrition analysis',        category: 'Workforce'  },
  { title: 'Payroll Summary',           description: 'Monthly payroll cost by department',              category: 'Finance'    },
  { title: 'Leave Utilization',         description: 'Leave patterns and balance summary',              category: 'Leave'      },
  { title: 'Attendance Summary',        description: 'Attendance, punctuality, and absence trends',     category: 'Attendance' },
  { title: 'Performance Distribution',  description: 'Rating distribution and top performers',          category: 'Performance'},
];


export default function AnalyticsPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="Analytics"
        subtitle="Workforce insights and reports"
        actions={
          <Button variant="outlined" size="small" startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}>
            Export All
          </Button>
        }
      />


      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Headcount',   value: 247,   sub: '+3 this month',       icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Attrition (YTD)',   value: '4.2%', sub: 'vs 5.1% last year', icon: <TrendingDownOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Payroll Cost',      value: '₹2.4Cr', sub: 'This month',      icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} /> },
          { label: 'Attendance Rate',   value: '88.3%', sub: 'Monthly average',  icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>


      <Grid container spacing={2} sx={{ mb: 3 }}>

        {/* Headcount by dept */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="Headcount by Department">
            {deptStats.map(({ dept, headcount }) => (
              <Box key={dept} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, '&:last-child': { mb: 0 } }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>{dept}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(headcount / 72) * 100}
                  sx={{ flex: 1, height: 6, borderRadius: 9999 }}
                />
                <Typography variant="caption" color="text.disabled" sx={{ width: 28, textAlign: 'right', fontFamily: 'monospace', flexShrink: 0 }}>
                  {headcount}
                </Typography>
              </Box>
            ))}
          </SectionCard>
        </Grid>


        {/* Dept stats table */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="Department Breakdown" noPadding>
            {deptStats.map(({ dept, headcount, attrition, avgTenure }, i) => (
              <Box key={dept}>
                <Box sx={{ display: 'flex', px: 2, py: 1.5, gap: 2, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>{dept}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ width: 48, textAlign: 'right', fontFamily: 'monospace', fontSize: 12 }}>
                    {headcount}
                  </Typography>
                  <Typography variant="body2" color="warning.light" sx={{ width: 48, textAlign: 'right', fontFamily: 'monospace', fontSize: 12 }}>
                    {attrition}
                  </Typography>
                  <Typography variant="body2" color="text.disabled" sx={{ width: 48, textAlign: 'right', fontFamily: 'monospace', fontSize: 12 }}>
                    {avgTenure}
                  </Typography>
                </Box>
                {i < deptStats.length - 1 && <Divider />}
              </Box>
            ))}
          </SectionCard>
        </Grid>
      </Grid>


      {/* Reports */}
      <SectionCard title="Available Reports">
        <Grid container spacing={2}>
          {reports.map((report) => (
            <Grid key={report.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <BarChartOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.disabled">{report.category}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{report.title}</Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 1.5 }}>
                    {report.description}
                  </Typography>
                  <Button variant="outlined" size="small" fullWidth startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 13 }} />}>
                    Download
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Box>
  );
}
