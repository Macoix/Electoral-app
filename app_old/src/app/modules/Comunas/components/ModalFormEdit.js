import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import http from '../../../../utils/axios';
import PropTypes from 'prop-types';

const { Option } = Select;

const ModalFormEdit = ({
  title,
  okText,
  cancelText,
  visible,
  onEdit,
  onCancel,
  comuna
}) => {
  useEffect(() => {
    fetchMunicipios();
  }, []);

  const [form] = Form.useForm();
  const [municipios, setMunicipios] = useState([]);

  const fetchMunicipios = () => {
    http.get('/api/v1/municipios/').then((response) => {
      setMunicipios(response.data);
    });
  };
  return (
    <>
      <Modal
        visible={visible}
        title={title}
        okText={okText}
        cancelText={cancelText}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values.id = comuna[0].id;
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
          form={form}
          fields={comuna}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre de la comuna' }
            ]}
          >
            <Input
              size="large"
              placeholder="Nombre"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </Form.Item>
          <Form.Item
            name="municipio_id"
            rules={[{ required: true, message: 'Por favor, seleccione un municipio' }]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione un municipio"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {municipios.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="ambito"
            rules={[{ required: true, message: 'Por favor ingrese el ambito' }]}
          >
            <Input
              size="large"
              placeholder="Ambito"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ModalFormEdit.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  visible: PropTypes.bool,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  comuna: PropTypes.any
};

export default ModalFormEdit;
