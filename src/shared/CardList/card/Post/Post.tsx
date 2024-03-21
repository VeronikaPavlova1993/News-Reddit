import * as React from 'react';
import styles from './post.css';
import ReactDOM from 'react-dom';
import { usePostComments } from '../../../../hooks/usePostComments';
import {
  ICommentsData,
  renderComments,
} from '../../../../utils/renderComments';
import {
  EasyPeasyCommentForm,
  store,
} from './CommentForm/UncontrolledCommentForm/EasyPeasyCommentForm';
import { useHistory, useParams } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';

export interface IComment {
  data: { author: string; body: string; created: number };
}

export function Post() {
  const { id, subreddit } = useParams<{
    id: string;
    subreddit: string;
  }>();
  const [comments]: ICommentsData[] | undefined[] = usePostComments({
    id: id,
    subreddit: subreddit,
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const history = useHistory();
  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        history.push('/posts');
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const node = document.querySelector('#modal_root');
  if (!node) return null;
  if (!comments) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      <h2> Whether it is breaking news</h2>
      <div className={styles.content}>
        <p>
          Whether it is breaking news, investigative journalism, or feature
          stories, well-written news articles have the power to inform, educate,
          and entertain readers.
        </p>
        <p>
          In today is digital age, where information is readily available, the
          ability to craft compelling news stories is more valuable than ever.
        </p>
      </div>
      <StoreProvider store={store}>
        <EasyPeasyCommentForm />
      </StoreProvider>
      {(comments as Array<ICommentsData>).map((comment) =>
        renderComments(comment)
      )}
    </div>,
    node
  );
}
