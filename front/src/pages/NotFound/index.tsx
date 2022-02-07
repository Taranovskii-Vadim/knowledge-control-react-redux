import React from 'react';
import FrownOutlined from '@ant-design/icons/FrownOutlined';

import { Text } from 'src/components/ui/Typography';

import css from './styles.css';

interface Props {
  notFoundText: string;
  renderButton?: JSX.Element;
}

export const NotFound = ({ notFoundText, renderButton }: Props): JSX.Element => (
  <div className={css.flex}>
    <FrownOutlined className={css.icon} />
    <Text className={css.title} level={1}>
      {notFoundText}
    </Text>
    {renderButton}
  </div>
);
