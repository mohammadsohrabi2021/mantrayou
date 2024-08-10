import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import CheckoutPaymentPageMobile from '../module/CheckoutPaymentPageMobile';
import CheckoutPaymentPageDesktop from '../module/CheckoutPaymentPageDesctop';

function CheckOutPaymentPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    return <>{isMobile ? <CheckoutPaymentPageMobile /> : <CheckoutPaymentPageDesktop />}</>;
}

export default CheckOutPaymentPage
