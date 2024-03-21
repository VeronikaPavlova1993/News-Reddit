import React from 'react';
import * as styles from './layout.css';
import { ILayoutProps } from '../../types/interface';

export function Layout({ children }: ILayoutProps) {
  return <main className={styles.layout}>{children}</main>;
}
