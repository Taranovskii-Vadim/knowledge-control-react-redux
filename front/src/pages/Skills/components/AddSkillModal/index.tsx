import React, { useState } from 'react';
import cn from 'classnames';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { Modal, Button, Input, Select, Form } from 'antd';

import { Status } from 'src/store/types';
import { STATUS } from 'src/store/constants';
import { useChangeStatus } from 'src/utils/hooks';

import { SkillCategory } from 'src/store/models/skills/types';

import { Text } from 'src/components/ui/Typography';

import css from './styles.css';

const { Item } = Form;
const { Option } = Select;

interface Props {
  categories: SkillCategory[];
  status: Status;
  // actions
  onHandleAdd: (name: string, category: SkillCategory['type']) => void;
  onResetModalStatus: () => void;
}

interface FormDataFields {
  title: string;
  category: SkillCategory['type'];
}

interface FormDataRender {
  name: 'title' | 'category';
  placeholder: string;
}

export const AddSkillModal = ({ categories, status, onHandleAdd, onResetModalStatus }: Props): JSX.Element => {
  const [isVisible, setIsVisible] = useState(() => false);
  const [isFormDone, setIsFormDone] = useState<'done' | 'error'>(null);

  const formItemsData: FormDataRender[] = [
    { name: 'title', placeholder: 'Введите название' },
    { name: 'category', placeholder: 'Укажите категорию' },
  ];

  const isFormLoading = status === STATUS.loading;

  const getErrorMessage = (baseMsg: string): string => `Ошибка! ${baseMsg}`;

  const onCloseModal = (): void => {
    setIsVisible(false);
    if (isFormDone === 'done' || isFormDone === 'error') {
      setIsFormDone(null);
      onResetModalStatus();
    }
  };

  const onSubmitForm = ({ title, category }: FormDataFields): void => {
    onHandleAdd(title, category);
  };

  useChangeStatus(status, {
    onDone: () => {
      setIsFormDone('done');
    },
    onError: () => {
      setIsFormDone('error');
    },
  });

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsVisible(true)} />
      <Modal visible={isVisible} closable={false} onCancel={onCloseModal} footer={null}>
        {!isFormDone ? (
          <Form onFinish={onSubmitForm}>
            {formItemsData.map(({ name, placeholder }) => (
              <Item key={name} name={name} rules={[{ required: true, message: getErrorMessage(placeholder) }]}>
                {name === 'title' ? (
                  <Input placeholder={placeholder} disabled={isFormLoading} />
                ) : (
                  <Select placeholder={placeholder} disabled={isFormLoading}>
                    {categories.map((item) => (
                      <Option key={item.type} value={item.type}>
                        {item.title}
                      </Option>
                    ))}
                  </Select>
                )}
              </Item>
            ))}
            <div className={css.footer}>
              <Button onClick={onCloseModal} disabled={isFormLoading}>
                Отменить
              </Button>
              <Button htmlType="submit" type="primary" loading={isFormLoading}>
                Добавить
              </Button>
            </div>
          </Form>
        ) : (
          <div className={css.modalFeedback}>
            {isFormDone === 'done' ? (
              <CheckCircleOutlined className={cn(css.icon, css.successIcon)} />
            ) : (
              <CloseCircleOutlined className={cn(css.icon, css.errorIcon)} />
            )}
            <Text className={css.iconMsg}>{isFormDone === 'done' ? 'Добавлено' : 'Что-то пошло не так'}</Text>
            <Button type="primary" onClick={onCloseModal}>
              ОК
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};
