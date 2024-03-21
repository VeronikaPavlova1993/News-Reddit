import * as React from 'react';
import styles from './buttonMenu.css';
import { Dropdown } from '../../../Dropdown/Dropdown';
import { ControlsCard } from '../ControlsCard/ControlsCard';
import { ActionsCard } from '../ControlsCard/ActionCard/ActionsCard';
import { KarmaCounter } from '../ControlsCard/KarmaCounter/KarmaCounter';
import { MenuIcon } from '../../../icons/MenuIcon';
interface ICardButtonProps {
  score: number;
  num_comments: number;
}

export function ButtonMenu({ score, num_comments }: ICardButtonProps) {
  return (
    <div className={styles.menu}>
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <MenuIcon />
          </button>
        }
      >
        <ControlsCard postId="12234" num_comments={num_comments} />
      </Dropdown>
      <KarmaCounter score={score} />
      <ActionsCard num_comments={num_comments} />
    </div>
  );
}
