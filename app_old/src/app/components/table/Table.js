import React, { useState, useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableRow, TablePagination, makeStyles, Box, Tooltip, IconButton, Grid, TextField, InputAdornment, colors } from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon, SearchOutlined as SearchIcon, Cancel } from '@material-ui/icons'
import EnhancedTableHead from './EnhancedTableHead'
import { stableSort, getSorting } from '../../../utils/sort'
import moment from 'moment'
import PropTypes from 'prop-types'

import { MetronicSplashScreenContext } from '../../../_metronic/layout/_core/MetronicSplashScreen'

import http from '../../../utils/axios'

const useStyles = makeStyles(theme => ({
  fontCell: {
    fontSize: '13px'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  button: {
    margin: theme.spacing(1)
  },
  deleteBtn: {
    backgroundColor: red[500],
    color: '#fff',
    '&:hover': {
      backgroundColor: red[700]
    }
  }
}))

const { red } = colors

const EnhancedTable = ({ headRows, topic, handleButtonClickEdit, handleButtonClickDelete, tableKey }) => {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [stringInput, setStringInput] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [timer, setTimer] = useState(null)

  const setVisible = useContext(MetronicSplashScreenContext)

  const fetchData = () => {
    http
      .get(`/api/v1/${topic}/pagination`, {
        params: {
          size: rowsPerPage,
          page: page + 1,
          query: stringInput
        }
      })
      .then(response => {
        setRows(response.data.results.rows)
        setTotalItems(response.data.results.totalItems)
        setVisible(false)
      })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [tableKey,rowsPerPage, page])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [searchInput])

  const handleSearch = (string) => {
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      string === '' ? cleanInputs() : setSearchInput(string)
    }, 500)

    setTimer(newTimer)
  }

  const cleanInputs = () => {
    setStringInput('')
    setSearchInput('')
  }

  function handleRequestSort (event, property) {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function handleChangePage (event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage (event) {
    setRowsPerPage(+event.target.value)
  }

  return (
    <>
      <Grid
        container
        direction='row'
        justify='flex-end'
        alignItems='center'
      >
        <Grid item xs={4}>
          <TextField
            fullWidth
            id='standard-bare'
            variant='outlined'
            label='Buscar'
            type='search'
            value={stringInput}
            onChange={(e) => setStringInput(e.target.value)}
            onKeyUp={(e) => { handleSearch(e.target.value) }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={(e) => { if (stringInput !== '') cleanInputs() }}>
                    {stringInput === '' ? <SearchIcon /> : <Cancel />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <div className={classes.root}>
        <Box className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby='tableTitle'
              size='medium'
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headRows={headRows}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        hover
                        tabIndex={-1}
                      >
                        <TableCell className={classes.fontCell} component='th' id={index} scope='row'>
                          {row.name}
                        </TableCell>
                        {
                          row?.comuna && <TableCell className={classes.fontCell} component='th' id={index} scope='row'>{row.comuna.name}</TableCell>
                        }
                        {
                          row?.code && <TableCell className={classes.fontCell} align='right'>{row.code}</TableCell>
                        }
                        {
                          row?.departamento && <TableCell className={classes.fontCell} component='th' id={index} scope='row'>{row.departamento.name}</TableCell>
                        }
                        {
                          row?.municipio && <TableCell className={classes.fontCell} component='th' id={index} scope='row'>{row.municipio.name}</TableCell>
                        }
                        {
                          (row?.ambito && topic === 'comunas') && <TableCell className={classes.fontCell} component='th' id={index} scope='row'>{row.ambito}</TableCell>
                        }
                        {
                          (!row?.ambito && topic === 'comunas') && <TableCell className={classes.fontCell} component='th' id={index} scope='row' />
                        }
                        <TableCell className={classes.fontCell} align='right'>{moment(row.createdAt).format('DD-MM-YYYY')}</TableCell>
                        <TableCell className={classes.fontCell} align='center'>
                          <Tooltip title='Editar'>
                            <IconButton
                              aria-label='Editar'
                              color='primary'
                              className={classes.button}
                              onClick={() => { handleButtonClickEdit(row.id) }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Eliminar'>
                            <IconButton
                              aria-label='Eliminar'
                              className={[classes.button, classes.deleteBtn]}
                              onClick={() => { handleButtonClickDelete(row.id) }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            component='div'
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </div>
    </>
  )
}
EnhancedTable.propTypes = {
  headRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      disablePadding: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  topic: PropTypes.string.isRequired,
  handleButtonClickEdit: PropTypes.func.isRequired,
  handleButtonClickDelete: PropTypes.func.isRequired,
  tableKey: PropTypes.number.isRequired
}

export default EnhancedTable
