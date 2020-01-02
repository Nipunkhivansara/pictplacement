import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import axios from "../../../axios";
import CompanyDetails from "./CompanyDetails";

import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import "bootstrap/dist/css/bootstrap.css";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const styles = theme => ({
  icon: {
    fontSize: 20
  },
  success: {
    backgroundColor: green[600]
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: "20dp"
  },
  message: {
    display: "flex",
    alignItems: "center"
  },

  palette: {
    type: "dark"
  },
  root: {
    width: "85%",
    // marginTop: theme.spacing(3),
    overflowX: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto"
  },
  table: {
    minWidth: 650
  },
  button: {
    // margin: theme.spacing(1),
    margin: "auto",
    backgroundColor:"rgb(70,70,120)",
    outline:"none"
  },
  tableText: {},
  classGrid: {
    boxSizing: "border-box",
    margin: "20px"
  },
  tableRow: {
    opacity: "1",
    transition: "opacity 300ms ease",
    cursor: "pointer"
  }
});
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function MySnackbarContentWrapper(props) {
  const classes = styles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}
MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

class AllCompanies extends Component {
  constructor() {
    super();
    axios
      .get("/industry/findall")
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          companies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  state = {
    name: "",
    cpName: "",
    cpEmail1: "",
    cpEmail2: "",
    contactNo1: "",
    contactNo2: "",
    contactNo3: "",
    criteria: "",
    passiveBacklogs: false,
    activeBacklogs: false,
    package: "",
    startDate: new Date(),
    finalDate: new Date(),
    numberOfStudents: "",
    skill: [],
    city: [],
    branches: {
      computer: false,
      it: false,
      entc: false
    },
    companies: [],
    open: false
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      ...this.state,
      open: false
    });
  };

  dateChangeHandler = (date, name) => {
    this.setState({
      ...this.state,
      [name]: date
    });
  };

  dateChangeHandlerPersonal = (date, index) => {
    var newCompanies = [...this.state.companies];
    console.log(newCompanies);
    var company = newCompanies[index];
    company.final_date = date;
    console.log(company);
    newCompanies[index] = company;
    console.log(newCompanies);
    this.setState({
      ...this.state,
      companies: newCompanies
    });
  };

  companyHandler = company => {
    console.log("clicked" + company.name);
    window.open(
      "http://localhost:3000/admin/company-details/" + company.id,
      "_blank"
    );
  };

  submitHandler = () => {
    console.log(this.state.startDate);
    console.log(this.state.finalDate);

    let state = this.state;

    var industry = {
      name: state.name,
      cpname: state.cpName,
      cpemail1: state.cpEmail1,
      cpemail2: state.cpEmail2,
      contactno1: state.contactNo1,
      contactno2: state.contactNo2,
      contactno3: state.contactNo3,
      criteria: state.criteria,
      passive_backlogs: state.passiveBacklogs,
      active_backlogs: state.activeBacklogs,
      package_lpa: state.package,
      start_date: state.startDate,
      final_date: state.finalDate,
      no_of_students: state.numberOfStudents,
      skills: state.skill,
      locality: state.city,
      branches: state.branches
    };

    axios
      .post("/industry/findByDate", industry)
      .then(response => {
        console.log(response.data);
        this.setState({
          companies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  submitHandler3 = industry => {
    console.log(industry);
    industry = {
      ...industry,
      start_date: industry.final_date
    };
    console.log(industry);
    axios
      .post("/industry/add", industry)
      .then(response => {
        this.setState({
          ...this.state,
          open: true
        });
        this.setState(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  submitHandler2 = company => {
    var final = this.state.finalDate;
    let state = this.state;
    console.log(final);
    axios
      .post("/industry/findById", null, { params: { id: company.id } })
      .then(response => {
        this.setState(response.data);
        console.log(this.state);
        this.state.finalDate = final;
        this.state.final_date = this.state.finalDate;
        this.submitHandler3(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  };

  printDocument = () => {
    document.getElementById("printbtn").style.visibilty = "hidden";
    document.getElementById("paper1").style.visibility = "hidden";
    document.getElementById("btncol").style.visibility = "hidden";
    window.print();
    document.getElementById("printbtn").style.visibilty = "visible";
    document.getElementById("paper1").style.visibility = "visible";
    document.getElementById("btncol").style.visibility = "visible";
  };

  render() {
    const { classes } = this.props;
    var da = [];
    const getDates = () => {
      axios
        .get("/industry/getDateList", null)
        .then(response => {
          da = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    };
    getDates();

    const retrieve = date => {
      var sa = [];

      var st = [];
      var n = [];
      var m = [];
      var y = [];
      var k = [];
      let i = [];
      for (i = 0; i < da.length; i++) {
        st[i] = new Date(da[i]);
      }

      for (i = 0; i < st.length; i++) {
        n[i] = st[i].getDate();
        m[i] = st[i].getMonth();
        y[i] = st[i].getFullYear();
      }

      for (let j = 0; j < st.length; j++)
        k[j] =
          n[j] === date.getDate() &&
          m[j] === date.getMonth() &&
          y[j] === date.getFullYear();

      for (i = 0; i < st.length; i++) {
        if (k[i]) {
          return k[i];
        }
      }
    };
    return (
      <React.Fragment>
     
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Date Alloted!"
          />
        </Snackbar>
        <Button
          variant="contained"
          color="primary"
          id="printbtn"
          className={classes.button}
          onClick={this.printDocument}
        >
          Print
        </Button>
        <Paper className={classes.root} id="paper1">
          <Grid container className={classes.classGrid}>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Start Date"
                  value={this.state.startDate}
                  onChange={date => this.dateChangeHandler(date, "startDate")}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="End Date"
                  value={this.state.finalDate}
                  onChange={date => this.dateChangeHandler(date, "finalDate")}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.submitHandler}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.root}>
          <table className="table table-bordered">
            <thead>
              <tr style={{ height: "8vh" }}>
                <th className={classes.tableText}>
                  Company Name
                </th>
                <th className={classes.tableText} align="right">
                  Preffered Date
                </th>
                <th className={classes.tableText} align="center">
                  Choose final date
                </th>
                <th className={classes.tableText} align="left">
                  Accept
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.companies.map((company, index) => (
                <tr key={company.id} className={classes.tr}>
                  <td
                    style={{ color: "#3f51b5" }}
                    component="th"
                    scope="row"
                    onClick={() => this.companyHandler(company)}
                  >
                    <u>{company.name}</u>
                  </td>
                  <td align="right">{company.start_date}</td>
                  <td align="right" id="btncol">
                    {" "}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        label="Final Date"
                        value={company.final_date}
                        onChange={date =>
                          this.dateChangeHandlerPersonal(date, index)
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        shouldDisableDate={retrieve}
                      />
                    </MuiPickersUtilsProvider>
                  </td>
                  <td>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={() => this.submitHandler3(company)}
                    >
                      Allot
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AllCompanies);
