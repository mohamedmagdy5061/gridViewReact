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
import { useParams } from '@reach/router';
import { navigate } from '@reach/router';
import { DeleteData } from '../../service';

// // import { MemoryRouter as Router } from 'react-router';
// // import { Link } from 'react-router-dom';
// import { Router, Link } from '@reach/router';

// import Pagination from '@material-ui/lab/Pagination';
// import { PaginationItem } from '@material-ui/lab';

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
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let [rows, setRows] = useState([]);
  const {
    listModel,
    tableBodyDataFetched,
    gridTitle,
    dependedData,
    // getComparator,
    // stableSort,
    queryParams,
    setQueryParams
  } = props;
  // let rows = tableBodyDataFetched.data || [];

  useEffect(() => {
    console.log(tableBodyDataFetched.data, 'rows from table');
    if (tableBodyDataFetched.data ) {
      setRows(tableBodyDataFetched.data)
    }
  }, [tableBodyDataFetched]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'desc';
    setOrder(isAsc ? 'asc' : 'desc');
    setOrderBy(property);
    setQueryParams({
      ...queryParams,
      orderBy: property,
      order: isAsc ? 'asc' : 'desc'
    });
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
    // console.log(newPage,"newPage from table pagination>>")
    setPage(newPage);
    // console.log(page,"page from table pagination")
    setQueryParams({ ...queryParams, page: newPage });
    rows = tableBodyDataFetched.data;
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(() => parseInt(event.target.value, 10));
    setQueryParams({ ...queryParams, pageSize: event.target.value });
  };

  const handleDelete = () => {
    DeleteData(listModel.baseUrl, selected[0]);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolBar
          listModel={listModel}
          gridTitle={gridTitle}
          numSelected={selected.length}
          handleDelete={handleDelete}
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
            <TableBody>
              {// stableSort(rows, getComparator(order, orderBy))
              rows.map((row, index) => {
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
          </Tables>
        </TableContainer>
        {listModel.actions.isPagination && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={tableBodyDataFetched.total||0}
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
