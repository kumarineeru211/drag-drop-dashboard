import { createSlice } from '@reduxjs/toolkit';

// Helper function to save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Helper function to load tasks from local storage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : null;
};

// Initial state (we try to load from localStorage first)
const initialState = {
  tasks: loadTasksFromLocalStorage() || {
    todo: [],
    inProgress: [],
    done: [],
  },
  allTasks: loadTasksFromLocalStorage() || {
    todo: [],
    inProgress: [],
    done: [],
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add a new task to both the display tasks and the backup allTasks
    addTask: (state, action) => {
      const { section, task } = action.payload;
      if (state.tasks[section]) {
        state.tasks[section].push(task);
        state.allTasks[section].push(task); // Add to unfiltered backup
        saveTasksToLocalStorage(state.tasks); // Save to localStorage
      }
    },

    // Move a task from one section to another and update both tasks and allTasks
    moveTask: (state, action) => {
      const { from, to, task } = action.payload;

      // Remove the task from the 'from' section
      state.tasks[from] = state.tasks[from].filter((t) => t.id !== task.id);
      state.allTasks[from] = state.allTasks[from].filter((t) => t.id !== task.id); // Update the backup

      // Add the task to the 'to' section
      state.tasks[to].push(task);
      state.allTasks[to].push(task); // Update the backup

      saveTasksToLocalStorage(state.tasks); // Save to localStorage
    },

    // Edit an existing task
editTask: (state, action) => {
  const { section, taskId, updatedTask } = action.payload;

  // Ensure the section exists
  if (state.tasks[section]) {
    const updateTaskInSection = (taskList) => {
      return taskList.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );
    };

    state.tasks[section] = updateTaskInSection(state.tasks[section]);
    state.allTasks[section] = updateTaskInSection(state.allTasks[section]);

    saveTasksToLocalStorage(state.tasks); // Save to localStorage
  } else {
    console.error(`Section ${section} is not defined.`);
  }
},

// Delete an existing task
deleteTask: (state, action) => {
  const { section, taskId } = action.payload;

  // Ensure the section exists
  if (state.tasks[section]) {
    const removeTaskFromSection = (taskList) =>
      taskList.filter((task) => task.id !== taskId);

    state.tasks[section] = removeTaskFromSection(state.tasks[section]);
    state.allTasks[section] = removeTaskFromSection(state.allTasks[section]);

    saveTasksToLocalStorage(state.tasks); // Save to localStorage
  } else {
    console.error(`Section ${section} is not defined.`);
  }
},


    // Filter tasks by priority and date
    filterTasks: (state, action) => {
      const { priority, date } = action.payload;

      // Helper function to filter tasks based on priority and date
      const filterByPriorityAndDate = (tasks) => {
        const today = new Date();
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        return tasks.filter((task) => {
          // Check if task matches the selected priority
          const matchesPriority = priority === 'All' || task.priority === priority;

          // Check if task matches the selected date filter
          const taskDate = new Date(task.date); // Ensure `task.date` is in a valid date format
          let matchesDate = true;

          if (date === 'Today') {
            matchesDate = taskDate.toDateString() === today.toDateString(); // Compare if task date is today
          } else if (date === 'This Week') {
            matchesDate = taskDate >= startOfWeek && taskDate <= today; // Task date is within this week
          } else if (date === 'This Month') {
            matchesDate = taskDate >= startOfMonth && taskDate <= today; // Task date is within this month
          }

          return matchesPriority && matchesDate;
        });
      };

      // Apply the filter on each task section using the original unfiltered tasks (allTasks)
      state.tasks.todo = filterByPriorityAndDate(state.allTasks.todo);
      state.tasks.inProgress = filterByPriorityAndDate(state.allTasks.inProgress);
      state.tasks.done = filterByPriorityAndDate(state.allTasks.done);

      // Log filtered tasks for debugging
      console.log('Filtered TODO:', state.tasks.todo);
      console.log('Filtered InProgress:', state.tasks.inProgress);
      console.log('Filtered Done:', state.tasks.done);
    },
  },
});

// Exporting the actions for use in components
export const { addTask, moveTask, editTask, deleteTask, filterTasks } = taskSlice.actions;

export default taskSlice.reducer;
