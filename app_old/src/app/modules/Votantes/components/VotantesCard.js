/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Icon } from '@material-ui/core'
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { DropdownCustomToggler } from '../../../../_metronic/_partials/dropdowns'
import { Table, Button, Tooltip, message, Input, Space, Spin } from 'antd'
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons'
import http from '../../../../utils/axios'
import FormUserEdit from '../../../components/Persona/ModalFormEdit'
import FormUserCreate from '../../../components/Persona/ModalFormCreate'
import FormUserPuesto from '../../../components/Votacion/ModalFormPuesto'
import ModalDelete from '../../../components/ModalDelete'
import ImportModal from '../../../components/uploader'
import ExportBtn from '../../../components/ExportExcelBtn'
import Expandible from '../../../components/Expandible'
import moment from 'moment'
// import { toAbsoluteUrl } from '../../../_helpers'

const VotantesCard = ({ className, title, subtitle }) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visiblePuesto, setVisiblePuesto] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [persona, setPersona] = useState({})
  const [dataSource, setDataSource] = useState(data)
  const [selectedKeys, setSelectedKeys] = useState('')
  const [filtered, setFiltered] = useState('')
  const [puesto, setPuesto] = useState()

  const getSearchProps = (dataIndex, title, child) => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar en ${title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(dataIndex, child)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(dataIndex, child)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset()} size='small' style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  })

  const handleSearch = (dataIndex, child) => {
    let filteredData = []
    if (selectedKeys !== '') {
      if (child === undefined) {
        filteredData = dataSource.filter((entry) =>
          entry[dataIndex]
            ? entry[dataIndex].toLowerCase().includes(selectedKeys[0].toLowerCase())
            : ''
        )
      } else {
        filteredData = dataSource.filter((entry) =>
          entry[dataIndex][child]
            ? entry[dataIndex][child]
              .toLowerCase()
              .includes(selectedKeys[0].toLowerCase())
            : ''
        )
      }
      setDataSource(filteredData)
      setFiltered(true)
    } else {
      setDataSource(data)
      setFiltered(false)
    }
  }

  const handleReset = () => {
    setSelectedKeys('')
    setDataSource(data)
    setFiltered(false)
  }

  const labels = [
    {
      label: 'documento',
      value: 'documento'
    },
    {
      label: 'Primer nombre',
      value: 'primerNombre'
    },
    {
      label: 'Segundo nombre',
      value: 'segundoNombre'
    },
    {
      label: 'Primer Apellido',
      value: 'primerApellido'
    },
    {
      label: 'Segundo Apellido',
      value: 'segundoApellido'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: 'Telefono',
      value: 'telefono'
    },
    {
      label: 'Pais',
      value: 'pais',
      child: 'name',
      children: true
    },
    {
      label: 'Departamento',
      value: 'departamento',
      child: 'name',
      children: true
    },
    {
      label: 'Municipio',
      value: 'municipio',
      child: 'name',
      children: true
    },
    {
      label: 'Comuna',
      value: 'comuna',
      child: 'name',
      children: true
    },
    {
      label: 'Barrio',
      value: 'barrio',
      child: 'name',
      children: true
    },
    {
      label: 'Direccion',
      value: 'direccion'
    },
    {
      label: 'Genero',
      value: 'genero',
      child: 'name',
      children: true
    },
    {
      label: 'Nivel Academico',
      value: 'perfil_profesional',
      twoLevelValue: 'estudios',
      child: 'name',
      twoLevelChildren: true
    },
    {
      label: 'Profesión',
      value: 'perfil_profesional',
      twoLevelValue: 'profesion',
      child: 'name',
      twoLevelChildren: true
    },
    {
      label: 'Ocupación',
      value: 'perfil_profesional',
      child: 'name',
      children: true
    }
  ]

  const columns = [
    {
      title: 'Primer Nombre',
      dataIndex: 'primerNombre',
      sorter: (a, b) => a.primerNombre.length - b.primerNombre.length,
      ...getSearchProps('primerNombre', 'Primer Nombre')
    },
    {
      title: 'Primer Apellido',
      dataIndex: 'primerApellido',
      sorter: (a, b) => a.primerApellido.length - b.primerApellido.length,
      ...getSearchProps('primerApellido', 'Primer apellido')
    },
    {
      title: 'Documento',
      dataIndex: 'documento',
      sorter: (a, b) => a.documento - b.documento,
      ...getSearchProps('documento', 'Documento')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getSearchProps('email', 'Email')
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      // sorter: (a, b) => a.name.localeCompare(b.name),
      ...getSearchProps('telefono', 'Telefono')
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      render: (item) => moment(item).format('DD-MM-YYYY')
    },
    {
      title: 'Genero',
      dataIndex: 'genero',
      render: (item) => item.name,
      sorter: (a, b) => a.genero.name.localeCompare(b.genero.name),
      ...getSearchProps('genero', 'Genero', 'name')
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: (text, row, index) => (
        <div className='flex justify-evenly'>
          <Tooltip title='Añadir Puesto de votacion'>
            <Button
              className='d-inline-flex justify-content-center align-items-center mr-2'
              type='primary'
              shape='circle'
              icon={
                <Icon>
                  how_to_vote
                </Icon>
              }
              onClick={() => handleButtonClickVotacion(row)}
            />
          </Tooltip>
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
              className='d-inline-flex align-items-center justify-content-center '
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
    await http.get(`/api/v1/personas/get/${row.id}`).then((response) => {
      setPersona([
        {
          id: response.data.persona.id
        },
        {
          perfil_profesional_id: response.data.persona.perfil_profesional_id
        },
        {
          name: ['documento'],
          value: response.data.persona.documento
        },
        {
          name: ['primerNombre'],
          value: response.data.persona.primerNombre
        },
        {
          name: ['segundoNombre'],
          value: response.data.persona.segundoNombre
        },
        {
          name: ['primerApellido'],
          value: response.data.persona.primerNombre
        },
        {
          name: ['segundoApellido'],
          value: response.data.persona.primerNombre
        },
        {
          name: ['email'],
          value: response.data.persona.email
        },
        {
          name: ['fecha_nacimiento'],
          value: moment(response.data.persona.fecha_nacimiento)
        },
        {
          name: ['telefono'],
          value: response.data.persona.telefono
        },
        {
          name: ['idGenero'],
          value: response.data.persona.idGenero
        },
        {
          name: ['idPais'],
          value: response.data.persona.idPais
        },
        {
          name: ['idDepartamento'],
          value: response.data.persona.idDepartamento
        },
        {
          name: ['idMunicipio'],
          value: response.data.persona.idMunicipio
        },
        {
          name: ['idComuna'],
          value: response.data.persona.idComuna
        },
        {
          name: ['idBarrio'],
          value: response.data.persona.idBarrio
        },
        {
          name: ['estudios_id'],
          value:
            response.data.persona.perfil_profesional?.estudios_id === undefined
              ? ''
              : response.data.persona.perfil_profesional?.estudios_id
        },
        {
          name: ['profesion_id'],
          value:
            response.data.persona.perfil_profesional?.profesion_id === undefined
              ? ''
              : response.data.persona.perfil_profesional?.profesion_id
        },
        {
          name: ['ocupacion'],
          value:
            response.data.persona.perfil_profesional?.ocupacion === undefined
              ? ''
              : response.data.persona.perfil_profesional?.ocupacion
        },
        {
          name: ['direccion'],
          value: response.data.persona.direccion
        }
      ])
      setVisibleEdit(true)
    })
  }

  const handleButtonClickVotacion = async (row) => {
    await http.get(`/api/v1/personas/get/${row.id}`).then((response) => {
      setPuesto([
        {
          id: response.data.persona.id
        },
        {
          name: ['votacion_id'],
          value:
            response.data.persona.votacion_id === null
              ? ''
              : response.data.persona.votacion_id
        }
      ])
      setVisiblePuesto(true)
    })
  }

  // eslint-disable-next-line no-unused-vars
  const handleButtonClickCreate = () => {
    setVisibleCreate(true)
  }

  const handleTableChange = (pagination) => {
    // console.log(pagination)
    return fetch({ pagination })
  }

  const handleButtonClickDelete = (id) => {
    const props = {
      title: 'Esta seguro de eliminar este persona?',
      content: 'Tenga en cuenta que no podrá recuperarlo',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      id,
      onDelete
    }
    ModalDelete(props)
  }

  const onDelete = (id) => {
    // eslint-disable-next-line no-unused-vars
    const deleteBarrio = http.delete(`/api/v1/personas/delete/${id}`).then((response) => {
      message.success({ content: response.data.message })
      fetch({ pagination })
    })
  }



  const onEdit = async (values) => {
    await http.put(`/api/v1/personas/put/${values.id}`, values).then((response) => {
      message.success({ content: response.data.message })
      fetch({ pagination })
    })
    setVisibleEdit(false)
  }

  const onCreate = async (values) => {
    console.log(values)
    const data = {
      ...values
    }
    const register = http
      .post('/api/v1/personas/', data)
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

  const onEditPuesto = async (values) => {
    await http.put(`/api/v1/personas/put/${values.id}`, values).then((response) => {
      message.success({ content: response.data.message })
      fetch({ pagination })
    })
    setVisiblePuesto(false)
  }

  const getParams = (params) => ({
    size: params.pagination.pageSize,
    page: params.pagination.current
  })

  const fetchData = async (parametros) => {
    setLoading(true)
    await http
      .get('/api/v1/personas/pagination', { params: getParams(parametros) })
      .then((response) => {
        setPagination({
          ...parametros.pagination,
          total: response.data.personas.count
        })
        setData(response.data.personas.rows)
        setDataSource(response.data.personas.rows)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData({ pagination })
  }, []) // eslint-disable-line

  return (
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
                    nameSheet='Listado de votantes'
                    labels={labels}
                    url={`${process.env.REACT_APP_API_URL}/api/v1/personas/`}
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
            Nuevo votante
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
          onChange={(paginate) => handleTableChange(paginate)}
          expandable={{
            expandedRowRender: (record) => {
              console.log(record)
              return (
                <Expandible
                  documento={record.documento}
                  primerNombre={record.primerNombre}
                  segundoNombre={record.segundoNombre}
                  primerApellido={record.primerApellido}
                  segundoApellido={record.segundoApellido}
                  email={record.email}
                  telefono={record.telefono}
                  pais={record.pais.name}
                  departamento={record.departamento.name}
                  municipio={record.municipio.name}
                  comuna={record.comuna.name}
                  barrio={record.barrio.name}
                  direccion={record.direccion}
                  genero={record.genero.name}
                  fechaNacimiento={record.fecha_nacimiento}
                  estudios={
                    record?.perfil_profesional?.estudios?.name === undefined
                      ? 'No Posee'
                      : record.perfil_profesional.estudios.name
                  }
                  profesion={
                    record?.perfil_profesional?.profesion?.name === undefined
                      ? 'No Posee'
                      : record.perfil_profesional.profesion.name
                  }
                  ocupacion={
                    record?.perfil_profesional?.ocupadion === undefined
                      ? 'No Posee'
                      : record.perfil_profesional.ocupadion
                  }
                  puesto={
                    record?.puesto_votacion?.puesto === undefined
                      ? 'No Posee'
                      : record.puesto_votacion.puesto
                  }
                  mesa={
                    record?.puesto_votacion?.mesa === undefined
                      ? 'No Posee'
                      : record.puesto_votacion.mesa
                  }
                />
              )
            }
          }}
        />
      </div>
      {/* end::Body */}
      <FormUserCreate
        visible={visibleCreate}
        title='Ingresar votante'
        onCancelText='Cerarr'
        onOkText='Guardar'
        onCreate={onCreate}
        onCancel={() => {
          setVisibleCreate(false)
        }}
      />
      <ImportModal
        url={`${process.env.REACT_APP_API_URL}/api/v1/personas/upload/sheet`}
        visible={visibleUpload}
        title='Importar Excel'
        cancelText='Cerrar'
        filename='Votantes'
        onCancel={() => {
          setVisibleUpload(false)
          fetch({ pagination })
        }}
      />
    </div>

  )
}

export default VotantesCard
