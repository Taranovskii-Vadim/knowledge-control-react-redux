import React from 'react';
import { Rate } from 'antd';

interface Props {
  rate: number | null;
  disabled?: boolean;
  onChange?: (val: number) => void;
}

export const Rating = ({ rate, disabled = false, onChange }: Props): JSX.Element => (
  <Rate defaultValue={rate} disabled={disabled} onChange={onChange || undefined} />
);
