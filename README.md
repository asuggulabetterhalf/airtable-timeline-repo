# Airtable Frontend Takehome - Timeline Project 🚀

## Key Features

* Initializes the timeline with the list of events provided 🔥
* Timeline visualizes the events by "lane" based on available space ✨
  * Event conflicts are avoided by stacking events if they do conflict 
  * Events are hashed to a pre-populated set of colors based on Airtable's own designs 
<img width="1778" alt="Screen Shot 2021-05-23 at 4 46 37 PM" src="https://user-images.githubusercontent.com/6907508/119280478-72555800-bbe6-11eb-83de-77b1dcb731cf.png">

* Full CRUD functionality to add, delete and edit timeline events with a pop-up dialog 💅
  * Supports recalibration of timeline start and end dates based on new event inputs 

Adding an event: 
<img width="1791" alt="Screen Shot 2021-05-23 at 4 47 18 PM" src="https://user-images.githubusercontent.com/6907508/119280493-8a2cdc00-bbe6-11eb-804c-befcd02cbf95.png">

Modifying an event: 
<img width="1791" alt="Screen Shot 2021-05-23 at 4 47 55 PM" src="https://user-images.githubusercontent.com/6907508/119280508-a03a9c80-bbe6-11eb-9224-c97cd44b5113.png">

## Set Up & Installation

To initialize the node modules, first run: 
```
yarn install
```

Build the project: 
```
yarn build 
```

Run with static server: 
```
serve -s build 
```


## Questions & Answers

#### How long did you spend on the assignment? 
I spent about 6-7 hours (3 hours on the basic functionality and the remainder on the CRUD features + styling). 

#### What do you like about your implementation? 
I think I did a decent job of planning the project out so that I was able to complete the basic + additional features without spending significantly more time. I think the styling is pretty decent and somewhat faithful to Airtable's own styling cues and the CRUD functionality works well. 

#### What would you change if you were going to do it again? 
I would probably add some sort of local storage based persistence to the application so that state perists beyond the browser session. I thought Redux or Context for this project were probably overkill, but in order to set the foundations for scaling the application further I would probably add that state management functionality as well. This exercise was very much a function of trying to execute quickly while keeping in focus what the core functionality needs to be. 

#### How did you make your design decisions? If you looked at other timelines for inspiration, please note that.
I looked at Airtable's own timeline for inspiration 😄. 

#### How would you test this if you had more time?
I would've probably written a bunch of unit tests to make sure that all of the date formatting, parsing and calculations were correct. Could've probably written this in Typescript to make sure return types are what we expect (again laying the foundations for further scale). Maybe some integration tests to make sure the end-to-end application works as expected and pair that with some automated testing so that tests are run with every merge. 


