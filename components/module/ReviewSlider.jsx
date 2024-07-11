import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards, Autoplay, EffectCoverflow } from "swiper/modules";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Rating,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { reviews } from "@/Data/DataReviews";

const StyledCard = styled(Card)`
  padding: 16px;
  /* margin: 8px; */
  border-radius: 15px;
  box-shadow: none; /* حذف سایه */
  text-align: center;
  cursor: pointer;
  height: 200px; /* ارتفاع ثابت */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A8",
  "#FFD700",
  "#8A2BE2",
  "#20B2AA",
  "#FF4500",
];

const StyledChip = styled(Chip)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #ffd700;
  color: white;
`;

const ReviewSlider = () => {
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleClickOpen = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  return (
    <>
      <Grid display={{ xs: "flex", sm: "none" }}>
        <Box width={{ xs: "70%" }} sx={{ margin: "0 auto", padding: "20px 0" }}>
          <Swiper
            effect={"cards"}
            // grabCursor={true}
            modules={[EffectCards, Autoplay]}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} onClick={() => handleClickOpen(review)}>
                <StyledCard
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  <StyledChip label="نظر" />
                  <CardContent>
                    <Rating name="read-only" value={review.rating} readOnly />
                    {/* <Typography variant="h5" component="div" color="white">
                      {review.rating}
                    </Typography> */}
                    <Typography variant="body2" color="white">
                      {review.date}
                    </Typography>
                    {review.title && (
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        color="white"
                      >
                        {review.title}
                      </Typography>
                    )}
                    <Typography variant="body2" color="white">
                      {review.content}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>

      <Box
        width={{ xs: "70%" }}
        sx={{ margin: "0 auto", padding: "20px 0" }}
        display={{ xs: "none", sm: "flex" }}
      >
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          modules={[EffectCoverflow, Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          speed={1000}
          dir={"rtl"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 0.9,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            490: { slidesPerView: 1.6 },
            640: { slidesPerView: 2 },
            790: { slidesPerView: 2.4 },
            900: { slidesPerView: 2.8 },
            1100: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} onClick={() => handleClickOpen(review)}>
              <StyledCard
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <StyledChip label="نظر" />
                <CardContent>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <Typography variant="h5" component="div" color="white">
                    {review.rating}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {review.date}
                  </Typography>
                  {review.title && (
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      color="white"
                    >
                      {review.title}
                    </Typography>
                  )}
                  <Typography variant="body2" color="white">
                    {review.content}
                  </Typography>
                </CardContent>
              </StyledCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          دیدگاه
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedReview && (
            <>
              <Rating name="read-only" value={selectedReview.rating} readOnly />
              <Typography variant="h5" component="div">
                {selectedReview.rating}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedReview.date}
              </Typography>
              {selectedReview.title && (
                <Typography variant="h6" component="div" gutterBottom>
                  {selectedReview.title}
                </Typography>
              )}
              <Typography variant="body2" color="textSecondary">
                {selectedReview.content}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewSlider;
