import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import baseImage from "../../assets/images/logoSite.png";
import Image from "next/image";
import { colorVariations } from "@/Data/DataColor";
function ProductCardCheckOut({ main_image, name, price, quantity, variation }) {
  return (
    <Box px={2}>
      <Image
        width={125}
        height={90}
        src={
          main_image
            ? `https://api.mantrayou.com/images/${main_image}`
            : baseImage
        }
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        border={"1px solid #e0e0e2"}
        borderRadius={'8px'}
      >
        <IconButton color="primary" onClick={() => console.log("Added")}>
          <AddIcon />
        </IconButton>
        <Typography variant="body1">{quantity}</Typography>
        {/* <IconButton color="primary" onClick={() => console.log("Removed")}>
          <RemoveCircleOutlineIcon />
        </IconButton> */}
        <IconButton color="error" onClick={() => console.log("Deleted")}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box display={"flex"}  pt={1} gap={1}>
        <Box
          sx={{
            width: 15,
            height: 15,
            bgcolor: colorVariations[variation.color],
            borderRadius: "50%",
            display: "inline-block",
            // marginRight: 4,
            border: variation.color && "1px solid gray",
          }}
        />
        <Typography fontFamily={"iran-sans"} fontSize={'10px'} color="textSecondary">
          {variation.color}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductCardCheckOut;
