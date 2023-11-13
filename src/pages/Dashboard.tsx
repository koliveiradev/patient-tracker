import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MedicationIcon from '@mui/icons-material/Medication';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { Patient } from '../models/Patient';
const drawerWidth = 200;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

interface Links {
    name: string;
    url: string;
    icon: React.ReactElement
}

export function DashboardPage(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    return <Box sx={{ margin:'20px', display:'flex', width:'100%'}}>
        <Box sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', border: '1px solid lightgrey' }}>
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
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                    </ListItemIcon>
                    <ListItemText primary='Antidepressants' secondary='Prescribed on 01/20/2022'/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                    </ListItemIcon>
                    <ListItemText primary='Fever Reducer' secondary='Prescribed on 01/20/2022'/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                    </ListItemIcon>
                    <ListItemText primary='Topical Ointment' secondary='Prescribed on 01/20/2022'/>
                </ListItem>
                </List>
            </Typography>
        </Box>
    </Box>;

}




