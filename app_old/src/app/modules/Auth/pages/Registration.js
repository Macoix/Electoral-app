import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as auth from '../_redux/authRedux'
import http from '../../../../utils/axios'
import locale from 'antd/lib/locale/es_ES'
import moment from 'moment'
import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Select,
  Checkbox,
  DatePicker,
  ConfigProvider
} from 'antd'

function Registration (props) {
  const { Option } = Select
  const [isLoading, setIsLoading] = useState(false)
  const [generos, setGeneros] = useState([])
  // eslint-disable-next-line
  const [documentos, setDocumentos] = useState([])
  const [paises, setPaises] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [comunas, setComunas] = useState([])
  const [barrios, setBarrios] = useState([])
  const [estudios, setEstudios] = useState([])
  const [profesiones, setProfesiones] = useState([])
  const [ocupaciones, setOcupaciones] = useState([])
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  // eslint-disable-next-line
  const [terminos, setTerminos] = useState('')
  // eslint-disable-next-line
  const [visible, setVisible] = useState(false)

  const [timeout, setTimeOut] = useState(null)
  const [referidoText, setReferidoText] = useState(null)
  const [referidoStatus, setReferidoStatus] = useState(null)
  const history = useHistory()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
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
    departamentosFetch()
    municipiosFetch()
    comunasFetch()
    barriosFetch()
    terminosFetch()
    estudiosFetch()
    profesionesFetch()
    ocupacionFetch()
  }, []) // eslint-disable-line

  const onFinish = async (values) => {
    setIsLoading(true)
    const data = {
      ...values,
      latitude,
      longitude,
      switchP: true
    }
    http
      .post('/api/v1/users', data)
      .then((response) => {
        setIsLoading(false)
        message.success({ content: response.data.message })
        history.push('/auth/login')
      })
      .catch((error) => {
        setIsLoading(false)
        message.error({ content: error.response.data.message })
      })
  }

  const generosFetch = () => {
    http
      .get('/api/v1/generos/')
      .then((response) => setGeneros(response.data))
  }

  const ocupacionFetch = () => {
    http
      .get('/api/v1/ocupaciones/')
      .then((response) => setOcupaciones(response.data))
  }

  const paisesfetch = async () => {
    const response = await http.get('/api/v1/paises/')
    setPaises(response.data)
  }

  const terminosFetch = async () => {
    const response = await http.get('/api/v1/terminos/')
    setTerminos(response.data.texto)
  }

  const estudiosFetch = async () => {
    const response = await http.get('/api/v1/estudios/')
    setEstudios(response.data)
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

  const profesionesFetch = async () => {
    const response = await http.get('/api/v1/profesiones/')
    setProfesiones(response.data)
  }

  const disabledDate = (current) => {
    return current && current > moment().year(2004)
  }

  const handleChangeReferido = (value) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    setTimeOut(setTimeout(() => {
      http
        .get(`/api/v1/personas/find/${value}`)
        .then((response) => {
          if (response.status === 200) {
            setReferidoStatus('success')
            console.log('debio registrar')
          }
        })
        .catch((error) => {
          console.log(error)
          setReferidoText('Esta CC no esta registrada')
          setReferidoStatus('error')
        })
    }, 500))
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
    <div className='login-form login-signin' style={{ display: 'block' }}>
      <div className='text-center mb-10 mb-lg-20'>
        <h3 className='font-size-h1'>
          <FormattedMessage id='AUTH.REGISTER.TITLE' />
        </h3>
        <p className='text-muted font-weight-bold'>
          Ingresa tus datos para crearte una cuenta
        </p>
      </div>
      <Form
        className='space-y-6'
        layout='vertical'
        name='register'
        form={register}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onValuesChange={handleFormValuesChange}
      >
        <Form.Item
          name='documento'
          rules={[{ required: true, message: 'Por favor ingrese su documento' }]}
        >
          <Input
            size='large'
            placeholder='Documento'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
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
                  placeholder='Primer nombre'
                  className='form-control form-control-solid h-auto py-4 px-6 rounded'
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
                  placeholder='Segundo nombre'
                  className='form-control form-control-solid h-auto py-4 px-6 rounded'
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
                  placeholder='Primer apellido'
                  className='form-control form-control-solid h-auto py-4 px-6 rounded'
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
                  placeholder='Segundo apellido'
                  className='form-control form-control-solid h-auto py-4 px-6 rounded'
                />
              </Form.Item>
            </Col>
          </Row>
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
            placeholder='Correo'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
          />
        </Form.Item>
        <Form.Item
          name='emailR'
          dependencies={['email']}
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su correo'
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('email') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Los correos no coinciden'))
              }
            })
          ]}
        >
          <Input
            onPaste={(e) => {
              e.preventDefault()
              return false
            }}
            onCopy={(e) => {
              e.preventDefault()
              return false
            }}
            size='large'
            placeholder='Repita el correo'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
          />
        </Form.Item>

        <Form.Item
          name='telefono'
          rules={[{ required: true, message: 'Por favor ingrese su telefono' }]}
        >
          <Input
            type='number'
            size='large'
            placeholder='Numero de contacto'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
          />
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
            className='control-form'
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
            className='control-form'
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
            className='control-form'
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
            className='control-form'
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
            className='control-form'
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
          <Input size='large' placeholder='Ingrese su direccion' className='form-control form-control-solid h-auto py-4 px-6 rounded' />
        </Form.Item>

        <ConfigProvider locale={locale}>
          <Form.Item
            name='fecha_nacimiento'
            rules={[
              {
                type: 'object',
                required: true,
                message: 'Please select time!'
              }
            ]}
          >
            <DatePicker
              size='large'
              disabledDate={disabledDate}
              format='DD/MM/YYYY'
              placeholder='seleccione una fecha'
              defaultPickerValue={moment().year(2004)}
              style={{ width: '100%' }}
              className='form-control form-control-solid h-auto py-4 px-6 rounded'
            />
          </Form.Item>
        </ConfigProvider>

        <Form.Item
          name='idGenero'
          rules={[{ required: true, message: 'Por favor seleccione un pais' }]}
        >
          <Select
            size='large'
            showSearch
            placeholder='Seleccione un genero'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            className='control-form'
          >
            {generos.map((genero) => (
              <Option key={genero.id} value={genero.id}>
                {genero.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='estudios_id'
          rules={[
            {
              required: true,
              message: 'Por favor seleccione un nivel de estudio'
            }
          ]}
        >
          <Select
            size='large'
            showSearch
            placeholder='Seleccione su nivel de estudio'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            className='control-form'
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
            className='control-form'
          >
            {profesiones.map((profesion) => (
              <Option key={profesion.id} value={profesion.id}>
                {profesion.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='ocupacion_id'
          rules={[
            { required: true, message: 'Por favor ingrese su ocupacion actual' }
          ]}
        >
          <Select
            size='large'
            showSearch
            placeholder='Seleccione su ocupacion'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            className='control-form'
          >
            {ocupaciones.map((ocupacion) => (
              <Option key={ocupacion.id} value={ocupacion.id}>
                {ocupacion.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
        >
          <Input
            size='large'
            placeholder='Usuario'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
        >
          <Input.Password
            size='large'
            placeholder='Contraseña'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
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
            onPaste={(e) => {
              e.preventDefault()
              return false
            }}
            onCopy={(e) => {
              e.preventDefault()
              return false
            }}
            size='large'
            placeholder='Confirme contraseña'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
          />
        </Form.Item>
        <Form.Item
          name='referido_cc'
          rules={[{ message: 'Por favor ingrese su contraseña' }]}
          help={referidoText !== null ? referidoText : 'Debe ingresar la CC del referido'}
          validateStatus={referidoStatus}
        >
          <Input
            size='large'
            placeholder='Referido por'
            className='form-control form-control-solid h-auto py-4 px-6 rounded'
            onChange={(e) => handleChangeReferido(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='terminos'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error('Debe aceptar los Terminos y Condiciones')
                  )
            }
          ]}
        >
          <Checkbox>
            <Link to='/'>
              Acepto los Terminos y Condiciones
            </Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            block
            loading={isLoading || ''}
          >
            Registrarse
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default injectIntl(connect(null, auth.actions)(Registration))
