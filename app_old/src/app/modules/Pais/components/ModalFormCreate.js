import React from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const ModalFormCreate = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <>
      <Modal
        visible={visible}
        title='Crear Pais'
        okText='Crear'
        cancelText='Cancelar'
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form form={form} layout='vertical' name='form_in_modal'>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input
              size='large'
              placeholder='Nombre'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[{ required: true, message: 'Por favor ingrese el codigo' }]}
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

ModalFormCreate.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func
}

export default ModalFormCreate
