import React, { Component } from 'react';
import InputBox from './components/InputBox';
import TaskList from './components/TaskList';


class App extends Component {
    
    state = {  }
    
    render() { 
        return (
            <React.Fragment>
            <InputBox />
            <TaskList />
            </React.Fragment>

          );
    }
}
 
export default App;

