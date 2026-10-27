'use client';

import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { PageHeader } from '@/components/hrms';


interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface SuggestedQuery {
  label: string;
  query: string;
}


const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm your HR AI Assistant. I can help you with employee data queries, policy questions, headcount analytics, leave balances, and more. What would you like to know?",
    timestamp: '10:00 AM',
  },
];

const suggestedQueries: SuggestedQuery[] = [
  { label: 'Headcount by dept',        query: 'Show me headcount by department'            },
  { label: 'Top attrition risk',        query: 'Who are the employees at highest attrition risk?' },
  { label: 'Leave balance summary',     query: 'What is the average leave balance across teams?' },
  { label: 'Payroll cost this month',   query: 'What is the total payroll cost for October 2026?' },
  { label: 'Pending approvals',         query: 'How many approvals are pending right now?'  },
  { label: 'New joiners this month',    query: 'Who joined in October 2026?'                },
];

const demoResponses: Record<string, string> = {
  'Show me headcount by department':
    'Current headcount by department:\n• Engineering: 72 employees\n• Sales: 54 employees\n• Operations: 47 employees\n• Finance: 31 employees\n• Marketing: 25 employees\n• HR: 18 employees\n\nTotal: 247 employees across 6 departments.',
  'Who are the employees at highest attrition risk?':
    'Based on tenure, compensation, and engagement signals, the top 3 at-risk employees are:\n1. Priya Sharma (Sales) — Risk score: 84 · High\n2. Deepak Raj (Operations) — Risk score: 71 · High\n3. Kiran Mehta (Engineering) — Risk score: 58 · Medium\n\nSuggested actions: schedule 1:1s and review compensation bands.',
  'What is the average leave balance across teams?':
    'Average leave balances as of today:\n• Casual Leave: 4.2 days\n• Earned Leave: 11.8 days\n• Sick Leave: 6.0 days\n\nEngineering has the highest average (7.2 CL remaining). 3 employees have exhausted CL balance.',
  'What is the total payroll cost for October 2026?':
    'October 2026 payroll summary:\n• Gross Salary: ₹2.41 Cr\n• Deductions (PF + ESI + TDS): ₹16.7L\n• Net Disbursement: ₹2.24 Cr\n\nStatus: Processing · Step 3 of 5 · Expected payout: 31 Oct 2026.',
  'How many approvals are pending right now?':
    'Currently 4 approvals are pending your action:\n• 2 Leave requests\n• 1 Expense claim (₹18,400)\n• 1 Shift change request\n\n1 is high priority (expense by Priya Sharma). Oldest request is 4 days old.',
  'Who joined in October 2026?':
    '3 employees joined in October 2026:\n1. Amit Singh — Software Engineer L3 · Engineering (14 Oct)\n2. Sunita Rao — Sales Executive · Sales (21 Oct)\n3. Ravi Teja — Ops Analyst · Operations (27 Oct)\n\nAll 3 are currently in onboarding. Completion rate: 67%.',
};


export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function sendMessage(query: string) {
    if (!query.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const responseText = demoResponses[query] ?? 'I have noted your query. In the full implementation, I would analyze your HR data and provide a detailed response here.';

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: 'assistant',
      content: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInputValue('');
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title="AI Assistant"
        subtitle="Ask anything about your workforce data"
      />

      <Grid container spacing={2} sx={{ height: { md: 'calc(100vh - 200px)' } }}>

        {/* Suggested queries — sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2">Quick Queries</Typography>
            </Box>
            <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {suggestedQueries.map((q) => (
                <Button
                  key={q.label}
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: 12 }}
                  onClick={() => sendMessage(q.query)}
                >
                  {q.label}
                </Button>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Chat area */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Message list */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'flex-start',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 11,
                      bgcolor: msg.role === 'assistant' ? 'hsl(243,75%,50%)' : 'hsl(0,0%,30%)',
                      flexShrink: 0,
                    }}
                  >
                    {msg.role === 'assistant' ? <AutoAwesomeOutlinedIcon sx={{ fontSize: 14 }} /> : 'RJ'}
                  </Avatar>

                  <Box
                    sx={{
                      maxWidth: '75%',
                      bgcolor: msg.role === 'assistant' ? 'hsl(243,75%,10%)' : 'hsl(0,0%,16%)',
                      border: '1px solid',
                      borderColor: msg.role === 'assistant' ? 'hsl(243,75%,25%)' : 'divider',
                      borderRadius: 2,
                      px: 2,
                      py: 1.25,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
                    >
                      {msg.content}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                      {msg.timestamp}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Divider />

            {/* Input */}
            <Box sx={{ p: 2, display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about employees, payroll, leave, attrition..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(inputValue);
                  }
                }}
                sx={{ '& .MuiOutlinedInput-root': { fontSize: 13 } }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => sendMessage(inputValue)}
                sx={{ minWidth: 40, height: 36, p: 0 }}
              >
                <SendOutlinedIcon sx={{ fontSize: 16 }} />
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
