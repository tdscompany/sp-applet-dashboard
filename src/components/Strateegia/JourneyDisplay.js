import React from 'react'

const JourneyDisplay = ({ projectStatistics }) => {
    
  return (
        <div className="comp1">
            <div className="horizontalDisplay">
                <h2 className="compTitle">{projectStatistics.title || "Jornada 1"}</h2>
                <div className="element">
                    <img src="group.svg" className="iconComp" alt="icon"/>
                    <h3 className="h3Comp">{projectStatistics.people_active_count || "0"}</h3>
                </div>
                <div className="elementPA">
                    <p>Pessoas ativas na jornada</p>
                </div>
                <div className="element">
                    <img src="circledQuestion.svg" className="iconComp" alt="icon"/>
                    <h3 className="h3Comp">{ projectStatistics.parent_comments_count?
                    parseFloat(
                        projectStatistics.parent_comments_count
                        /
                        (projectStatistics.question_count*projectStatistics.people_active_count)*100)
                    .toFixed(2) :"0"}%
                    </h3>
                </div>
                <div className="elementP">
                    <p>Engajamento nas questões</p>
                </div>
                <div className="element">
                    <img src="squareChat.svg" className="iconComp" alt="icon"/>
                    <h3 className="h3Comp">{ projectStatistics.parent_comments_count?
                    parseFloat( 
                        (projectStatistics.parent_comments_count
                        /
                        (projectStatistics.question_count*projectStatistics.people_active_count))
                        +
                        (((projectStatistics.agreements_comments_count+projectStatistics.reply_comments_count)
                        /
                        ((projectStatistics.parent_comments_count*projectStatistics.people_active_count)/2))/2)*100).toFixed(2) :"0"}%
                    </h3>
                </div>
                <div className="elementP">
                    <p>Engajamento nas divergências</p>
                </div>
                <div className="element">
                    <img src="chatBubbles.svg" className="iconComp" alt="icon"/>
                    <h3 className="h3Comp">{projectStatistics.parent_comments_count?
                    parseFloat(
                        (projectStatistics.agreements_comments_count+projectStatistics.reply_comments_count)
                        /
                        ((projectStatistics.parent_comments_count*projectStatistics.people_active_count)/2)*100).toFixed(2):"0"
                        }%
                    </h3>
                </div>
                <div className="elementP">
                    <p>Engajamento nos debates</p>
                </div>
            </div>
        </div>
    
  )
}

export default JourneyDisplay