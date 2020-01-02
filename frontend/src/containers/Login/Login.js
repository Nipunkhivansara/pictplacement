import React, { useEffect, useState, Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { BrowserRouter, Route, Redirect, withRouter } from "react-router-dom";
import classes from "./Login.module.css";
import axios from "../../axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { blue } from "@material-ui/core/colors";
import Logo from "./Pict_logo.png";

class Login extends Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    type: "",
    error: false
  };

  loginHandler = event => {
    event.preventDefault();
    let user = {
      id: this.state.username,
      pass: this.state.password
    };
    axios
      .post("/authenticate", user)
      .then(response => {
        console.log(response.data);
        const s = response.data;
        switch (s.toLowerCase()) {
          case "admin":
          case "company":
          case "student":
            localStorage.setItem("token", user.id);
            this.setState({
              ...this.state,
              loggedIn: true,
              error: false
            });
            this.props.history.push({
              pathname: "/" + response.data + "/dashboard"
            });
            break;
          default:
            this.setState({
              ...this.state,
              loggedIn: false,
              error: true
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeHandler = name => event => {
    let newState = { ...this.state, [name]: event.target.value };
    this.setState(newState);
  };

  render() {
    return (
      <div className={classes.login}>
        
        <div
          style={{
            width: "100%",
            height: "7vh",
            font: "Bold",
            fontSize: "4vh",
            fontFamily: "Comicsans",
            color: "white"
          }}
        >
          
          <AppBar position="static" style={{backgroundColor:"rgb(70,70,120)"}}>
            <Toolbar variant="dense">
              <Typography style={{ marginLeft: "2vw" ,fontSize:"20px" }} variant="h5">
                PUNE INSTITUTE OF COMPUTER TECHNOLOGY PLACEMENT-CELL
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <Container component="main" maxWidth="xs">
          
          <CssBaseline />
          <div className={classes.paper}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Pict_logo.png"
              style={{ height: "12vh", width: "7vw", borderRadius: 125 }}
            ></img>{" "}
            <Typography component="h1" variant="h5" style={{marginTop:"3vh"}}>
              SIGN IN
            </Typography>{" "}
            <form
              className={classes.form}
              noValidate
              onSubmit={this.loginHandler}
            >
              <TextField
                variant="outlined"
                margin="normal"
                error={this.state.error}
                style={{backgroundColor:"rgba(255,255,255,0.8)",borderRadius:"5px"}}
                required
                fullWidth
                label="User ID"
                autoComplete="name"
                autoFocus
                onChange={this.changeHandler("username")}
              />
              <TextField
                variant="outlined"
                style={{backgroundColor:"rgba(255,255,255,0.8)",borderRadius:"5px"}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.changeHandler("password")}
                error={this.state.error}
              />
              <FormControlLabel 
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{outline:"none",backgroundColor:"rgba(50,50,100,1)",color:"white"}}
                // color= "primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
              </Grid>{" "}
            </form>{" "}
          </div>{" "}
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
