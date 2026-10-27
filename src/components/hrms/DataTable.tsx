import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  /** Column heading text. `header` is accepted as an alias. */
  label?: string;
  /** Alias for `label`. */
  header?: string;
  render: (row: T) => ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  /** Derive a stable key per row. Defaults to row index when omitted. */
  rowKey?: (row: T) => string;
  totalCount?: number;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  /** Render just the table without the outer Card wrapper. */
  noCard?: boolean;
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  totalCount,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  emptyMessage = 'No records found.',
  onRowClick,
  noCard = false,
}: DataTableProps<T>) {
  const hasPagination = onPageChange !== undefined;

  const tableContent = (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align ?? 'left'}
                  width={col.width}
                >
                  {col.label ?? col.header ?? ''}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ py: 4, textAlign: 'center', border: 0 }}>
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, i) => (
                <TableRow
                  key={rowKey ? rowKey(row) : i}
                  hover={Boolean(onRowClick)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align ?? 'left'}>
                      {col.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      {hasPagination && (
        <TablePagination
          component="div"
          count={totalCount ?? rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => onPageChange(p)}
          onRowsPerPageChange={
            onRowsPerPageChange
              ? (e) => onRowsPerPageChange(Number(e.target.value))
              : undefined
          }
          rowsPerPageOptions={[10, 25, 50]}
        />
      )}
    </>
  );

  return noCard ? tableContent : <Card>{tableContent}</Card>;
}
