import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { DropdownCustomToggler } from '../../../../_metronic/_partials/dropdowns'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { PropTypes } from 'prop-types'

import FormUserEdit from './ModalFormEdit'
import FormUserCreate from './ModalFormCreate'
// import ModalDelete from '../../../components/ModalDelete'
import ImportModal from '../../../components/uploader'
import ExportBtn from '../../../components/ExportExcelBtn'

import EnhancedTable from '../../../components/table/Table'

import http from '../../../../utils/axios'

const MunicipioCard = ({ className, title, subtitle }) => {
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [municipio, setMunicipio] = useState({})
  const [tableKey, setTableKey] = useState(1)

  const headRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'departamento', numeric: false, disablePadding: false, label: 'departamento' },
    { id: 'createdAt', numeric: true, disablePadding: false, label: 'Creado' }
  ]
  const labels = [
    {
      label: 'Municipio',
      value: 'name'
    },
    {
      label: 'Departamento',
      value: 'departamento',
      child: 'name',
      children: true
    }
  ]
  const handleButtonClickEdit = id => {
    http.get(`/api/v1/municipios/get/${id}`).then(response => {
      setMunicipio([
        {
          id: response.data.municipio.id
        },
        {
          name: ['name'],
          value: response.data.municipio.name
        },
        {
          name: ['departamento_id'],
          value: response.data.municipio.departamento_id
        }
      ])
      setVisibleEdit(true)
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

  // const onDelete = id => {
  //   http.delete(`/api/v1/municipios/delete/${id}`).then(response => {
  //     message.success({ content: response.data.message })
  //     fetch({ pagination })
  //   })
  // }

  const onEdit = async values => {
    await http
      .put(`/api/v1/municipios/put/${values.id}`, values)
      .then(response => {
        toast.success(
          response.data.message,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
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
      .post('/api/v1/municipios/', data)
      .then(response => {
        setVisibleCreate(false)
        toast.success(
          response.data.message,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        const newKey = Math.floor(Math.random() * 100)
        setTableKey(newKey)
      })
      .catch(error => {
        setVisibleCreate(false)
        toast.error({
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
                      nameSheet='Listado de municipios'
                      labels={labels}
                      url={`${process.env.REACT_APP_API_URL}/api/v1/municipios/`}
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
              Nuevo municipio
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
            topic='municipios'
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
          municipio={municipio}
          okText='Guardar'
          cancelText='Cancelar'
          title='Editar municipio'
        />

        <FormUserCreate
          okText='Crear'
          cancelText='Cancelar'
          title='Crear municipio'
          visible={visibleCreate}
          onCreate={onCreate}
          onCancel={() => {
            setVisibleCreate(false)
          }}
        />

        <ImportModal
          url={`${process.env.REACT_APP_API_URL}/api/v1/municipios/upload/sheet`}
          visible={visibleUpload}
          title='Importar Excel'
          cancelText='Cerrar'
          filename='Municipios'
          onCancel={() => {
            setVisibleUpload(false)
          }}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
MunicipioCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}
export default MunicipioCard
