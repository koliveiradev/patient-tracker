import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Patient } from '../models/Patient';
import { getAge } from '../util/dates';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    { field: 'sex', headerName: 'Last name', width: 130 },

    {
        field: 'birth',
        headerName: 'Age',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 40,
        valueGetter: (params: GridValueGetterParams) =>
            `${getAge(params.row.birth)}`,
    },
];



export function DataTable(props: { setPatient: (patient: any) => void, patients: Patient[] }) {

    const handleRowClick = (params: any, event: any) => {
        props.setPatient(params.row);
    }

    return (
        <div style={{ width: '100%' }} className='rounded-2xl h-96'>

            <DataGrid
                rows={props.patients}
                className='bg-white rounded-2xl'
                columns={columns}
                onRowClick={handleRowClick}

                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}