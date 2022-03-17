import React, {useState, useEffect} from 'react';
import { Input ,InputGroup, InputRightElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import MostInfluent from '../MostInfluent/MostInfluent'
import { fetchProjectById } from "../../services/requestFunctions";

import "./PeopleContainer.css";


const PeopleContainer = () => {

    const [searchValue, setSearchValue] = useState('');
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

    useEffect(() => {
        fetchProjectById().then((users) =>{
            if(users) {
                const usersList = users.users
                setPeople(usersList)
            }
        })
    }, []);
    console.log(people)

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
                <MostInfluent filList={filteredPeopleList}/>
            </div>
        </div>
     );
}
 
export default PeopleContainer;