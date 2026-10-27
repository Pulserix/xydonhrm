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
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { PageHeader, KpiCard, SectionCard } from '@/components/hrms';


interface AttritionRisk {
  employee: string;
  dept: string;
  riskScore: number;
  riskLevel: string;
  factors: string[];
}

interface EngagementSignal {
  metric: string;
  score: number;
  trend: 'up' | 'down' | 'flat';
  change: string;
}


const attritionRisks: AttritionRisk[] = [
  { employee: 'Priya Sharma',  dept: 'Sales',       riskScore: 84, riskLevel: 'High',   factors: ['Tenure < 1y', 'Missed promotion', 'Peer exits'] },
  { employee: 'Deepak Raj',    dept: 'Operations',  riskScore: 71, riskLevel: 'High',   factors: ['No growth', 'Below-band pay'] },
  { employee: 'Kiran Mehta',   dept: 'Engineering', riskScore: 58, riskLevel: 'Medium', factors: ['Stagnant role', '2 exits in team'] },
  { employee: 'Anjali Gupta',  dept: 'HR',          riskScore: 52, riskLevel: 'Medium', factors: ['Extended PIP', 'Low engagement score'] },
  { employee: 'Suresh Kumar',  dept: 'Operations',  riskScore: 41, riskLevel: 'Low',    factors: ['Minor absence spike'] },
];

const engagementSignals: EngagementSignal[] = [
  { metric: 'Overall Engagement',   score: 72, trend: 'down', change: '-3 pts' },
  { metric: 'Manager Effectiveness',score: 68, trend: 'down', change: '-5 pts' },
  { metric: 'Career Growth Clarity',score: 61, trend: 'flat', change: '0 pts'  },
  { metric: 'Recognition & Reward', score: 77, trend: 'up',   change: '+4 pts' },
  { metric: 'Work-Life Balance',    score: 74, trend: 'up',   change: '+2 pts' },
];

function riskColor(level: string) {
  if (level === 'High')   return 'error';
  if (level === 'Medium') return 'warning';
  return 'success';
}

function trendIcon(trend: 'up' | 'down' | 'flat', metric: string) {
  const isPositive = metric !== 'Attrition' && trend === 'up';
  if (trend === 'up')   return <TrendingUpOutlinedIcon  sx={{ fontSize: 14, color: isPositive ? 'success.light' : 'error.light' }} />;
  if (trend === 'down') return <TrendingDownOutlinedIcon sx={{ fontSize: 14, color: isPositive ? 'error.light' : 'error.light' }} />;
  return <Box component="span" sx={{ fontSize: 10, color: 'text.disabled' }}>—</Box>;
}


export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="People Insights"
        subtitle="Predictive analytics and workforce health signals"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Attrition Risk (High)', value: 2,     sub: '+ 3 medium risk',     icon: <WarningAmberOutlinedIcon   sx={{ fontSize: 18 }} /> },
          { label: 'Engagement Score',      value: '72%', sub: '↓ 3 pts this month',  icon: <InsightsOutlinedIcon       sx={{ fontSize: 18 }} /> },
          { label: 'Attrition Rate (YTD)',  value: '4.2%',sub: 'vs 5.1% last year',   icon: <TrendingDownOutlinedIcon   sx={{ fontSize: 18 }} /> },
          { label: 'Productivity Index',    value: '88',  sub: '+2 pts vs last qtr',  icon: <TrendingUpOutlinedIcon     sx={{ fontSize: 18 }} /> },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <KpiCard {...k} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2 }}>
            <Tab label="Attrition Risk" />
            <Tab label="Engagement" />
            <Tab label="Diversity" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box sx={{ p: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Employees at Risk</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {attritionRisks.map((r) => (
                <Box
                  key={r.employee}
                  sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
                >
                  <Box sx={{ flex: 1, minWidth: 160 }}>
                    <Typography variant="body2">{r.employee}</Typography>
                    <Typography variant="caption" color="text.disabled">{r.dept}</Typography>
                  </Box>

                  <Box sx={{ width: 140 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Risk Score</Typography>
                      <Typography variant="caption">{r.riskScore}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={r.riskScore}
                      color={r.riskScore >= 70 ? 'error' : r.riskScore >= 50 ? 'warning' : 'success'}
                      sx={{ height: 4, borderRadius: 9999 }}
                    />
                  </Box>

                  <Chip label={r.riskLevel} size="small" color={riskColor(r.riskLevel) as 'error' | 'warning' | 'success'} />

                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    {r.factors.map((f) => (
                      <Chip key={f} label={f} size="small" variant="outlined" sx={{ fontSize: 10 }} />
                    ))}
                  </Box>

                  <Button size="small" variant="outlined">Action Plan</Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ p: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Engagement Signals</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {engagementSignals.map((s, i) => (
                <Box key={s.metric}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75, alignItems: 'center' }}>
                    <Typography variant="body2">{s.metric}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {trendIcon(s.trend, s.metric)}
                      <Typography variant="caption" color="text.disabled">{s.change}</Typography>
                      <Typography variant="body2" sx={{ minWidth: 28, textAlign: 'right' }}>{s.score}</Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={s.score}
                    color={s.score >= 75 ? 'success' : s.score >= 60 ? 'warning' : 'error'}
                    sx={{ height: 6, borderRadius: 9999 }}
                  />
                  {i < engagementSignals.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <PeopleOutlinedIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body2" color="text.disabled">Diversity & inclusion metrics coming soon.</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
