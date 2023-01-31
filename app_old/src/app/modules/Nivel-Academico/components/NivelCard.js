import React, { useEffect, useState } from 'react'
import { Icon } from '@material-ui/core'
import { Dropdown } from 'react-bootstrap'
import { Table, Button, Tooltip, message, Input, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { DropdownCustomToggler } from '../../../../_metronic/_partials/dropdowns'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'

import FormUserEdit from './ModalFormEdit'
import FormUserCreate from './ModalFormCreate'
import ModalDelete from '../../../components/ModalDelete'
import ImportModal from '../../../components/uploader'
import ExportBtn from '../../../components/ExportExcelBtn'

import http from '../../../../utils/axios'

const NivelCard = ({ className, title, subtitle }) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [estudios, setEstudios] = useState({})
  const [dataSource, setDataSource] = useState(data)
  const [selectedKeys, setSelectedKeys] = useState('')

  const getSearchProps = (dataIndex, title) => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${title}`}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className='boton'
            type='primary'
            onClick={() => handleSearch(dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset()}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    )
  })

  const handleSearch = dataIndex => {
    let filteredData = []
    if (selectedKeys !== '') {
      filteredData = dataSource.filter(entry =>
        entry[dataIndex]
          ? entry[dataIndex]
            .toLowerCase()
            .includes(selectedKeys[0].toLowerCase())
          : ''
      )
      setDataSource(filteredData)
    } else {
      setSelectedKeys('')
      setDataSource(data)
    }
  }

  const handleReset = () => {
    setSelectedKeys('')
    setDataSource(data)
  }

  const labels = [
    {
      label: 'Estudios',
      value: 'name'
    }
  ]

  const columns = [
    {
      title: 'Estudios',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getSearchProps('name', 'Nombre')
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      render: item => moment(item).format('DD-MM-YYYY')
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
          <Tooltip title='Eliminar'>
            <Button
              className='d-inline-flex align-items-center justify-content-center mr-2'
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

  const handleButtonClickEdit = async row => {
    const url = `api/v1/estudios/get/${row.id}`
    await http.get(url).then(response => {
      setEstudios([
        {
          id: response.data.id
        },
        {
          name: ['name'],
          value: response.data.name
        }
      ])
      setVisibleEdit(true)
    })
  }
  const handleButtonClickCreate = () => {
    setVisibleCreate(true)
  }

  const handleTableChange = pagination => {
    fetch({ pagination })
  }

  const handleButtonClickDelete = id => {
    const props = {
      title: 'Esta seguro de eliminar este nivel de estudio?',
      content: 'Tenga en cuenta que no podrá recuperarlo',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      id,
      onDelete
    }
    ModalDelete(props)
  }

  const onDelete = id => {
    const url = `api/v1/estudios/delete/${id}`
    http.delete(url).then(response => {
      message.success({ content: response.data.message })
      fetch({ pagination })
    })
  }

  const getParams = params => ({
    size: params.pagination.pageSize,
    page: params.pagination.current
  })

  const onEdit = async values => {
    const url = `api/v1/estudios/put/${values.id}`
    await http.put(url, values).then(response => {
      message.success({ content: response.data.message })
      fetch({ pagination })
    })
    setVisibleEdit(false)
  }

  const onCreate = async values => {
    const url = 'api/v1/estudios/'
    const data = {
      ...values
    }
    http
      .post(url, data)
      .then(response => {
        setVisibleCreate(false)
        message.success({ content: response.data.message })
        fetch({ pagination })
      })
      .catch(error => {
        setVisibleCreate(false)
        message.error({
          content: error.response.data.message || 'hubo un error'
        })
      })
  }

  const fetch = (params = {}) => {
    setLoading(true)
    const url = 'api/v1/estudios/pagination'
    http.get(url, { params: getParams(params) }).then(response => {
      setPagination({
        ...params.pagination,
        total: response.data.estudios.count
      })
      setData(response.data.estudios.rows)
      setDataSource(response.data.estudios.rows)
      setLoading(false)
    })
  }
  useEffect(() => {
    fetch({ pagination })
  }, [])// eslint-disable-line

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
              <Dropdown.Toggle variant='primary' id='dropdown-toggle-top'>
                <i className='fas fa-file-export' /> Exportar
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
                <i className='ki ki-plus icon-sm' />
              </span>
              Nuevo nivel academico
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
                      href={() => false}
                      className='navi-link'
                      onClick={() => setVisibleUpload(true)}
                    >
                      <span className='navi-icon'>
                        <FontAwesomeIcon icon={faFileExcel} />
                      </span>
                      <span className='navi-text'>Importar</span>
                    </a>
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
            rowKey={item => item.id}
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
          estudios={estudios}
          okText='Guardar'
          cancelText='Cancelar'
          title='Editar nivel academico'
        />

        <FormUserCreate
          okText='Crear'
          cancelText='Cancelar'
          title='Crear nivel academico'
          visible={visibleCreate}
          onCreate={onCreate}
          onCancel={() => {
            setVisibleCreate(false)
          }}
        />
        <ImportModal
          url={`${process.env.REACT_APP_API_URL}/api/v1/estudios/upload/sheet`}
          visible={visibleUpload}
          title='Importar Excel'
          cancelText='Cerrar'
          filename='Nivel_Estudio'
          onCancel={() => {
            setVisibleUpload(false)
            fetch({ pagination })
          }}
        />
      </div>
    </div>
  )
}

export default NivelCard
