import React, { useState, useEffect } from 'react'
import http from '../../../utils/axios'
import moment from 'moment'
import 'moment/locale/es-us'
import locale from 'antd/lib/locale/es_ES'
import { Form, Input, Row, Col, Select, DatePicker, ConfigProvider } from 'antd'
import { Modal, Button } from 'react-bootstrap'
import { UserOutlined, PhoneOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Option } = Select

const ModalFormCreate = ({
  visible,
  onCreate,
  onCancel,
  title,
  onCancelText,
  onOkText
}) => {
  const [generos, setGeneros] = useState([])
  const [paises, setPaises] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [comunas, setComunas] = useState([])
  const [barrios, setBarrios] = useState([])

  const [estudios, setEstudios] = useState([])
  const [profesiones, setProfesiones] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        // setLatitude(position.coords.latitude)
        // setLongitude(position.coords.longitude)
      },
      error => {
        console.log(error)
      },
      {
        enableHighAccuracy: true
      }
    )
    generosFetch()
    paisesfetch()
    departamentosFetch()
    municipiosFetch()
    comunasFetch()
    barriosFetch()
    estudiosFetch()
    profesionesFetch()
  }, [])

  const generosFetch = async () => {
    http.get('/api/v1/generos/').then(response => setGeneros(response.data))
  }

  const estudiosFetch = async () => {
    const response = await http.get('/api/v1/estudios/')
    setEstudios(response.data)
  }

  const profesionesFetch = async () => {
    const response = await http.get('/api/v1/profesiones/')
    setProfesiones(response.data)
  }

  const paisesfetch = async () => {
    const response = await http.get('/api/v1/paises/')
    setPaises(response.data)
  }

  const departamentosFetch = async () => {
    const response = await http.get('/api/v1/departamentos/')
    setDepartamentos(response.data)
  }
  const municipiosFetch = async () => {
    const response = await http.get('/api/v1/municipios/')
    setMunicipios(response.data)
  }
  const comunasFetch = async () => {
    const response = await http.get('/api/v1/comunas/')
    setComunas(response.data)
  }
  const barriosFetch = async () => {
    const response = await http.get('/api/v1/barrios/')
    setBarrios(response.data)
  }
  const disabledDate = current => {
    return current && current > moment().year('2004')
  }

  const [register] = Form.useForm()

  const handleFormValuesChange = async changedValues => {
    const formFieldNamed = Object.keys(changedValues)[0]
    if (formFieldNamed === 'idBarrio') {
      const {
        data: { barrio }
      } = await http.get(`/api/v1/barrios/get/${changedValues[formFieldNamed]}`)
      const pais = barrio.comuna.municipio.departamento.pais
      const departamento = barrio.comuna.municipio.departamento
      const municipio = barrio.comuna.municipio
      const comuna = barrio.comuna
      register.setFieldsValue({
        idPais: pais.id,
        idDepartamento: departamento.id,
        idMunicipio: municipio.id,
        idComuna: comuna.id
      })
    }

    if (formFieldNamed === 'idPais') {
      const response = await http.get(
        `/api/v1/departamentos/pais/${changedValues[formFieldNamed]}`
      )
      setDepartamentos(response.data.departamentos)
      register.setFieldsValue({ departamentos })
    }
    if (formFieldNamed === 'idDepartamento') {
      const response = await http.get(
        `/api/v1/municipios/departamento/${changedValues[formFieldNamed]}`
      )
      setMunicipios(response.data.municipios)
      register.setFieldsValue({ municipios })
    }
    if (formFieldNamed === 'idMunicipio') {
      const response = await http.get(
        `/api/v1/comunas/municipio/${changedValues[formFieldNamed]}`
      )
      setComunas(response.data.comunas)
      register.setFieldsValue({ comunas })
    }
    if (formFieldNamed === 'idComuna') {
      const response = await http.get(
        `/api/v1/barrios/comuna/${changedValues[formFieldNamed]}`
      )
      setBarrios(response.data.barrios)
      register.setFieldsValue({ barrios })
    }
  }

  return (
    <>
      <Modal show={visible} onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='space-y-6'
            layout='vertical'
            name='register'
            form={register}
            onValuesChange={handleFormValuesChange}
          >
            <Form.Item
              name='documento'
              rules={[
                { required: true, message: 'Por favor ingrese su documento' }
              ]}
              label='Documento'
            >
              <Input
                size='large'
                placeholder='Documento'
                className='form-control form-control-solid h-auto rounded'
              />
            </Form.Item>
            <Form.Item>
              <Row gutter={[8, 24]}>
                <Col span={12}>
                  <Form.Item
                    name='primerNombre'
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingrese su primer nombre'
                      }
                    ]}
                  >
                    <Input
                      size='large'
                      prefix={<UserOutlined />}
                      placeholder='Primer nombre'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='segundoNombre' noStyle>
                    <Input
                      size='large'
                      prefix={<UserOutlined />}
                      placeholder='Segundo nombre'
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row gutter={[8, 24]}>
                <Col span={12}>
                  <Form.Item
                    name='primerApellido'
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingrese su primer apellido'
                      }
                    ]}
                  >
                    <Input
                      size='large'
                      prefix={<UserOutlined />}
                      placeholder='Primer apellido'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='segundoApellido' noStyle>
                    <Input
                      size='large'
                      prefix={<UserOutlined />}
                      placeholder='Segundo apellido'
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item name='email'>
              <Input size='large' placeholder='Ingrese su email' />
            </Form.Item>
            <ConfigProvider locale={locale}>
              <Form.Item
                name='fecha_nacimiento'
                // rules={[
                //   {
                //     type: 'object',
                //     required: true,
                //     message: 'Please select time!'
                //   }
                // ]}
              >
                <DatePicker
                  size='large'
                  disabledDate={disabledDate}
                  defaultPickerValue={moment().year('2004')}
                  format='DD/MM/YYYY'
                  placeholder='seleccione una fecha'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </ConfigProvider>
            <Form.Item
              name='telefono'
              rules={[
                { required: true, message: 'Por favor ingrese su telefono' }
              ]}
            >
              <Input
                type='number'
                size='large'
                prefix={<PhoneOutlined />}
                placeholder='Telefono'
              />
            </Form.Item>
            <Form.Item
              name='idGenero'
              rules={[
                { required: true, message: 'Por favor seleccione un genero' }
              ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione un genero'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {generos.map(genero => (
                  <Option key={genero.id} value={genero.id}>
                    {genero.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='idBarrio'
              rules={[
                {
                  required: true,
                  message: 'Por favor seleccione un barrio'
                }
              ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione un barrio'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {barrios.map(barrio => (
                  <Option key={barrio.id} value={barrio.id}>
                    {barrio.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='idComuna'
              rules={[
                {
                  required: true,
                  message: 'Por favor seleccione un comuna'
                }
              ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione un comuna'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {comunas.map(comuna => (
                  <Option key={comuna.id} value={comuna.id}>
                    {comuna.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='idMunicipio'
              rules={[
                {
                  required: true,
                  message: 'Por favor seleccione un municipio'
                }
              ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione una municipio'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {municipios.map(municipio => (
                  <Option key={municipio.id} value={municipio.id}>
                    {municipio.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='idDepartamento'
              rules={[
                {
                  required: true,
                  message: 'Por favor seleccione un departamento'
                }
              ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione un departamento'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {departamentos.map(departamento => (
                  <Option key={departamento.id} value={departamento.id}>
                    {departamento.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='idPais'
              rules={[
                { required: true, message: 'Por favor seleccione un pais' }
              ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione un Pais'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {paises.map(pais => (
                  <Option key={pais.id} value={pais.id}>
                    {pais.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='direccion'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Por favor, ingese su direccion'
              //   }
              // ]}
            >
              <Input size='large' placeholder='Ingrese su direccion' />
            </Form.Item>
            <Form.Item
              name='estudios_id'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Por favor seleccione un nivel academico'
              //   }
              // ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione su nivel academico'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {estudios.map(estudio => (
                  <Option key={estudio.id} value={estudio.id}>
                    {estudio.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='profesion_id'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Por favor seleccione su profesion'
              //   }
              // ]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione su profesion'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0}
              >
                {profesiones.map(profesion => (
                  <Option key={profesion.id} value={profesion.id}>
                    {profesion.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='ocupacion'
              // rules={[{ required: true, message: 'Por favor ingrese su ocupacion actual' }]}
              extra='Ej: Taxista, obrero, entre otros'
            >
              <Input
                size='large'
                placeholder='Ocupacion Actual'
                className='w-full p-2 border border-gray-300 rounded mt-1'
              />
            </Form.Item>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onCancel}>
            {onCancelText}
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              register
                .validateFields()
                .then(values => {
                  // values.id = user[0].id
                  // form.resetFields()
                  onCreate(values)
                })
                .catch(info => {
                  console.log('Validate Failed:', info)
                })
            }}
          >
            {onOkText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalFormCreate.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func
}

export default ModalFormCreate
