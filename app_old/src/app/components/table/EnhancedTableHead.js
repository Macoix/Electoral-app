
import React from 'react'
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  fontHead: {
    fontSize: '13px'
  }
}))

function EnhancedTableHead (props) {
  const { order, orderBy, onRequestSort, headRows } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }
  const classes = useStyles()

  return (
    <TableHead>
      <TableRow>
        {
          headRows.map(row => {
            return (
              <React.Fragment
                key={row.id}
              >
                {row.id !== 'createdAt' &&
                  <TableCell
                    key={row.id}
                    align={row.numeric ? 'right' : 'left'}
                    padding={row.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === row.id ? order : false}
                    className={classes.fontHead}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </TableCell>}
                {row.id === 'createdAt' &&
                  <TableCell
                    key={row.id}
                    align={row.numeric ? 'right' : 'left'}
                    padding={row.disablePadding ? 'none' : 'default'}
                    className={classes.fontHead}
                  >
                    {row.label}
                  </TableCell>}
              </React.Fragment>
            )
          })
        }
        <TableCell
          align='center'
          padding='default'
          className={classes.fontHead}
        >
          Acciones
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      disablePadding: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
}

export default EnhancedTableHead
