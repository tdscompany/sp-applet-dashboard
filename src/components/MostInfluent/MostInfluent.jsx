import React from 'react';
import { fetchUserInteraction } from "../../services/requestFunctions";

import './MostInfluent.css'

const MostInfluent = () => {
    const [users, setUsers] = React.useState([]);
    const [totalAgreements, setTotalAgreements] = React.useState([]);
    const [totalReplies, setTotalReplies] = React.useState([]);
    const [totalAnsweredQuestions, setTotalAnsweredQuestions] = React.useState([]);
    const [mostInfluentUser, setMostInfluentUser] = React.useState({});

    React.useEffect(() => {
        fetchUserInteraction()
            .then( users => {
                
                // setUsers(users)
                if (users.length > 0) {
                    getAllAgreements(users);
                    getAllReplies(users);
                    getAllAnsweredQuestions(users);
                };
                
                const usersMeanInteractions = users.map(user => {
                    const agreementsPercentage = (100 * user.agreements ) / totalAgreements;
                    const repliesPercentage = (100 * user.replies ) / totalReplies;
                    const aQuestionsPercentage = (100 * user.answered_questions ) / totalAnsweredQuestions;
                    const mean = (agreementsPercentage + (repliesPercentage * 2) + aQuestionsPercentage) / 4;
                    return user = ({ mean_interaction: mean.toFixed(2), ...user });
                });
                setUsers(usersMeanInteractions);
            
            });

    }, [])

    React.useEffect(() => {
        setMostInfluentUser(users.sort((a, b) => parseFloat(b.mean_interaction) - parseFloat(a.mean_interaction)) )
    }, [users]);

    const getAllAgreements = data => {
        const tAgreements = data.reduce((acc, user) => {
            const uAgreements = acc + user.agreements;
            return uAgreements
        }, 0);
        setTotalAgreements(tAgreements);
    };

    const getAllReplies = data => {
        const tReplies = data.reduce((acc, user) => {
            const uReplies = acc + user.replies;
            return uReplies
        }, 0);
        setTotalReplies(tReplies);
    };

    const getAllAnsweredQuestions = data => {
        const tAnsweredQuestions = data.reduce((acc, user) => {
            const uAnsweredQuestions = acc + user.answered_questions;
            return uAnsweredQuestions
        }, 0);
        setTotalAnsweredQuestions(tAnsweredQuestions);
    };

    return ( 
        <div className="theBestWrapper">
            <div className="theBest">
            <div className="ball"></div>
                <div className="person-txt-container">
                    <p>{mostInfluentUser[0].name}</p>
                </div>
            </div>
            <div className="theBest">
            <div className="ball"></div>
                <div className="person-txt-container">
                    <p>{mostInfluentUser[1].name}</p>
                </div>
            </div>
            <div className="theBest">
            <div className="ball"></div>
                <div className="person-txt-container">
                    <p>{mostInfluentUser[2].name}</p>
                </div>
            </div>
        </div>
    );
}
 
export default MostInfluent;