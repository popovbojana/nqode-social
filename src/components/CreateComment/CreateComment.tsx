import { useState } from 'react';
import Button from '../core/Button/Button';
import classes from './CreateComment.module.scss';
import NewComment from 'src/models/NewComment';
import { createComment } from 'src/services/CommentService';
import { toast } from 'react-toastify';
import Message from '../Message/Message';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import CommentData from 'src/models/CommentData';

interface CreateCommentProps {
  userId: number;
  postId: number;
  parentCommentId: number | null;
  updateParent: React.Dispatch<React.SetStateAction<CommentData[]>>;
  comments: CommentData[];
}

const CreateComment: React.FC<CreateCommentProps> = ({
  userId,
  postId,
  parentCommentId,
  updateParent,
  comments
}) => {
  const [newComment, setNewComment] = useState<NewComment>({
    userId: userId,
    comment: '',
    parentCommentId: parentCommentId
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({ ...newComment, comment: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(newComment);
    if (newComment.comment.trim() !== '') {
      createComment(postId, newComment)
        .then((response) => {
          toast.success('Successfully commented!');
          setNewComment({ ...newComment, comment: '' });
          updateParent([...comments, { ...response.data, replies: [] }]);
          setErrorMessage('');
        })
        .catch((error) => {
          if (error.response.status == 400) {
            setErrorMessage(error.response.data.message);
          } else {
            toast.error('Something went wrong!');
          }
        });
    } else {
      setErrorMessage('Comment text is required!');
    }
  };

  return (
    <>
      <form className={`${classes['c-create-comment']}`} onSubmit={handleSubmit}>
        <textarea
          className={`${classes['c-create-comment__textarea']}`}
          placeholder='Leave a comment...'
          value={newComment?.comment}
          onChange={handleInputChange}
        />
        <div className={`${classes['c-create-comment__button']}`}>
          <Button label='Comment' />
        </div>
      </form>
      <Message icon={<ExclamationCircleIcon width={16} height={16} />} message={errorMessage} />
    </>
  );
};

export default CreateComment;
