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
  Badge,
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
import {
  saveActiveItemInfoMethod,
  saveMuneListCategoriesMethod,
  setCartDrawerOpen,
} from "@/redux/appSlice";
import { CartList } from "../module/CartList";
import { MuneList } from "../module/MuneList";
import Link from "next/link";
import AccountMenu from "../module/AccountMenu";
import AutoCompleteSearch from "../module/AutoCompleteSearch";

function HeaderLayout() {
  const [mounted, setMounted] = useState(false);
  const cartDrawerOpen = useSelector((state) => state.app.isCartDrawerOpen);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const muneListCategories = useSelector(
    (state) => state.app.muneListCategories
  );
  const activeItem = useSelector((state) => state.app.activeItem);

  const [showMuneAccount, setShowMuneAccount] = useState(null);
  const open = Boolean(showMuneAccount);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subAnchorEl, setSubAnchorEl] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resData = await getAllListsCategories("2");
      dispatch(saveMuneListCategoriesMethod(resData));
    };
    fetchData();
  }, [dispatch]);

  const handleClick = (event) => {
    setShowMuneAccount(event.currentTarget);
  };

  const handleClose = () => {
    setShowMuneAccount(null);
  };

  const toggleDrawer = (open) => () => {
    dispatch(setCartDrawerOpen(open));
  };

  const toggleCartDrawer = (open) => () => {
    dispatch(setCartDrawerOpen(open));
  };

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
    setSubCategories(category.childs);
    setSubAnchorEl(event.currentTarget);
  };

  const handleSubCategoryHover = (event, category) => {
    setSubCategories(category.childs);
    setSubAnchorEl(event.currentTarget);
  };

  if (!mounted) {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      style={{
        background: "#fff",
        padding: "0 10px",
      }}
    >
      <AccountMenu
        showMuneAccount={showMuneAccount}
        handleClose={handleClose}
        open={open}
      />
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
          <AutoCompleteSearch />
        </Search>
        <div>
          <IconButton color="inherit">
            <StarBorderIcon />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="inherit"
          >
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
            <Badge badgeContent={cartItemCount} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
      <Search
        sx={{ display: { xs: "flex", md: "none" }, margin: "10px 0 20px 0" }}
      >
        <AutoCompleteSearch />
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
                      maxHeight: "400px",
                      width: "200px",
                      overflow: "auto",
                    },
                  }}
                >
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
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
                          maxHeight: "400px",
                          width: "200px",
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
        <MuneList toggleDrawer={toggleDrawer} activeItem={activeItem} />
      </Drawer>
      <Drawer
        anchor="left"
        open={cartDrawerOpen}
        onClose={toggleCartDrawer(false)}
      >
        <CartList toggleCartDrawer={toggleCartDrawer} />
      </Drawer>
    </AppBar>
  );
}

export default HeaderLayout;
