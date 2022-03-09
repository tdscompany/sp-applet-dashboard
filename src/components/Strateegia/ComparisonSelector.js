import React from 'react';
import { fetchMapStatisticsHome } from "../../services/requestFunctions";
import {Link} from "react-router-dom";
import { Select } from '@chakra-ui/react'
import { AuthContext } from "../providers/auth";
import JourneyDisplay from './JourneyDisplay';

const ComparisonSelector = ({ projects }) => {
    const [projectStatistics1, setProjectStatistics1] = React.useState("");
    const [projectStatistics2, setProjectStatistics2] = React.useState("");
    const [id1, setId1] = React.useState("");
    const [id2, setId2] = React.useState("");
    const auth = React.useContext(AuthContext);
    

    const handleSelect = () => {
        fetchMapStatisticsHome(auth.apiToken, id1).then((response) => setProjectStatistics1(response));
        fetchMapStatisticsHome(auth.apiToken, id2).then((response2) => setProjectStatistics2(response2));
    }
      

    const listaProjetosDropdown = projects.map( project =><option key={project.id} value={project.id}>{project.title}</option>);
          
  return (
    <div className="comparacao">
        <div className="containerLeft">
            <div className="comp0">
                <h3>Comparação rápida  de índices</h3>
                <p className="pTextTela2">Selecione duas jornadas para comparar seus índices  </p>
                <h3 className="journey">Jornada 1</h3>
                <Select className="dropdown" onChange={e => setId1(e.target.value)}>
                    <option>Selecione</option>
                    {listaProjetosDropdown}
                </Select>
                <h3 className="journey">Jornada 2</h3>
                    <Select className="dropdown" onChange={e => setId2(e.target.value)}>
                    <option>Selecione</option>
                    {listaProjetosDropdown}
                    </Select>
                <div>
                    <button className="btnComp" onClick={handleSelect}>Comparar</button>
                </div>
                <Link to='/Comparacao'>ir para comparação avançada</Link>
            </div>
            <JourneyDisplay projectStatistics={projectStatistics1}/>
            <JourneyDisplay projectStatistics={projectStatistics2}/>
        </div>
    </div>
  )
};

export default ComparisonSelector;