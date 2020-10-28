import React, { Component } from 'react'


const Task = (props) => {
    let {id , task} = props.newtasks;
    let deleteTask = props.handleDeleteTask;


    return ( 
        <div className="task d-flex m-4">
            <div className="task-name h5">{task}</div>
            <div className="delete btn btn-danger ml-3" onClick = {  () =>{ deleteTask(id)  }   } >X</div>
        </div> 
    );
}



export default Task;