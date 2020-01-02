import React, { useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from '../../../axios';
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
// import moment from "moment";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        boxSizing: 'border-box',
        width: '68vw',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor:"rgb(70,70,120)",
        outline: "none"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    root: {
        width: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: '100%',
        maxWidth: '100vw',
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles();
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
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}
MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function Profile(props) {
    const classes = useStyles();

    const [skills, setSkills] = React.useState([]);
    const [cities, setCities] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [disabled,setDisabled] = React.useState(false);

    useEffect(() => {
        axios.post('/industry/findById',null,{params:{id:localStorage.getItem('token')}})
            .then((response) => {
                console.log(response.data)
                if(response.data===""){
                }
                else{
                    setState({
                        ...response.data
                    })
                    setDisabled(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('/findallskills')
            .then((response) => {
                console.log(response.data);
                setSkills([...response.data]);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('/findalllocation')
            .then((response) => {
                console.log(response.data);
                setCities([...response.data]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [state, setState] = React.useState({
        id: localStorage.getItem('token'),
        name: '',
        cpname: '',
        cpemail1: '',
        cpemail2: '',
        contactno1: '',
        contactno2: '',
        contactno3: '',
        criteria: '',
        passive_backlogs: false,
        active_backlogs: false,
        package_lpa: '',
        start_date: new Date(),
        end_date: '',
        no_of_students: '',
        skills: [],
        locality: [],
        computer: false,
        it: false,
        entc: false,
    })
    var da = [];
    const [formErrors, setError] = React.useState({
        name: '',
        cpname: '',
        cpemail1: '',
        cpemail2: '',
        contactno1: '',
        contactno2: '',
        contactno3: '',
        criteria: '',
        package_lpa: '',
        no_of_students: '',
    })

    const [emptyError, setEmptyError] = React.useState({
    });

    const keys = ['name', 'cpname', 'cpemail1', 'contactno1', 'package_lpa']

    let e = {
    }
    function validate() {
        setEmptyError({});
        keys.map((key) => {
            if (state[key].length == 0) {
                e[key] = 'Empty'
            }
        })
        setEmptyError(e);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        validate();
        var valid = true;
        if (Object.values(formErrors).some((error) => error.length > 0) || Object.keys(e).length > 0) {
            valid = false;
        }
        else {
            valid = true;
        }
        // valid = true;
        console.log(valid);
        console.log(state);
        if (valid) {
            axios.post('/industry/add', state)
                .then((response) => {
                    console.log(response);
                    setOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        // window.location.reload(true);
    }
    const handleChange = (name) => (event) => {
        setState({
            ...state,
            [name]: event.target.value
        })
        const value = event.target.value;
        let error = '';
        let reg = '';
        switch (name) {
            case 'cpname':
                reg = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
                error = reg.test(value) ? '' : 'Invalid CPName';
                break;
            case 'cpemail1':
            case 'cpemail2':
                reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
                error = reg.test(value) ? '' : 'Invalid Email';
                break;
            case 'contactno1':
            case 'contactno2':
            case 'contactno3':
                reg = /^\d{10}$/
                error = reg.test(value) ? '' : 'Invalid Phone Number';
                break;
            case 'criteria':
                error = (Number(value) > 0 && Number(value) < 10) ? '' : 'Invalid Criteria';
                break;
            case 'package_lpa':
                reg = /^[0-9]+$/
                error = reg.test(value) ? '' : 'Invalid Package';
                break;
            case 'no_of_students':
                error = Number(value) > 0 ? '' : 'Invalid Number Of Students';
                break;
        }
        setError({
            ...formErrors,
            [name]: error,
        })
    }

    const handleChecked = (name) => (event) => {
        console.log(event.target.checked);
        setState({
            ...state,
            [name]: event.target.checked,
        })
    }

    const handleDateChange = (date, name) => {
        console.log(date);
        setState({
            ...state,
            [name]: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        })
    }

    const toggleBacklogs = (name) => (event) => {
        setState({
            ...state,
            [name]: event.target.checked,
        })
    }

    const getDates = () => {

        axios.get('/industry/getDateList', null)
            .then((response) => {
                da = response.data;

            })
            .catch((error) => {
                console.log(error);
            })


    }
    getDates();

    const retrieve = (date) => {
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
            k[j] = (n[j] === date.getDate() && m[j] === date.getMonth() && y[j] === date.getFullYear());

        for (i = 0; i < st.length; i++) {
            if (k[i]) {
                return k[i];
            }
        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <React.Fragment>
            
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant="success"
                    message="Profile added successfully!"
                />
            </Snackbar>
            <Paper className={classes.paper}>
                <Typography component="h2" variant="h4" align="center">
                    Company Profile
                </Typography>
                {/* <Divider className={classes.divider} /> */}
                <div id="divToPrint">
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Company Name"
                                    fullWidth
                                    onChange={handleChange('name')}
                                    value={state.name}
                                    error={formErrors.name.length > 0 || emptyError.name}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Contact Person Name"
                                    fullWidth
                                    onChange={handleChange('cpname')}
                                    value={state.cpname}
                                    error={formErrors.cpname.length > 0 || emptyError.cpName}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label=" Email id 1"
                                    fullWidth
                                    onChange={handleChange('cpemail1')}
                                    value={state.cpemail1}
                                    error={formErrors.cpemail1.length > 0 || emptyError.cpEmail1}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label=" Email id 2"
                                    fullWidth
                                    onChange={handleChange('cpemail2')}
                                    value={state.cpemail2}
                                    error={formErrors.cpemail2.length > 0}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Contact Number 1"
                                    fullWidth
                                    onChange={handleChange('contactno1')}
                                    value={state.contactno1}
                                    error={formErrors.contactno1.length > 0 || emptyError.contactNo1}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Contact Number 2"
                                    fullWidth
                                    onChange={handleChange('contactno2')}
                                    value={state.contactno2}
                                    error={formErrors.contactno2.length > 0}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Contact Number 3"
                                    fullWidth
                                    onChange={handleChange('contactno3')}
                                    value={state.contactno3}
                                    error={formErrors.contactno3.length > 0}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Criteria"
                                    fullWidth
                                    onChange={handleChange('criteria')}
                                    value={state.criteria}
                                    error={formErrors.criteria.length > 0}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Package"
                                    fullWidth
                                    onChange={handleChange('package_lpa')}
                                    value={state.package_lpa}
                                    error={formErrors.package_lpa.length > 0 || emptyError.package_lpa}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Number of Students"
                                    fullWidth
                                    onChange={handleChange('no_of_students')}
                                    value={state.no_of_students}
                                    error={formErrors.no_of_students.length > 0}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.passive_backlogs}
                                            onChange={toggleBacklogs('passive_backlogs')}
                                            color="primary"
                                        />
                                    }
                                    style={{ boxSizing: 'border-box', marginLeft: '50px', marginTop: '20px' }}
                                    label="Passive Backlogs"
                                    fullWidth
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.active_backlogs}
                                            onChange={toggleBacklogs('active_backlogs')}
                                            color="primary"
                                        />
                                    }
                                    style={{ boxSizing: 'border-box', marginTop: '20px' }}
                                    label="Active Backlogs"
                                    fullWidth
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Chip label="Branches Preferred" style={{ marginTop: "6px", boxSizing: 'border-box', marginLeft: '20px' }} />
                            </Grid>
                            <Grid item xs={2} align='left'>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={state.computer} onChange={handleChecked('computer')} value="computer" />
                                    }
                                    label="Computer"
                                    style={{ boxSizing: 'border-box', marginLeft: '30px' }}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={state.it} onChange={handleChecked('it')} value="it" />
                                    }
                                    label="Information Technology"
                                    style={{ boxSizing: 'border-box', marginLeft: '45px' }}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={state.entc} onChange={handleChecked('entc')} value="entc" />
                                    }
                                    label="Electronics and Telecommunication"
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        label="Preffered date"
                                        fullWidth
                                        value={state.start_date}
                                        onChange={(date) => handleDateChange(date, "start_date")}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        shouldDisableDate={retrieve}
                                        disabled={disabled}

                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Skills Required</InputLabel>
                                    <Select
                                        multiple
                                        value={state.skills}
                                        onChange={handleChange('skills')}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                        fullWidth
                                        disabled={disabled}
                                    >
                                        {skills.map(s => (
                                            <MenuItem key={s} value={s}>
                                                <Checkbox checked={state.skills.indexOf(s) > -1} />
                                                <ListItemText primary={s} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Locations</InputLabel>
                                    <Select
                                        multiple
                                        value={state.locality}
                                        onChange={handleChange('locality')}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                        fullWidth
                                        disabled={disabled}
                                    >
                                        {cities.map(c => (
                                            <MenuItem key={c} value={c}>
                                                <Checkbox checked={state.locality.indexOf(c) > -1} />
                                                <ListItemText primary={c} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} align="right" onClick={submitHandler}>
                                <Button className={classes.button} size="large" variant="contained" color="primary" disabled={disabled}>Submit</Button>
                            </Grid>
                        </Grid>

                    </form>
                </div>
            </Paper>
        </React.Fragment>
    );
}

export default Profile;