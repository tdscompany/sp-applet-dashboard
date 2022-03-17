import React from 'react';
import { activeParticipants, questionsEngagements, debatesEngagements, divergencesEngagements } from '../ChartsJourney/ChartJourney1'
import { getDatabaseIndexData, writeProjIndex } from '../../services/DatabaseConnection'
// props={projectStatistics} props2={project}
const IndexTable = ({projStats, proj}) => {

    const databaseData  = getDatabaseIndexData();
    console.log(!databaseData)
    const date = new Date;
    const today = date.toISOString().slice(0, 10);

    const aParticipants = activeParticipants(projStats.people_active_count, proj?.users?.length);
    const qEngagements = questionsEngagements(projStats.parent_comments_count, projStats.question_count, projStats.people_active_count);
    const debEngagements = debatesEngagements(projStats.agreements_comments_count, projStats.reply_comments_count, projStats.parent_comments_count, projStats.people_active_count);
    const divEngagements = divergencesEngagements(projStats.parent_comments_count, projStats.question_count, projStats.people_active_count, projStats.agreements_comments_count, projStats.reply_comments_count);

    React.useEffect(() => {
        if(databaseData === false) {
            writeProjIndex(today, aParticipants, qEngagements, debEngagements, divEngagements)
        } else {
            console.log('babou')
        }
    }, []);

  return (
    <div>
    </div>
  )
};

export default IndexTable;