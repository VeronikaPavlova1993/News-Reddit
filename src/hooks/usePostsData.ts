import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export interface IDataProps {
  key: string;
  title: string;
  id: string;
  created: number;
  author: string;
  thumbnail: string;
  score: number;
  num_comments: number;
  subreddit: string;
}
export interface ICardProps {
  data?: IDataProps;
  kind?: string;
}

export function usePostsData() {
  const [posts, setPosts] = useState<ICardProps[]>([]);
  const token = useSelector<RootState>((state) => state.token);
  useEffect(() => {
    if (!token) return;
    async function load() {
      try {
        const {
          data: {
            data: { children },
          },
        } = await axios.get(
          'https://oauth.reddit.com/best.json?sr_detail=true',
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        setPosts(children);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [token]);
  return [posts];
}
