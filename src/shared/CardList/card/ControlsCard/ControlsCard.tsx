import * as React from 'react';
import styles from './controlsCard.css';
import { CommentCard } from './CommentCard/CommentCard';
import { generateId } from '../../../../utils/generateRandomIndex';
import { GenericList } from '../../../GenericList/GenericList';
import { merge } from '../../../../utils/merge';
import { ShareCard } from './ShareCard/ShareCard';
import { HideCard } from './HideCard/HideCard';
import { SaveCard } from './SaveCard/SaveCard';
import { ComplainCard } from './ComplainCard/ComplainCard';

enum ControlsName {
  Comment = 'Комментарии',
  Share = 'Поделиться',
  Hide = 'Скрыть',
  Save = 'Сохранить',
  Complain = 'Пожаловаться',
  Close = 'Закрыть',
}

let comments: number = 0;

interface IMenuPostId {
  postId: string;
  num_comments: number;
}

const CONTROLS = [
  {
    As: 'div' as const,
    text: `${ControlsName.Comment}`,
    className: styles.iconComment,
    children: <CommentCard num_comments={comments} />,
    className2: styles.titleComment,
  },
  {
    As: 'div' as const,
    text: `${ControlsName.Share}`,
    className: styles.itemShare,
    children: <ShareCard />,
  },
  {
    As: 'div' as const,
    text: `${ControlsName.Hide}`,
    className: styles.iconHide,
    children: <HideCard />,
  },
  {
    As: 'div' as const,
    text: `${ControlsName.Save}`,
    className: styles.iconSave,
    children: <SaveCard />,
  },
  {
    As: 'div' as const,
    text: `${ControlsName.Complain}`,
    children: <ComplainCard />,
    className: styles.iconComplain,
  },
  {
    As: 'div' as const,
    text: `${ControlsName.Close}`,
    className: styles.dropdown_close,
  },
].map(generateId);

export function ControlsCard({ postId, num_comments }: IMenuPostId) {
  comments = num_comments;
  const [list, setList] = React.useState(CONTROLS);

  const handleItemClick = (id: string) => {
    setList(list.filter((item) => item.id !== id));
    console.log(postId);
  };

  return (
    <div className={styles.controls}>
      <GenericList list={list.map(merge({ onClick: handleItemClick }))} />
    </div>
  );
}
