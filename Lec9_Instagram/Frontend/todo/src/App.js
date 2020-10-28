import React, { Component } from 'react';
import InputBox from './components/InputBox';
import TaskList from './components/TaskList';


class App extends Component {
    
    state = {
        tasks: [
          { id: 1, task: "Learn ES6" },
          { id: 2, task: "Learn React" },
          { id: 3, task: "Learn NodeJS" },
          { id: 4, task: "Learn WebD" },
          { id: 5, task: "Learn BackEnd" },
        ],
      };
      deleteTask = (id) =>{
        // console.log("delete task called " , id);
          let newTasks = this.state.tasks.filter(  (taskObj)=>{
              return taskObj.id != id;
          });
          // calls render function
          this.setState({
              tasks : newTasks
          })
      }
    
    
      addTask = (newTask) =>{
        // ...[ {} , {} , {}  ] =>  {} , {} , {} ,{}
        let newObj = {id : this.state.tasks.length+1 , task : newTask};
        let newTasks = [ ...this.state.tasks  , newObj  ];
        // [ {} , {} , {} ,{} , {}  ];
        this.setState({
          tasks : newTasks
        })
      }
    
    render() { 
        let tasks = this.state.tasks;
        let deleteTask = this.deleteTask;
        let addTask = this.addTask;
        return (
            <React.Fragment>
            <InputBox handleAddTask = {addTask}/>
            <TaskList tasks = {tasks} handleDelete = {deleteTask}  />
            </React.Fragment>

          );
    }
}
 
export default App;

