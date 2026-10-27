import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface EmployeeCellProps {
  name: string;
  meta?: string;
  size?: 'small' | 'medium';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function EmployeeCell({ name, meta, size = 'small' }: EmployeeCellProps) {
  const avatarSize = size === 'small' ? 28 : 36;
  const fontSize = size === 'small' ? '10px' : '13px';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar
        sx={{
          width: avatarSize,
          height: avatarSize,
          fontSize,
          fontWeight: 700,
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          flexShrink: 0,
        }}
      >
        {getInitials(name)}
      </Avatar>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {name}
        </Typography>
        {meta && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {meta}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
