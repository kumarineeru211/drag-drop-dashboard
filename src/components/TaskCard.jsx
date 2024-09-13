import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Card, Typography, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../redux/taskSlice';

const TaskCard = ({ task, index, section }) => {
  const dispatch = useDispatch();

  // State for menu and dialog
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  // Open menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open edit dialog
  const handleEditOpen = () => {
    setIsEditOpen(true);
    handleMenuClose();
  };

  // Close edit dialog
  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  // Handle task editing
  const handleEditSave = () => {
    dispatch(editTask({ section, taskId: task.id, updatedTask: editedTask }));
    setIsEditOpen(false);
  };

  // Handle task deletion
  const handleDelete = () => {
    dispatch(deleteTask({ section, taskId: task.id }));
    handleMenuClose();
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              marginBottom: '10px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              ...provided.draggableProps.style,
            }}
          >
            <Box padding={2} display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                {/* Priority label */}
                <Typography
                  variant="caption"
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    backgroundColor: task.priority === 'Low' ? '#FDEDD4' : '#FFB6B6',
                    color: task.priority === 'Low' ? '#C29259' : '#D9534F',
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
                <Typography variant="body2" style={{ color: '#6B6B6B' }}>
                  {task.description}
                </Typography>

                {/* Task date and time */}
                <Typography variant="body2" style={{ color: '#6B6B6B', marginTop: '8px' }}>
                  Due: {new Date(task.date).toLocaleString()}
                </Typography>
              </Box>

              {/* Three-dot menu icon */}
              <IconButton aria-label="more options" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>

              {/* Menu for edit/delete */}
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </Box>
          </Card>
        )}
      </Draggable>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            fullWidth
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;
