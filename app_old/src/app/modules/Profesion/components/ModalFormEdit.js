import React from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const ModalFormEdit = ({ visible, onEdit, onCancel, profesion }) => {
  const [register] = Form.useForm();

  return (
    <>
      <Modal
        visible={visible}
        title="Editar Profesion"
        okText="Guardar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={() => {
          register
            .validateFields()
            .then((values) => {
              values.id = profesion[0].id;
              onEdit(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          className="space-y-6"
          layout="vertical"
          name="register"
          form={register}
          fields={profesion}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre de la profesion' }
            ]}
          >
            <Input size="large" placeholder="Profesion" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ModalFormEdit.propTypes = {
  visible: PropTypes.bool,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  profesion: PropTypes.any
};

export default ModalFormEdit;
