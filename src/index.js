import React from "react";
import {render} from "react-dom";
import timelineItems from "./timelineItems";
import "./index.css";
import TimeLine from "./Components/TimeLine/TimeLine"; 

const App = () => (
  <div>
      <TimeLine items={timelineItems}/>
  </div>
);

render(<App />, document.getElementById("root"));
