import React from 'react';
import ChartPAtivas from "../Charts/ChartPAtivas";
import ChartEQuestoes from "../Charts/ChartEQuestoes";
import ChartEDebates from "../Charts/ChartEDebates";
import ChartEDiver from "../Charts/ChartEDiver";

const VerticalCharts = ({ journeyArr }) => {
  return (
    <div className="charts">
        <div className="chartsContent">
                <ChartPAtivas props={journeyArr.map(journey => journey.people_active_count)}/>
                <div className="iconAndText">
                <img src="group.svg" className="iconComp"/>
                <p>Pessoas ativas na jornada</p>
                </div>
        </div>
        <div className="chartsContent">
            <ChartEDebates props={journeyArr.map(journey => parseFloat(
                (journey.agreements_comments_count+journey.reply_comments_count)
                /
                ((journey.parent_comments_count*journey.people_active_count)/2)*100).toFixed(2)
            )} />
            <div className="iconAndText">
                <img src="squareChat.svg" className="iconComp"/>
                <p>Engajamento nos debates</p>
            </div>
        </div>
        <div className="chartsContent">
            <ChartEQuestoes props={journeyArr.map(journey => parseFloat(
                journey.parent_comments_count
                /
                (journey.question_count*journey.people_active_count)*100)
                .toFixed(2)
                )}/>
            <div className="iconAndText">
                <img src="circledQuestion.svg" className="iconComp"/>
                <p>Engajamento nas questões</p>
            </div>
        </div>
        <div className="chartsContent">
            <ChartEDiver props={journeyArr.map(journey => parseFloat( 
                (journey.parent_comments_count
                /
                (journey.question_count*journey.people_active_count))
                +
                (((journey.agreements_comments_count+journey.reply_comments_count)
                /
                ((journey.parent_comments_count*journey.people_active_count)/2))/2)*100).toFixed(2))
            }/>
            <div className="iconAndText">
                <img src="chatBubbles.svg" className="iconComp"/>
                <p>Engajamento nas divergências</p>
            </div>
        </div>
    </div>
  )
};

export default VerticalCharts;