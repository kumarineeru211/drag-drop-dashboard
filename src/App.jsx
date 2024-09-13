import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './components/Sidebar';
import TaskSection from './components/TaskSection';
import TaskFilter from './components/TaskFilter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, filterTasks } from './redux/taskSlice';
import { useState } from 'react';

const App = () => {
  const dispatch = useDispatch();
  
  // State for search, priority, and date filters
  const [searchTerm, setSearchTerm] = useState('');
  const [priority, setPriority] = useState('All');
  const [date, setDate] = useState('Today');

  const { todo, inProgress, done } = useSelector((state) => state.tasks.tasks);

  // Function to handle filter changes (priority, date)
  const handleFilterChange = (newPriority, newDate) => {
    setPriority(newPriority);
    setDate(newDate);

    // Dispatch the filter action with priority, date, and search term
    dispatch(filterTasks({ priority: newPriority, date: newDate, searchTerm }));
  };

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Dispatch the filter action with search term, priority, and date
    dispatch(filterTasks({ searchTerm: term, priority, date }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    let sourceTasks;
    if (source.droppableId === 'todo') sourceTasks = todo;
    else if (source.droppableId === 'inProgress') sourceTasks = inProgress;
    else if (source.droppableId === 'done') sourceTasks = done;

    const task = sourceTasks.find((t) => t.id === draggableId);
    if (source.droppableId !== destination.droppableId && task) {
      dispatch(
        moveTask({
          from: source.droppableId,
          to: destination.droppableId,
          task,
        })
      );
    }
  };

  const getTasksForSection = (section) => {
    if (section === 'todo') return todo;
    if (section === 'inProgress') return inProgress;
    if (section === 'done') return done;
    return [];
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box display="flex">
        {/* Sidebar component */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '220px',
            backgroundColor: '#f4f4f4',
          }}
        >
          <Sidebar />
        </Box>

        {/* Main content */}
        <Box display="flex" flexDirection="column" width="100%" p={2} ml="280px">
          {/* Search Field */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search for anything..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                backgroundColor: '#f8f8f8', // Light gray background
                borderRadius: '30px', // Rounded corners
                borderColor: 'transparent', // Remove border
                padding: '10px 20px', // Add padding for better spacing
              },
            }}
            sx={{
              width: '300px',
            }}
          />

          <h1>Mobile App</h1>
          {/* TaskFilter component with handleFilterChange function */}
          <TaskFilter onFilterChange={handleFilterChange} />

          <Box display="flex" flexDirection="row" width="100%">
            {/* To Do Task Section */}
            <Droppable droppableId="todo">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ width: '33%' }}>
                  <TaskSection title="To Do" tasks={getTasksForSection('todo')} section="todo" />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* In Progress Task Section */}
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ width: '33%' }}>
                  <TaskSection title="In Progress" tasks={getTasksForSection('inProgress')} section="inProgress" />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Done Task Section */}
            <Droppable droppableId="done">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ width: '33%' }}>
                  <TaskSection title="Done" tasks={getTasksForSection('done')} section="done" />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
        </Box>
      </Box>
    </DragDropContext>
  );
};

export default App;
