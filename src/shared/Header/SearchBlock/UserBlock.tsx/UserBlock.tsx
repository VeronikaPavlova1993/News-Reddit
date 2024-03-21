import React from 'react';
import styles from './userBlock.css';
import { AnonIcon } from '../../../icons/AnonIcon';

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
}

export function UserBlock({ avatarSrc, username }: IUserBlockProps) {
  return (
    <a
      href="https://www.reddit.com/api/v1/authorize?client_id=Z_aNqxDJXqPDYP2cW5H56A&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity"
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc ? (
          <img src={avatarSrc} alt="user" className={styles.avatarImage} />
        ) : (
          <AnonIcon />
        )}
      </div>
      <div className={styles.username}>
        <div>{username || 'Аноним'}</div>
      </div>
    </a>
  );
}
