import React, { useEffect, useState } from 'react'
import { Icon } from '@material-ui/core'
import { Dropdown } from 'react-bootstrap'
import { Table, Button, Tooltip, message, Input, Space } from 'antd'
import { DropdownCustomToggler } from '../../../../_metronic/_partials/dropdowns'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'

import FormUserEdit from './ModalFormEdit'
import FormUserCreate from './ModalFormCreate'
import ModalDelete from '../../../components/ModalDelete'
import ExportBtn from '../../../components/ExportExcelBtn'

import http from '../../../../utils/axios'

const PuestoCard = ({ className, title, subtitle }) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [puesto, setPuesto] = useState({})
  const [dataSource, setDataSource] = useState(data)
  const [selectedKeys, setSelectedKeys] = useState('')

  useEffect(() => {
    fetch({ pagination })
  }, []) // eslint-disable-line
  const getSearchProps = (dataIndex) => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset()} size='small' style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  })

  const handleSearch = (dataIndex) => {
    if (selectedKeys !== '') {
      const filteredData = dataSource.filter((entry) =>
        entry[dataIndex]
          ? entry[dataIndex].toString().toLowerCase().includes(selectedKeys)
          : ''
      )
      if (filteredData === []) {
        dataSource.filter((entry) => entry[dataIndex] === selectedKeys)
      }
      setDataSource(filteredData)
    } else {
      setDataSource(data)
    }
  }

  const handleReset = () => {
    setDataSource(data)
  }

  const columns = [
    {
      title: 'Departamento',
      dataIndex: 'departamento',
      render: (item) => item.name,
      sorter: (a, b) => a.departamento.localeCompare(b.departamento),
      ...getSearchProps('departamento')
    },
    {
      title: 'Municipio',
      dataIndex: 'municipio',
      render: (item) => item.name,
      sorter: (a, b) => a.municipio.localeCompare(b.municipio),
      ...getSearchProps('municipio')
    },
    {
      title: 'Direccion',
      dataIndex: 'direccion',
      sorter: (a, b) => a.direccion.localeCompare(b.direccion),
      ...getSearchProps('direccion')
    },
    {
      title: 'Puesto',
      dataIndex: 'puesto',
      sorter: (a, b) => a.puesto.localeCompare(b.puesto),
      ...getSearchProps('puesto')
    },
    {
      title: 'Mesa',
      dataIndex: 'mesa',
      sorter: (a, b) => a.mesa.localeCompare(b.mesa),
      ...getSearchProps('puesto')
    },
    {
      title: 'Femenino',
      dataIndex: 'Femenino',
      sorter: (a, b) => a.Masculino.localeCompare(b.mesa),
      ...getSearchProps('puesto')
    },
    {
      title: 'Masculino',
      dataIndex: 'Masculino',
      sorter: (a, b) => a.Masculino.localeCompare(b.mesa),
      ...getSearchProps('puesto')
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      sorter: (a, b) => a.Total.localeCompare(b.mesa),
      ...getSearchProps('puesto')
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      render: (item) => moment(item).format('DD-MM-YYYY')
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: (text, row, index) => (
        <div className='flex justify-evenly'>
          <Tooltip title='Editar'>
            <Button
              type='primary'
              shape='circle'
              icon={<Icon>edit</Icon>}
              onClick={() => handleButtonClickEdit(row)}
            />
          </Tooltip>
          <Tooltip title='Eliminar'>
            <Button
              type='primary'
              shape='circle'
              icon={<Icon>delete</Icon>}
              danger
              onClick={() => handleButtonClickDelete(row.id)}
            />
          </Tooltip>
        </div>
      )
    }
  ]

  const handleButtonClickEdit = async (row) => {
    await http.get(`/api/v1/votaciones/get/${row.id}`).then((response) => {
      setPuesto([
        {
          id: response.data.id
        },
        {
          name: ['nuit'],
          value: response.data.nuit
        },
        {
          name: ['departamento_id'],
          value: response.data.departamento_id
        },
        {
          name: ['municipio_id'],
          value: response.data.municipio_id
        },
        {
          name: ['puesto'],
          value: response.data.puesto
        },
        {
          name: ['direccion'],
          value: response.data.direccion
        },
        {
          name: ['mesa'],
          value: response.data.mesa
        },
        {
          name: ['Femenino'],
          value: response.data.Femenino
        },
        {
          name: ['Masculino'],
          value: response.data.Masculino
        }
      ])
      setVisibleEdit(true)
    })
  }
  const handleButtonClickCreate = () => {
    setVisibleCreate(true)
  }

  const handleTableChange = (pagination) => {
    fetch({ pagination })
  }

  const handleButtonClickDelete = (id) => {
    const props = {
      title: 'Esta seguro de eliminar este puesto?',
      content: 'Tenga en cuenta que no podrá recuperarlo',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      id,
      onDelete
    }
    ModalDelete(props)
  }

  const getParams = (params) => ({
    size: params.pagination.pageSize,
    page: params.pagination.current
  })

  const fetch = async (params = {}) => {
    setLoading(true)
    await http
      .get('/api/v1/votaciones/pagination', { params: getParams(params) })
      .then((response) => {
        setPagination({
          ...params.pagination,
          total: response.data.Puestos.count
        })
        setData(response.data.Puestos.rows)
        setDataSource(response.data.Puestos.rows)
        setLoading(false)
      })
  }

  const onEdit = async (values) => {
    await http.put(`/api/v1/Votaciones/put/${values.id}`, values).then((response) => {
      message.success({ content: response.data.message })
      fetch({ pagination })
    })
    setVisibleEdit(false)
  }

  const onCreate = async (values) => {
    const data = {
      ...values
    }
    http
      .post('/api/v1/Votaciones/', data)
      .then((response) => {
        setVisibleCreate(false)
        message.success({ content: response.data.message })
        fetch({ pagination })
      })
      .catch((error) => {
        setVisibleCreate(false)
        message.error({ content: error.response.data.message || 'hubo un error' })
      })
  }

  const onDelete = (id) => {
    http
      .delete(`/api/v1/votaciones/delete/${id}`)
      .then((response) => {
        message.success({ content: response.data.message })
        fetch({ pagination })
      })
  }

  return (
    <div>
      <div className={`card card-custom shadow ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 py-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label font-weight-bolder text-dark'>
              {title}
            </span>
            {subtitle && (
              <span className='text-muted mt-3 font-weight-bold font-size-sm'>
                {subtitle}
              </span>
            )}
          </h3>
          <div className='card-toolbar'>
            <Dropdown className='mr-2' alignRight>
              <Dropdown.Toggle
                variant='primary'
                id='dropdown-toggle-top'
              >
                <i className='fas fa-file-export' /> Exportar
              </Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu dropdown-menu-sm dropdown-menu-right'>
                <ul className='navi navi-hover py-5'>
                  <li className='navi-item'>
                    <ExportBtn
                      nameSheet='Listado de paises'
                      // labels={labels}
                      // url={`${process.env.REACT_APP_API_URL}/api/v1/paises/`}
                    />
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
            <button
              className='btn btn-success font-weight-bolder font-size-sm d-flex align-items-center ml-2'
              onClick={() => handleButtonClickCreate()}
            >
              <span className='mr-2 d-flex'>
                <i className='ki ki-plus icon-sm' />
              </span>
              Nuevo puesto
            </button>
            <Dropdown className='dropdown-inline ml-2' alignRight>
              <Dropdown.Toggle
                id='dropdown-toggle-top'
                as={DropdownCustomToggler}
              >
                <i className='ki ki-bold-more-ver' />
              </Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu dropdown-menu-sm dropdown-menu-right'>
                <ul className='navi navi-hover py-5'>
                  <li className='navi-item'>
                    {/* <a
                      className='navi-link'
                      onClick={() => setVisibleUpload(true)}
                    >
                        <span className='navi-icon'>
                          <FontAwesomeIcon icon={faFileExcel}/>
                        </span>
                        <span className='navi-text'>Importar</span>
                    </a> */}
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-0'>
          <Table
            columns={columns}
            rowKey={(item) => item.id}
            dataSource={dataSource}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
        {/* end::Body */}
        <FormUserEdit
          visible={visibleEdit}
          onEdit={onEdit}
          onCancel={() => {
            setVisibleEdit(false)
          }}
          puesto={puesto}
          okText='Editar'
          cancelText='Cancelar'
          title='Editar Puesto de votacion'
        />

        <FormUserCreate
          okText='Crear'
          cancelText='Cancelar'
          title='Crear Puesto de Votacion'
          visible={visibleCreate}
          onCreate={onCreate}
          onCancel={() => {
            setVisibleCreate(false)
          }}
        />
      </div>
    </div>
  )
}

export default PuestoCard
