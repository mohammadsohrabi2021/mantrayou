import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DynamicModal = ({ open, onClose, title, description, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{textAlign:'center',fontFamily:'iran-sans',color:'gray'}}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{fontFamily:'iran-sans',textAlign:'center',margin:'10px 0',color:'#f57c00'}}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{gap:'20px'}}>
        <Button onClick={onClose} color="success" variant='contained'>
          خیر
        </Button>
        <Button onClick={handleConfirm}  autoFocus color="error" variant='contained'>
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicModal;

