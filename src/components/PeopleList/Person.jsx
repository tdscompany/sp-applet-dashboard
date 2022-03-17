import React from 'react'

import "./Person.css";

const Person = ({person , roles, index}) => {
    return (

        <div className="theBest">
            <p>{index}º</p>
            <div className="ball"></div>
            <div className="person-txt-container">
            <p className="person-name"> {person.name} </p>
                <p className="person-position"> {roles} </p>
            </div>
        </div>
    );
}
 
export default Person;