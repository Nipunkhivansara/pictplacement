// import React, { Component } from "react";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import axios from "../../../axios";
// //import { makeData } from "./Utils";

// // Import React Table
// import ReactTable from "react-table";
// import "react-table/react-table.css";
// //import { AutoSizer, Column, Table } from 'react-virtualized';

// const styles = theme => ({
//   flexContainer: {
//     display: "flex",
//     alignItems: "center",
//     boxSizing: "border-box"
//   },
//   tableRow: {
//     cursor: "pointer"
//   },
//   tableRowHover: {
//     "&:hover": {
//       backgroundColor: theme.palette.grey[200]
//     }
//   },
//   tableCell: {
//     flex: 1
//   },
//   noClick: {
//     cursor: "initial"
//   }
// });

// class Visited extends React.PureComponent {
//   static defaultProps = {
//     headerHeight: 48,
//     rowHeight: 48
//   };

//   state = {
//     companies: []
//   };

//   constructor() {
//     super();

//     axios
//       .get("/findallCompaniesVisited")
//       .then(response => {
//         this.setState({ companies: response.data });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   render() {
//     const { classes } = this.props;
//     console.log(this.state.companies);

//     return (
//       <Paper className={classes.root}>
//         <Grid>
//           <Table className={classes.table}>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="centre">Sno</TableCell>

//                 <TableCell align="centre">Company</TableCell>
//                 <TableCell align="centre">
//                   Criteria and GPA
//                   <TableCell align="centre">GPA</TableCell>
//                   <TableCell align="centre">Branches</TableCell>
//                 </TableCell>

//                 <TableCell align="centre" margin-left="100">
//                   UG
//                   <TableCell align="inherit">
//                     BE-CE
//                     <TableCell>S1</TableCell>
//                     <TableCell>S2</TableCell>
//                   </TableCell>
//                   <TableCell align="inherit">
//                     BE-ENTC
//                     <TableCell>S1</TableCell>
//                     <TableCell>S2</TableCell>
//                   </TableCell>
//                   <TableCell align="inherit"> BE-IT</TableCell>
//                 </TableCell>
//                 <TableCell align="centre">
//                   PG
//                   <TableCell align="centre">MECE</TableCell>
//                   <TableCell align="centre">MEIT</TableCell>
//                   <TableCell align="centre">ME ENTC</TableCell>
//                 </TableCell>
//                 <TableCell align="centre">
//                   Total
//                   <TableCell>M</TableCell>
//                   <TableCell>F</TableCell>
//                   <TableCell>T</TableCell>
//                 </TableCell>
//                 <TableCell align="centre">SalaryLPA</TableCell>
//                 <TableCell align="centre">VisitDate</TableCell>
//                 <TableCell align="centre">TotalSalaryLPA</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {this.state.companies.map(company => (
//                 <TableRow key={company.id}>
//                   <TableCell component="th" scope="row">
//                     {company.sno}
//                   </TableCell>
//                   <TableCell align="right">{company.company}</TableCell>
//                   <TableCell align="right">{company.criteria}</TableCell>
//                   <TableCell align="right">{company.ug}</TableCell>
//                   <TableCell align="right">{company.pg}</TableCell>
//                   <TableCell align="right">{company.total}</TableCell>
//                   <TableCell align="right">{company.salary}</TableCell>
//                   <TableCell align="right">{company.Visited}</TableCell>
//                   <TableCell align="right">{company.total}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Grid>
//       </Paper>
//     );
//   }
// }

// export default withStyles(styles)(Visited);
import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "../../../axios";
import "bootstrap/dist/css/bootstrap.css";
//import { makeData } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
//import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = theme => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  }
});

class Visited extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };

  state = {
    companies: []
  };

  constructor() {
    super();

    axios
      .post("/findallCompaniesVisited")
      .then(response => {
        this.setState({ companies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.companies);

    return (
      <Paper className={classes.root}>
        <Grid>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th align="centre">Sno</th>

                <th align="centre">Company</th>
                
                  <th align="centre">CGPA</th>
                  <th align="centre">Branch</th>
                  <th align="centre">BEC</th>
                  <th align="centre">CE</th>
                  <th align="centre">BEE</th>
                  <th align="centre">ENTC</th>
                  <th align="centre">BEIT</th>
                  <th align="centre">MECE</th>
                  <th align="centre">MEEENTC</th>
                  <th align="centre">MEIT</th>
                  <th align="centre">M</th>
                  <th align="centre">F</th>
                  <th align="centre">T</th>
                  <th align="centre">SALLPA</th>
                  <th align="centre">VISITDATE</th>
                  <th align="centre">TSALLPA</th>
                  

                
              </tr>
            </thead>
            <tbody>
              {this.state.companies.map(company => (
                <tr key={company.id}>
                  <td component="th" scope="row">
                    {company.sno}
                  </td>
                  <td align="right">{company.company}</td>
                  <td align="right">{company.cgpa}</td>
                  <td align="right">{company.branch}</td>
                  <td align="right">{company.bec}</td>
                  <td align="right">{company.ce}</td>
                  <td align="right">{company.bee}</td>
                  <td align="right">{company.entc}</td>
                  <td align="right">{company.beit}</td>
                  <td align="right">{company.mece}</td>
                  <td align="right">{company.meentc}</td>
                  <td align="right">{company.meit}</td>
                  <td align="right">{company.m}</td>
                  <td align="right">{company.f}</td>
                  <td align="right">{company.t}</td>
                  <td align="right">{company.sal}</td>
                  <td align="right">{company.vistdate}</td>
                  <td align="right">{company.tsal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Visited);