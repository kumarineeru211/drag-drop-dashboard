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
            className="mb-2 rounded-lg shadow-md"
            style={provided.draggableProps.style}
          >
            <Box className="p-4 flex justify-between items-start">
              <Box>
                {/* Priority label */}
                <Typography
                  variant="caption"
                  className={`inline-block px-2 py-1 rounded-md font-bold mb-2 ${task.priority === 'Low' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-200 text-red-700'}`}
                >
                  {task.priority}
                </Typography>

                {/* Task title */}
                <Typography variant="h6" className="text-lg font-bold text-gray-900 mb-1">
                  {task.title}
                </Typography>

                {/* Task description */}
                <Typography variant="body2" className="text-gray-600">
                  {task.description}
                </Typography>

                {/* Task date and time */}
                <Typography variant="body2" className="text-gray-600 mt-2">
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
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;
