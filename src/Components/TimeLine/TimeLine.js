import React, { useEffect, useState } from 'react';
import EventLane from '../EventLane/EventLane'; 
import AddForm from '../Forms/AddForm';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'; 
import moment from 'moment'; 
import './Timeline.css'; 

const PIXELS_PER_WEEK = 401; 
const MASSIVE_NUMBER_FOR_RANDOM = 10000000000000000000000000000000000; 

function TimeLine(props) {
  /** 
  * SortEvents
  * @param {Array} items: Array of timeline items that were passed in via props. 
  * @return {Array}: Array of timeline items sorted by start date. 
  * We will moment to make the comparisons and then return the newly sorted array. 
  */
  const sortEvents = (items) => {
    let sortedEvents = items.sort((a,b) => {
      const aStart = moment(a.start); 
      const bStart = moment(b.start); 

      return a - b; 
    })

    return sortedEvents; 
  }

  /** 
  * GetDates - this will be used to populate the date markers in our timeline 
  * @param {String} startDate: The earliest startDate in our array of items. 
  * @param {String} endDate: The most recent endDate in our array of items. 
  * @return {Array}: Array of all the date strings between our start and end dates (inclusive) in increments of weeks. 
  */
  const getDates = (startDate, endDate) => {
    const dates = []; 

    let curr = moment(startDate).subtract(7, 'days');
    let end = moment(endDate).add(7, 'days'); 

    while(curr <= end){

      console.log(moment(curr).format('YYYY-MM-DD')); 
      dates.push(moment(curr).format('YYYY-MM-DD')); 
      curr = moment(curr).add(7, 'days'); 
    }

    return dates; 
  }

  /**
  * assignLanes - the starter code provided that assigns events to lanes
  * @param {Array} items: Takes an array of items and assigns them to lanes based on start/end dates.
  * @returns an array of arrays containing items.
  */
  const assignLanes = (items) => {
    const sortedItems = items.sort((a, b) =>
        new Date(a.start) - new Date(b.start)
    );
    const lanes = [];

    function assignItemToLane(item) {
        for (const lane of lanes) {
            if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
                lane.push(item);
                return;
            }
        }
        lanes.push([item]);
    }

    for (const item of sortedItems) {
        assignItemToLane(item);
    }
    return lanes;
  }

  /**
  * modifyEvent - updates state based on the modified event that's been passed in
  * @param {Object} newEvent: The one event that's been modified  
  */
  const modifyEvent = (newEvent) => {
    //First create a new set of events based on the updated event 
    const newEvents = events.map(event => event.id === newEvent.id ? newEvent : event);
    const sortedEvents = sortEvents(newEvents); 

    //Sort and then set events 
    setEvents(sortedEvents); 
  }

  /**
  * addEvent - updates state and adds a new event 
  * @param {Object} newEvent: Details of the event that is going to be added.
  */

  const addEvent = (newEvent) => {
    //Make a copy and push the newEvent to the new set of events
    const newEvents = events.slice(); 

    newEvent.id = Math.floor(Math.random() * MASSIVE_NUMBER_FOR_RANDOM); 
    newEvents.push(newEvent); 

    //Sort and update events
    const sortedEvents = sortEvents(newEvents);
    setEvents(sortedEvents); 

    //Close the modal
    handleClose(); 
  }

  /**
  * deleteEvent - deletes event based on the id of the event passed in 
  * @param {Object} deletedEvent: Event to be deleted
  */
   const deleteEvent = (deletedEvent) => {

    //Filter out the event that's going to be deleted based on the id.
    const updatedEvents = events.filter(event => event.id !== deletedEvent.id); 

    //Sort and update events
    const sortedEvents = sortEvents(updatedEvents); 
    setEvents(sortedEvents); 
  }

  /* 
  * Initialize events sorted by start date. 
  * Initialize global variables for timelineStart and timelineEnd as anchor points for the rest of the timeline. 
  * Initialize dates as all of the date strings needed to populate the timeline. 
  */
  const [events, setEvents] = useState(sortEvents(props.items));
  const [lanes, setLanes] = useState(assignLanes(events)); 
  const timelineStart = events[0].start; 
  const timelineEnd = events[events.length - 1].end; 
  const [dates, setDates] = useState(getDates(timelineStart, timelineEnd)); 


  /**
   * This useEffect hook updates all other pieces of state (lanes + dates) that depend on an event update. 
   */
  useEffect(() => {

    //Set new lanes based on the updated events
    const newLanes = assignLanes(events); 
    setLanes(newLanes); 
    
    //Get new start and end dates 
    const timeStart = events[0].start; 
    const timeEnd = events[events.length - 1].end; 

    //Update dates based on this new date range
    const newDates = getDates(timeStart, timeEnd); 
    setDates(newDates); 

  }, [events]); 

  
  /**
   * Modal specific state and handle functions
   */
  
  const [isOpen, setIsOpen] = useState(false); 

  //Handle open for modal
  const handleOpen = () => {
    setIsOpen(true); 
  }

  //Handle close for modal 
  const handleClose = () => {
    setIsOpen(false); 
  }

  /* 
  * Generate all of the JSX elements needed for the bottom of the timeline.
  */
  const displayDates = dates.map(date => <div className='timeline-date'>{moment(date).format('MMM-DD')}</div>);
  const displayEventLanes = lanes.map(lane => <EventLane pixelSize={PIXELS_PER_WEEK} addEvent={addEvent} modifyEvent={modifyEvent} deleteEvent={deleteEvent} lane={lane} dates={dates} timelineStart={timelineStart} timelineEnd={timelineEnd}/>)

  return (
      <div className='timeline'>
        <div className='timeline-eventlanes'>
          {displayEventLanes}
        </div>
        <div className='timeline-dates'>
          {displayDates}
        </div>
        <div className='timeline-addEvent-button'><Button variant='contained' color='secondary' onClick={handleOpen}>Add</Button></div>
        <Dialog
          open={isOpen}
          onClose={handleClose}
        >
          <AddForm addEvent={addEvent}/>
        </Dialog>
      </div>
  );
}

export default TimeLine;