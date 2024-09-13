import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

const AddTaskModal = ({ isOpen, onClose, section }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dateTime, setDateTime] = useState(''); // State for date and time
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (taskName && description && dateTime) {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title: taskName,
        description,
        category: section,
        priority,
        date: dateTime, // Add the selected date and time to the task object
      };
      dispatch(addTask({ section, task: newTask }));
      
      // Clear all input fields after submission
      setTaskName('');
      setDescription('');
      setPriority('Low');
      setDateTime('');
      
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box style={{ background: 'white', padding: '20px', width: '300px', margin: '100px auto' }}>
        <Typography variant="h6">Add Task to {section}</Typography>
        <TextField
          label="Task Name"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />

        {/* Add a Select dropdown for Priority */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        {/* Add DateTime picker */}
        <TextField
          label="Due Date and Time"
          type="datetime-local"
          fullWidth
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
