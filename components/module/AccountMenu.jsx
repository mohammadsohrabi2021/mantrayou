import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicModal from './DynamicModal'; // وارد کردن کامپوننت مودال داینامیک
import { handleLogout } from '@/utils/handleLogout';
import { useDispatch, useSelector } from 'react-redux';
import { saveOpenDialogCheckMethod } from '@/redux/appSlice';

function AccountMenu({ showMuneAccount, handleClose, open }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  // const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, [router]);


  const dispatch = useDispatch();
  const openDialog = useSelector((state) => state.app.openDialog);

  const handleOpenDialog = () => {
    dispatch(saveOpenDialogCheckMethod(!openDialog));
  };

  

  const styleMune = {
    display: 'flex',
    width: '200px',
    gap: '15px',
    alignItems: 'center',
    fontFamily: 'iran-sans',
  };

  return (
    <>
      <Menu
        anchorEl={showMuneAccount}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 22,
              height: 22,
              ml: -0.5,
              mr: 0,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: { xs: 128, md: 95 },
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href='/profile'>
          <MenuItem onClick={handleClose} sx={styleMune}>
            <Avatar /> <Typography fontFamily={'iran-sans'} fontSize={'14px'}>پروفایل</Typography>
          </MenuItem>
        </Link>
        <Link href='/dashboard'>
          <MenuItem onClick={handleClose} sx={styleMune}>
            <DashboardIcon /><Typography fontFamily={'iran-sans'} fontSize={'14px'}>داشبورد</Typography>
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography fontFamily={'iran-sans'} fontSize={'14px'}>تنظیمات</Typography>
        </MenuItem>
        {isAuthenticated ? (
          <MenuItem onClick={handleOpenDialog} sx={{ color: 'red' }}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: 'red' }} />
            </ListItemIcon>
            <Typography fontFamily={'iran-sans'} fontSize={'14px'}>خروج</Typography>
          </MenuItem>
        ) : (
          <Link href='/login'>
            <MenuItem onClick={handleClose} sx={styleMune} style={{ color: 'green' }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography fontFamily={'iran-sans'} fontSize={'12px'}>ورود/ثبت نام</Typography>
            </MenuItem>
          </Link>
        )}
      </Menu>
    </>
  );
}

export default AccountMenu;
