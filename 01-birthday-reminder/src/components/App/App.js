// Functionals import
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components import
import Header from '../Header/Header';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import List from '../List/List';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  
  return (
    <Router>
      <Header />

        <Switch>
          <Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          {/* <Route component={ErrorPage}/> */}
          </Fragment>
        </Switch>

      <Footer />
    </Router>
  );
}

export default App;