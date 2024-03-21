import * as React from 'react';
import styles from './commentCard.css';
import { CommentIcon } from '../../../../icons/CommentIcom';

interface ICommentsCardProps {
  num_comments: number;
}

export function CommentCard({ num_comments }: ICommentsCardProps) {
  return (
    <button className={styles.commentsButton}>
      <CommentIcon />
      <span className={styles.commentsNumber}>{num_comments}</span>
    </button>
  );
}
