export default interface CommentData {
  id: number;
  postId: number;
  userId: number;
  comment: string;
  commentedAt: string;
  replies: CommentData[];
  parentCommentId: number;
}
