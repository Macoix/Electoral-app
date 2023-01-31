import React, { useState, useEffect } from 'react'
import http from '../../../../utils/axios'
import { Modal, Form, Input, Row, Col, Select, Switch } from 'antd'
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const ModalFormCreate = ({ visible, onCreate, onCancel }) => {
  const { Option } = Select
  const [personas, setPersonas] = useState([])
  const [generos, setGeneros] = useState([])
  const [paises, setPaises] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [comunas, setComunas] = useState([])
  const [barrios, setBarrios] = useState([])
  // const [latitude, setLatitude] = useState(0)
  // const [longitude, setLongitude] = useState(0)
  const [switchState, setSwitchState] = useState(true)

  const [estudios, setEstudios] = useState([])
  const [profesiones, setProfesiones] = useState([])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // setLatitude(position.coords.latitude)
        // setLongitude(position.coords.longitude)
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true
      }
    )
    generosFetch()
    paisesfetch()
    personasFetch()
    departamentosFetch()
    municipiosFetch()
    comunasFetch()
    barriosFetch()
    estudiosFetch()
    profesionesFetch()
  }, [])

  const generosFetch = async () => {
    http
      .get('/api/v1/generos/')
      .then((response) => setGeneros(response.data))
  }

  const paisesfetch = async () => {
    const response = await http.get('/api/v1/paises/')
    setPaises(response.data)
  }

  const personasFetch = () => {
    http
      .get('/api/v1/personas/')
      .then((response) => setPersonas(response.data))
  }

  const estudiosFetch = async () => {
    const response = await http.get('/api/v1/estudios/')
    setEstudios(response.data)
  }

  const profesionesFetch = async () => {
    const response = await http.get('/api/v1/profesiones/')
    setProfesiones(response.data)
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

  const [register] = Form.useForm()

  const handleFormValuesChange = async (changedValues) => {
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
        `/api/v1/departamentos/${changedValues[formFieldNamed]}`
      )
      setDepartamentos(response.data)
      register.setFieldsValue({ departamentos })
    }
    if (formFieldNamed === 'idDepartamento') {
      const response = await http.get(
        `/api/v1/municipios/${changedValues[formFieldNamed]}`
      )
      setMunicipios(response.data)
      register.setFieldsValue({ municipios })
    }
    if (formFieldNamed === 'idMunicipio') {
      const response = await http.get(`/api/v1/comunas/${changedValues[formFieldNamed]}`)
      setComunas(response.data)
      register.setFieldsValue({ comunas })
    }
    if (formFieldNamed === 'idComuna') {
      const response = await http.get(`/api/v1/barrios/${changedValues[formFieldNamed]}`)
      setBarrios(response.data)
      register.setFieldsValue({ barrios })
    }
  }

  const handleSwitchChange = (checked) => {
    console.log(checked)

    setSwitchState(checked)
  }

  return (
    <>
      <Modal
        visible={visible}
        title='Crear Usuario'
        okText='Crear'
        cancelText='Cancelar'
        onCancel={onCancel}
        onOk={() => {
          register
            .validateFields()
            .then((values) => {
              // values.id = user[0].id
              // form.resetFields()
              onCreate(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          className='space-y-6'
          layout='vertical'
          name='register'
          form={register}
          onValuesChange={handleFormValuesChange}
        >
          <Form.Item name='switchP' valuePropName='checked'>
            <Switch
              checkedChildren='Persona nueva'
              unCheckedChildren='Persona Existente'
              onChange={handleSwitchChange}
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
          >
            <Input
              size='large'
              // prefix={<FontAwesomeIcon icon={faAddressCard} />}
              placeholder='Usuario'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Por favor ingrese su correo'
              }
            ]}
          >
            <Input
              size='large'
              // prefix={<FontAwesomeIcon icon={faEnvelope} />}
              placeholder='Correo'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className='site-foem-item-icon' />}
              placeholder='Contraseña'
              className=''
            />
          </Form.Item>
          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor, confirme su contraseña'
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Las contraseñas no coinciden'))
                }
              })
            ]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className='site-foem-item-icon' />}
              placeholder='Confirme contraseña'
            />
          </Form.Item>
          {!switchState && (
            <Form.Item
              name='idPersona'
              rules={[{ required: true, message: 'Por favor seleccione una persona' }]}
            >
              <Select
                size='large'
                showSearch
                placeholder='Seleccione una persona'
                filterOption={(input, option) => option.children.indexOf(input) >= 0}
              >
                {personas.map((persona) => (
                  <Option
                    key={persona.id}
                    value={persona.id}
                    primernombre={persona.primerNombre}
                    primerapellido={persona.primerApellido}
                    documento={persona.documento}
                  >
                    {`${persona.primerNombre} ${persona.primerApellido}`}{' '}
                    {`${persona.documento}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {switchState && (
            <>
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
                    <Form.Item
                      name='segundoNombre'
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingrese su segundo nombre'
                        }
                      ]}
                    >
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
                    <Form.Item
                      name='segundoApellido'
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingrese su segundo apellido'
                        }
                      ]}
                    >
                      <Input
                        size='large'
                        prefix={<UserOutlined />}
                        placeholder='Segundo apellido'
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                name='telefono'
                rules={[{ required: true, message: 'Por favor ingrese su telefono' }]}
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
                rules={[{ required: true, message: 'Por favor seleccione un genero' }]}
              >
                <Select
                  size='large'
                  showSearch
                  placeholder='Seleccione un genero'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {generos.map((genero) => (
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {barrios.map((barrio) => (
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {comunas.map((comuna) => (
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {municipios.map((municipio) => (
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {departamentos.map((departamento) => (
                    <Option key={departamento.id} value={departamento.id}>
                      {departamento.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='idPais'
                rules={[{ required: true, message: 'Por favor seleccione un pais' }]}
              >
                <Select
                  size='large'
                  showSearch
                  placeholder='Seleccione un Pais'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {paises.map((pais) => (
                    <Option key={pais.id} value={pais.id}>
                      {pais.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='direccion'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingese su direccion'
                  }
                ]}
              >
                <Input size='large' placeholder='Ingrese su direccion' />
              </Form.Item>
              <Form.Item
                name='estudios_id'
                rules={[
                  {
                    required: true,
                    message: 'Por favor seleccione un nivel academico'
                  }
                ]}
              >
                <Select
                  size='large'
                  showSearch
                  placeholder='Seleccione su nivel academico'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {estudios.map((estudio) => (
                    <Option key={estudio.id} value={estudio.id}>
                      {estudio.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='profesion_id'
                rules={[
                  {
                    required: true,
                    message: 'Por favor seleccione su profesion'
                  }
                ]}
              >
                <Select
                  size='large'
                  showSearch
                  placeholder='Seleccione su profesion'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {profesiones.map((profesion) => (
                    <Option key={profesion.id} value={profesion.id}>
                      {profesion.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='ocupacion'
                rules={[
                  { required: true, message: 'Por favor ingrese su ocupacion actual' }
                ]}
                extra='Ej: Taxista, obrero, entre otros'
              >
                <Input
                  size='large'
                  placeholder='Ocupacion Actual'
                  className='w-full p-2 border border-gray-300 rounded mt-1'
                />
              </Form.Item>
            </>
          )}
        </Form>
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
