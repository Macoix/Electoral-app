import React, { useState } from 'react'
import { Upload, notification, Spin } from 'antd'
import { Modal, Button } from 'react-bootstrap'
import {
  CloseCircleOutlined,
  InboxOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import DownloadBtn from './DownloadBtn'

const { Dragger } = Upload

const uploader = ({ url, title, cancelText, visible, onCancel, filename }) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: url,
    onChange (info) {
      const { status, response } = info.file
      if (status === 'uploading') {
        setLoading(true)
      }
      if (status === 'done') {
        notification.success({
          message: 'Subida exitosa',
          description: `El archivo ${info.file.name} se subio exitosamente`
        })
        setLoading(false)
      } else if (status === 'error') {
        notification.error({
          message: 'Error en la subida',
          description: response.message
            ? (
              <div>
                El archivo {info.file.name} no se pudo subir <br />{' '}
                <CloseCircleOutlined style={{ color: 'red' }} />
                {response.message}
              </div>
              )
            : (
                'Hubo un error'
              )
        })
        setLoading(false)
      }
      // if (response) {
      //   message.success()
      //   onCancel()
      // }
    },
    onDrop (e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }
  return (
    <>
      <Modal
        show={visible}
        title={title}
        onHide={onCancel}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton='true'>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dragger {...props}>
            {loading
              ? (
                <div>
                  <p className='ant-upload-drag-icon'>
                    <Spin indicator={antIcon} />
                  </p>
                  <p className='ant-upload-text'>Subiendo Archivo</p>
                </div>
                )
              : (
                <div>
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='ant-upload-text'>
                    Click o arrastra los archivos aqui para cargarlos
                  </p>
                </div>
                )}
          </Dragger>
          Descarge el formato de subida haciendo click{' '}
          <DownloadBtn filename={filename} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onCancel}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

uploader.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  cancelText: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  filename: PropTypes.string.isRequired
}

export default uploader
