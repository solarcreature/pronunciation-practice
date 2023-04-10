import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import axiosInstance from '../utlities/axiosInstance';
import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import logout from '../utlities/Logout';
import '../css/Sidebar.css';
import Student from '../components/Teacher/Student';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Sidebar3() {
    const [teacher, setTeacher] = useState([])
    const [students, setStudents] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [undone, setUndone] = useState([]);
    const [name, setName] = useState('');
    const [special, setSpecial] = useState(''); // This is the id of the student that the user clicked on
    const [done, setDone] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
  
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const open = Boolean(anchorEl);

  useEffect(()=>{
    axiosInstance.get(`teachers/${localStorage.getItem('id')}/`)
    .then((response)=>{
      setTeacher(response.data);
    })
    .catch(err => {
      console.error(err);
    })
    axiosInstance.get(`students/`)
    .then((response)=>{
        setStudents(response.data);
    })
    if (special) {
      onClickStudent(special);
    }
  }, [special]);

  const onClickStudent = (id) => { // This is the function that will be called when the user clicks on a student
    setSpecial(id);
    axiosInstance.get(`unfinished/${id}/lessons/`)
       
      .then((resp) => {
        setUndone(resp.data); // Update the component's state with the fetched data
        setShowDropdown(id); // Show the dropdown
      })
      .catch((error) => {
        console.error(error); // Log any errors
        // Handle the error
    });
    axiosInstance.get(`finished/${id}/lessons/`)
    .then((resp) => {
      setDone(resp.data); // Update the component's state with the fetched data
      setShowDropdown(id); // Show the dropdown
    })
    .catch((error) => {
      console.error(error); // Log any errors
    });
  }; 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', backgroundColor: "green"}} >
      <Toolbar>
          <IconButton style={{ color: 'white', marginRight: '50px', fontSize: 'medium'}}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            Students
          </IconButton>

        </Toolbar>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: "flex-end"}}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>T</Avatar>
          </IconButton>
        </Tooltip>
        </Box>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <div style={{position:"absolute", left:"10%", fontWeight:"bold"}}>Students</div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{backgroundColor: "palegreen"}}>
        {students.map((item, index)=>{
      return (
        <ListItemButton  className='lesson-finish-unfinsh' onClick={()=> {setDrawerOpen(false); onClickStudent(item.id); setName(item.first_name)}} key={index}><strong>{item.username}</strong>
   
        {showDropdown === item.id && ( 
          <div> 
            <p>Unfinished: {undone.length}</p>  
            <p>Finished: {done.length}</p> 
          </div>
      )}
        </ListItemButton>
      )
      })}
      
        </List>
      </Drawer>
        <DrawerHeader />
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem  >
          <Avatar /> <strong>{teacher["username"]}</strong> 
        </MenuItem>
        <Divider />
        <MenuItem  >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <button onClick={logout}>Log Out</button>
        </MenuItem>
      </Menu>

      <div className='div' style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#C7E8CA", marginLeft:drawerOpen?drawerWidth:"0px"}}>
                <h1>IlmHub Pronunciation Practice for Teachers</h1>
                <p>Welcome back! To view a student's progress, select a student from the Students menu.</p>
                {special !== '' && (
                  <p>You are viewing {name}'s progress, select a tab from below to see their progress.</p>
                )}
                <br />
      </div>
      <div style={{marginLeft:drawerOpen?drawerWidth:"0px"}}>
        <Student student={special}  />
      </div>
      
    </React.Fragment>
  );
}

export default Sidebar3;