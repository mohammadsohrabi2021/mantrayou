import React, { useState, useEffect, useRef } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Popover,
  Typography,
  useMediaQuery,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton
} from "@mui/material";
import baseImage from '../../assets/images/mantra.png';
import SearchIcon from "@mui/icons-material/Search";

import { autoCompleteSearchAPI } from "@/pages/api/cart/cartApi";
import { SearchIconWrapper, StyledInputBase } from "../style/HeaderLayout";
import { useRouter } from "next/router";

const AutoCompleteSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const debounceTimeout = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const search = async () => {
      if (!inputValue) {
        setLoading(false);
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await autoCompleteSearchAPI(inputValue, {
          signal: controller.signal,
        });
        if (res) {
          setResults(res);
        } else {
          alert("Error fetching search results");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (inputValue) {
      debounceTimeout.current = setTimeout(() => {
        search();
      }, 300); // Delay of 300ms
    } else {
      setLoading(false);
      setResults([]);
    }

    return () => {
      clearTimeout(debounceTimeout.current);
      controller.abort();
    };
  }, [inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = (id) => {
    setInputValue("");
    handleClose();
    router.push(`/products/${id}`);
  };

  const open = Boolean(anchorEl) && inputValue.length > 0;
  const id = open ? "search-popover" : undefined;
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box ref={inputRef} sx={{ position: 'relative', width: '100%' }}>
        <Grid container>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="جستجو کنید ...."
            inputProps={{ "aria-label": "search" }}
            value={inputValue}
            onChange={handleChange}
            fullWidth // Ensure full width
          />
        </Grid>
      </Box>
      {inputValue && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableAutoFocus={true}
          disableEnforceFocus={true}
          PaperProps={{
            style: {
              width: inputRef.current ? inputRef.current.offsetWidth : "auto",
              maxHeight: "300px",  // Maximum height of the Popover
            },
          }}
        >
          <Box sx={{ p: 2, maxHeight: 300, overflowY: "auto", maxWidth: 450 }}>
            {loading ? (
              <Grid container spacing={2}>
                {[...Array(3)].map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Skeleton variant="rectangular" height={100} />
                    <Skeleton width="10%" />
                    <Skeleton width="80%" />
                  </Grid>
                ))}
              </Grid>
            ) : results.length > 0 ? (
              <Grid container spacing={2}>
                {results.map((result, index) => (
                  <Grid item xs={12} key={index}>
                    <Card onClick={() => handleCardClick(result._id)} sx={{display:'flex',cursor:'pointer'}}>
                      <CardMedia
                        component="img"
                      sx={{width:'100px'}}
                        image={result?.main_image !== null ?`https://api.mantrayou.com/images/${result.main_image}` : `${baseImage.src}`}
                        alt={result.name}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {result.name}
                        </Typography>
                        <Typography fontFamily={'iran-sans'} variant="body2" color={result.availability? 'green':'red'}>
                          {result.availability? 'موجود':"ناموجود"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography textAlign={'center'} p={2} fontFamily={'iran-sans'} color={'red'}>متاسفانه محصول مورد نظرتون یافت نشد</Typography>
            )}
          </Box>
        </Popover>
      )}
    </Box>
  );
};

export default AutoCompleteSearch;
