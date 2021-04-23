import React, { Fragment } from 'react';

// create a variable for use in a new array
const List = ({people}) => {

  return (
    
    <Fragment>
      {/* here we use the props for recup data from data */}
      {people.map((person) => {
        const {id, name, age, image} = person;
        return <article key={id} className="person">
          <img src={image} alt={name} />
          <div>
            <h4>{name}</h4>
            <p>{age}</p>
          </div>
        </article>
    })}
    </Fragment>
  );
};

export default List;