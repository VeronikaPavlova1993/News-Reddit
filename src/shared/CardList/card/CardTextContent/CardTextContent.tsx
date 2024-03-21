import * as React from 'react';
import styles from './cardTextContent.css';
import { displayTime } from '../../../../utils/displayTime';
import { Link } from 'react-router-dom';

interface ICardTextProps {
  title: string;
  author: string;
  created: number;
  id: string;
  subreddit?: string;
}
export function CardTextContent({
  title,
  author,
  created,
  id,
  subreddit,
}: ICardTextProps) {
  //const [isModalPostOpen, setIsModalPostOpen] = React.useState(false);
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <div className={styles.userLink}>
          <img
            className={styles.avatar}
            src="https://demotivation.ru/wp-content/uploads/2021/03/6-Uses-for-a-Professional-Personal-Portrait-Photograph.jpg"
            alt="avatar"
          />
          <a href="#user-name" className={styles.username}>
            {author}
          </a>
        </div>
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>Опубликовано </span>
          {displayTime(created)}
        </span>
      </div>
      <h2 className={styles.title}>
        <Link to={`/posts/${subreddit}/${id}`} className={styles.postLink}>
          {title}
        </Link>
      </h2>
    </div>
  );
}
