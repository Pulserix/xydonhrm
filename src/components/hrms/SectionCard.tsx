import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title?: string;
  trailing?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
}

export default function SectionCard({ title, trailing, children, noPadding }: SectionCardProps) {
  const hasHeader = title || trailing;

  return (
    <Card>
      {hasHeader && (
        <>
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            {title && (
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            )}
            {trailing && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{trailing}</Box>}
          </Box>
          <Divider />
        </>
      )}

      {noPadding ? children : <CardContent>{children}</CardContent>}
    </Card>
  );
}
