import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form(props) {

  /**
   * Manage state for updating the form 
   */
  const [name, setName] = useState(''); 
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState(''); 

  /**
   * Handle change to the event state based on form inputs.
   */
  const handleChange = (e) => {
    if(e.target.name === 'name'){
      setName(e.target.value); 
    }
    else if (e.target.name === 'start-date'){
      setStartDate(e.target.value); 
    }
    else {
      setEndDate(e.target.value);
    }
  }

  /**
   * Handle click to update the state in the parent component. 
   */
  const handleClick = (e) => {
    e.preventDefault(); 

    const newEvent = {
      'name': name, 
      'start': startDate, 
      'end' : endDate
    }

    props.addEvent(newEvent); 
  }



  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add New Event
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Event Name"
            name="name"
            value={name}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="start-date"
            label="Start Date"
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={handleChange}
            type="date"
            id="start-date"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="end-date"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={handleChange}
            type="date"
            id="start-date"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClick}
            className={classes.submit}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}