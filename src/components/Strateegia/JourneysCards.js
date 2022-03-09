import React from 'react';
import { getSummaryProjectsByUser } from "../../services/requestFunctions";

const JourneysCards = () => {

    const [projectsDataSummary, setProjectsDataSummary] = React.useState({});

    React.useEffect(() => {
        getSummaryProjectsByUser().then((response) => {
            if (response) setProjectsDataSummary(response.content); 
        });
      }, []);

    const getSummaryByRole = (role) => {
        if (projectsDataSummary.length > 0) {
            const summary = projectsDataSummary.filter(obj =>  obj.my_member_info.project_roles[0] === role);
            return summary.length
        }
    };

  return (
    <div className="wrapperBoxes">
        <article className="box1">
            <div className="textBox1">
                <div className="title1">
                    <h1>{getSummaryByRole('ADMIN')}</h1>
                </div>
                <div className="subtitle1">
                    <p>Jornadas que administro</p>
                </div>
            </div>
            </article>
            <article className="box1">
            <div className="textBox2">
                <div className="title2">
                    <h1>{getSummaryByRole('MENTOR')}</h1>  
                </div>
                <div className="subtitle2"><p>Jornadas que sou mentor</p></div>
            </div>
            </article>
            <article className="box1">
            <div className="textBox3">
                <div className="title3">
                    <h1>{getSummaryByRole('INNOVATOR')}</h1>
                </div>
                <div className="subtitle3"><p>{('Jornadas em que participo')}</p></div>
            </div>
        </article>
      </div>
  )
};

export default JourneysCards;