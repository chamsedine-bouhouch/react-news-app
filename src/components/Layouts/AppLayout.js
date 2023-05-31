
import { Paper } from '@mui/material';
import MenuAppBar from '../MenuAppBar';
import { useAuth } from '@/hooks/auth';

export default function AppLayout({ children }) {
    const { user } = useAuth({ middleware: 'auth' })

    return (

        <Paper square >
            <MenuAppBar user={user}/>
            <main >{children}</main>
            {/* <Footer /> */}
        </Paper>

    );
}