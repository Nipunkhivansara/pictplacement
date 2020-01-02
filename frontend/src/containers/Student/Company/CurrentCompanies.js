import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../../../axios';
import "bootstrap/dist/css/bootstrap.css";

const styles = (theme => ({

    palette: {
        type: 'dark',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

class Current extends Component {

    state = {
        companies: [],
    }

    constructor() {
        super();
        axios.get('/industry/findall')
            .then((response) => {
                this.setState({ companies: response.data });
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th align="right">Criteria</th>
                            <th align="right">Average Salary</th>
                            <th align="right">Tentative Date</th>
                            <th align="right">Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companies.map(company => (
                            <tr key={company.id}>
                                <td component="th" scope="row">
                                    {company.name}
                                </td>
                                <td align="right">{company.criteria}</td>
                                <td align="right">{company.package_lpa}</td>
                                <td align="right">{company.final_date}</td>
                                <td align="right">{company.skills.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>
        );
    }
}

export default withStyles(styles)(Current);