import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import the search icon
import Sidebar from './components/Sidebar';
import TaskSection from './components/TaskSection';
import TaskFilter from './components/TaskFilter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, filterTasks } from './redux/taskSlice';
import { useState } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const { todo, inProgress, done } = useSelector((state) => state.tasks.tasks);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Dispatch filter action with the updated search term
    dispatch(filterTasks({ priority: 'All', date: '', searchTerm: term }));
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
                backgroundColor: '#f8f8f8', // Light gray background like the image
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

          {/* TaskFilter component */}
          <TaskFilter onFilterChange={() => {}} />

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
