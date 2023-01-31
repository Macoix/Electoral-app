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
  departamento
}) => {
  useEffect(() => {
    fetchPaises();
  }, []);

  const [form] = Form.useForm();
  const [paises, setPaises] = useState([]);

  const fetchPaises = () => {
    http.get('/api/v1/paises/').then((response) => {
      setPaises(response.data);
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
              values.id = departamento[0].id;
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
          fields={departamento}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre del departamento' }
            ]}
          >
            <Input
              size="large"
              placeholder="Nombre"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </Form.Item>
          <Form.Item
            name="pais_id"
            rules={[{ required: true, message: 'Por favor, seleccione un pais' }]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione un pais"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {paises.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="latitude"
            rules={[{ required: true, message: 'Por favor ingrese la latitud' }]}
          >
            <Input
              size="large"
              placeholder="Latitud"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </Form.Item>
          <Form.Item
            name="longitude"
            rules={[{ required: true, message: 'Por favor ingrese la longitud' }]}
          >
            <Input
              size="large"
              placeholder="Longitud"
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
  departamento: PropTypes.any
};

export default ModalFormEdit;
