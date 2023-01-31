import React from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const ModalFormCreate = ({ visible, onCreate, onCancel }) => {
  const [register] = Form.useForm()
  return (
    <>
      <Modal
        visible={visible}
        title='Crear un nivel de estudio'
        okText='Crear'
        cancelText='Cancelar'
        onCancel={onCancel}
        onOk={() => {
          register
            .validateFields()
            .then(values => {
              onCreate(values)
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
          form={register}
        >
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el nombre de la profesion'
              }
            ]}
          >
            <Input size='large' placeholder='Nivel de estudio' />
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
