'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import type { ReactNode } from 'react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterSelect {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
}

interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterSelect[];
  count?: string;
  trailing?: ReactNode;
}

export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  filters,
  count,
  trailing,
}: FilterBarProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>

      {onSearchChange !== undefined && (
        <TextField
          size="small"
          value={searchValue ?? ''}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ minWidth: 220 }}
        />
      )}

      {filters?.map((f, i) => (
        <FormControl key={i} size="small" sx={{ minWidth: 140 }}>
          <Select
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            displayEmpty
          >
            {f.placeholder && <MenuItem value="">{f.placeholder}</MenuItem>}
            {f.options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

      {count && (
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {count}
        </Typography>
      )}

      {trailing && <Box sx={{ ml: count ? 0 : 'auto' }}>{trailing}</Box>}
    </Box>
  );
}
