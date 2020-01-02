import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "bootstrap/dist/css/bootstrap.css";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from '../../../axios';

const styles = theme => ({
  palette: {
    type: "dark"
  },
  root: {
    width: "85%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto"
  },
  table: {
    minWidth: 650
  },
  text: {
    textAlign: "center"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1),
    marginTop:theme.spacing(5),
    marginLeft:theme.spacing(110),
    backgroundColor:"rgb(70,70,120)",
    outline:"none"
  },
  group: {
    margin: theme.spacing(1, 0)
  }
});

class BranchReport extends Component {
  state = {
    students: [],
    checked: []
  };

  constructor() {
    super();
    let a =  localStorage.getItem("token");
   
    axios.post('/fetchToCompanyEligibleStudents',null,{params:{a:a}})
        .then((response) => {
            console.log(response.data);
            this.setState({ students: response.data });
        })
        .catch((error) => {
            console.log(error);
        })
}


  handleChange = index => event => {
      let s = this.state.students[index]
      s.status = event.target.checked
      let a = [...this.state.students]
      a[index] = s
      this.setState({
          ...this.state,
          students: a,
      })
  };

  clickHandler = () => {
      console.log(this.state.students)

        var i=0;  
        var a = []  
        for(i=0;i<this.state.students.length;i++){
            if(this.state.students[i].status===true)
            a.push(this.state.students[i].roll);
        }
        let comp_id=localStorage.getItem("token");
        a.push(comp_id)
        axios.post("/selectByCompany",a).catch((error) => {
          console.log(error);
        });;
       // window.location.reload(false);
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        
        <br></br>
        <br></br>
        <Paper className={classes.root}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th align="right">Student Name</th>
                <th align="right">CGPA</th>
                {/* <th align="right">Skills</th> */}
                <th align="right">Approve</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((s,index) => (
                <tr key={s.roll}>
                  <td align="left">{s.roll}</td>
                  <td align="right">{s.name}</td>
                  <td align="right">{s.sgpaTEFS}</td>
              <td align="right"><FormControlLabel
                control={
                  <Checkbox
                  style={{marginLeft:"5vw"}}
                   
                    onChange={this.handleChange(index)}
                    value={s.status}
                  />
                }
                label="Accept"
              /></td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </Paper>
        <Button
                variant="contained"
                color="primary"
                id="printbtn"
                className={classes.button}
                onClick={this.clickHandler} 
              >
               Allot
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BranchReport);
