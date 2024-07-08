import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";
import { categories } from "@/Data/DataBannerCategories";

const CategorySkeleton = () => (
  <Grid item xs={3}>
    <Skeleton variant="circular" width={80} height={80} />
    <Skeleton width="100%" />
  </Grid>
);

const CategoryCard = ({ title, imageUrl }) => {
  return (
    <Grid item xs={3} >
      <Card sx={{ textAlign: "center", boxShadow: "none",paddingTop:'20px',width:'max-content',cursor:'pointer' }}>
        <CardMedia
          component="img"
          image={imageUrl?.src}
          alt={title}
          sx={{ width: 80, height: 80, borderRadius: "50%", margin: "auto" }}
        />
        <CardContent>
          <Typography
            variant="body2"
            sx={{ fontFamily: "iran-sans", fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const BannerCategoryList = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
      className="box-shadow"
      overflow={'auto'}
     borderRadius={2}
    >
      {loading
        ? Array.from(new Array(8)).map((_, index) => (
            <CategorySkeleton key={index} />
          ))
        : categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              imageUrl={category.imageUrl}
            />
          ))}
    </Grid>
  );
};

export default BannerCategoryList;
