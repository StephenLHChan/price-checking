import axios from 'axios';
import { useState, useEffect } from 'react';

import PageTitle from '../components/pageTitle';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const ViewMerchants = () => {
  const [merchants, setMerchants] = useState<Array<string>>([]);

  const getMerchants = async () => {
    try {
      const { data } = await axios.get('/api/merchants');
      setMerchants(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMerchants();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 500 },
  ];

  return (
    <>
      <PageTitle title="View Merchants" />
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <DataGrid rows={merchants} columns={columns} pageSize={100} rowsPerPageOptions={[100]} checkboxSelection />
        </div>
      </div>
    </>
  );
};

export default ViewMerchants;
