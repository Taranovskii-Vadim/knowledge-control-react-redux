import React from 'react';
import cn from 'classnames';
import { Spin } from 'antd';

import css from './styles.css';

interface IProps {
  spinSize?: 'large' | 'default' | 'small';
  spinMessage?: string;
  children?: JSX.Element;
  pending?: boolean;
  error?: boolean;
  isBackground?: boolean;
  errorTip?: string;
  pendingClassName?: string;
  pendingWrapperClassName?: string;
}

export const Pendable = ({
  error,
  pending,
  spinSize = 'large',
  spinMessage = 'Загрузка...',
  errorTip,
  isBackground,
  pendingClassName,
  pendingWrapperClassName,
  children,
}: IProps): JSX.Element | null => {
  if (error) {
    return <div>err</div>;
  }

  if (pending) {
    return (
      <div className={cn(css.wrapper, pendingWrapperClassName)}>
        {isBackground ? (
          <Spin size={spinSize} tip={spinMessage} className={pendingClassName}>
            <div className={css.textAlign}>{children}</div>
          </Spin>
        ) : (
          <Spin size={spinSize} tip={spinMessage} className={pendingClassName} />
        )}
      </div>
    );
  }

  if (children) {
    return children;
  }

  return null;
};
