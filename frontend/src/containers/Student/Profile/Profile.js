import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Personal from './Personal'
import Academic from './Academic'
import Review from './Review'
import { connect } from 'react-redux'
import * as actionTypes from '../../../actions/Student'
import axios from '../../../axios'


const styles = (theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    width: '65vw',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor:"rgb(70,70,120)",
    outline:"none"
  },
}));

const steps = ['Personal details', 'Academic details', 'Review your profile'];


class Profile extends Component {

  //branch2

  state = {
    activeStep: 0,
    formErrors: {
      rollno: '',
      aadharNumber: '',
      pancardNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
       mobileNumber1: '',
      mobileNumber2: '',
      email: '',
      alternateEmail: '',
      gender: '',
      currentAddress: '',
      permanentAddress: '',
    }
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <Personal errors={this.state.formErrors} />;
      case 1:
        return <Academic />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = () => {
    let newActiveStep = this.state.activeStep;
    switch (this.state.activeStep) {
      case 0:
        let p = {
          ...this.props.statePersonal,
          rollno: localStorage.getItem("token"),
        };
        console.log(p);
        let valid = p.valid;
        let keys = Object.keys(p).slice(0, -2);
        let e = {
        }
        keys.map((key) => {
          if (p[key] === '') {
            e[key] =  'This cannot be empty'
          }
          else {
            e[key] = ''
          }
        })
        this.setState({
          ...this.state,
          formErrors: {
            ...e
          },
        })
        if (Object.values(e).some((error) => error.length > 0)) {
          valid = false;
        }
        else {
          valid = true;
        }
        if (valid && this.props.statePersonal.valid) {
          newActiveStep = this.state.activeStep + 1;
        }
        else {
          newActiveStep = this.state.activeStep;
        }
       newActiveStep = this.state.activeStep + 1;
        console.log(p);
        console.log("before");
        axios.post('/addPersonaldetails',p)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
        break;
      case 1:
        let a = this.props.stateAcademic;
        let academic = {
          collegeId: localStorage.getItem("token"),
          branch: a.branch,
          roll_no: a.collegeId,
          prnNumber: a.prnNumber,
          diploma: a.diploma,
          percentageTenth: a.percentage.tenth,
          percentageTwelfth: null,
          percentageDiploma: null,
          percentageEngineering: a.percentage.engineering,
          boeTenth: a.boardOfEducation.tenth,
          boeTwelfth: null,
          boeDiploma: null,
          yopTenth: a.yearOfPassing.tenth,
          yopTwelfth: null,
          yopDiploma: null,
          gapTenth: a.educationGap.tenth,
          gapTwelfth: null,
          gapDiploma: null,
          rogTenth: a.reasonOfGap.tenth,
          rogTwelfth: null,
          rogDiploma: null,
          engineeringStartYear: a.engineeringStartYear,
          sgpaFEFS: null,
          sgpaFESS: null,
          sgpaSEFS: a.sgpa.sefs,
          sgpaSESS: a.sgpa.sess,
          sgpaTEFS: a.sgpa.tefs,
          sgpaTESS: a.sgpa.tess,
          sgpaAggregate: a.sgpa.aggregate,
          marksFEFS: null,
          marksFESS: null,
          marksSEFS: a.marks.sefs,
          marksSESS: a.marks.sess,
          marksTEFS: a.marks.tefs,
          marksTESS: a.marks.tess,
          activeBacklogs: a.activeBacklogs,
          passiveBacklogs: a.passiveBacklogs,
          yeardowns: a.yeardowns,
          skills: a.skill,
        }

        if (a.diploma == false) {
          academic = {
            ...academic,
            percentageTwelfth: a.percentage.twelfth,
            boeTwelfth: a.boardOfEducation.twelfth,
            yopTwelfth: a.yearOfPassing.twelfth,
            gapTwelfth: a.educationGap.twelfth,
            rogTwelfth: a.reasonOfGap.twelfth,
            sgpaFEFS: a.sgpa.fefs,
            sgpaFESS: a.sgpa.fess,
            marksFEFS: a.marks.fefs,
            marksFESS: a.marks.fess,
          }
        }
        else {
          academic = {
            ...academic,
            percentageDiploma: a.percentage.diploma,
            boeDiploma: a.boardOfEducation.diploma,
            yopDiploma: a.yearOfPassing.diploma,
            gapDiploma: a.educationGap.diploma,
            rogDiploma: a.reasonOfGap.diploma,
          }
        }
        // if (this.props.stateAcademic.valid) {
        //   newActiveStep = this.state.activeStep + 1;
        // }
        // else {
        //   newActiveStep = this.state.activeStep;
        // }
        // console.log(academic);
        newActiveStep = this.state.activeStep + 1;
        console.log(academic);
        axios.post('/addacademicdetails',academic)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 2:
        newActiveStep = this.state.activeStep + 1;
        break;
    }
    this.setState({ activeStep: newActiveStep });
  };

  handleBack = () => {
    const newActiveStep = this.state.activeStep - 1;
    this.setState({ activeStep: newActiveStep });
  };

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Student Profile
            </Typography>
            <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.state.activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for filling the profile.
                  </Typography>
                  <Typography variant="subtitle1">
                  </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {this.getStepContent(this.state.activeStep)}
                    <div className={classes.buttons}>
                      {this.state.activeStep !== 0 && (
                        <Button onClick={this.handleBack} variant="contained" color="primary"className={classes.button}>
                          Back
                      </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {this.state.activeStep === steps.length - 1 ? 'Save Profile' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statePersonal: state.personal,
    stateAcademic: state.academic,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNext: () => dispatch({ type: actionTypes.HANDLE_NEXT_PERSONAL }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));