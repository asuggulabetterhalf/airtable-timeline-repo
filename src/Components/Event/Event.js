import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog'; 
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import EditForm from '../Forms/EditForm'; 
import './Event.css'; 

function Event(props) {

  //State for modal 
  const [isOpen, setIsOpen] = useState(false);

  /** 
  * randomColor - pick a random color from Airtable's palette to render the event with :). 
  */  
  const colors = ['#0181DC', '#00A7DD', '#00AAA5', '#EB1CBC', '#F22C5E', '#FA6530', '#E28E00', '#00B00D', '#7C2CF1', '#66666']; 
  const colorIndex = Math.floor(props.event.id % colors.length); 
  const randColor = colors[colorIndex];

  //Handle open for modal
  const handleOpen = () => {
    setIsOpen(true); 
  }

  //Handle close for modal 
  const handleClose = () => {
    setIsOpen(false); 
  }

  //Handle deleting an event
  const handleDelete = (e) => {
    e.preventDefault(); 
    props.deleteEvent(props.event); 
  }

  return (
    <div
      className='timeline-event'
      style={
        {
          width: `${props.width}px`, 
          left: `${props.leftMargin}px`, 
          backgroundColor: `${randColor}`
      }
    }
    >
      <div className='edit-icon' onClick={handleOpen}><EditIcon/></div>
      <div className='close-icon' onClick={handleDelete}><CloseIcon/></div>
      <div className='event-text'>{props.text}</div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <EditForm event={props.event} modifyEvent={props.modifyEvent}/>
      </Dialog>
    </div>
  );
}

export default Event;