import React from 'react'
import PropTypes from 'prop-types'

const DownloadBtn = ({ filename }) => {
  const pathFile = `${process.env.REACT_APP_API_URL}/examples/${filename}.xlsx`

  return (
    <a href={pathFile} download={filename} target='_blank' rel='noopener noreferrer'>
      Aquí
    </a>
  )
}

DownloadBtn.propTypes = {
  filename: PropTypes.string.isRequired
}

export default DownloadBtn
