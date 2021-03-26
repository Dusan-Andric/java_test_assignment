import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'teacherName', headerName: 'Name', flex: 1 },
  { field: 'teacherSurname', headerName: 'Surname', flex: 1 },
];

/**
 * Attribute epoch is used to trigger list refresh if one of the entity changed.
 * @param {*} param0
 */
export default function TeacherList({ epoch }) {
  const history = useHistory();

  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/teacher/getAll`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((result) => result.json())
      .then((result) => {
        setTeachers(result);
        setFetching(false);
      });
    setFetching(true);
  }, [epoch]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          columns={columns}
          rows={teachers}
          pageSize={10}
          rowHeight={36}
          hideFooterSelectedRowCount={true}
          disableSelectionOnClick={true}
          loading={fetching}
          onRowClick={(params) => {
            history.push('/teacher/' + params.row.id);
          }}
        ></DataGrid>
      </div>
    </div>
  );
}
