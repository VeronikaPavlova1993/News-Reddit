import React from 'react';
import { Comment } from '../shared/CardList/card/Post/Comments/Comment/Comment';

export interface ICommentsData {
  data: {
    author: string;
    children?: string[];
    body: string;
    created: number;
    id: string;
    replies: '' | IRepliesData;
  };
}
export interface IRepliesData {
  data: {
    children?: ICommentsData[];
  };
}
export const renderComments = (data: ICommentsData) => {
  if (!data || !data.data.replies || !data.data.replies.data.children) {
    return null;
  } else {
    if (
      typeof data.data.replies === 'string' ||
      typeof data.data.replies !== 'object'
    ) {
      return (
        <Comment
          author={data.data.author}
          body={data.data.body}
          created={data.data.created}
          key={data.data.created}
          id={data.data.id}
        />
      );
    } else {
      return (
        <Comment
          author={data.data.author}
          body={data.data.body}
          created={data.data.created}
          key={data.data.created}
          id={data.data.id}
          child={(data.data.replies.data.children as Array<ICommentsData>).map(
            (item) => renderComments(item)
          )}
        />
      );
    }
  }
};
