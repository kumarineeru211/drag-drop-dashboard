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
      <Box className="bg-white p-5 w-80 mx-auto mt-24 rounded-lg shadow-lg">
        <Typography variant="h6" className="mb-4">Add Task to {section}</Typography>

        {/* Task Name Input */}
        <TextField
          label="Task Name"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          margin="normal"
          className="mb-4"
        />

        {/* Description Input */}
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          className="mb-4"
        />

        {/* Priority Dropdown */}
        <FormControl fullWidth margin="normal" className="mb-4">
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

        {/* DateTime Picker */}
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
          className="mb-4"
        />

        {/* Submit Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Add Task
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
