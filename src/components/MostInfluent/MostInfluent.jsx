import React from 'react';
import { fetchUserInteraction } from "../../services/requestFunctions";
import Person from '../PeopleList/Person.jsx'

import './MostInfluent.css'

const MostInfluent = ({filList}) => {
    const [users, setUsers] = React.useState([]);
    const [usersMean, setUsersMean] = React.useState([]);
    const [mostInfluentUsers, setMostInfluentUsers] = React.useState([]);
    const [totalAgreements, setTotalAgreements] = React.useState();
    const [totalComments, setTotalComments] = React.useState();
    const [totalAnsweredQuestions, setTotalAnsweredQuestions] = React.useState();

    React.useEffect(() => {
        fetchUserInteraction()
            .then( data => {
                setUsers(data);
            });
    }, []);
                
    React.useEffect(() => {
        getAllAgreements(users);
        getAllComments(users);
        getAllAnsweredQuestions(users);

        const usersMeanInteractions =  users.map(user => {
            const agreementsPercentage = getMean(user.agreements_comments_count, totalAgreements);
            const repliesPercentage = getMean(user.total_comments_count, totalComments);
            const aQuestionsPercentage = getMean(user.answered_questions_count, totalAnsweredQuestions);
            const mean = (agreementsPercentage + (repliesPercentage * 3) + aQuestionsPercentage) / 5;
            return user = ({ mean_interaction: mean, ...user });
        });
        
        setUsersMean(usersMeanInteractions);
        
    }, [users, totalAgreements, totalComments, totalAnsweredQuestions]);

    React.useEffect(() => {
        setMostInfluentUsers(usersMean.sort((a, b) => b.mean_interaction - a.mean_interaction));
    }, [usersMean]);

    const getAllAgreements = data => {
        const tAgreements = data.reduce((acc, user) => {
            const uAgreements = acc + user.agreements_comments_count;
            return uAgreements
        }, 0);
        setTotalAgreements(tAgreements);
    };

    const getAllComments = data => {
        const tReplies = data.reduce((acc, user) => {
            const uReplies = acc + user.total_comments_count;
            return uReplies
        }, 0);
        setTotalComments(tReplies);
    };

    const getAllAnsweredQuestions = data => {
        const tAnsweredQuestions = data.reduce((acc, user) => {
            const uAnsweredQuestions = acc + user.answered_questions_count;
            return uAnsweredQuestions
        }, 0);
        setTotalAnsweredQuestions(tAnsweredQuestions);
    };

    const getMean = (partial, total) => (100 * partial) / total;

    return ( 
        <>
            {(filList?.length === mostInfluentUsers?.length ? mostInfluentUsers : filList).map((person, index) => (
            <Person key={person.id} index={index + 1} person={person} />
            ))}
        </>
    );
}
 
export default MostInfluent;