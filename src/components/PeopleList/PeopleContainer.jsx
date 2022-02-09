import React, {useState, useEffect} from 'react';
import ButtonPeople from './ButtonPeople';
import { BiSearch } from 'react-icons/bi';
import People from './People.jsx'
import {fetchProjectById, fetchUserInteraction} from "../../services/requestFunctions";

import "./PeopleContainer.css";

const PeopleContainer = () => {

    //State responsavel por popular a lista de usuarios no projeto
    
    const [busca, setBusca] = useState('');
    const [people, setPeople] = useState([
        {
            id: "1",
            name: "Rafael Varela",
            position: "Mentor",
        },
        {
            id: "2",
            name: "é muito limpeza",
            position: "Mentor",
        }
    ]);

    // console.log(busca)

    useEffect(() => {
        fetchProjectById().then((users) =>{
            if(users) {
                const usersList = users.users
                console.log(usersList[0])
                fetchUserInteraction(usersList[0].id)
                    .then( user => console.log(user));

                setPeople(usersList)
            }
        })
        
        
    
    }, []);

    // useEffect(() => {
    //     console.log(people[0].id)
    //     fetchUserInteraction(people[0].id)
    //         .then( user => console.log(user));
        
    // }, [people])

    return ( 
        <div className="people-container">
            <div className="search-person">
                <input 
                   className="search-person-input"
                    defaultValue="Buscar"
                    type="text"                     
                    onChange={(event) => setBusca(event.target.value)}
                    value={busca}
            />
                    <ButtonPeople className="people-button"><BiSearch/></ButtonPeople>
            </div>
            <div className="PeopleListBox">
                <People people={people}/>
            </div>
        </div>
     );
}
 
export default PeopleContainer;