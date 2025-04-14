import { TextField, MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";

export default function Filters({ 
  search, 
  sortItem, 
  sortOrder, 
  onFilterChange 
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Поле поиска */}
      <TextField
        label="Поиск заметок"
        variant="outlined"
        value={search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        fullWidth
      />

      {/* Сортировка */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Сортировать по</InputLabel>
          <Select
            value={sortItem}
            label="Сортировать по"
            onChange={(e) => onFilterChange('sort_item', e.target.value)}
          >
            <MenuItem value="created_at">Дате создания</MenuItem>
            <MenuItem value="title">Названию</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Порядок</InputLabel>
          <Select
            value={sortOrder}
            label="Порядок"
            onChange={(e) => onFilterChange('sort_order', e.target.value)}
          >
            <MenuItem value="desc">По убыванию</MenuItem>
            <MenuItem value="asc">По возрастанию</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}