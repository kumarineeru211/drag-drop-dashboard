import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Card, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Importing the three-dot menu icon

const TaskCard = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided) => (
      <Card
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          marginBottom: '10px',
          borderRadius: '10px', // Rounded corners for the card
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          ...provided.draggableProps.style,
        }}
      >
        <Box padding={2} display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            {/* Priority label with background color */}
            <Typography
              variant="caption"
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                backgroundColor: '#FDEDD4', // Light background for "Low" priority
                color: '#C29259', // Text color for "Low" priority
                borderRadius: '4px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              {task.priority}
            </Typography>
            
            {/* Task title */}
            <Typography
              variant="h6"
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1A1A1A',
                marginBottom: '4px',
              }}
            >
              {task.title}
            </Typography>
            
            {/* Task description */}
            <Typography
              variant="body2"
              style={{ color: '#6B6B6B' }}
            >
              {task.description}
            </Typography>
          </Box>

          {/* Three-dot menu icon for task options */}
          <IconButton aria-label="more options">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Card>
    )}
  </Draggable>
);

export default TaskCard;
