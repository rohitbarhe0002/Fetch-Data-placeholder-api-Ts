import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './page/Home.ts';
import store from './store/store.ts';

function App() {
  return (
    <Provider store = { store } >
    <Router>
    <div className="App" >
      <Switch>
      <Route path="/" exact component = { Home } />
        </Switch>
        < /div>
        < /Router>
        < /Provider>
  );
}

export default App;
