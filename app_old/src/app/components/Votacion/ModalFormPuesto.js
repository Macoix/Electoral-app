import React, { useEffect, useState } from 'react'
import { Modal, Form, Select } from 'antd'
import http from '../../../utils/axios'
import PropTypes from 'prop-types'

const { Option } = Select

const ModalFormEdit = ({
  title,
  okText,
  cancelText,
  visible,
  onEdit,
  onCancel,
  puesto
}) => {
  useEffect(() => {
    fetchPuestos()
  }, [])

  const [form] = Form.useForm()
  const [puestos, setPuestos] = useState([])

  const fetchPuestos = () => {
    http.get('/api/v1/votaciones/').then((response) => {
      setPuestos(response.data)
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
            .then((values) => {
              values.id = puesto[0].id
              onEdit(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form form={form} layout='vertical' name='form_in_modal' fields={puesto}>
          <Form.Item
            name='votacion_id'
            rules={[
              { required: true, message: 'Por favor, seleccione un Puesto de votacion' }
            ]}
          >
            <Select
              size='large'
              showSearch
              placeholder='Seleccione un Puesto'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {puestos.map((item) => (
                <Option key={item.id} value={item.id}>
                  {`${item.puesto} | ${item.departamento.name} | ${item.municipio.name} | ${item.mesa}`}
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
  puesto: PropTypes.any
}

export default ModalFormEdit
