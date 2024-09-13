import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';

const TaskSection = ({ title, section }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Access the tasks from Redux state for the given section
  const tasks = useSelector((state) => state.tasks.tasks[section] || []);

  // Assign color based on the section
  const sectionColors = {
    todo: '#6C63FF', // Purple color for 'To Do'
    inProgress: '#FF9903', // Orange for 'In Progress'
    done: '#33CC66', // Green for 'Done'
  };

  const isTodoSection = section === 'todo'; // To conditionally show the Add button

  return (
    <Box 
      padding={2} 
      style={{ 
        border: '1px solid #ddd', 
        margin: '10px', 
        borderRadius: '8px',
        backgroundColor: '#f5f5f5'
      }}
    >
      {/* Section Title and Add Button */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">
          {/* Show title and task count */}
          {title} ({tasks.length})
        </Typography>

        {/* Show Add Task button only for To Do section */}
        {isTodoSection && (
          <Button 
            variant="contained" 
            style={{ backgroundColor: sectionColors[section] }} 
            onClick={() => setModalOpen(true)}
          >
            +
          </Button>
        )}
      </Box>

      {/* Horizontal Color Bar */}
      <Box 
        style={{ 
          width: '100%', 
          height: '4px', 
          backgroundColor: sectionColors[section], 
          margin: '8px 0' 
        }} 
      />

      {/* Tasks or No Tasks message */}
      {tasks.length ? (
        tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} section={section} />
        ))
      ) : (
        <Typography>No tasks available</Typography>
      )}

      {/* Add Task Modal */}
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        section={section} 
      />
    </Box>
  );
};

export default TaskSection;
