import React from "react";
import { Grid, Box, Typography, IconButton, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TelegramIcon from '@mui/icons-material/Telegram';
// import TikTokIcon from '@mui/icons-material/TikTok';
// import { ReactComponent as WhatsAppIcon } from './icons/whatsapp.svg';  // فرض بر این است که آیکون واتساپ به صورت SVG در پروژه موجود است
import logoSite from "../../assets/images/logoSite.png";
import logo from "../../assets/images/logo.png";
import logoZarin from "../../assets/images/zarin.png";
import { dataFooter } from "@/Data/DataFooter";
function FooterLayout() {
  const styleTypography={
    fontFamily:'iran-sans',
     fontWeight:'bolder', 
     lineHeight:'26px',
    //  fontSize:'18px'
  }
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: 'background.paper',
        color: "text.primary",
     
      }}
      p={{xs:'10px',md:'40px'}}
    >
      <Grid container  justifyContent="space-between" p={3} bgcolor={'#fff'} borderRadius={'15px'} sx={{boxShadow:' rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;'}}>
        <Grid item xs={12}sm={6} md={3}>
          <Image
            src={logoSite}
            alt="لوگو سایت "
            style={{ width: "100px", height: "100px" }}
          />
          <Typography sx={styleTypography} fontSize={'20px'}>فروشنده زیبایی شما.</Typography>
          <Box mt={2} >
            <Typography sx={styleTypography}fontSize={'12px'}>آیا هنوز سوالی دارید؟</Typography>
            <Typography sx={styleTypography}fontSize={'12px'}>
              شنبه تا جمعه 10 صبح تا 4 بعد از ظهر
            </Typography>
            <Typography sx={styleTypography}fontSize={'12px'} component="div">
            به ما ایمیل بفرستید
              <Link href="mailto:info@mantrayou.com">info@mantrayou.com</Link>
            </Typography>
          </Box>
          <Box mt={2} display="flex" gap={2}>
            <IconButton><TelegramIcon /></IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton><LocalPhoneIcon /></IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}sm={6} md={2}>
          <Typography sx={styleTypography} fontSize={'20px'}>فروشگاه آنلاین</Typography>
          {dataFooter.filter(item =>item.id<=5).map(
            (text) => (
              <Typography  key={text.id} sx={styleTypography} style={{cursor:'pointer'}} fontSize={'12px'} mr={1} mt={2} >
                {text.title}
              </Typography>
            )
          )}
        </Grid>
        <Grid item xs={12}sm={6} md={2}>
          <Typography sx={styleTypography} fontSize={'20px'}>دنبال کردن</Typography>
          {dataFooter.filter(item =>item.id>5&&item.id<=9).map((text) => (
            <Typography key={text.id} style={{cursor:'pointer'}} sx={styleTypography} fontSize={'12px'} mr={1} mt={2} >
              {text.title}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12}sm={6} md={2}>
          <Typography sx={styleTypography} fontSize={'20px'}>خدمات مشتری</Typography>
          {dataFooter.filter(item =>item.id>9).map((text) => (
            <Typography key={text.id} style={{cursor:'pointer'}} sx={styleTypography} fontSize={'12px'} mr={1} mt={2} >
              {text.title}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12}sm={6} md={3}>
         <Image src={logo} style={{width:'150px',height:'180px'}}/>
         <Image src={logoZarin} style={{width:'150px',height:'180px'}}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FooterLayout;
