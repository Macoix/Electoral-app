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
  puesto
}) => {
  useEffect(() => {
    fetchDepartamentos()
    fetchMunicipios()
  }, [])

  const [form] = Form.useForm()
  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])

  const fetchDepartamentos = () => {
    http.get('/api/v1/departamentos/').then((response) => {
      setDepartamentos(response.data)
    })
  }

  const fetchMunicipios = () => {
    http.get('/api/v1/municipios/').then((response) => {
      setMunicipios(response.data)
    })
  }

  const handleFormValuesChange = async (changedValues) => {
    const formFieldNamed = Object.keys(changedValues)[0]
    if (formFieldNamed === 'departamento_id') {
      const response = await http.get(
        `/api/v1/municipios/departamento/${changedValues[formFieldNamed]}`
      )
      setMunicipios(response.data.municipios)
      form.setFieldsValue({ municipios })
    }
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
              console.log(values)
              values.id = puesto[0].id
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
          onValuesChange={handleFormValuesChange}
          fields={puesto}
        >
          <Form.Item
            name='departamento_id'
            rules={[{ required: true, message: 'Por favor, seleccione un departamento' }]}
          >
            <Select
              size='large'
              showSearch
              placeholder='Seleccione un departamento'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {departamentos.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='municipio_id'
            rules={[{ required: true, message: 'Por favor, seleccione un municipio' }]}
          >
            <Select
              size='large'
              showSearch
              placeholder='Seleccione un municipio'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {municipios.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='nuit'
            rules={[{ required: true, message: 'Por favor ingrese el Nuit' }]}
          >
            <Input
              size='large'
              placeholder='Nuit'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='direccion'
            rules={[{ required: true, message: 'Por favor ingrese la direccion' }]}
          >
            <Input
              size='large'
              placeholder='Direccion'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='puesto'
            rules={[
              { required: true, message: 'Por favor ingrese el nombre del puesto' }
            ]}
          >
            <Input
              size='large'
              placeholder='Puesto de votacion'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='mesa'
            rules={[{ required: true, message: 'Por favor ingrese la Mesa de votacion' }]}
          >
            <Input
              size='large'
              placeholder='Mesa de votacion'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='Femenino'
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el numero de votantes femeninos'
              }
            ]}
          >
            <Input
              size='large'
              placeholder='Votantes femeninos'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </Form.Item>
          <Form.Item
            name='Masculino'
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el numero de votantes masculinos'
              }
            ]}
          >
            <Input
              size='large'
              placeholder='Votantes masculinos'
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
  puesto: PropTypes.any
}

export default ModalFormEdit
