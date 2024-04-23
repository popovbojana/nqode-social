import CommentData from './CommentData';

export default interface PostData {
  id: number;
  userId: number;
  description: string;
  file: string;
  postedAt: string;
  comments: CommentData[];
}
