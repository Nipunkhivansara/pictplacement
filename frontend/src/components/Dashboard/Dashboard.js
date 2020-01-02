import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },


  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  logout: {
    marginLeft: "auto",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  
}));

function ClippedDrawer(props) {
  const classes = useStyles();

  
  const logoutHandler = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };
  const drawerListNames = Object.keys(props.drawerList);

  const buttonHandler = text => {  
    
    props.history.push(props.match.path + "/" + props.drawerList[text][0]);
  };

  return (
    <div className={classes.root}>
       <div className="overlay" 
          style={{position: "fixed", 
          top: "0",
          left: "0",  
          width: "100%",
          height: "100%", 
          zIndex:"-5",
         backgroundColor: "rgba(10,10,10,0.2)"
          }}>
          </div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}  style={{backgroundColor:"rgb(70,70,120)"}}>
        <Toolbar>
          <Typography style={{  fontSize:"20px" }}variant="h6" noWrap>
            PICT PLACEMENT
          </Typography>
          <Typography variant="h6" style={{ marginLeft: "auto" }}>
            <marquee>
              Welcome to Pict Placement Module - {localStorage.getItem("token")}
            </marquee>
          </Typography>
          <Button
            onClick={() => logoutHandler(props)}
            className={classes.logout}
            color="inherit"
            style={{backgroundColor:"rgb(85,85,135)",outline:"none"}}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        
      >
        <div className={classes.toolbar} />
        <List>
          {drawerListNames.map((text, index) => (
            <div key={text}>
              <ListItem
            
                button
                onClick={() => {
                  buttonHandler(text);
                  
                }}
              
              >
                <ListItemIcon>{props.drawerList[text][1]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default withRouter(ClippedDrawer);
