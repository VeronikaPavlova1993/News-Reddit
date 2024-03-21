import React from 'react';

interface ICommentContext {
  name: string;
  onClick: (name: string) => void;
  id: string;
  onClickId: (id: string) => void;
}
export const commentContext = React.createContext<ICommentContext>({
  name: '',
  onClick: () => {},
  id: '',
  onClickId: () => {},
});
