
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { logoutUser } from "../service/cmsservices";

import { useAppSelector } from "../app/hooks";
import { IRoutesState } from "../types/cmstypes";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar({SidebarData,}: {SidebarData: IRoutesState[];}) {
  const [activeTab, setActiveTab] = React.useState<any>();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const REACT_APP_Url = process.env.REACT_APP_HRMS_ENDPOINT 

  const User = useAppSelector((state)=> state.user.UserData)

  const HelpFilePath : string | undefined = process.env.REACT_APP_HELPFILE_PATH

  const theme = useTheme();
  
  // Function to handle tab click
  const handleTabClick = (route: IRoutesState) => {
    setActiveTab(route.AppFeatureId);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser()
      .then((data : any) => {
        // Handle successful logout here
        window.location.href= REACT_APP_Url ? `${REACT_APP_Url}/sign-in` : '/'
        // REACT_APP_Url = REACT_APP_Url ? window.location.href=`${REACT_APP_Url}/sign-in` : 
        console.log('Logout successful!', data);
      })
      .catch((error) => {
        // Handle errors here or let the component handle them
        console.error('Logout error:', error);
      });
      handleClose() ;
  };

  return (
    <React.Fragment>
      <Box display={'flex'}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 3,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Claim Management Syatem
              </Typography>
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {User ? (
                <Tooltip title={User.FirstName.concat(' ', User.LastName)}>
                  <Avatar
                    alt={User.FirstName.concat(' ', User.LastName)}
                    src={User.ProfileUrl}
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: deepOrange[500],
                    }}
                  />
                </Tooltip>
              ) : null}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem onClick={()=> window.location.href = HelpFilePath ? HelpFilePath : '/'}>
              <ListItemIcon>
                <HelpOutlineRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                Help
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            {SidebarData.map((route) => (
              <ListItem
                key={route.AppFeatureId}
                onClick={() => handleTabClick(route)}
                style={{
                  background:
                    route.AppFeatureId === activeTab ? "orange" : "transparent",
                  cursor: "pointer",
                }}
                dense
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {route.Icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.FeatureName}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {SidebarData.map(
            (route) =>
              route.AppFeatureId === activeTab && (
                <route.Components key={route.AppFeatureId} />
              )
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}
