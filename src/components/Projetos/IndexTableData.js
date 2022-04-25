import React from 'react';
import { activeParticipants, questionsEngagements, debatesEngagements, divergencesEngagements } from '../ChartsJourney/ChartJourney1'
import { getDatabaseIndexData, writeProjIndex } from '../../services/DatabaseConnection';
import { fetchMapStatisticsHome, fetchMapById} from "../../services/requestFunctions";
import { AuthContext } from "../providers/auth";

const IndexTable = ({projects}) => {
  const auth = React.useContext(AuthContext);
  const data = projects.map(project => getDatabaseIndexData(project.id));
  
  React.useEffect(() => {
    setTimeout(() => {
      putDataToDb();
    }, 2000);
  }, [data]);

  const putDataToDb = () => {
    projects.map(project => {
      
      const databaseData  = getDatabaseIndexData(project.id)
      const dataKeys = Object.keys(databaseData);
      const dataValues = Object.values(databaseData);
      const date = new Date;
      const today = date.toISOString().slice(0, 10);

      fetchMapStatisticsHome(auth.apiToken, project.id)
      .then(res => {
        fetchMapById(project.id).then(proj => {
          const aParticipants = activeParticipants(res.people_active_count, proj.users.length);
          const qEngagements = questionsEngagements(res.parent_comments_count, res.question_count, res.people_active_count);
          const debEngagements = debatesEngagements(res.agreements_comments_count, res.reply_comments_count, res.parent_comments_count, res.people_active_count);
          const divEngagements = divergencesEngagements(res.parent_comments_count, res.question_count, res.people_active_count, res.agreements_comments_count, res.reply_comments_count);
          
          if(!isNaN(aParticipants) && !isNaN(qEngagements) && !isNaN(debEngagements) && !isNaN(divEngagements)) {
            const lastUpdatedIndex = dataValues[dataKeys.length -1];
            const hasSameData = lastUpdatedIndex?.activeParticipants === aParticipants && lastUpdatedIndex?.debatesEngagements === debEngagements && lastUpdatedIndex?.divergencesEngagements === divEngagements && lastUpdatedIndex?.questionsEngagements === qEngagements;
            const includesTodayDate = Object.keys(databaseData).includes(today);
            if(!includesTodayDate && !hasSameData) {
              writeProjIndex(today, aParticipants, qEngagements, debEngagements, divEngagements, project.id);
              console.log('saved!');
            } 
          };
      })
    })
  })
};

function useFetchMapById (projId) {
  
}

  

  // const databaseData  = getDatabaseIndexData(localStorage.getItem('id'))
  // const dataKeys = Object.keys(databaseData);
  // const dataValues = Object.values(databaseData);
  // const date = new Date;
  // const today = date.toISOString().slice(0, 10);
  
  // const aParticipants = activeParticipants(projStats.people_active_count, proj?.users?.length);
  // const qEngagements = questionsEngagements(projStats.parent_comments_count, projStats.question_count, projStats.people_active_count);
  // const debEngagements = debatesEngagements(projStats.agreements_comments_count, projStats.reply_comments_count, projStats.parent_comments_count, projStats.people_active_count);
  // const divEngagements = divergencesEngagements(projStats.parent_comments_count, projStats.question_count, projStats.people_active_count, projStats.agreements_comments_count, projStats.reply_comments_count);

  // React.useEffect(() => {
  //   if(!isNaN(aParticipants) && !isNaN(qEngagements) && !isNaN(debEngagements) && !isNaN(divEngagements)) {

  //     const lastUpdatedIndex = dataValues[dataKeys.length -1];
  //     const hasSameData = lastUpdatedIndex.activeParticipants === aParticipants && lastUpdatedIndex.debatesEngagements === debEngagements && lastUpdatedIndex.divergencesEngagements === divEngagements && lastUpdatedIndex.questionsEngagements === qEngagements;

  //     const includesTodayDate = Object.keys(databaseData).includes(today);

  //     if(!includesTodayDate && !hasSameData) {
  //       writeProjIndex(today, aParticipants, qEngagements, debEngagements, divEngagements, proj.id);
  //       console.log('created!');
  //     };
  //   }
  // }, [aParticipants]);


  return (
    <>
    </>
  )
};

export default IndexTable;