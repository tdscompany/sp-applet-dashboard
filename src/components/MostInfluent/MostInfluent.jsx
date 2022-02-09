import React from 'react';
import { fetchUserInteraction } from "../../services/requestFunctions";

import './MostInfluent.css'

const MostInfluent = () => {

    React.useEffect(() => {
        fetchUserInteraction()
            .then( user => console.log(user))
    }, [])

    return ( 
    <div>
        
    </div> 
    );
}
 
export default MostInfluent;