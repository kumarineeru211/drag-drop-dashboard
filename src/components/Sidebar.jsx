import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskIcon from '@mui/icons-material/Task';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from 'react';

const Sidebar = () => {
  // State to track the active menu item
  const [activeItem, setActiveItem] = useState('Mobile App');

  // Function to handle item click
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div style={{ width: '250px', padding: '20px', backgroundColor: '#f5f5f5', height: '100%' }}>
      <Typography variant="h6" style={{ marginBottom: '20px', fontWeight: 'bold' }}>Project M.</Typography>
      
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

      <Divider style={{ margin: '20px 0' }} />
      
      <Typography variant="subtitle1" style={{ marginBottom: '10px', fontWeight: 'bold', color: '#6c757d' }}>MY PROJECTS</Typography>
      
      <List>
        <ListItem button onClick={() => handleItemClick('Mobile App')} selected={activeItem === 'Mobile App'} style={{ borderRadius: '10px', backgroundColor: activeItem === 'Mobile App' ? '#e0e7ff' : 'transparent' }}>
          <ListItemIcon><div style={{ width: '8px', height: '8px', backgroundColor: '#4CAF50', borderRadius: '50%' }}></div></ListItemIcon>
          <ListItemText primary="Mobile App" />
        </ListItem>
        <ListItem button onClick={() => handleItemClick('Website Redesign')} selected={activeItem === 'Website Redesign'} style={{ borderRadius: '10px', backgroundColor: activeItem === 'Website Redesign' ? '#e0e7ff' : 'transparent' }}>
          <ListItemIcon><div style={{ width: '8px', height: '8px', backgroundColor: '#FFC107', borderRadius: '50%' }}></div></ListItemIcon>
          <ListItemText primary="Website Redesign" />
        </ListItem>
        <ListItem button onClick={() => handleItemClick('Design System')} selected={activeItem === 'Design System'} style={{ borderRadius: '10px', backgroundColor: activeItem === 'Design System' ? '#e0e7ff' : 'transparent' }}>
          <ListItemIcon><div style={{ width: '8px', height: '8px', backgroundColor: '#9C27B0', borderRadius: '50%' }}></div></ListItemIcon>
          <ListItemText primary="Design System" />
        </ListItem>
        <ListItem button onClick={() => handleItemClick('Wireframes')} selected={activeItem === 'Wireframes'} style={{ borderRadius: '10px', backgroundColor: activeItem === 'Wireframes' ? '#e0e7ff' : 'transparent' }}>
          <ListItemIcon><div style={{ width: '8px', height: '8px', backgroundColor: '#03A9F4', borderRadius: '50%' }}></div></ListItemIcon>
          <ListItemText primary="Wireframes" />
        </ListItem>
      </List>

      <div style={{ marginTop: 'auto', padding: '10px', borderRadius: '10px', backgroundColor: '#fffbe6' }}>
        <Typography variant="body2" style={{ fontWeight: 'bold', color: '#ff9800' }}>Thoughts Time</Typography>
        <Typography variant="body2" style={{ marginTop: '5px', color: '#6c757d' }}>
          We don't have any notice for you, till then you can share your thoughts with your peers.
        </Typography>
        <button style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '5px' }}>Write a message</button>
      </div>
    </div>
  );
};

export default Sidebar;
