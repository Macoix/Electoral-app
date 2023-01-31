/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import http from '../../../utils/axios';
import { Modal, Form, Input, Row, Col, Select, DatePicker } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const ModalFormEdit = ({ visible, onEdit, onCancel, persona }) => {
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  const [generos, setGeneros] = useState([]);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [estudios, setEstudios] = useState([]);
  const [profesiones, setProfesiones] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    generosFetch();
    paisesfetch();
    departamentosfetch();
    municipiosfetch();
    comunasfetch();
    barriosfetch();
    estudiosFetch();
    profesionesFetch();
    return () => ac.abort();
  }, []);

  const generosFetch = async () => {
    const data = http
      .get('/api/v1/generos/')
      .then((response) => setGeneros(response.data));
  };

  const paisesfetch = async () => {
    const response = await http.get('/api/v1/paises/');
    setPaises(response.data);
  };
  const departamentosfetch = async () => {
    const response = await http.get('/api/v1/departamentos/');
    setDepartamentos(response.data);
  };
  const municipiosfetch = async () => {
    const response = await http.get('/api/v1/municipios/');
    setMunicipios(response.data);
  };
  const comunasfetch = async () => {
    const response = await http.get('/api/v1/comunas/');
    setComunas(response.data);
  };
  const barriosfetch = async () => {
    const response = await http.get('/api/v1/barrios/');
    setBarrios(response.data);
  };

  const estudiosFetch = async () => {
    const response = await http.get('/api/v1/estudios/');
    setEstudios(response.data);
  };

  const profesionesFetch = async () => {
    const response = await http.get('/api/v1/profesiones/');
    setProfesiones(response.data);
  };

  const [register] = Form.useForm();

  const handleFormValuesChange = async (changedValues) => {
    const formFieldNamed = Object.keys(changedValues)[0];
    if (formFieldNamed === 'idPais') {
      const response = await http.get(
        `/api/v1/departamentos/${changedValues[formFieldNamed]}`
      );
      setDepartamentos(response.data);
      register.setFieldsValue({ departamentos });
    }
    if (formFieldNamed === 'idDepartamento') {
      const response = await http.get(
        `/api/v1/municipios/${changedValues[formFieldNamed]}`
      );
      setMunicipios(response.data);
      register.setFieldsValue({ municipios });
    }
    if (formFieldNamed === 'idMunicipio') {
      const response = await http.get(`${changedValues[formFieldNamed]}`);
      setComunas(response.data);
      register.setFieldsValue({ comunas });
    }
    if (formFieldNamed === 'idComuna') {
      const response = await http.get(`/api/v1/barrios/${changedValues[formFieldNamed]}`);
      setBarrios(response.data);
      register.setFieldsValue({ barrios });
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Editar Persona"
        okText="Guardar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={() => {
          register
            .validateFields()
            .then((values) => {
              values.id = persona[0].id;
              values.perfil_profesional_id = persona[1].perfil_profesional_id;
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
          onValuesChange={handleFormValuesChange}
          fields={persona}
        >
          <Form.Item
            name="documento"
            rules={[{ required: true, message: 'Por favor ingrese su documento' }]}
          >
            <Input
              size="large"
              placeholder="Documento"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </Form.Item>
          <Form.Item>
            <Row gutter={[8, 24]}>
              <Col span={12}>
                <Form.Item
                  name="primerNombre"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese su primer nombre'
                    }
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Primer nombre"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="segundoNombre"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese su segundo nombre'
                    }
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Segundo nombre"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={[8, 24]}>
              <Col span={12}>
                <Form.Item
                  name="primerApellido"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese su primer apellido'
                    }
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Primer apellido"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="segundoApellido"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese su segundo apellido'
                    }
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Segundo apellido"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor, ingese su email'
              }
            ]}
          >
            <Input size="large" placeholder="Ingrese su email" />
          </Form.Item>
          <Form.Item
            name="fecha_nacimiento"
            rules={[
              {
                type: 'object',
                required: true,
                message: 'Please select time!'
              }
            ]}
          >
            <DatePicker
              size="large"
              // disabledDate={disabledDate}
              format="DD/MM/YYYY"
              placeholder="seleccione una fecha"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="telefono"
            rules={[{ required: true, message: 'Por favor ingrese su telefono' }]}
          >
            <Input
              type="number"
              size="large"
              prefix={<PhoneOutlined />}
              placeholder="Telefono"
            />
          </Form.Item>
          <Form.Item
            name="idGenero"
            rules={[{ required: true, message: 'Por favor seleccione un pais' }]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione un genero"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {generos.map((genero) => (
                <Option key={genero.id} value={genero.id}>
                  {genero.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idPais"
            rules={[{ required: true, message: 'Por favor seleccione un pais' }]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione un Pais"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {paises.map((pais) => (
                <Option key={pais.id} value={pais.id}>
                  {pais.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idDepartamento"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione un departamento'
              }
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione un departamento"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {departamentos.map((departamento) => (
                <Option key={departamento.id} value={departamento.id}>
                  {departamento.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idMunicipio"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione un municipio'
              }
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione una municipio"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {municipios.map((municipio) => (
                <Option key={municipio.id} value={municipio.id}>
                  {municipio.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idComuna"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione un comuna'
              }
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione un comuna"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {comunas.map((comuna) => (
                <Option key={comuna.id} value={comuna.id}>
                  {comuna.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idBarrio"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione un barrio'
              }
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione un barrio"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {barrios.map((barrio) => (
                <Option key={barrio.id} value={barrio.id}>
                  {barrio.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="estudios_id"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione un nivel de estudio'
              }
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione su nivel de estudio"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {estudios.map((estudio) => (
                <Option key={estudio.id} value={estudio.id}>
                  {estudio.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="profesion_id"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione su profesion'
              }
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Seleccione su profesion"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {profesiones.map((profesion) => (
                <Option key={profesion.id} value={profesion.id}>
                  {profesion.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="ocupacion"
            rules={[{ required: true, message: 'Por favor ingrese su ocupacion actual' }]}
            extra="Ej: Taxista, obrero, entre otros"
          >
            <Input
              size="large"
              placeholder="Ocupacion Actual"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </Form.Item>
          <Form.Item
            name="direccion"
            rules={[
              {
                required: true,
                message: 'Por favor, ingese su direccion'
              }
            ]}
          >
            <Input size="large" placeholder="Ingrese su direccion" />
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
  persona: PropTypes.any
};

export default ModalFormEdit;
