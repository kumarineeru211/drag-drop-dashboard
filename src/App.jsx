import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import TaskSection from './components/TaskSection';
import TaskFilter from './components/TaskFilter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, filterTasks } from './redux/taskSlice';

const App = () => {
  const dispatch = useDispatch();
  
  // Retrieve tasks from the Redux store
  const { todo, inProgress, done } = useSelector(state => state.tasks.tasks);

  // Log the current state of tasks for debugging
  console.log("Todo:", todo);
  console.log("InProgress:", inProgress);
  console.log("Done:", done);

  // Function to handle filter changes (priority, date)
  const handleFilterChange = (priority, date) => {
    // Dispatch the filter action when filter options change
    dispatch(filterTasks({ priority, date }));
  };

  // Function to handle task dragging
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    // Identify the source tasks array based on the droppableId
    let sourceTasks;
    if (source.droppableId === 'todo') sourceTasks = todo;
    else if (source.droppableId === 'inProgress') sourceTasks = inProgress;
    else if (source.droppableId === 'done') sourceTasks = done;

    // Log the sourceTasks and draggableId for debugging
    console.log('Source Tasks:', sourceTasks);
    console.log('draggableId:', draggableId);

    // Ensure that sourceTasks is defined
    if (!sourceTasks) {
      console.error(`Source tasks not found for droppableId: ${source.droppableId}`);
      return;
    }

    // Find the task being dragged
    const task = sourceTasks.find(t => t.id === draggableId);

    // If the task is not found, log the error and return
    if (!task) {
      console.error(`Task with id ${draggableId} not found in sourceTasks`);
      return;
    }

    // Handle task movement only if it's moving to a different droppable section
    if (source.droppableId !== destination.droppableId) {
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
        <Sidebar />
        <Box display="flex" flexDirection="column" width="100%" p={2}>
            <h1>Mobile App</h1>
          {/* TaskFilter co mponent with handleFilterChange function */}
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
