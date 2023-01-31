import React from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const ModalFormEdit = ({ visible, onEdit, onCancel, estudios }) => {
  const [register] = Form.useForm();

  return (
    <>
      <Modal
        visible={visible}
        title="Editar Nombre grado estudio"
        okText="Guardar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={() => {
          register
            .validateFields()
            .then((values) => {
              values.id = estudios[0].id;
              // form.resetFields();
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
          fields={estudios}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre de la profesion' }
            ]}
          >
            <Input size="large" placeholder="Nombre del grado de estudio" />
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
  estudios: PropTypes.any
};

export default ModalFormEdit;
