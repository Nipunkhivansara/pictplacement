import React from 'react'
import axios from '../../../axios'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactToPrint from 'react-to-print'

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
        // marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        boxSizing: 'border-box',
        width: '75vw',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    printButton: {
        // marginTop: '2vh'
        backgroundColor:"rgb(70,70,120)",
        outline:"none"
    }
}));

class CompanyDetails extends React.Component {

    state = {
        company: {},
        skills: 'Null',
        locality: '',
        branchesPreffered: '',
    }

    constructor(props) {
        super(props);
        console.log(this.props);
        axios.post('/industry/findById', null, { params: { id: this.props.match.params.id } })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    ...this.state,
                    company: response.data,
                })
                let skills2 = response.data.skills;
                let s = this.state.skills.slice(3);
                let locality2 = response.data.locality;
                if (skills2.length > 0) {
                    for (let i = 0; i < skills2.length; i++) {
                        this.setState({
                            ...this.state,
                            skills: s + ", " + skills2[i],
                        })
                        s = this.state.skills;
                    }
                    this.setState({
                        ...this.state,
                        skills: this.state.skills.slice(2),
                    })
                }
                if (locality2.length > 0) {
                    for (let i = 0; i < locality2.length; i++) {
                        this.setState({
                            ...this.state,
                            locality: this.state.locality + ", " + locality2[i],
                        })
                    }
                }
                if (response.data.computer) {
                    this.setState({
                        ...this.state,
                        branchesPreffered: this.state.branchesPreffered + ", " + "Computer ",
                    })
                }
                if (response.data.it) {
                    this.setState({
                        ...this.state,
                        branchesPreffered: this.state.branchesPreffered + ", " + "IT ",
                    })
                }
                if (response.data.entc) {
                    this.setState({
                        ...this.state,
                        branchesPreffered: this.state.branchesPreffered + ", " + "ENTC ",
                    })
                }
                console.log(this.state.branchesPreffered);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    printHandler = () => {
        document.getElementById("printbtn").style.visibility = "hidden";
        window.print();
        document.getElementById("printbtn").style.visibility = "visible";

    }

    render() {

        console.log(this.state.company);

        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <ReactToPrint
                    trigger={() => <Button
                        variant="contained"
                        color="primary"
                        id="printbtn"
                        className={classes.printButton}>
                        Print
                </Button>}
                    content={() => this.componentRef}
                />
                <br></br>
                <br></br>
                <div ref={el => (this.componentRef = el)}>
                    <h1>Company Details:  {this.state.company.name}</h1>
                    <Typography variant="h6" gutterBottom style={{ marginTop: "5vh" }}>
                        Name: {this.state.company.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Start Date: {this.state.company.start_date}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Final Date: {this.state.company.final_date}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Email 1: {this.state.company.cpemail1}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Email 2: {this.state.company.cpemail2}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Contact Number 1: {this.state.company.contactno1}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Contact Number 2: {this.state.company.contactno2}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Contact Number 3: {this.state.company.contactno3}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Active Backlogs: {String(this.state.company.active_backlogs)}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Passive Backlogs: {String(this.state.company.passive_backlogs)}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Branches Preffered : {this.state.branchesPreffered.slice(2)}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Criteria: {String(this.state.company.criteria)}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Number of students: {String(this.state.company.no_of_students)}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Package LPA: {String(this.state.company.package_lpa)}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Skills required: {this.state.skills}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Locations : {this.state.locality.slice(2)}
                    </Typography>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(CompanyDetails);