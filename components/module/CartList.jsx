import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import emptyCartImage from "../../assets/images/shopCart.png"; // افزودن تصویر سبد خرید خالی
export const CartList = ({ toggleCartDrawer }) => {
  return (
    <Box
      role="presentation"
      onClick={toggleCartDrawer(false)}
      onKeyDown={toggleCartDrawer(false)}
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        textAlign: "center",
      }}
    >
      <Grid container alignItems="center" p={1}>
        <Grid
          item
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <IconButton onClick={toggleCartDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <Typography fontFamily={"iran-sans"} variant="h6">
            سبد خرید
          </Typography>
          <Grid />
        </Grid>
      </Grid>
      <Divider />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        <Image
          src={emptyCartImage}
          alt="سبد خرید شما خالی است"
          style={{ width: "150px", height: "150px", margin: "20px 0" }}
        />
        <Typography variant="body1" sx={{ fontFamily: "iran-sans" }}>
          سبد خرید شما خالی است
        </Typography>
      </Box>
    </Box>
  );
};
