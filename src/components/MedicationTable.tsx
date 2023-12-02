import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Medication } from '../models/Medication';
import { getAge } from '../util/dates';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'first_name', headerName: 'First name', width: 130 },
    // { field: 'last_name', headerName: 'Last name', width: 130 },
    // { field: 'sex', headerName: 'Last name', width: 130 },

    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Medication Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 560 }, // double regular length?

];



export function DataTable(props: { setPatient: (patient: any) => void, medications: Medication[] }) {

    const handleRowClick = (params: any, event: any) => {
        props.setPatient(params.row);  // is this necessary for the new medication table?
    }

    return (
        <div style={{ width: '100%' }} className='rounded-2xl h-96'>

            <DataGrid
                rows={props.medications}
                className='bg-white rounded-2xl'
                columns={columns}
                // onRowClick={handleRowClick} // unnecessary

                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}   // this does work, but you have to scroll down to see it
            />
        </div>
    );
}



