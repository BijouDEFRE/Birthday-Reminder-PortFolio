// Functionals import
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components import
import Header from '../Header/Header';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import ForgetPassword from '../ForgetPassword/ForgetPassword';

function App() {

  return (
    <Router>
      <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgetpassword" component={ForgetPassword} />
        </Switch>

      <Footer />
    </Router>
  );
}

export default App;