import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { LockOutlined } from '@ant-design/icons'
// import { faEnvelope, faAddressCard } from '@fortawesome/free-regular-svg-icons'
import http from '../../../../utils/axios'
import PropTypes from 'prop-types'

const { Option } = Select

const ModalFormEdit = ({ visible, onEdit, onCancel, user }) => {
  useEffect(() => {
    fetchRoles()
  }, [])

  const [form] = Form.useForm()
  const [roles, setRoles] = useState([])

  const fetchRoles = async () => {
    await http.get('/api/v1/roles').then((response) => {
      setRoles(response.data)
    })
  }
  return (
    <>
      <Modal
        visible={visible}
        title='Editar Usuario'
        okText='Guardar'
        cancelText='Cancelar'
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values.id = user[0].id
              // form.resetFields()
              onEdit(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          form={form}
          layout='vertical'
          name='form_in_modal'
          // fields={[{ name: ['username'], value: 'hola' }]}
          fields={user}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Por favor ingrese username' }]}
          >
            <Input
              size='large'
              // prefix={<FontAwesomeIcon icon={faAddressCard} />}
              placeholder='Username'
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
            rules={[{ message: 'Por favor ingrese su contraseña' }]}
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
          <Form.Item
            name='idRol'
            rules={[{ required: true, message: 'Por favor seleccione un rol' }]}
          >
            <Select
              size='large'
              showSearch
              placeholder='Seleccione un rol'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {roles.map((rol) => (
                <Option key={rol.id} value={rol.id}>
                  {rol.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='isActive'
            rules={[{ required: true, message: 'Por favor seleccione un estado' }]}
          >
            <Select
              size='large'
              showSearch
              placeholder='Seleccione un estado'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option key='true'>
                Activo
              </Option>
              <Option key='false' value={false}>
                Inactivo
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

ModalFormEdit.propTypes = {
  visible: PropTypes.bool,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  user: PropTypes.any
}

export default ModalFormEdit
