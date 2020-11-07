import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navbar';
import Profile from './components/profile';
import Settings from './components/settings';
import axios from "axios";



class App extends Component {
  
  state = { 
    isAuth : false
   }

   logout = ()=>{
    //  this.setState({
    //    isAuth : false
    //  })
    axios.get("/auth/logout").then(()=>{
     window.location = "/";
    })
   }

   login = ()=>{
    // this.setState({
    //   isAuth : true
    // })
    // ??? google consent should be send to localhost:3000
    window.location = "auth/google"; // time lagega
    // setStae = true
    // from backend => open react UI home again => initial state will render  
  }

  componentDidMount(){
    //axios do not reload the page
    axios.get("/auth/checkAuth").then((data)=>{
      let isAuth = data.data.isAuth;
      if(isAuth){
        this.setState({
          isAuth : true
        })
      }
    })    
  }
  
  render() { 
    let {isAuth} = this.state;
    let login = this.login;
    let logout = this.logout;
    return (
<React.Fragment>
    <NavBar isAuth={isAuth} login={login} logout={logout}></NavBar>
    <Switch>
    <Route path = "/" exact>
    <Home></Home>
    </Route>
    <Route path="/profile" exact>
    {isAuth ? <Profile></Profile> : <Redirect to="/"></Redirect> }  
    </Route>
    <Route path="/settings" exact>
    {isAuth ? <Settings></Settings> : <Redirect to="/"></Redirect> }  
    </Route>
    </Switch>
    </React.Fragment>
    );
  }
}
 
export default App;
