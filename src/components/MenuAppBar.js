import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import AdjustIcon from '@mui/icons-material/Adjust';
export default function MenuAppBar({ user }) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth()

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push('/settings')
  }
  const handleLogout = () => {
    logout()
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AdjustIcon />
          </IconButton>
          <Typography variant="h6" component="div"
            sx={{
              flexGrow: 1, color: 'inherit',
              textDecoration: 'none',
            }}
            href="/">
            News Agregator
          </Typography>
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (<Link color="inherit" href="/auth">
            <Button>Login</Button>
          </Link>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}