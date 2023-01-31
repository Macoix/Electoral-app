import React, { useEffect, useState } from 'react'
import ReactExport from 'react-data-export'
import http from '../../utils/axios'
import PropTypes from 'prop-types'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const ExportExcelBtn = ({ exportText, nameSheet, labels, url }) => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    fetchData()
  }, [])// eslint-disable-line
  function fetchData () {
    http.get(url).then((res) => {
      setDataSource(res.data)
    })
  }
  return (
    <>
      <ExcelFile
        filename={nameSheet}
        element={
          <a
            className='navi-link'
            href={() => false}
          >
            <span className='navi-icon'>
              <i className='fas fa-file-excel' />
            </span>
            <span className='navi-text'>Exportar Excel</span>
          </a>
        }
      >
        <ExcelSheet data={dataSource} name={nameSheet}>
          {labels.map((label) => {
            if (label.children) {
              return (
                <ExcelColumn
                  key={label.label}
                  label={label.label}
                  value={(col) =>
                    col[label.value] ? col[label.value][label.child] : 'No posee'}
                />
              )
            } else if (label.twoLevelChildren) {
              return (
                <ExcelColumn
                  key={label.label}
                  label={label.label}
                  value={(col) =>
                    col[label.value]
                      ? col[label.value][label.twoLevelValue][label.child]
                      : 'No posee'}
                />
              )
            } else {
              return (
                <ExcelColumn key={label.label} label={label.label} value={label.value} />
              )
            }
          })}
        </ExcelSheet>
      </ExcelFile>
    </>
  )
}

ExportExcelBtn.propTypes = {
  exportText: PropTypes.string,
  nameSheet: PropTypes.string,
  labels: PropTypes.any,
  url: PropTypes.string
}

export default ExportExcelBtn
