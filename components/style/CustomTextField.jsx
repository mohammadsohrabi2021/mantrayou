import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFormHelperText-root': {
      textAlign: 'right',
      fontFamily:'iran-sans'
    },
  }));