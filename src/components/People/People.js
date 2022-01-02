import React, { Fragment } from 'react';

const People = ({ people }) => {
    return (
        <Fragment>
            {people.map((person) => {
              const { id, name, age, birthdate, image } = person;
              return (
                <article key={id} className='person'>
                  <img src={image} alt={name} />
                  <div>
                    <h4>{name}</h4>
                    <p>{age} years</p>
                    <p>{birthdate}</p>
                  </div>
                </article>
              );
            })}
        </Fragment>
    );
  };

export default People;
