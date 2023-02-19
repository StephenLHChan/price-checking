import axios from 'axios';
import { useState, useEffect } from 'react';

import PageTitle from '../components/pageTitle';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const ViewBrands = () => {
  const [brands, setBrands] = useState<Array<string>>([]);

  const getBrands = async () => {
    try {
      const { data } = await axios.get('/api/brands');
      setBrands(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 500 },
  ];

  return (
    <>
      <PageTitle title="View Brand" />
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <DataGrid rows={brands} columns={columns} pageSize={100} rowsPerPageOptions={[100]} checkboxSelection />
        </div>
      </div>
    </>
  );
};

export default ViewBrands;
