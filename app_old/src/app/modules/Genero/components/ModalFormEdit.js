import React from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const ModalFormEdit = ({
  title,
  okText,
  cancelText,
  visible,
  onEdit,
  onCancel,
  ambito
}) => {
  const [form] = Form.useForm()
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
              values.id = ambito[0].id
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
          fields={ambito}
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
  ambito: PropTypes.any
}

export default ModalFormEdit
