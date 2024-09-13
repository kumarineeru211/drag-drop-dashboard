import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import TaskIcon from '@mui/icons-material/Task';
import MessageIcon from '@mui/icons-material/Message';

import { useState } from 'react';

const Sidebar = () => {
  // State to track the active menu item
  const [activeItem, setActiveItem] = useState('Mobile App');

  // Function to handle item click
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="w-[230px] p-5 bg-gray-100 h-full">
      <Typography variant="h6" className="mb-5 font-bold">Project M.</Typography>

      {/* Main Menu Items */}
      <List>
        <ListItem button onClick={() => handleItemClick('Home')} selected={activeItem === 'Home'}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleItemClick('Messages')} selected={activeItem === 'Messages'}>
          <ListItemIcon><MessageIcon /></ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button onClick={() => handleItemClick('Tasks')} selected={activeItem === 'Tasks'}>
          <ListItemIcon><TaskIcon /></ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
      </List>

      <Divider className="my-5" />

      {/* My Projects */}
      <Typography variant="subtitle1" className="mb-2 font-bold text-gray-500">MY PROJECTS</Typography>

      <List>
        <ListItem 
          button 
          onClick={() => handleItemClick('Mobile App')} 
          selected={activeItem === 'Mobile App'}
          className={`rounded-lg ${activeItem === 'Mobile App' ? 'bg-indigo-100' : ''}`}
        >
          <ListItemIcon>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </ListItemIcon>
          <ListItemText primary="Mobile App" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleItemClick('Website Redesign')} 
          selected={activeItem === 'Website Redesign'}
          className={`rounded-lg ${activeItem === 'Website Redesign' ? 'bg-indigo-100' : ''}`}
        >
          <ListItemIcon>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </ListItemIcon>
          <ListItemText primary="Website Redesign" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleItemClick('Design System')} 
          selected={activeItem === 'Design System'}
          className={`rounded-lg ${activeItem === 'Design System' ? 'bg-indigo-100' : ''}`}
        >
          <ListItemIcon>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          </ListItemIcon>
          <ListItemText primary="Design System" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleItemClick('Wireframes')} 
          selected={activeItem === 'Wireframes'}
          className={`rounded-lg ${activeItem === 'Wireframes' ? 'bg-indigo-100' : ''}`}
        >
          <ListItemIcon>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </ListItemIcon>
          <ListItemText primary="Wireframes" />
        </ListItem>
      </List>

      {/* Bottom Notice */}
      <div className="mt-auto p-3 rounded-lg bg-yellow-50">
        <Typography variant="body2" className="font-bold text-yellow-600">Thoughts Time</Typography>
        <Typography variant="body2" className="mt-1 text-gray-500">
          We don't have any notice for you, till then you can share your thoughts with your peers.
        </Typography>
        <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded">Write a message</button>
      </div>
    </div>
  );
};

export default Sidebar;
