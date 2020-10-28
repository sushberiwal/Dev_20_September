import React, { Component } from "react";
import Task from "./Task";

// constructor no need

class TaskList extends Component {
  state = {
    tasks: [
      { id: 1, task: "Learn ES6" },
      { id: 2, task: "Learn React" },
      { id: 3, task: "Learn NodeJS" },
      { id: 4, task: "Learn WebD" },
      { id: 5, task: "Learn BackEnd" },
    ],
  };
  render() {
    let tasks = this.state.tasks;
    return (
      <React.Fragment>
        {tasks.map((taskObj) => {
          return <Task key={taskObj.id} newtasks={taskObj.task} />;
        })}
      </React.Fragment>
    );
  }
}

export default TaskList;
