import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import http from '../../../../utils/axios';
import PropTypes from 'prop-types';

const { Option } = Select;

const ModalFormCreate = ({ title, okText, cancelText, visible, onCreate, onCancel }) => {
  useEffect(() => {
    fetchMunicipios();
  }, []);

  const [form] = Form.useForm();
  const [municipio, setMunicipio] = useState([]);

  const fetchMunicipios = () => {
    http.get('/api/v1/municipios/').then((response) => {
      setMunicipio(response.data);
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
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Por favor ingrese el nombre la comuna' }]}
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
              {municipio.map((item) => (
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

ModalFormCreate.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func
};

export default ModalFormCreate;
