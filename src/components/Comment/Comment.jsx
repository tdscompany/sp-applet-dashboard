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
        // if (comments.length > 0) {
        //     const mostLikedLikes = comments.reduce((acc, value) => {
        //         const moreLiked = acc.agreements.length > value.agreements.length;
        //         const liked = moreLiked ? acc = acc : acc = value;
        //         console.log(value.replies.length)
        //         return liked;
        //     });

        //     const mostLiked = comments.filter(comment => comment.agreements.length === mostLikedLikes.agreements.length);
        //     setLiked(mostLiked)
        // }
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
        // console.log(' total likes: ' + tLikes);
        setTotalLikes(tLikes);
    };
    
    const getAllReplies = data => {
        const tReplies = data.reduce((acc, comment, index) => {
            const cReplies = acc + comment.replies.length;
            return cReplies;
        }, 0);
        // console.log(' total replies: ' + tReplies);
        setTotalReplies(tReplies);
    };

    const getMean = (partial, total) => (100 * partial) / total;

  return (
    <div>
        <h3 className="bICTitle">Comentários com mais interações</h3>
        {/* <p className="bICText">comentário bem longo que foi escrito na strateegia,
            porque eu preciso de uma exemplo para os comentários
            com mais concordos do rolê
        </p> */}
        <p className="bICText">{mostInteractedComment.length > 0 ? mostInteractedComment[0].text : ''}</p>
    </div>
  )
};

export default Comment;