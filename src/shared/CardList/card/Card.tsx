import * as React from 'react';
import styles from './card.css';
import { CardPicture } from './CardPicture/CardPicture';
import { CardTextContent } from './CardTextContent/CardTextContent';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';

interface ICardProps {
  title: string;
  author: string;
  created: number;
  thumbnail: string;
  score: number;
  num_comments: number;
  id: string;
  subreddit: string;
}

export function Card({
  title,
  author,
  created,
  thumbnail,
  score,
  num_comments,
  id,
  subreddit,
}: ICardProps) {
  return (
    <div className={styles.card}>
      <CardPicture thumbnail={thumbnail} />
      <CardTextContent
        title={title}
        author={author}
        created={created}
        id={id}
        subreddit={subreddit}
      />
      <ButtonMenu score={score} num_comments={num_comments} />
    </div>
  );
}
