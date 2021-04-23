// Functionals import
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components import
import Header from '../Header/Header';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import List from '../List/List';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
// Datas import
import data from '../../assets/data/data.json';

function App() {
  
  // import the array from "data"
  const [people, setPeople] = useState(data);
  console.log(people);

  return (
    <Router>
      <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <main>
            <section className="container">
              <h3>{people.length} birthdays today</h3>
                <List people={people}/>
                {/* here we recup the new state for iterate new array */}
                <button onClick={() => setPeople([])}>
                  clear all
                </button>
            </section>
          </main>
        </Switch>

      <Footer />
    </Router>
  );
}

export default App;