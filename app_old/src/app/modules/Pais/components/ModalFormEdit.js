import React from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const ModalFormEdit = ({ visible, onEdit, onCancel, pais }) => {
  const [form] = Form.useForm()
  return (
    <>
      <Modal
        visible={visible}
        title='Editar Pais'
        okText='Guardar'
        cancelText='Cancelar'
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values.id = pais[0].id
              onEdit(values)
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
          form={form}
          fields={pais}
        >
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Por favor ingrese el nombre del pais' }]}
          >
            <Input
              size='large'
              placeholder='Nombre'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[{ required: true, message: 'Por favor ingrese el codigo del pais' }]}
          >
            <Input
              size='large'
              placeholder='Codigo'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
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
  pais: PropTypes.any
}

export default ModalFormEdit
