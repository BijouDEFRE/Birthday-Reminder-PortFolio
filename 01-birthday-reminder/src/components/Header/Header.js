// Functionals import
import React from 'react';
// Esthetics import
import Cake from '../../assets/images/Cake.png';
import './header.css';
import '../../assets/index.css';

const Header = () => {
    return (
        <header>
            <div className="header-container">
            <h1 className="header-container"><a href="/">Birthday Reminder</a></h1>
            </div>
        </header>
    )
}

export default Header;