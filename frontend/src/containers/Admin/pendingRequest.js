import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "../../axios";
import { ButtonGroup } from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
// import "bootstrap/dist/css/bootstrap.css";
import Pagination from '../../components/Pagination'

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
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(115),
    backgroundColor: "rgb(70,70,120)",
    outline: "none"
  },
  group: {
    margin: theme.spacing(1, 0)
  }
});

class BranchReport extends Component {
  state = {
    students: [],
    checked: [],
    postsPerPage: 10,
    currentPage: 1,
    show: [],
  };

  constructor() {
    super();
    axios.post('/fetchToAdminPendingStudents')
      .then((response) => {
        console.log(response.data);
        this.setState({ students: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //////
  pageStand = (pageNumber) => {
    const indexOfLastPost = pageNumber * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.students.slice(indexOfFirstPost, indexOfLastPost);
    this.setState({
      ...this.state,
      show: [...currentPosts],
    })
  }
  paginate = (pageNumber) => {
    this.setState({
      ...this.state,
      currentPage: pageNumber,
    })
    this.pageStand(pageNumber);
  }
  ///////

  handleChange = index => event => {
    let s = this.state.students[index]
    console.log(s);
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

    var i = 0;
    var a = []
    for (i = 0; i < this.state.students.length; i++) {
      if (this.state.students[i].status === true)
        a.push(this.state.students[i].count);
    }
    console.log(a);
    axios.post("/getStatusOfPlaced", a)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <br></br>
        <br></br>
        <Paper className={classes.root}>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th align="right">Student Name</th>
                <th align="right">Company Name</th>
                <th align="right">Package LPA</th>
                <th align="right">Location</th>
                <th align="right">Approve</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((s, index) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.stu_name}</td>
                  <td>{s.idname}</td>
                  <td>{s.package_lpa}</td>
                  <td>{s.location}</td>
                  <td><FormControlLabel
                    control={
                      <Checkbox
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
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.students.length}
          paginate={this.paginate} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BranchReport);