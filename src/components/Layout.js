

import { AppBar, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import PrimarySearchAppBar from './SearchAppBar';

export default function Layout({ children }) {

    return (

        <Paper square >
            <PrimarySearchAppBar />
            <main>{children}</main>
            {/* <Footer /> */}
        </Paper>

    );
}