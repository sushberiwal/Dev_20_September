import React, { Component } from "react";
import Task from "./Task";

// constructor no need

class TaskList extends Component {
  state = {};

  render() {
    let tasks = this.props.tasks;
    let deleteTask = this.props.handleDelete;
    // tasks , delete functions

    return (
      <React.Fragment>
        {tasks.map((taskObj) => {
          return (
            <Task
              key={taskObj.id}
              newtasks={taskObj}
              handleDeleteTask={deleteTask}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default TaskList;
