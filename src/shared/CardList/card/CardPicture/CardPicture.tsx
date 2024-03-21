import * as React from 'react';
import styles from './cardPicture.css';

interface ICardPictureProps {
  thumbnail: string;
}

export function CardPicture({ thumbnail }: ICardPictureProps) {
  return (
    <div className={styles.cardPicture}>
      <img className={styles.picture} src={thumbnail} alt="picture post"></img>
    </div>
  );
}
