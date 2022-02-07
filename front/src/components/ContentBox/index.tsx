import React from 'react';
import cn from 'classnames';

import { Text } from '../ui/Typography';

import css from './styles.css';

interface Props {
  boxTitle?: string;
  className?: string;
}

export const ContentBox: React.FC<Props> = ({ boxTitle, children, className }): JSX.Element => (
  <div className={cn(className, css.root)}>
    {boxTitle ? <Text className={css.title}>{boxTitle}</Text> : null}
    {children}
  </div>
);
