import React, { useEffect, useState, useRef } from 'react'
import http from '../../../../utils/axios'
import { notification } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'

const TerminosCard = ({ className, title, subtitle }) => {
  const editorRef = useRef(null)
  const [terminos, setTerminos] = useState()

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = () => {
    http.get('/api/v1/terminos/').then((res) => {
      setTerminos(res.data.texto)
    })
  }

  const onFinish = async () => {
    if (editorRef.current) {
      const values = {
        texto: editorRef.current.getContent()
      }
      await http
        .put('/api/v1/terminos/', values)
        .then((res) => {
          notification.open({
            message: 'Cambio exitoso',
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: '#5cb85c' }} />,
            duration: 5
          })
        })
        .catch((error) => {
          notification.open({
            message: 'Hubo un error',
            description: error,
            icon: <CheckCircleOutlined style={{ color: '#5cb85c' }} />,
            duration: 5
          })
        })
    }
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
            </Dropdown> */}
            <button
              className='btn btn-success font-weight-bolder font-size-sm d-flex align-items-center ml-2'
              onClick={onFinish}
            >
              <span className='mr-2 d-flex'>
                <i className='far fa-save' />
              </span>
              Guardar
            </button>
            {/* <Dropdown className='dropdown-inline ml-2' alignRight>
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
        <div className='card-body'>
          <Editor
            className='mb-5'
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={terminos}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif font-size:14px }'
            }}
          />
        </div>
        {/* end::Body */}
      </div>
    </div>
  )
}

export default TerminosCard
