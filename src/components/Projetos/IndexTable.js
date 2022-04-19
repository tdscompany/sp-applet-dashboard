import React from 'react';
import { activeParticipants, questionsEngagements, debatesEngagements, divergencesEngagements } from '../ChartsJourney/ChartJourney1'
import { getDatabaseIndexData, writeProjIndex } from '../../services/DatabaseConnection';
import LineChart from './LineChart';

const IndexTable = ({projStats, proj}) => {

  const databaseData  = getDatabaseIndexData(localStorage.getItem('id'))
  const date = new Date;
  const today = date.toISOString().slice(0, 10);
  
  const aParticipants = activeParticipants(projStats.people_active_count, proj?.users?.length);
  const qEngagements = questionsEngagements(projStats.parent_comments_count, projStats.question_count, projStats.people_active_count);
  const debEngagements = debatesEngagements(projStats.agreements_comments_count, projStats.reply_comments_count, projStats.parent_comments_count, projStats.people_active_count);
  const divEngagements = divergencesEngagements(projStats.parent_comments_count, projStats.question_count, projStats.people_active_count, projStats.agreements_comments_count, projStats.reply_comments_count);

  React.useEffect(() => {
    console.log('entrou?')
    // console.log(aParticipants, qEngagements, debEngagements, divEngagements)
    if(!isNaN(aParticipants) && !isNaN(qEngagements) && !isNaN(debEngagements) && !isNaN(divEngagements)) {
      if(Object.entries(databaseData).length === 0) {
        writeProjIndex(today, aParticipants, qEngagements, debEngagements, divEngagements, proj.id);
        console.log('criou')
      } else if (Object.keys(databaseData).includes(today)){
          console.log('ja tem essa data')
      } else {
        writeProjIndex(today, aParticipants, qEngagements, debEngagements, divEngagements, proj.id);
        console.log('pushed')
      }
    }
  }, [aParticipants]);


  return (
    <>
    </>
  )
};

export default IndexTable;