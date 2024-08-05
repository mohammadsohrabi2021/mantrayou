import CheckoutPage from '@/components/template/CheckoutPage'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDataCheckOutUser } from '../api/checkout/checkoutApi';
import Cookies from 'js-cookie';
import { Grid, Typography ,CircularProgress} from '@mui/material';
import { saveCheckoutInfoMethod } from '@/redux/appSlice';

function Checkout() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataCheckOutUser(token);
        dispatch(saveCheckoutInfoMethod(data)); // فرض بر این است که API داده‌های سبد خرید را بر می‌گرداند
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, token]);

  if (loading) {
    return <Grid display={'flex'}gap={1} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
    <Typography fontFamily={'iran-sans'}>درحال دریافت اطلاعات  لطفا صبور باشید...</Typography>
     <CircularProgress />
   </Grid>;
  }
  return (
  <CheckoutPage/>
  )
}

export default Checkout
