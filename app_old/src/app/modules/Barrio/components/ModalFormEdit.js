import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import http from '../../../../utils/axios'
import PropTypes from 'prop-types'

const { Option } = Select

const ModalFormEdit = ({
  title,
  okText,
  cancelText,
  visible,
  onEdit,
  onCancel,
  barrio
}) => {
  useEffect(() => {
    fetchComunas()
  }, [])

  const [form] = Form.useForm()
  const [comunas, setComunas] = useState([])

  const fetchComunas = () => {
    http.get('/api/v1/comunas/').then(response => {
      setComunas(response.data)
    })
  }
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
            .then(values => {
              values.id = barrio[0].id
              onEdit(values)
            })
            .catch(info => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          className='space-y-6'
          layout='vertical'
          name='register'
          form={form}
          fields={barrio}
        >
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el nombre del barrio'
              }
            ]}
          >
            <Input
              size='large'
              placeholder='Nombre'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='comuna_id'
            rules={[
              { required: true, message: 'Por favor, seleccione una comuna' }
            ]}
          >
            <Select
              size='large'
              showSearch
              placeholder='Seleccione una comuna'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {comunas.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

ModalFormEdit.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  visible: PropTypes.bool,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  barrio: PropTypes.any
}

export default ModalFormEdit
