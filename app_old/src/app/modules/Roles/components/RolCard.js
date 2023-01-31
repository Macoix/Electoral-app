import React, { useEffect, useState } from 'react'
import { Icon } from '@material-ui/core'

import { Table, Button, Tooltip, message, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'

import FormUserEdit from './ModalFormEdit'

import http from '../../../../utils/axios'

const RolCard = ({ className, title, subtitle }) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [rol, setRol] = useState({})
  const [dataSource, setDataSource] = useState(data)
  const [selectedKeys, setSelectedKeys] = useState('')

  useEffect(() => {
    fetch({ pagination })
  }, [])// eslint-disable-line

  const getSearchProps = (dataIndex, title) => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${title}`}
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
    let filteredData = []
    if (selectedKeys !== '') {
      filteredData = dataSource.filter((entry) =>
        entry[dataIndex]
          ? entry[dataIndex].toLowerCase().includes(selectedKeys[0].toLowerCase())
          : ''
      )
      setDataSource(filteredData)
    } else {
      setDataSource(data)
    }
  }

  const handleReset = () => {
    setSelectedKeys('')
    setDataSource(data)
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getSearchProps('name', 'Nombre')
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
              className='d-inline-flex align-items-center justify-content-center mr-2'
              type='primary'
              shape='circle'
              icon={<Icon>edit</Icon>}
              onClick={() => handleButtonClickEdit(row)}
            />
          </Tooltip>
          {/* <Tooltip title='Eliminar'>
            <Button
              type='primary'
              shape='circle'
              icon={<FontAwesomeIcon icon={faTrash} />}
              danger
            />
          </Tooltip> */}
        </div>
      )
    }
  ]

  const handleButtonClickEdit = async (row) => {
    await http.get(`/api/v1/roles/get/${row.id}`).then((response) => {
      setRol([
        {
          id: response.data.rol.id
        },
        {
          name: ['name'],
          value: response.data.rol.name
        }
      ])
      setVisibleEdit(true)
    })
  }

  const handleTableChange = (pagination) => {
    fetch({ pagination })
  }

  const getParams = (params) => ({
    size: params.pagination.pageSize,
    page: params.pagination.current
  })

  const fetch = async (params = {}) => {
    setLoading(true)
    await http
      .get('/api/v1/roles/pagination', { params: getParams(params) })
      .then((response) => {
        setPagination({
          ...params.pagination,
          total: response.data.roles.count
        })
        setData(response.data.roles.rows)
        setDataSource(response.data.roles.rows)
        setLoading(false)
      })
  }

  const onEdit = async (values) => {
    await http.put(`/api/v1/roles/put/${values.id}`, values).then((response) => {
      message.success({ content: response.data.message })
      fetch({ pagination })
    })
    setVisibleEdit(false)
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
            {/* <Dropdown className='mr-2'alignRight>
              <Dropdown.Toggle
                  variant='primary'
                  id='dropdown-toggle-top'
              >
                  <i className='fas fa-file-export'></i> Exportar
              </Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu dropdown-menu-sm dropdown-menu-right'>
                <ul className='navi navi-hover py-5'>
                  <li className='navi-item'>
                    <ExportBtn
                      nameSheet='Listado de paises'
                      labels={labels}
                      url={`${process.env.REACT_APP_API_URL}/api/v1/paises/`}
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
                      <i className='ki ki-plus icon-sm'></i>
                    </span>
                    Nueva profesion
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
                          <a
                            className='navi-link'
                            onClick={() => setVisibleUpload(true)}
                          >
                              <span className='navi-icon'>
                                <FontAwesomeIcon icon={faFileExcel}/>
                              </span>
                              <span className='navi-text'>Importar</span>
                          </a>
                        </li>
                      </ul>
                    </Dropdown.Menu>
                </Dropdown> */}
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
          rol={rol}
          okText='Editar'
          cancelText='Cancelar'
          title='Editar roles'
        />
      </div>
    </div>
  )
}

export default RolCard
