import React from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import FooterLayout from "../template/FooterLayout";
import HeaderLayout from "../template/HeaderLayout";
import CustomBreadcrumbs from "../module/Breadcrumbs";

function Layout({ children }) {
  const router = useRouter();
  const isAuthPage = router.pathname === "/Register" || router.pathname === "/login";

  return (
    <Grid>
      <HeaderLayout />
      <Grid mb={10} position={"relative"} mx={isAuthPage ? 0 : { xs: 2, md: 8 }} mt={20}>
        <Grid
          display={'flex'}
          alignItems={'center'}
          pr={2}
          sx={{
            width: "100%",
            height: "60px",
            borderRadius: isAuthPage ? 0 : '2px',
            position: isAuthPage ? 'absolute' : 'relative',
            top: isAuthPage ? 0 : 'auto',
            left: isAuthPage ? 0 : 'auto',
            right: isAuthPage ? 0 : 'auto',
            zIndex: isAuthPage ? 1 : 'auto'
          }}
          className={ isAuthPage ? 'none' : 'box-shadow'}
        >
          <CustomBreadcrumbs />
        </Grid>
        {children}
      </Grid>
      <FooterLayout />
    </Grid>
  );
}

export default Layout;
