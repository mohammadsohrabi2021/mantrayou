import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Drawer,
  Popover,
  List,
  ListItem,
  ListItemText,
  Menu,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import SearchIcon from "@mui/icons-material/Search";
import dataMune from "@/Data/DataMune";
import logoSite from "../../assets/images/logoSite.png";
import Image from "next/image";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  MenuItem,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../style/HeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllListsCategories } from "@/pages/api/mune/muneApi";
import { saveActiveItemInfoMethod, saveMuneListCategoriesMethod } from "@/redux/appSlice";
import { CartList } from "../module/CartList";
import { MuneList } from "../module/MuneList";
import Link from "next/link";

function HeaderLayout() {
  const dispatch = useDispatch();
      // dispatch(saveActiveItemInfoMethod(dataMune[0].id))
  const muneListCategories = useSelector(
    (state) => state.app.muneListCategories
  );
  const activeItem = useSelector(
    (state) => state.app.activeItem
  );
  // const [activeItem, setActiveItem] = useState(dataMune[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subAnchorEl, setSubAnchorEl] = useState(null);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleCartDrawer = (open) => () => {
    setCartDrawerOpen(open);
  };

  // const getAllListsMuneCategories = async () => {
  //   const resData = await getAllListsCategories("2");
  //   dispatch(saveMuneListCategoriesMethod(resData));
  // };

  useEffect(() => {
    (async () => {
      const resData = await getAllListsCategories("2");
      dispatch(saveMuneListCategoriesMethod(resData));
    })

  }, []);
  const handleMouseEnter = (event, item) => {
    if (item.id === 3) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCategoryMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleSubCategoryMouseLeave = () => {
    setSubAnchorEl(null);
  };

  const handleCategoryHover = (event, category) => {
    setSubCategories(category.childs); // اینجا باید تمام زیردسته‌ها داده شوند
    setSubAnchorEl(event.currentTarget);
  };
  const handleSubCategoryHover=(event, category) => {
    setSubCategories(category.childs); // اینجا باید تمام زیردسته‌ها داده شوند
    setSubAnchorEl(event.currentTarget);
  };

  console.log(subCategories, "subCategories");

  return (
    <AppBar
      position='fixed'
      color="default"
      elevation={0}
      style={{
        background: "#fff",
        boxShadow:
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
        padding: "0 10px",
       
      }}
    >
      <Toolbar
        style={{ justifyContent: "space-between" }}
        sx={{ padding: { xs: 0, md: "0 35px" } }}
      >
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuSharpIcon />
          </IconButton>
          <Image
            src={logoSite}
            alt="لوگو سایت "
            style={{ width: "80px", height: "80px" }}
          />
        </Grid>
        <Search
          sx={{
            display: { xs: "none", md: "flex" },
            maxWidth: { xs: "none", md: "450px" },
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="جستجو کنید ...."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <div>
          <IconButton color="inherit">
            <StarBorderIcon />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </div>
      </Toolbar>
      <Search
        sx={{ display: { xs: "flex", md: "none" }, margin: "10px 0 20px 0" }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="جستجو کنید ...."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Grid py={3} px={6.5} display={{ xs: "none", md: "flex" }}>
        <ul style={{ display: "flex", gap: "40px" }}>
          {dataMune.map((item) => (
            <MenuItem
              key={item.id}
              active={activeItem === item.id}
              onMouseEnter={(event) => handleMouseEnter(event, item)}
              onClick={() => dispatch(saveActiveItemInfoMethod(item.id))}
            >
             <Link href={item.href}> {item.title}</Link>
              {item.id === 3 && (
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleCategoryMouseLeave}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    onMouseLeave: handleCategoryMouseLeave,
                    style: {
                      maxHeight: "400px", // You can adjust this as needed
                      width: "200px", // Adjust the width based on your content
                      overflow: "auto",
                    },
                  }}
                >
                  <List sx={{display:'flex',flexDirection:'column', alignItems:'start'}}>
                    {muneListCategories.map((category) => (
                      <ListItem
                        button
                        key={category.id}
                        onMouseEnter={(event) =>
                          handleCategoryHover(event, category)
                        }
                      >
                        <ListItemText primary={category.name} />
                        {category.childs?.length > 0 && <ArrowDropDownIcon />}
                      </ListItem>
                    ))}
                  </List>
                  {subCategories?.length > 0 && (
                    <Popover
                      anchorEl={subAnchorEl}
                      open={Boolean(subAnchorEl)}
                      onClose={handleSubCategoryMouseLeave}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      PaperProps={{
                        onMouseLeave: handleSubCategoryMouseLeave,
                        style: {
                          maxHeight: "400px", // You can adjust this as needed
                          width: "200px", // Adjust the width based on your content
                          overflow: "auto",
                        },
                      }}
                    >
                      <List>
                        {subCategories.map((subCategory) => (
                          <ListItem
                            key={subCategory.id}
                            onMouseEnter={(event) =>
                              handleSubCategoryHover(event, subCategory)
                            }
                          >
                            <ListItemText primary={subCategory.name} />
                          </ListItem>
                        ))}
                      </List>
                    </Popover>
                  )}
                </Popover>
              )}
            </MenuItem>
          ))}
        </ul>
      </Grid>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {MuneList({ toggleDrawer, activeItem })}
      </Drawer>
      <Drawer
        anchor="left"
        open={cartDrawerOpen}
        onClose={toggleCartDrawer(false)}
      >
        {CartList({ toggleCartDrawer })}
      </Drawer>
    </AppBar>
  );
}

export default HeaderLayout;
