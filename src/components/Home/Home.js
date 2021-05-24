// Functionals import
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

import '../Home/home.css';

import Cake from '../../assets/images/Cake.png';

const Home = () => {

      return (
            <article className="homePage">
                  <div>
                        {/* <h1 className="homePage_title">Birthday Reminder</h1> */}
                        <img src={Cake} alt="cake" />
                        <Link to="/signup">
                              <Button>Inscription</Button>
                        </Link>
                        <Link to="/login">
                              <Button>Connexion</Button>
                        </Link>
                  </div>
            </article>
      );
    };

export default Home;