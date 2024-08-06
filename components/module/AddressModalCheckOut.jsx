import React, { useState, useEffect } from 'react';
import { Dialog, List, ListItem, ListItemText, Button, DialogTitle, Radio, RadioGroup, FormControlLabel, IconButton, Typography, Divider, Grid, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getDataAccountAddressesUserId } from '@/pages/api/account/accountApi';
import Cookies from 'js-cookie';
import { saveCheckoutInfoMethod } from '@/redux/appSlice';
import { getDataCheckOutUser, selectUserAddress } from '@/pages/api/checkout/checkoutApi';
import EditAddressModalCheckOut from './EditAddressModalCheckOut';
import CloseIcon from '@mui/icons-material/Close';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function AddressModalCheckOut({ open, onClose }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [showAllAddresses, setShowAllAddresses] = useState(false); // State for showing all addresses
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const dataUser = useSelector((state) => state.app.userInfo);

  async function fetchAddresses() {
    const response = await getDataAccountAddressesUserId(token, dataUser);
    setAddresses(response);
  }

  useEffect(() => {
    fetchAddresses();
  }, [token, dataUser]);

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  const closeEditModal = () => {
    fetchAddresses();
    setEditModalOpen(false);
  };

  const handleConfirmAddress = async () => {
    try {
      const data = await selectUserAddress(selectedAddress, token);
      toast.success('آدرس با موفقیت تغییر کرد');
      onClose(); // Close modal
      refreshCheckoutData(); // Refresh data
    } catch (error) {
      console.error('Error selecting address:', error);
      toast.error('تغییر آدرس با خطا مواجه شد');
    }
  };

  const refreshCheckoutData = async () => {
    const checkoutData = await getDataCheckOutUser(token); // Assuming this function exists and fetches checkout data
    dispatch(saveCheckoutInfoMethod(checkoutData)); // Update checkout data in the store
  };

  const openEditModal = (address) => {
    setCurrentAddress(address);
    setEditModalOpen(true);
  };

  const toggleShowAllAddresses = () => {
    setShowAllAddresses(!showAllAddresses);
  };

  const displayedAddresses = showAllAddresses ? addresses : addresses.slice(0, 2);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontFamily={'iran-sans'}>انتخاب آدرس</Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>
      <Divider />
      <Grid sx={{ cursor: 'pointer' }} onClick={() => openEditModal(null)} p={3} display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={1}>
          <AddLocationIcon />
          <Typography fontFamily={'iran-sans'}>افزودن آدرس جدید</Typography>
        </Box>
        <KeyboardArrowLeftIcon />
      </Grid>
      <Divider />
      <RadioGroup value={selectedAddress} onChange={(e) => handleSelectAddress(e.target.value)}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'hidden', maxHeight: '300px', overflowY: 'auto' }}>
          {displayedAddresses.map((address, index) => (
            <ListItem 
              key={address._id} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '10px', 
                borderBottom: index !== addresses.length - 1 ? '1px solid #ececec' : 'none'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Radio
                  checked={selectedAddress === address._id}
                  onChange={() => handleSelectAddress(address._id)}
                  value={address._id}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': address._id }}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
                <ListItemText 
                  primary={address.address_text} 
                  secondary={address.city_name}
                  primaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                  secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                />
              </Box>
              <IconButton onClick={() => openEditModal(address)} sx={{ color: 'gray' }}>
                <EditIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </RadioGroup>
      {addresses.length > 2 && (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <IconButton onClick={toggleShowAllAddresses} sx={{ animation: 'pulse 2s infinite', '@keyframes pulse': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.1)' }, '100%': { transform: 'scale(1)' } } }}>
            {showAllAddresses ? <><KeyboardArrowUpIcon /> <Typography fontFamily={'iran-sans'} fontSize={'12px'}>نمایش کمتر</Typography></> : <><KeyboardArrowDownIcon /><Typography fontFamily={'iran-sans'} fontSize={'12px'}>نمایش بیشتر</Typography></>}
          </IconButton>
        </Box>
      )}
      <Button onClick={handleConfirmAddress} variant='contained' sx={{ backgroundColor: '#000', m: 2, fontFamily: 'iran-sans' }} color="primary">تایید آدرس</Button>
      <EditAddressModalCheckOut
        open={editModalOpen}
        onClose={closeEditModal}
        address={currentAddress}
        refreshAddresses={fetchAddresses}
        isNewAddress={!currentAddress}
      />
    </Dialog>
  );
}

export default AddressModalCheckOut;
