import React from 'react';

interface IItem {
  id: string;
  text: string;
  onClick: (id: string) => void;
  className?: string;
  className2?: string;
  As?: 'a' | 'li' | 'div' | 'button';
  href?: string;
  children?: React.ReactNode;
}

interface IGenericListProps {
  list: IItem[];
}
export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(
        ({
          As = 'div',
          onClick,
          className,
          className2,
          text,
          id,
          href,
          children,
        }) => (
          <As
            className={className}
            onClick={() => onClick(id)}
            key={id}
            href={href}
          >
            {children}
            <span className={className2}>{text}</span>
          </As>
        )
      )}
    </>
  );
}
