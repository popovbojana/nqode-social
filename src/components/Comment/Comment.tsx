import CommentData from 'src/models/CommentData';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';
import User from 'src/models/User';
import { getUser } from 'src/services/UserService';
import dayjs from 'dayjs';
import classes from './Comment.module.scss';
import Button from '../core/Button/Button';
import CreateComment from '../CreateComment/CreateComment';
import { getUserIdFromToken } from 'src/services/AuthService';

interface CommentProps {
  comment: CommentData;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [user, setUser] = useState<User>();
  const [showReplies, setShowReplies] = useState(false);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const loggedUserId = getUserIdFromToken();
  const [replies, setReplies] = useState<CommentData[]>(comment.replies);

  const toggleShowComments = () => {
    setShowReplies(!showReplies);
  };

  const toggleshowCreateComment = () => {
    setShowCreateComment(!showCreateComment);
  };

  useEffect(() => {
    getUser(comment.userId).then((response) => {
      setUser(response.data);
    });
  }, [comment.userId]);

  return (
    <Card variant='friend-request'>
      <div className={`${classes['c-comment']}`}>
        <div className={`${classes['c-comment__data']}`}>
          <i>@{user?.username}</i>:
          <div className={`${classes['c-comment__text']}`}>{comment.comment}</div>
        </div>
        <div className={`${classes['c-comment__date']}`}>
          <i>{dayjs(comment.commentedAt).format('MMMM D, YYYY HH:mm')}</i>
        </div>
        {replies && replies.length > 0 ? (
          <div className={`${classes['c-comment__buttons']}`}>
            <Button
              label={showReplies ? 'Hide replies' : 'Show all replies'}
              onClick={toggleShowComments}
            />
            {showReplies && (
              <div>
                {replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={`${classes['c-comment__no-replies']}`}>No replies yet.</div>
        )}

        <Button
          label={showCreateComment ? 'Hide reply' : 'Reply'}
          onClick={toggleshowCreateComment}
        />
        {showCreateComment && (
          <CreateComment
            userId={loggedUserId}
            postId={comment.postId}
            parentCommentId={comment.id}
            updateParent={setReplies}
            comments={replies}
          />
        )}
      </div>
    </Card>
  );
};

export default Comment;
