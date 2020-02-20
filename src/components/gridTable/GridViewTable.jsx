import React, {useEffect,useState} from 'react';
import Table from './Table';
import DataFetching from '../../service';
import { useParams, useLocation } from '@reach/router';


// const descendingComparator = (a, b, orderBy) => {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// };

// const getComparator = (order, orderBy) => {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// };

// const stableSort = (array, comparator) => {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);

//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// };

function GridViewTable(props) {
  // const params = useParams();
  // const location = useLocation();
  // console.log(params,'params',location,'location')
  const [queryParams, setQueryParams] = useState({
    page: 1,
    orderBy: 'createdAt',
    order: 'desc',
    pageSize: 10
  })
  let reducer = {};

  const { baseUrl, listModel} = props;
  const { data } = DataFetching(baseUrl, queryParams);

  // const querySearch = location.search

  // useEffect(() => {
  //   console.log(querySearch,"location from Grid")
  //   setQueryParams(querySearch)
  // }, [querySearch])

  useEffect(() => {
    
      console.log(queryParams,"queryParams from Grid")
      // const { data } = DataFetching(baseUrl, queryParams);
  }, [queryParams,data]);

  

  if (listModel.attributes) {
    listModel.attributes.forEach(attribute => {
      if (
        attribute.type === 'select' &&
        attribute.source !== undefined &&
        attribute.source.requestPath !== undefined
      ) {
        const { requestPath, keyAttribute, valueAttribute } = attribute.source;
        const { data } = DataFetching(requestPath, queryParams);
        reducer =
          data.data &&
          data.data.reduce((acc, obj) => {
            acc[obj[keyAttribute]] = obj[valueAttribute];
            return acc;
          }, {});
      }
    });
  }
  


  return (
    <div>
      <Table
        {...props}
        tableBodyDataFetched={data}
        dependedData={reducer}
        // getComparator={getComparator}
        // stableSort={stableSort}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
      />
    </div>
  );
}

export default GridViewTable;
