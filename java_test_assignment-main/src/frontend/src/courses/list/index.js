import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'developerCourseName', headerName: 'Course name', flex: 1 },
  {
    type: 'number',
    field: 'costPerClass',
    headerName: 'Cost per class',
    flex: 1,
    valueFormatter: ({ value }) =>
      new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'EUR',
      }).format(Number(value)),
  },
  {
    type: 'number',
    field: 'classesPerWeek',
    headerName: 'Classes per week',
    flex: 1,
  },
];

export default function CourseList({ epoch }) {
  const history = useHistory();

  const [fetching, setFetching] = React.useState(false);
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/developercourse/getAll`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((result) => result.json())
      .then((result) => {
        setCourses(result);
        setFetching(false);
      });
    setFetching(true);
  }, [epoch]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          columns={columns}
          rows={courses}
          pageSize={10}
          rowHeight={36}
          hideFooterSelectedRowCount={true}
          disableSelectionOnClick={true}
          loading={fetching}
          onRowClick={(params) => {
            history.push('/course/' + params.row.id);
          }}
        ></DataGrid>
      </div>
    </div>
  );
}
