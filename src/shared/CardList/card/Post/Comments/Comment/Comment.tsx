import * as React from 'react';
import styles from './comment.css';
import { KarmaComment } from './KarmaComment/KarmaComment';
import { ShareIcon } from '../../../../../icons/ShareIcon';
import { AnswerIcon } from '../../../../../icons/AnswerIcon';
import { ComplainIcon } from '../../../../../icons/ComplainIcon';
import { displayTime } from '../../../../../../utils/displayTime';
import { ControlledCommentForm } from '../../CommentForm/ControlledCommentForm/ControlledCommentForm';
//import { commentTextState } from '../../../../../state/atoms';
//import { useRecoilState } from 'recoil';
import { commentContext } from '../../../../../context/commentContext';

interface ICommentProps {
  child?: React.ReactNode;
  author: string;
  body: string;
  created: number;
  id: string;
}

export function Comment(props: ICommentProps) {
  const { onClick, id, onClickId } = React.useContext(commentContext);
  return (
    <div className={styles.textContent}>
      <div className={styles.commentData}>
        <KarmaComment />
        <div className={styles.userLink}>
          <img
            className={styles.avatar}
            src="https://demotivation.ru/wp-content/uploads/2021/03/6-Uses-for-a-Professional-Personal-Portrait-Photograph.jpg"
            alt="avatar"
          />
          <a href="#user-name" className={styles.username}>
            {props.author}
          </a>
        </div>
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>Опубликовано </span>
          {displayTime(props.created)}
        </span>
      </div>
      <div className={styles.comment}>
        <p className={styles.postLink}>{props.body}</p>
        <div className={styles.comment_actions}>
          <div
            className={styles.answer_actions}
            onClick={(e) => {
              onClick(props.author);
              e.stopPropagation();
              onClickId(props.id);
            }}
            key={Date()}
          >
            <AnswerIcon />
            <span>Ответить</span>
          </div>
          <div>
            <ShareIcon />
            <span>Поделиться</span>
          </div>
          <div>
            <ComplainIcon />
            <span>Пожаловаться</span>
          </div>
        </div>
        {id === props.id ? (
          <div>
            <ControlledCommentForm />
          </div>
        ) : null}
        {props.child}
      </div>
    </div>
  );
}

/*interface ICommentProps {
  child?: React.ReactNode;
  author: string;
  body: string;
  created: number;
  id: string;
}

export function Comment(props: ICommentProps) {
  //const { onClick, id, onClickId } = React.useContext(commentContext);
  const [id, setId] = useRecoilState(commentTextState);
  return (
    <div className={styles.textContent}>
      <div className={styles.commentData}>
        <KarmaComment />
        <div className={styles.userLink}>
          <img
            className={styles.avatar}
            src="https://demotivation.ru/wp-content/uploads/2021/03/6-Uses-for-a-Professional-Personal-Portrait-Photograph.jpg"
            alt="avatar"
          />
          <a href="#user-name" className={styles.username}>
            {props.author}
          </a>
        </div>
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>Опубликовано </span>
          {displayTime(props.created)}
        </span>
      </div>
      <div className={styles.comment}>
        <p className={styles.postLink}>{props.body}</p>
        <div className={styles.comment_actions}>
          <div
            className={styles.answer_actions}
            onClick={(e) => {
              setId({ id: props.id, name: props.author });
              console.log(id.id);
              console.log(props.id);
              e.stopPropagation();
            }}
            key={Date()}
          >
            <AnswerIcon />
            <span>Ответить</span>
          </div>
          <div>
            <ShareIcon />
            <span>Поделиться</span>
          </div>
          <div>
            <ComplainIcon />
            <span>Пожаловаться</span>
          </div>
        </div>
        {'kraz9nc' === props.id ? (
          <div>
            <ControlledCommentForm />
          </div>
        ) : null}
        {props.child}
      </div>
    </div>
  );
}
*/
