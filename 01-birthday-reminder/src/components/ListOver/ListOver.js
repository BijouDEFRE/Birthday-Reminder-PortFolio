// Functionals import
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import List from '../List/List';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
// Datas import
import data from '../../assets/data/data.json';


function ListOver() {
    // import the array from "data"
    const [people, setPeople] = useState(data);
    console.log(people);

    return (
        <main>
                <div className="container">
                <h3>{people.length} birthdays today</h3>
                    {/* <Logout/> */}
                    <List people={people}/>
                    {/* here we recup the new state for iterate new array */}
                    <Button onClick={() => setPeople([])}>
                    clear all
                    </Button>
                </div>
            </main>

    )
}

export default ListOver;
      