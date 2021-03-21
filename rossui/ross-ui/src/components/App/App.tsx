import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken();    
  
  if(!token) {
    return <BrowserRouter><Login setToken={setToken}/></BrowserRouter>;
  }

  return (
    <div className="wrapper">
      <h1>Testing Log in and auth stuff!</h1>
      <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );  
}

export default App;