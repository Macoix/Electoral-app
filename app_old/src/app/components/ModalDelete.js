import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ModalDelete = ({ title, okText, cancelText, onDelete, onCancel, content, id }) => {
  return confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    okText,
    okType: 'danger',
    cancelText,
    onOk() {
      onDelete(id);
    },
    onCancel
  });
};

export default ModalDelete;
