import React, { useEffect, useRef } from 'react';
import styles from './dropdownList.css';
import ReactDOM from 'react-dom';

interface IDropdownListProps {
  children: React.ReactNode;
  onClickFunction?: () => void;
  onClose?: () => void;
}

export function DropdownList(props: IDropdownListProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        props.onClose?.();
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const node = document.querySelector('.dropdown__container--a5Jzh');
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.listContainer} ref={ref}>
      <div className={styles.list} onClick={props.onClickFunction}>
        {props.children}
      </div>
    </div>,
    node
  );
}
