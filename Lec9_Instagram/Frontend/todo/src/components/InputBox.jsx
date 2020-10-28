import React, { Component } from 'react'


class InputBox extends Component {
    state = { 
        task : ""
     }


     handleOnChange = (e) =>{
         let value = e.target.value;
         console.log(value);
          this.setState({
             task : value
         })
     }

    handleAddTask = () =>{
        this.props.handleAddTask(this.state.task);
        this.setState({
            task : ""
        })
    }

    render() { 
        // let addTask = this.props.handleAddTask;
        let task = this.state.task;
        return ( 
            <div className="input-box m-4">
                <input type="text" onChange= {(e)=>{this.handleOnChange(e)}} value={task}/>
                <div className="addTask btn btn-primary ml-4" onClick = { this.handleAddTask }>Add Task</div>
            </div>
         );
    }
}
 
export default InputBox;