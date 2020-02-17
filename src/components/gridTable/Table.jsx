import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tables from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import TableToolBar from './TableToolBar';
import TableHeader from './TableHeader';
import DataFetching from '../../service';
import { useParams } from '@reach/router';

import { Router, Link, navigate } from '@reach/router';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '90%',
    marginBottom: theme.spacing(2),
    margin: '0 auto'
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  container: {
    maxHeight: 740
  },
  pagination: {
    display: 'flex',
    padding: ' 0px 16px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: 400
  }
}));

function Table(props) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    listModel,
    tableBodyDataFetched,
    gridTitle,
    dependedData,
    getComparator,
    stableSort,
    queryParams
  } = props;
  const rows = tableBodyDataFetched.data || [];
  const { handleNewRequest } = DataFetching();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    queryParams['page'] = page;
    queryParams['orderBy'] = property;
    queryParams['order'] = isAsc ? 'desc' : 'asc';
    queryParams['pageSize'] = rowsPerPage;
    console.log(isAsc, property, queryParams, 'isAsc,property, queryParams');
    handleNewRequest(listModel.baseUrl, queryParams);
  };

  const handleSelectAllClick = event => {
    if (listModel.actions.isSelect) {
      if (event.target.checked) {
        const newSelecteds = rows.map(n => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    if (listModel.actions.isSelect) {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      console.log(newSelected);
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    queryParams['page'] = page;
    queryParams['orderBy'] = orderBy;
    queryParams['order'] = order;
    queryParams['pageSize'] = rowsPerPage;
    console.log(listModel.baseUrl, queryParams)
    handleNewRequest(listModel.baseUrl, queryParams);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(()=>parseInt(event.target.value, 10));
    console.log(event.target.value,rowsPerPage,'event.target.value')
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolBar
          listModel={listModel}
          gridTitle={gridTitle}
          numSelected={selected.length}
        />
        <TableContainer className={classes.container}>
          <Tables
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table sticky table"
            stickyHeader
          >
            <TableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              listModel={listModel}
            />

            {rows.length ? (
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={event => handleClick(event, row.id)}
                        tabIndex={-1}
                        key={row.name}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        {listModel.actions.isSelect && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              onClick={event => handleClick(event, row.id)}
                            />
                          </TableCell>
                        )}
                        {listModel.attributes.map((headCell, index) => (
                          <TableCell key={index}>
                            {headCell.type === 'text' &&
                              !headCell.value &&
                              row[headCell.name]}

                            {headCell.type === 'select' &&
                              dependedData &&
                              dependedData[row[headCell.name]]}

                            {headCell.value && headCell.value(row)}

                            {/* {JSON.stringify(headCell, null, 2) } */}
                          </TableCell>
                        ))}
                        {listModel.actions.isUpdate && (
                          <TableCell padding="checkbox">
                            <IconButton
                              aria-label="filter list"
                              onClick={async () =>
                                await navigate(
                                  `${listModel.baseRoute}/update/${row.id}`
                                )
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        )}
                        {listModel.actions.isView && (
                          <TableCell padding="checkbox">
                            <IconButton
                              aria-label="filter list"
                              // onClick={async ()=>console.log(props.location)}
                              onClick={async () =>
                                await navigate(
                                  `${listModel.baseRoute}/view/${row.id}`
                                )
                              }
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : null
            // <TableBody>
            //   <TableRow>
            //     <TableCell
            //       align="center"
            //       colSpan={
            //         listModel.actions.isSelect
            //           ? listModel.attributes.length + 1
            //           : listModel.attributes.length
            //       }
            //     >
            //       {' '}
            //       No Data Found
            //     </TableCell>{' '}
            //   </TableRow>{' '}
            // </TableBody>
            }
          </Tables>
        </TableContainer>
        {listModel.actions.isPagination && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={tableBodyDataFetched.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        )}
      </Paper>
    </div>
  );
}

export default Table;
