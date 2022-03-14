import React, { useContext, useEffect, useState } from 'react';
import Navbar2 from "../Navbarv2";

import Chart from "../HorizontalCharts/Chart";
import Legend from '../HorizontalCharts/legend';
import Notes from '../Notes/Index';
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { useHistory } from "react-router-dom";
import {fetchUserProjects, fetchMapStatisticsComp} from "../../services/requestFunctions";
import { Select, Box } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import "./index.scss";
import CarouselItem from './Carousel';
import VerticalCharts from './VerticalCharts';
import WindowSize from "../Projetos/WindowSize";

function Comparacao() {

    const [journeys, setJourneys] = useState([]);
    const [listSelectedProject, setListSelectedProject] = useState([]);
    const [journeysList, setJourneysList] = useState([]);
    const history = useHistory();
    const auth = useContext(AuthContext);


    useEffect(() => {
          fetchUserProjects(auth.apiToken).then((data) => {
            const currentJourneys = data.map(dt => (
              dt.projects
            ))            
            setJourneys(...[currentJourneys.flat()])
           });
      }, [auth.apiToken]);

    useEffect(() => {
    
        localStorage.setItem(`projects`, listSelectedProject);
    }, [listSelectedProject]);

    const handleRoute = () =>{ 
        history.push("/Projetos");
    }

    const onSelectProject = async ({ target: { value: selectedProject }}) => {
        let projeto = await fetchMapStatisticsComp(selectedProject)
        setListSelectedProject(listSelectedProject => [...listSelectedProject, projeto.id])
        
        setJourneysList(state =>([...state, projeto]))

    }

    const removeSelection = (id, title) => {
        setListSelectedProject(listSelectedProject.filter(journey => (journey !== id)));
        setJourneysList(journeysList.filter(journey => (journey.title !== title)));
        localStorage.removeItem(`projects`);
        localStorage.setItem(`projects`, listSelectedProject);
    }


    const ListaProjetos = () => {
        return (
            journeys.map((c)=><option value={c.id} id={c.id}>{c.title}</option>)
        );
    }
    const ListaProjetosNome = () => {
        return (
            journeysList.map((c)=>(
                <li key={c.id} className="ulItem">
                    <p  
                    onClick={handleRoute}
                    onMouseEnter={() => localStorage.setItem('id', c.id)}
                    >
                            {c.title.slice(0, 19)}</p>
                    <SmallCloseIcon onClick={() => removeSelection(c.id, c.title)}/>
                </li>
            ))
        );
    }

    return (
    <div className="comparacao">
        <Navbar2 />
            <div className="wrapper">
                <div className="containerTxt">
                    <p><Link to='/'>dashboard</Link> {'>'} comparação avançada</p>
                    <h1>Comparação avançada </h1>
                    <h3>Selecione até 5 jornadas para comprar os índices</h3>
                </div>

                <div className="comparison">
                    <div className="jornadas">
                       <Select className="dropdown" onChange={onSelectProject} disabled={journeysList.length >= 5}> 
                            <option value="default">Jornadas</option>
                            <ListaProjetos />
                        </Select>
                     
                        <div className="wrapperProj">
                            <div>
                                <ul className="listaProjetos2">
                                    <ListaProjetosNome/>
                                </ul>
                            </div>
                        </div>
                </div>
                {!WindowSize(700) ? (
                    <div div className="compProj">
                        <h3 className="titleComp">Comparativo por índice dos projetos</h3>
                        <CarouselItem journeyArr={journeysList}/>  
                    </div>
                ) : (
                    <div div className="compProj">
                        <h3 className="titleComp">Comparativo por índice dos projetos</h3>
                        <VerticalCharts journeyArr={journeysList}/>
                    </div>
                )}
            </div>
            <div className="comp2">
                <Notes selectedProj={listSelectedProject}/>
                <div>
            <div className="balanceProj">
                {
                    journeysList.map((journey, index)=> <Chart
                        key={journey.id}
                        title={journey.title.substring(0, 24)}
                        pac={journey.people_active_count}
                        end={calculateEngAtDeb(
                            journey.people_active_count,
                            journey.parent_comments_count,
                            journey.agreements_comments_count,
                            journey.reply_comments_count
                        )}
                        enq={calculateEngAtQuest(
                            journey.people_active_count,
                            journey.parent_comments_count,
                            journey.question_count
                        )}
                        endi={calculateEngAtDiver(
                            journey.agreements_comments_count,
                            journey.reply_comments_count,
                            journey.parent_comments_count,
                            journey.people_active_count,
                            journey.question_count
                        )}
                    />)
                }

                {journeysList.length > 0 ? <Legend/> : ''}
            </div>

            {journeysList.length > 0 ? <button className="btnPng">Download PNG</button> : ''}
            </div>
        </div>
    </div>
</div>);
}

export default Comparacao;

const calculateEngAtDeb = (
    people_active_count,
    parent_comments_count,
    agreements_comments_count,
    reply_comments_count
    ) => {
        
   return  parseFloat(
    (agreements_comments_count+reply_comments_count)
    /
    ((parent_comments_count*people_active_count)/2)*100).toFixed(2)
}


const calculateEngAtQuest = (
    people_active_count,
    parent_comments_count,
    question_count) => {
        
   return  parseFloat(
    parent_comments_count
    /
    (question_count*people_active_count)*100)
    .toFixed(2)
}

const calculateEngAtDiver = (
    agreements_comments_count,
    reply_comments_count,
    parent_comments_count,
    people_active_count,
    question_count) => {
        
   return  parseFloat( 
    (parent_comments_count
    /
    (question_count*people_active_count))
  +
  (((agreements_comments_count+reply_comments_count)
  /
  ((parent_comments_count*people_active_count)/2))/2)*100).toFixed(2) 
}