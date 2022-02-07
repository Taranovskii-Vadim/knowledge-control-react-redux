import React from 'react';
import AppleOutlined from '@ant-design/icons/AppleOutlined';

import { SelectedCategories } from 'src/store/services/categories/types';

interface Props {
  title: string;
  type: SelectedCategories['type'];
}

export const TabTitle = ({ title, type }: Props): JSX.Element => (
  <span>
    {/* TODO: add custom icons later */}
    {type === 'all' ? <AppleOutlined /> : null}
    {title}
  </span>
);
