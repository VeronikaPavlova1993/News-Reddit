import * as React from 'react';
import styles from './CardsList.css';
import { Card } from './card/Card';
import { postsContext } from '../context/postsContext';
import { useEffect } from 'react';
import { commentContext } from '../context/commentContext';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ICardProps } from '../../hooks/usePostsData';

export function CardsList() {
  const [nameAuthorComment, setNameAuthorComment] = React.useState('');
  const [idComment, setIdComment] = React.useState('');
  const CommentProvider = commentContext.Provider;
  const token = useSelector<RootState, string>((state) => state.token);
  const [posts, setPosts] = React.useState<ICardProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState('');
  const [nextAfter, setNextAfter] = React.useState('');
  const [loadingPage, setLoadingPage] = React.useState(1);

  const bottomOfList = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function load() {
      setLoading(true);
      setErrorLoading('');

      try {
        const {
          data: {
            data: { after, children },
          },
        } = await axios.get('https://oauth.reddit.com/rising.json', {
          headers: { Authorization: `bearer ${token}` },
          params: {
            limit: 10,
            after: nextAfter,
          },
        });
        setPosts((prevChildren) => prevChildren.concat(...children));
        setNextAfter(after);
        setLoadingPage((prevCount) => prevCount + 1);
      } catch (error) {
        setErrorLoading(String(error));
      }
      setLoading(false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!loading && !errorLoading && loadingPage % 3 !== 0) {
            load();
          }
        }
      },
      {
        rootMargin: '100px',
      }
    );

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current);
    }

    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current);
      }
    };
  }, [
    token,
    bottomOfList.current,
    nextAfter,
    loading,
    loadingPage,
    errorLoading,
  ]);

  const handleLoadNext = () => {
    setLoadingPage(loadingPage + 1);
  };
  return (
    <section className={styles.cardList}>
      <CommentProvider
        value={{
          name: nameAuthorComment,
          onClick: setNameAuthorComment,
          id: idComment,
          onClickId: setIdComment,
        }}
      >
        <postsContext.Provider value={posts}>
          {posts.map((post) => {
            if (
              (posts.length === 0 && !loading && !errorLoading) ||
              post.data === undefined
            ) {
              <div role="alert" style={{ textAlign: 'center' }}>
                Нет ни одного поста
              </div>;
            } else {
              return (
                <Card
                  key={post.data.id}
                  title={post.data.title}
                  author={post.data.author}
                  created={post.data.created}
                  thumbnail={post.data.thumbnail}
                  score={post.data.score}
                  num_comments={post.data.num_comments}
                  id={post.data.id}
                  subreddit={post.data.subreddit}
                />
              );
            }
          })}
          <div ref={bottomOfList} />
          {loading && (
            <div role="alert" style={{ textAlign: 'center' }}>
              Загрузка...
            </div>
          )}
          {errorLoading && (
            <div role="alert" style={{ textAlign: 'center' }}>
              {errorLoading}
            </div>
          )}
          {loadingPage % 3 === 0 && (
            <div style={{ textAlign: 'center' }}>
              <input
                type="button"
                value="Загрузить еще"
                onClick={handleLoadNext}
              />
            </div>
          )}
        </postsContext.Provider>
      </CommentProvider>
    </section>
  );
}
