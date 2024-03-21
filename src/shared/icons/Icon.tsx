import React from 'react';

interface IIconProps {
  width: string;
  height: string;
  viewBox: string;
  fillSvg?: string;
  fillPath: string;
  xmlns?: string;
  icon: string;
  className?: string;
  children?: React.ReactNode;
}

export function Icon(props: IIconProps) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={props.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={props.icon} fill={props.fillPath} />
    </svg>
  );
}
