import axios from 'axios';
import { useEffect, useState } from 'react';

interface IPostComments {
  id: string;
  subreddit: string;
}

export function usePostComments({ id, subreddit }: IPostComments) {
  const [comments, setComments] = useState();
  useEffect(() => {
    axios
      .get(
        `http://api.reddit.com/r/${subreddit}/comments/${id}/irrelevant_string.json`
      )
      .then((resp) => {
        setComments(resp.data[1].data.children);
      })
      .catch(console.log);
  }, [subreddit, id]);
  return [comments];
}
