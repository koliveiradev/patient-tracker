import * as React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MedicationIcon from '@mui/icons-material/Medication';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface PrescriptionBoxProps {
    prescriptions: Prescription[];
}

export interface Prescription {
  name: string;
  id: number;
  prescribedOn: string
}

export function PrescriptionBox(prescriptionList: PrescriptionBoxProps) {
  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', border: '1px solid lightgrey'}}>
      <Box display='flex' alignItems='center'>
        <Stack direction="row" spacing={20}>
          <Typography variant='h4' align='left'>
            Prescriptions
          </Typography>
          <MedicationIcon />
        </Stack>
      </Box>
      <Divider style={{ backgroundColor: 'grey' }} />
      <Typography variant="body1" align="left">
        <List>
          {prescriptionList.prescriptions.length === 0 ? (
            <div>You have no prescriptions.</div>
          ) : (
            prescriptionList.prescriptions.map((prescription: Prescription) => (
              <ListItem key={prescription.id}>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                </ListItemIcon>
                <ListItemText primary={prescription.name} secondary={`Prescribed on ${prescription.prescribedOn}`} />
              </ListItem>
            ))
          )}
        </List>
      </Typography>
    </Box>
  );
};
