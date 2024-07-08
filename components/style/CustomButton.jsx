import { Button } from '@mui/material';
import { styled } from '@mui/system';
export const CustomButton = styled(Button)(({ theme, bgColor, textColor, hoverBgColor, hoverTextColor, borderColor }) => ({
    backgroundColor: bgColor || '#ff9aa2', // رنگ پس زمینه اولیه
    color: textColor || '#333', // رنگ متن اولیه
    border: `1px solid ${borderColor || '#fff'}`, // بوردر اولیه
    borderRadius: '5px',
    width:'145px',
    fontFamily:'iran-sans',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: hoverBgColor || '#333', // تغییر رنگ پس زمینه در هاور
      color: hoverTextColor || '#ff9aa2', // تغییر رنگ متن در هاور
      borderColor: hoverTextColor || '#ff9aa2', // تغییر رنگ بوردر در هاور
    },
  }));