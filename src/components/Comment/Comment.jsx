import React from 'react';
import { getDivergencePointEngagement, getCommentsGroupedByQuestionReport } from "../../services/requestFunctions";

const Comment = () => {
    const [commentsByQuestions, setCommentsByQuestions] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    const [totalLikes, setTotalLikes] = React.useState();
    const [totalReplies, setTotalReplies] = React.useState();
    const [commentsMean, setCommentsMean] = React.useState([]);
    const [mostInteractedComment, setMostInteractedComment] = React.useState([]);


    React.useEffect(() => {
        getDivergencePointEngagement()
            .then( data => {
                data.map(point => {
                    setCommentsByQuestions([]);
                    getCommentsGroupedByQuestionReport(point.id)
                        .then(data => { 
                            data.map(cmmts => setCommentsByQuestions( commentsByQuestions => [...commentsByQuestions, cmmts]))
                            });
                });
            });
    }, []);

    React.useEffect(() => {
        setComments([]);
        commentsByQuestions.map(data => {
            data.comments
            .map(comment => setComments( comments => [...comments, comment]));
        });
    }, [commentsByQuestions]);

    React.useEffect(() => {

        getAllLikes(comments);
        getAllReplies(comments);
        
        const commentsMeanInteractions =  comments.map(comment => {
            const agreementsPercentage = getMean(comment.agreements.length, totalLikes);
            const repliesPercentage = getMean(comment.replies.length, totalReplies);
            const mean = (agreementsPercentage + repliesPercentage) / 5;
            return comment = ({ mean_interaction: mean, ...comment });
        });

        setCommentsMean(commentsMeanInteractions);
        
    }, [comments, totalLikes, totalReplies]);

    React.useEffect(() => {
        setMostInteractedComment(commentsMean.sort((a, b) => b.mean_interaction - a.mean_interaction));
    }, [commentsMean]);

    React.useEffect(() => {
    }, [mostInteractedComment]);


    const getAllLikes = data => {
        const tLikes = data.reduce((acc, comment) => {
            const cLikes = acc + comment.agreements.length;
            return cLikes
        }, 0);
        setTotalLikes(tLikes);
    };
    
    const getAllReplies = data => {
        const tReplies = data.reduce((acc, comment) => {
            const cReplies = acc + comment.replies.length;
            return cReplies;
        }, 0);
        setTotalReplies(tReplies);
    };

    const getMean = (partial, total) => (100 * partial) / total;

  return (
    <div>
        <h3 className="bICTitle">Comentário com mais interações</h3>
        <p className="bICText">{mostInteractedComment.length > 0 ? mostInteractedComment[0].text : 'Sem comentários'}</p>
    </div>
  )
};

export default Comment;