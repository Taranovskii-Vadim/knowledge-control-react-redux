import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Typography as AntdTypography } from 'antd';
import { BlockProps } from 'antd/lib/typography/Base';
import { TextProps as AntdTextProps } from 'antd/lib/typography/Text';

import { Color, Level, Weight } from '../types';

import css from './styles.css';

const AntdText = AntdTypography.Text;
// const AntdTitle = AntdTypography.Title;
// const AntdParagraph = AntdTypography.Paragraph;

interface MutalProps extends BlockProps {
  level?: Level;
  children?: ReactNode;
  className?: string;
  color?: Color;
  weight?: Weight;
}

type TextProps = MutalProps & AntdTextProps;

export const Text = ({ ...props }: TextProps): JSX.Element => (
  <AntdText
    {...props}
    className={cn(
      css.default,
      props.color ? css[props.color] : '',
      props.weight ? css[props.weight] : '',
      props.level ? css[`title${props.level}`] : '',
      props.className,
    )}
  >
    {props.children}
  </AntdText>
);
