/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Icon } from '@material-ui/core'
import { Dropdown } from 'react-bootstrap'
import { Table, Button, Tooltip, message, Input, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { DropdownCustomToggler } from '../../../../_metronic/_partials/dropdowns'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'

import EnhancedTable from '../../../components/table/Table'

import FormUserEdit from './ModalFormEdit'
import FormUserCreate from './ModalFormCreate'
import ModalDelete from '../../../components/ModalDelete'
import ImportModal from '../../../components/uploader'
import ExportBtn from '../../../components/ExportExcelBtn'
import Snackbar from '../../../components/Snackbar'

import http from '../../../../utils/axios'

const PaisCard = ({ className, title, subtitle }) => {
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
  const [pais, setPais] = useState({})
  const [dataSource, setDataSource] = useState(data)
  const [selectedKeys, setSelectedKeys] = useState('')
  const [filtered, setFiltered] = useState('')
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [editSnackBar, setEditSnackBar] = useState(false)
  const [deleteSnackBar, setDeleteSnackBar] = useState(false)

  const getSearchProps = (dataIndex, title) => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
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
          ? entry[dataIndex]
            .toString()
            .toLowerCase()
            .includes(selectedKeys[0].toLowerCase())
          : ''
      )
      if (filteredData === '') {
        filteredData = dataSource.filter(
          (entry) => entry[dataIndex] === selectedKeys[0].toLowerCase()
        )
      }
      setDataSource(filteredData)
      setFiltered(true)
    } else {
      // setSelectedKeys('')
      setDataSource(data)
      setFiltered(false)
    }
  }

  const handleReset = () => {
    setSelectedKeys('')
    setDataSource(data)
    setFiltered(false)
  }

  const headRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'code', numeric: true, disablePadding: false, label: 'Codigo' },
    { id: 'createAt', numeric: true, disablePadding: false, label: 'Creado' }
  ]

  const labels = [
    {
      label: 'Nombre',
      value: 'name'
    },
    {
      label: 'Codigo',
      value: 'code'
    }
  ]

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getSearchProps('name', 'Pais')
    },
    {
      title: 'Codigo',
      dataIndex: 'code',
      sorter: (a, b) => a.code - b.code,
      ...getSearchProps('code', 'Codigo')
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
              icon={
                <Icon>
                  edit
                </Icon>
              }
              onClick={() => handleButtonClickEdit(row)}
            />
          </Tooltip>
          <Tooltip title='Eliminar'>
            <Button
              className='d-inline-flex align-items-center justify-content-center mr-2'
              type='primary'
              shape='circle'
              icon={
                <Icon>
                  delete
                </Icon>
              }
              danger
              onClick={() => handleButtonClickDelete(row.id)}
            />
          </Tooltip>
        </div>
      )
    }
  ]

  const handleButtonClickEdit = async (row) => {
    await http.get(`/api/v1/paises/get/${row.id}`).then((response) => {
      setPais([
        {
          id: response.data.pais.id
        },
        {
          name: ['name'],
          value: response.data.pais.name
        },
        {
          name: ['code'],
          value: response.data.pais.code
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
      title: 'Esta seguro de eliminar este pais?',
      content: 'Tenga en cuenta que no podrá recuperarlo',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      id,
      onDelete
    }
    ModalDelete(props)
  }

  const onDelete = (id) => {
    http.delete(`/api/v1/paises/delete/${id}`).then((response) => {
      setDeleteSnackBar(true)
      fetch({ pagination })
    })
  }

  const getParams = (params) => ({
    size: params.pagination.pageSize,
    page: params.pagination.current
  })

  const onEdit = async (values) => {
    await http.put(`/api/v1/paises/put/${values.id}`, values).then((response) => {
      setEditSnackBar(true)
      fetch({ pagination })
    })
    setVisibleEdit(false)
  }

  const onCreate = async (values) => {
    const data = {
      ...values
    }
    http
      .post('/api/v1/paises/', data)
      .then((response) => {
        setVisibleCreate(false)
        // eslint-disable-next-line no-unused-expressions
        setOpenSnackBar(true)
        fetch({ pagination })
      })
      .catch((error) => {
        setVisibleCreate(false)
        message.error({ content: error.response.data.message || 'hubo un error' })
      })
  }

  const handleClose = () => {
    setOpenSnackBar(false)
    setEditSnackBar(false)
    setDeleteSnackBar(false)
  }
  const fetchData = async (params = {}) => {
    setLoading(true)
    await http
      .get('/api/v1/paises/pagination', { params: getParams(params) })
      .then((response) => {
        setPagination({
          ...params.pagination,
          total: response.data.paises.count
        })
        setData(response.data.paises.rows)
        setDataSource(response.data.paises.rows)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData({ pagination })
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
              Nuevo pais
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
            rowKey={(item) => item.id}
            dataSource={dataSource}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
          />
          <EnhancedTable
            headRows={headRows}
            rows={dataSource}
          />
        </div>
        {/* end::Body */}
        <FormUserEdit
          visible={visibleEdit}
          onEdit={onEdit}
          onCancel={() => {
            setVisibleEdit(false)
          }}
          pais={pais}
        />

        <FormUserCreate
          visible={visibleCreate}
          onCreate={onCreate}
          onCancel={() => {
            setVisibleCreate(false)
          }}
        />

        <ImportModal
          url={`${process.env.REACT_APP_API_URL}/api/v1/paises/upload/sheet`}
          visible={visibleUpload}
          title='Importar Excel'
          cancelText='Cerrar'
          filename='Paises'
          onCancel={() => {
            setVisibleUpload(false)
            fetch({ pagination })
          }}
        />
        <Snackbar
          variant='success'
          message='Pais creado con exito'
          open={openSnackBar}
          onClose={handleClose}
        />
        <Snackbar
          variant='success'
          message='Pais editado con exito'
          open={editSnackBar}
          onClose={handleClose}
        />
        <Snackbar
          variant='success'
          message='Pais borrado con exito'
          open={deleteSnackBar}
          onClose={handleClose}
        />
      </div>
    </div>
  )
}

export default PaisCard
