import {TextField, InputAdornment } from '@mui/material';
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
    // If there's no valid destination, exit early
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    // If the source and destination are the same and the index didn't change, exit
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    // If task is moved within the same section
    if (source.droppableId === destination.droppableId) {
      // Get tasks of the section where the task is being reordered
      let sourceTasks = Array.from(getTasksForSection(source.droppableId));
      
      // Remove the dragged task from its original index
      let [movedTask] = sourceTasks.splice(source.index, 1);
      
      // Insert the task at the new index (destination index)
      sourceTasks.splice(destination.index, 0, movedTask);
  
      // Dispatch the moveTask action to update the state
      dispatch(moveTask({
        from: source.droppableId,
        to: source.droppableId, // same section
        task: movedTask,
        updatedTasks: sourceTasks, // send the updated order
      }));
    } else {
      // Moving the task to a different section
      let sourceTasks = getTasksForSection(source.droppableId);
      let destinationTasks = Array.from(getTasksForSection(destination.droppableId));
  
      // Find the task being moved
      let movedTask = sourceTasks.find((t) => t.id === result.draggableId);
  
      // Remove the task from the source section
      sourceTasks = sourceTasks.filter((t) => t.id !== result.draggableId);
  
      // Insert the task into the destination section at the correct index
      destinationTasks.splice(destination.index, 0, movedTask);
  
      // Dispatch the moveTask action to update both source and destination
      dispatch(moveTask({
        from: source.droppableId,
        to: destination.droppableId,
        task: movedTask,
        updatedTasks: destinationTasks, // the new order in the destination section
      }));
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
      <div className="flex">
        {/* Sidebar component */}
        <div className="fixed top-0 left-0 h-screen w-[220px] bg-gray-100">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="flex flex-col w-full p-4 ml-[270px]">
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

          <h1 className="text-3xl font-bold mt-4 mb-3">Mobile App</h1>
          {/* TaskFilter component with handleFilterChange function */}
          <TaskFilter onFilterChange={handleFilterChange} />

          <div className="flex w-full">
            {/* To Do Task Section */}
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3"
                >
                  <TaskSection title="To Do" tasks={getTasksForSection('todo')} section="todo" />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* In Progress Task Section */}
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3"
                >
                  <TaskSection title="In Progress" tasks={getTasksForSection('inProgress')} section="inProgress" />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Done Task Section */}
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3"
                >
                  <TaskSection title="Done" tasks={getTasksForSection('done')} section="done" />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
