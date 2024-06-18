import dataMune from "@/Data/DataMune";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { ListItemStyled } from "../style/HeaderLayout";
import logoSite from "../../assets/images/logoSite.png";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
export const MuneList = ({ toggleDrawer, activeItem, setActiveItem }) => {
  const muneListCategories = useSelector(
    (state) => state.app.muneListCategories
  );
  const[showMune,setShowMune]=useState(false)
  console.log(muneListCategories, "muneListCategories");
  return (
    <Box
      role="presentation"
      // onClick={toggleDrawer(false)}
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
            style={{ width: "80px", height: "80px" }}
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
            onClick={() => setActiveItem(item.id)}
            sx={{ display: "flex", flexDirection:showMune&& "column",maxHeight:'170px',overflowY:'auto'  }}
          >
            <ListItemText
              primary={item.title}
              sx={{ fontFamily: "iran-sans", fontWeight: "bold"}}
              onClick={()=>setShowMune(!showMune)}
            />
         {item.id===3 &&   (showMune? <ArrowDropDownIcon/>:<ArrowLeftIcon/>)}
            {showMune&& <>  {item.id === 3 && (
                    <SimpleTreeView
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}

                    >
                    
                      {muneListCategories.map((category) => (
                        <TreeItem
                          itemId={category.id}
                          label={category.name}
                          key={category.id}
                        >
                          {category.childs &&
                            category.childs.map((subCategory) => (
                              <TreeItem
                                itemId={subCategory.id}
                                label={subCategory.name}
                                key={subCategory.id}
                              />
                            ))}
                        </TreeItem>
                      ))}
                    
                    </SimpleTreeView>
                  )}</>}
           
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
