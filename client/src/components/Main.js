import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Issues from './Issues';
import About from './About';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Issues}/>
      <Route exact path="/about" component={About}/>
    </Switch>
  </main>
)

export default Main;
