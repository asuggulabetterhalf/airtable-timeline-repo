import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/**
 * Dialog for modifying an existing event - only triggers when user presses the "edit" button on the top right corner of an event.
 * Pre-populates with the existing information on the event.  
 */

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
  const [name, setName] = useState(props.event.name); 
  const [startDate, setStartDate] = useState(props.event.start); 
  const [endDate, setEndDate] = useState(props.event.end); 

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
      'end' : endDate, 
      'id' : props.event.id
    }

    props.modifyEvent(newEvent); 
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Modify Event
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
            defaultValue={name}
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
            value={startDate}
            defaultValue={startDate}
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
            value={endDate}
            defaultValue={endDate}
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
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}