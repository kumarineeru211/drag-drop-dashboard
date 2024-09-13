import React, { useState } from 'react';
import { Box, Select, MenuItem, Button, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TaskFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('All');
  const [date, setDate] = useState('Today');

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter, date); // Pass both filter and date
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    onFilterChange(filter, selectedDate); // Pass both filter and date
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Box display="flex" alignItems="center">
        {/* Filter Button */}
        
        <Button
          variant="outlined"
          startIcon={<FilterAltIcon />}
          style={{ marginRight: '1rem', textTransform: 'none'}} // Remove button border
        > 
          <Select
            value={filter}
            onChange={handleFilterChange}
            displayEmpty
            renderValue={(value) => (
              <Typography variant="body2">{value}</Typography>
            )}
            style={{ marginRight: '0.5rem', width: '100px', border: 'none' }} // Remove Select border
            disableUnderline // Remove underline from Select
          > 
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="High">High Priority</MenuItem>
            <MenuItem value="Low">Low Priority</MenuItem>
          </Select>
        </Button>

        {/* Date Filter Button */}
        <Button
          variant="outlined"
          startIcon={<CalendarTodayIcon />}
          style={{ textTransform: 'none', }} // Remove button border
        >
          <Select
            variant="outlined"
            value={date}
            onChange={handleDateChange}
            displayEmpty
            renderValue={(value) => (
              <Typography variant="body2">{value}</Typography>
            )}
            style={{ marginRight: '0.5rem', width: '120px',}} // Remove Select border
            disableUnderline // Remove underline from Select
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
          </Select>
        </Button>
      </Box>
    </Box>
  );
};

export default TaskFilter;
