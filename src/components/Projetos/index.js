import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
  } from '@chakra-ui/react'
import Navbar2 from "../Navbarv2";
import ChartJourney1 from '../ChartsJourney/ChartJourney1.js';
import PeopleContainer from '../PeopleList/PeopleContainer.jsx';
import MostInfluent from '../MostInfluent/MostInfluent';
import Comment from '../Comment/Comment';
import { fetchMapById, fetchMapStatistics, fetchProjectById, getAllDivergencePointsByMapId } from "../../services/requestFunctions";
import { ReactComponent as ImageProject } from '../../assets/imgProject.svg'
import printJS from "print-js";
import "./index.scss";
import WindowSize from "./WindowSize";
import IndexTable from "./IndexTable";

function Projetos() {

    function printPage() {
        printJS({
            printable: 'printJS-form',
            type: 'html',
            css: ['./index.css' , '../ChartsJourney/ChartJourney1.css', 
            '../ChartsJourney/chartJourneyHorizontal.css', '../PeopleList/PeopleContainer.css'],
            targetStyles: ['*']
            
        })
    };
    
    //State responsavel por mostrar as visualizações do dropdown
    const [project, setProject] = useState({});
    const [projectStatistics, setProjectStatistics] = useState({});
    const [projectUsers, setProjectUsers] = useState({});
    


    const newDate = new Date(project.created_at);

    useEffect(() => {
        fetchMapById().then((response) => {
          setProject({...response});
          console.log(response)
          if (response && projectStatistics !== '') {
            //   getAllDivergencePointsByMapId().then((response) => {
            // console.log("Retorno getAllDivergencePointsByMapId" , response)
            // });

            fetchMapStatistics().then((response) => setProjectStatistics({...response}))
            }

        });

        fetchProjectById().then((response) => setProjectUsers({...response}));

    }, []);

    // console.log(WindowSize(600));

    return (
        
        <div className="desenvolvedores">
        <Navbar2 />
            <div id="printJS-form">
                <div className="mainWrapper">
                    <div className="textTitle">
                        <p>dashboard {'>'} página de projeto</p>
                    </div>
                    <div className="resumoJornada">
                        <ImageProject className="imgProjetcs"/>
                        <div className="infoP">
                            <h1>{project.title}</h1>
                            <p className="titleP">criada em {newDate.toLocaleDateString()}</p>
                            <p className="titleP">última atividade 2 dias atrás</p>
                        </div>
                    </div>
                    <div className="introData">
                    {!WindowSize(800) ? 
                    (<Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                            <h3>
                                <AccordionButton>
                                        Participantes
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <PeopleContainer props={projectUsers}/>
                            </AccordionPanel>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h3>
                                <AccordionButton>
                                Participantes mais influentes
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <MostInfluent />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h3>
                                <AccordionButton>
                                Comentário com mais interação
                                    <AccordionIcon />
                                </AccordionButton>
                            </h3>
                            <AccordionPanel pb={4}>
                                <Comment />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>) 
                : ''}
                    </div>
                    <div className="dataWrapper">
                        <div className="data">
                            <ChartJourney1 props={projectStatistics} props2={project}/>
                        </div>
                    
                    </div>
                </div>
                {!WindowSize(800) ? '' 
                :
                    (<div className="rightBar">
                        <PeopleContainer props={projectUsers}/>
                        <div className="bestInteractionContainer">
                            <Comment />
                            
                        </div>
                        <button className="btnProj" onClick={printPage}>
                                Baixar relatorio
                        </button>
                    </div>) 
                }
            </div>
            {!WindowSize(800) ? <button className="btnProj" onClick={printPage}>Baixar relatorio</button> : ''} 
            <IndexTable proj={project} projStats={projectStatistics}/>
        </div>
            
       
    );
}

export default Projetos;