import React from 'react';
import moment from 'moment'; 
import Event from '../Event/Event'; 
import './EventLane.css'; 
import uuid from 'uuid/v4'; 


function EventLane(props) {

/** 
 * calculateWidth - calculate the width of the event block based on start and end dates for the block 
 * @param {String} eventStart: Starting date of the event.
 * @param {String} eventEnd: Ending date of the event. 
 */  
const calculateWidth = (eventStart, eventEnd) => {
  //Number of days the event is worth
  const start = moment(eventStart);
  const end = moment(eventEnd); 
  const days = end.diff(start, 'days'); 
  const weeks = (days / 7.0); 

  return weeks === 0 ? props.pixelSize : props.pixelSize * weeks; 
}

/** 
 * calculateLeftMargin - calculate the left margin of the event block based on the difference between timelineStart and startDate 
 * @param {String} timeStart: Starting date of the earliest event on the timeline.
 * @param {String} eventStart: Starting date of the event.
 */  
const calculateLeftMargin = (timeStart, eventStart) => {
  const timelineStart = moment(timeStart); 
  const start = moment(eventStart); 
  const days = start.diff(timelineStart, 'days'); 
  const weeks = (days / 7.0)

  return props.pixelSize * weeks; 
}

  return (
    <div 
      className='event-lane'
      style = {{
        width: `${calculateWidth(props.dates[0], props.dates[props.dates.length])}px`
      }}
    > 
      {props.lane.map(event => {
        return <Event 
                deleteEvent={props.deleteEvent}
                modifyEvent={props.modifyEvent} 
                event={event} 
                key={uuid()} 
                text={event.name} 
                width={calculateWidth(event.start, event.end)} 
                leftMargin={calculateLeftMargin(props.dates[0], event.start)}
              />
      })}
    </div>
  );
}

export default EventLane;