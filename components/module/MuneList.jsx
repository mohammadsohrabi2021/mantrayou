import React, { useState } from "react";
import { Box, Divider, Grid, IconButton, List, ListItemText } from "@mui/material";
import Image from "next/image";
import { ListItemStyled } from "../style/HeaderLayout";
import logoSite from "../../assets/images/mantra.png";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { saveActiveItemInfoMethod } from "@/redux/appSlice";
import dataMune from "@/Data/DataMune";
import Link from "next/link";

export const MuneList = ({ toggleDrawer, activeItem }) => {
  const dispatch = useDispatch();
  const [showMune, setShowMune] = useState(false);
  const muneListCategories = useSelector((state) => state.app.muneListCategories);

  const handleMenuItemClick = (id, hasChildren) => {
    if (!hasChildren) {
      toggleDrawer(false)();
      dispatch(saveActiveItemInfoMethod(id));
    }
  };

  const handleCategoryClick = (categoryId) => {
    // بستن سایدبار
    toggleDrawer(false)();
    // ذخیره اطلاعات آیتم انتخاب شده (در صورت نیاز)
    dispatch(saveActiveItemInfoMethod(categoryId));
  };
  return (
    <Box
      role="presentation"
      onKeyDown={toggleDrawer(false)}
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Grid container alignItems="center" p={1}>
        <Grid item xs>
          <Image
            src={logoSite}
            alt="لوگو سایت"
            style={{ width: "140px", height: "80px" }}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <List>
        {dataMune.map((item) => (
          <ListItemStyled
            button
            key={item.id}
            active={activeItem === item.id}
            onClick={() => handleMenuItemClick(item.id, item.id === 3)}
            sx={{
              display: "flex",
              flexDirection: showMune && item.id === 3 ? "column" : "row",
              alignItems: "center",
              maxHeight: "170px",
              overflowY: "auto",
            }}
          
          >
            <Link href={item.id !== 3 ? item.href : '#'} >
              <ListItemText
                primary={item.title}
                sx={{ fontFamily: "iran-sans", fontWeight: "bold" }}
              />
            </Link>
            {item.id === 3 && (
              <IconButton
                onClick={() => setShowMune(!showMune)}
                size="small"
              >
                {showMune ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
              </IconButton>
            )}
            {showMune && item.id === 3 && (
              <SimpleTreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                {muneListCategories.map((category) => (
                    <Link  href={`/productsCategorization/${category.id}`}style={{ width: '100%', color: 'inherit', textDecoration: 'none' }}>
                  <TreeItem
                  itemId={category.id}
                  label={category.name}
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  >
                    
                    {/* {category.childs &&
                      category.childs.map((subCategory) => (
                        <TreeItem
                        itemId={subCategory.id}
                          label={subCategory.name}
                          key={subCategory.id}
                        />
                      ))} */}
                  </TreeItem>
                  </Link>
                ))}
              </SimpleTreeView>
            )}
          </ListItemStyled>
        ))}
      </List>
      <Grid
        mt="auto"
        bgcolor={"#030218"}
        color={"#83818C"}
        p={1}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <IconButton color="inherit">
          <StarBorderIcon />
        </IconButton>
        <IconButton color="inherit">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
        <IconButton color="inherit">
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Grid>
    </Box>
  );
};
