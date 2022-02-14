import React from 'react';
import { fetchUserInteraction } from "../../services/requestFunctions";

import './MostInfluent.css'

const MostInfluent = () => {
    const [users, setUsers] = React.useState([]);
    const [usersMean, setUsersMean] = React.useState([]);
    const [mostInfluentUsers, setMostInfluentUsers] = React.useState([]);
    const [totalAgreements, setTotalAgreements] = React.useState();
    const [totalReplies, setTotalReplies] = React.useState();
    const [totalAnsweredQuestions, setTotalAnsweredQuestions] = React.useState();

    React.useEffect(() => {
        fetchUserInteraction()
            .then( data => setUsers(data));

        
    }, []);
                
    React.useEffect(() => {
        getAllAgreements(users);
        getAllReplies(users);
        getAllAnsweredQuestions(users);

        const usersMeanInteractions =  users.map(user => {
            const agreementsPercentage = getMean(user.agreements, totalAgreements);
            const repliesPercentage = getMean(user.replies, totalReplies);
            const aQuestionsPercentage = getMean(user.answered_questions, totalAnsweredQuestions);
            const mean = (agreementsPercentage + (repliesPercentage * 3) + aQuestionsPercentage) / 5;
            return user = ({ mean_interaction: mean, ...user });
        });
        
        setUsersMean(usersMeanInteractions);
        
    }, [users, totalAgreements, totalReplies, totalAnsweredQuestions]);

    React.useEffect(() => {
        setMostInfluentUsers(usersMean.sort((a, b) => b.mean_interaction - a.mean_interaction));
    }, [usersMean]);

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

    const getMean = (partial, total) => (100 * partial) / total;

    return ( 
        <div className="theBestWrapper">
            <div className="theBest">
                <div className="ball"></div>
                <div className="person-txt-container">
                    <p>{ mostInfluentUsers.length > 0 ? mostInfluentUsers[0].name : ''}</p>
                </div>
            </div>
            <div className="theBest">
                <div className="ball"></div>
                    <div className="person-txt-container">
                        <p>{ mostInfluentUsers.length > 0 ? mostInfluentUsers[1].name : ''}</p>
                    </div>
                </div>
                <div className="theBest">
                    <div className="ball"></div>
                <div className="person-txt-container">
                <p>{ mostInfluentUsers.length > 0 ? mostInfluentUsers[2].name : ''}</p>
            </div>
            </div>
        </div>
    );
}
 
export default MostInfluent;