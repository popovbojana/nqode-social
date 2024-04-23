export default interface NewComment {
  userId: number;
  comment: string;
  parentCommentId: number | null;
}
