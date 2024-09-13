import React, { useState } from 'react';
import { FilterAlt as FilterAltIcon, CalendarToday as CalendarTodayIcon } from '@mui/icons-material';

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
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        {/* Filter Button */}
        <div className="relative inline-block text-left mr-4">
          <button className="inline-flex justify-center w-full px-3 py-2 bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FilterAltIcon className="mr-1" />
            <select
              value={filter}
              onChange={handleFilterChange}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="High">High Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </button>
        </div>

        {/* Date Filter Button */}
        <div className="relative inline-block text-left">
          <button className="inline-flex justify-center w-full px-3 py-2 bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <CalendarTodayIcon className="mr-1" />
            <select
              value={date}
              onChange={handleDateChange}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
