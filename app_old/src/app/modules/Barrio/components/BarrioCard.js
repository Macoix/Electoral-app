import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { DropdownCustomToggler } from '../../../../_metronic/_partials/dropdowns'

import { PropTypes } from 'prop-types'

import FormUserEdit from './ModalFormEdit'
import FormUserCreate from './ModalFormCreate'
// import ModalDelete from '../../../components/ModalDelete'
import ImportModal from '../../../components/uploader'
import ExportBtn from '../../../components/ExportExcelBtn'

import EnhancedTable from '../../../components//table/Table'

import http from '../../../../utils/axios'

const BarrioCard = ({ className, title, subtitle }) => {
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [barrio, setBarrio] = useState({})
  const [tableKey, setTableKey] = useState(1)

  const headRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
    { id: 'Comuna', numeric: false, disablePadding: false, label: 'Comuna' },
    { id: 'createAt', numeric: true, disablePadding: false, label: 'Creado' }
  ]

  const labels = [
    {
      label: 'Nombre',
      value: 'name'
    },
    {
      label: 'Comuna',
      value: 'comuna',
      child: 'name',
      children: true
    }
  ]

  const handleButtonClickEdit = id => {
    http.get(`/api/v1/barrios/get/${id}`).then(response => {
      setBarrio([
        {
          id: response.data.barrio.id
        },
        {
          name: ['name'],
          value: response.data.barrio.name
        },
        {
          name: ['comuna_id'],
          value: response.data.barrio.comuna_id
        }
      ])
      setVisibleEdit(true)
    }).catch({
      message: 'Error al obtener el barrio'
    })
  }

  const handleButtonClickCreate = () => {
    setVisibleCreate(true)
  }

  // const handleButtonClickDelete = id => {
  //   const props = {
  //     title: 'Esta seguro de eliminar este barrio?',
  //     content: 'Tenga en cuenta que no podrá recuperarlo',
  //     okText: 'Eliminar',
  //     cancelText: 'Cancelar',
  //     id,
  //     onDelete
  //   }
  //   ModalDelete(props)
  // }

  const onEdit = values => {
    http
      .put(`/api/v1/barrios/put/${values.id}`, values)
      .then(response => {
        response.status === 200
          ? message.success({ content: response.data.message })
          : message.error({ content: 'hubo un error' })
        const newKey = Math.floor(Math.random() * 100)
        setTableKey(newKey)
      })
    setVisibleEdit(false)
  }

  const onCreate = values => {
    const data = {
      ...values
    }
    http
      .post('/api/v1/barrios/', data)
      .then(response => {
        setVisibleCreate(false)
        message.success({ content: response.data.message })
        const newKey = Math.floor(Math.random() * 100)
        setTableKey(newKey)
      })
      .catch(error => {
        setVisibleCreate(false)
        message.error({
          content: error.response.data.message || 'hubo un error'
        })
      })
  }

  // const onDelete = id => {
  //   http.delete(`/api/v1/barrios/delete/${id}`).then(response => {
  //     message.success({ content: response.data.message })
  //     // fetch({ pagination })
  //   })
  // }
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
                      nameSheet='Listado de comunas/corregimientos'
                      labels={labels}
                      url={`${process.env.REACT_APP_API_URL}/api/v1/comunas/`}
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
              Nuevo Barrio/Vereda
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

        <div className='card-body py-0'>
          <EnhancedTable
            tableKey={tableKey}
            topic='barrios'
            headRows={headRows}
            handleButtonClickEdit={handleButtonClickEdit}
          />
        </div>

        <FormUserEdit
          visible={visibleEdit}
          onEdit={onEdit}
          onCancel={() => {
            setVisibleEdit(false)
          }}
          barrio={barrio}
          okText='Guardar'
          cancelText='Cancelar'
          title='Editar Barrio'
        />

        <FormUserCreate
          okText='Crear'
          cancelText='Cancelar'
          title='Crear Barrio'
          visible={visibleCreate}
          onCreate={onCreate}
          onCancel={() => {
            setVisibleCreate(false)
          }}
        />

        <ImportModal
          url={`${process.env.REACT_APP_API_URL}/api/v1/barrios/upload/sheet`}
          visible={visibleUpload}
          title='Importar Excel'
          cancelText='Cerrar'
          filename='Barrios'
          onCancel={() => {
            setVisibleUpload(false)
            // fetch({ pagination })
          }}
        />
      </div>
    </div>
  )
}

BarrioCard.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default BarrioCard
