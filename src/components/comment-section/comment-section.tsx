import { Pagination, PaginationRequest } from '@/types';
import { FC, Fragment } from 'react';

type CommentSectionProps = {
  comments: Comment[];
  pagination: Pagination;
  onAddComment: (comment: Comment) => void;
  onPaginationChange: (pagination: PaginationRequest) => void;
};

export const CommentSection: FC<CommentSectionProps> = (props) => {
  const { comments, pagination, onAddComment, onPaginationChange } = props;

  return <Fragment>Hello</Fragment>;
};
