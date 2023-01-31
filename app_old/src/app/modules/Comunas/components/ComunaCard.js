import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { DropdownCustomToggler } from '../../../../_metronic/_partials/dropdowns'
import { PropTypes } from 'prop-types'

import FormUserEdit from './ModalFormEdit'
import FormUserCreate from './ModalFormCreate'
import ModalDelete from '../../../components/ModalDelete'
import ImportModal from '../../../components/uploader'
import ExportBtn from '../../../components/ExportExcelBtn'

import EnhancedTable from '../../../components//table/Table'

import http from '../../../../utils/axios'

const ComunaCard = ({ className, title, subtitle }) => {
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [comuna, setComuna] = useState({})
  const [tableKey, setTableKey] = useState(1)

  const headRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
    { id: 'municipio', numeric: false, disablePadding: false, label: 'Municipio' },
    { id: 'ambito', numeric: false, disablePadding: false, label: 'Ambito' },
    { id: 'createAt', numeric: true, disablePadding: false, label: 'Creado' }
  ]

  const labels = [
    {
      label: 'Nombre',
      value: 'name'
    },
    {
      label: 'Municipio',
      value: 'municipio',
      child: 'name',
      children: true
    },
    {
      label: 'Ambito',
      value: 'ambito'
    }
  ]

  const handleButtonClickEdit = id => {
    http.get(`/api/v1/comunas/get/${id}`).then(response => {
      setComuna([
        {
          id: response.data.comuna.id
        },
        {
          name: ['name'],
          value: response.data.comuna.name
        },
        {
          name: ['municipio_id'],
          value: response.data.comuna.municipio_id
        },
        {
          name: ['ambito'],
          value: response.data.comuna.ambito
        }
      ])
      setVisibleEdit(true)
    })
  }
  const handleButtonClickCreate = () => {
    setVisibleCreate(true)
  }

  const handleButtonClickDelete = id => {
    const props = {
      title: 'Esta seguro de eliminar este Ambito?',
      content: 'Tenga en cuenta que no podrá recuperarlo',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      id,
      onDelete
    }
    ModalDelete(props)
  }

  const onDelete = id => {
    http.delete(`/api/v1/comunas/delete/${id}`).then(response => {
      message.success({ content: response.data.message })
      const newKey = Math.floor(Math.random() * 100)
      setTableKey(newKey)
    })
  }

  const onEdit = async values => {
    await http
      .put(`/api/v1/comunas/put/${values.id}`, values)
      .then(response => {
        message.success({ content: response.data.message })
        const newKey = Math.floor(Math.random() * 100)
        setTableKey(newKey)
      })
    setVisibleEdit(false)
  }

  const onCreate = async values => {
    const data = {
      ...values
    }
    http
      .post('/api/v1/comunas/', data)
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
              Nueva Comuna/Corregimiento
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
          <EnhancedTable
            tableKey={tableKey}
            topic='comunas'
            headRows={headRows}
            handleButtonClickEdit={handleButtonClickEdit}
            handleButtonClickDelete={handleButtonClickDelete}
          />
        </div>
        {/* end::Body */}
        <FormUserEdit
          visible={visibleEdit}
          onEdit={onEdit}
          onCancel={() => {
            setVisibleEdit(false)
          }}
          comuna={comuna}
          okText='Guardar'
          cancelText='Cancelar'
          title='Editar Comuna'
        />

        <FormUserCreate
          okText='Crear'
          cancelText='Cancelar'
          title='Crear Comuna'
          visible={visibleCreate}
          onCreate={onCreate}
          onCancel={() => {
            setVisibleCreate(false)
          }}
        />
        <ImportModal
          url={`${process.env.REACT_APP_API_URL}/api/v1/comunas/upload/sheet`}
          visible={visibleUpload}
          title='Importar Excel'
          cancelText='Cerrar'
          filename='Comunas'
          onCancel={() => {
            setVisibleUpload(false)
          }}
        />
      </div>
    </div>
  )
}

ComunaCard.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}
export default ComunaCard
