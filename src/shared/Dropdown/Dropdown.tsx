import React, { useState } from 'react';
import styles from './dropdown.css';
import { DropdownList } from './DropdownList/DropdownList';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({
  button,
  children,
  isOpen,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(
    () => (isDropdownOpen ? onOpen() : onClose()),
    [isDropdownOpen]
  );

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerButton} onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen && (
        <DropdownList
          onClickFunction={() => setIsDropdownOpen(false)}
          onClose={() => {
            setIsDropdownOpen(false);
          }}
        >
          {children}
        </DropdownList>
      )}
    </div>
  );
}
