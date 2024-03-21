import React from 'react';
import { ICardProps, usePostsData } from '../../hooks/usePostsData';

export const postsContext = React.createContext<ICardProps[]>([]);

export function PostsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts] = usePostsData();
  return (
    <postsContext.Provider value={posts}>{children}</postsContext.Provider>
  );
}
