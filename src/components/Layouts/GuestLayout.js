
import { Paper } from '@mui/material';
 import { useAuth } from '@/hooks/auth';
import MenuAppBar from '../MenuAppBar';

export default function GuestLayout({ children }) {
 
    return (

        <Paper square >
            <MenuAppBar user={user}/>
            <main >{children}</main>
            <Footer />
        </Paper>

    );
}