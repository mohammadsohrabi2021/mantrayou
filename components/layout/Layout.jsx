import { Grid } from '@mui/material'
import React from 'react'
import FooterLayout from '../template/FooterLayout'
import HeaderLayout from '../template/HeaderLayout'

function Layout({ children }) {
  return (
    <Grid>
      <HeaderLayout/>
  <Grid mt={22} mb={10}>    { children }</Grid>
      <FooterLayout/>
    </Grid>
  )
}

export default Layout
