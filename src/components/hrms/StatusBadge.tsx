import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

type StatusColor = 'success' | 'warning' | 'error' | 'info' | 'default';

const STATUS_MAP: Record<string, StatusColor> = {
  // Employee status
  active:      'success',
  'on leave':  'warning',
  probation:   'info',
  inactive:    'default',
  terminated:  'error',
  suspended:   'error',
  notice:      'warning',

  // Attendance
  present:              'success',
  absent:               'error',
  late:                 'warning',
  'half day':           'info',
  'on leave (att)':     'info',
  'on duty':            'info',
  unpunched:            'warning',
  'missing punch':      'warning',
  'pending regularization': 'warning',
  locked:               'default',
  holiday:              'info',
  'week off':           'default',

  // Leave types
  approved:   'success',
  rejected:   'error',
  pending:    'warning',
  cancelled:  'default',
  withdrawn:  'default',

  // Payroll
  processed:  'success',
  finalized:  'success',
  paid:       'success',
  'on hold':  'warning',
  failed:     'error',
  draft:      'default',

  // Statutory / compliance
  filed:      'success',
  due:        'warning',
  overdue:    'error',
  'not due':  'default',

  // Expenses
  reimbursed: 'success',
  'under review': 'info',

  // Recruitment
  applied:      'default',
  shortlisted:  'info',
  interview:    'warning',
  offered:      'success',
  hired:        'success',
  withdrawn_rec:'default',

  // Timesheets
  submitted:  'info',
  'not submitted': 'warning',
  'partially submitted': 'warning',

  // Contractors
  active_contract: 'success',
  expiring: 'warning',
  expired:  'error',

  // General
  open:         'success',
  closed:       'default',
  paused:       'warning',
  resolved:     'success',
  open_ticket:  'warning',
  'in progress':'info',
  completed:    'success',
  overridden:   'warning',
  new:          'info',
  acknowledged: 'info',
};

function resolveColor(status: string): StatusColor {
  return STATUS_MAP[status.toLowerCase()] ?? 'default';
}

interface StatusBadgeProps {
  label: string;
  size?: ChipProps['size'];
}

export default function StatusBadge({ label, size = 'small' }: StatusBadgeProps) {
  const color = resolveColor(label);

  return (
    <Chip
      label={label}
      size={size}
      color={color}
      sx={{ fontWeight: 600 }}
    />
  );
}
