import React, { Component } from 'react'


const Task = (props) => {
    let task = props.newtasks;
    return ( 
        <div className="task d-flex m-4">
            <div className="task-name h5">{task}</div>
            <div className="delete btn btn-danger ml-3">X</div>
        </div>
    );
}



export default Task;