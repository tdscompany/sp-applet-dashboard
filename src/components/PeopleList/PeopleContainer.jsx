import React, {useState, useEffect} from 'react';
import { Input ,InputGroup, InputRightElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import MostInfluent from '../MostInfluent/MostInfluent'
import { fetchProjectById } from "../../services/requestFunctions";
import Person from './Person';

import "./PeopleContainer.css";


const PeopleContainer = () => {

    const [searchValue, setSearchValue] = useState('');
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetchProjectById().then((users) =>{
            if(users) {
                const usersList = users.users
                setPeople(usersList)
            }
        })
    }, []);

    const inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearchValue(lowerCase);
    };

    const filteredPeopleList = people.filter(el => {
        return el.name.toLowerCase().includes(searchValue);
    });
    
    

    return ( 
        <div className="people-container">
            <div className="search-person">
                <InputGroup>
                    <Input
                        className="search-person-input"
                        type='text'
                        placeholder='Buscar'
                        // value={searchValue}
                        onChange={inputHandler}
                        
                        
                    />
                    <InputRightElement
                    pointerEvents='none'
                    children={<Search2Icon color='#545151' />}
                    />
                </InputGroup>
            </div>
            <p className='members-length'>{people.length} membros</p>
            <div className="PeopleListBox">
                {searchValue ? filteredPeopleList.map((person, index) => (
                <Person key={person.id} index={index + 1} person={person} />
            )) : <MostInfluent/>}
            </div>
        </div>
     );
}
 
export default PeopleContainer;