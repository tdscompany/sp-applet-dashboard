import React from 'react';
import { useHistory } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const JourneyPagesList = ( {projects}) => {
  const history = useHistory();
  const handleRoute = () =>{ 
    history.push("/Projetos");
  }

  return (
    <div className="contentSection">
      <h3>Páginas das jornadas</h3>
      <ul className="listaProjetos"  onClick={e => e.target.value}> 
        {projects.map( (project) =>
        <li key={project.id} onMouseEnter={() => localStorage.setItem('id', project.id)} className="ulItem"  onClick={handleRoute}>
          <p>{project.title.length <= 18 ?  project.title : project.title.slice(0, 18) + '...'} </p>
            <IoIosArrowForward/>
        </li>    
      )}
      </ul>
    </div>
  )
};

export default JourneyPagesList;