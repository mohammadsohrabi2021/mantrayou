import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
  IconButton,
  Rating,
  Grid,
  Modal,
} from "@mui/material";
import {
  fetchReviews,
  submitReview,
  editReview,
  deleteReview,
} from "../../pages/api/products/productsApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import DynamicModal from "./DynamicModal";
import { toast } from "react-toastify";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [score, setScore] = useState(0);
  const [editReviewId, setEditReviewId] = useState(null);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [openDialogDeleted, setOpenDialogDeleted] = useState(false);
  const token = Cookies.get("token");
  const user = useSelector((state) => state.app.userInfo);

  const handleOpenDialog = (id) => {
    setOpenDialogDeleted(!openDialogDeleted);
    setDeleteReviewId(id);
  };

  const loadReviews = async () => {
    const data = await fetchReviews(productId);
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  useEffect(() => {
    if (editReviewId) {
      const reviewToEdit = reviews?.ratings?.find(
        (review) => review.id === editReviewId || review._id === editReviewId
      );
      if (reviewToEdit) {
        setReviewText(reviewToEdit.comment);
        setScore(reviewToEdit.score);
      }
    }
  }, [editReviewId, reviews]);

  const handleReviewSubmit = async () => {
    setSubmitting(true);
    try {
      const review = { comment: reviewText, score: score };
      const data = await submitReview(token, productId, review);
      if (data?.status) {
        setReviewText("");
        setScore(0);
        toast.success("نظر شما با موفقیت ثبت شد");
        loadReviews();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("خطا در ثبت نظر");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewEdit = async () => {
    setSubmitting(true);
    try {
      const review = { comment: reviewText, score: score };
      const data = await editReview(token, productId, editReviewId, review);
      if (data?.status) {
        setEditReviewId(null);
        setReviewText("");
        setScore(0);
        toast.success("نظر شما با موفقیت ویرایش شد");
        loadReviews();
      }
    } catch (error) {
      console.error("Error editing review:", error);
      toast.error("خطا در ویرایش نظر");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewDelete = async () => {
    setSubmitting(true);
    try {
      const response = await deleteReview(token, deleteReviewId, productId);
      if (response?.status) {
        loadReviews();
        toast.success("نظر با موفقیت حذف شد");
        setOpenDialogDeleted(false);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("خطا در حذف نظر");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={4} p={3} borderRadius={3} className={"box-shadow"}>
      <Typography fontSize={"18px"} mb={2} fontFamily={"iran-sans"}>
        نظرات محصول
      </Typography>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography fontFamily={"iran-sans"}>
          میانگین امتیاز:{" "}
          {reviews?.rate_average > 0 ? reviews?.rate_average : 0}
        </Typography>
        <Typography fontFamily={"iran-sans"}>
          تعداد نظرات :{" "}
          {reviews?.total_rate_count > 0 ? reviews?.total_rate_count : 0}
        </Typography>
      </Grid>
      {reviews?.ratings?.map((review, index) => (
        <Box
          key={index}
          mb={2}
          p={2}
          borderBottom="1px solid #ddd"
          borderRadius="4px"
        >
          <Grid
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Rating value={review.score} readOnly />
              <Typography variant="subtitle1" fontFamily={"iran-sans"}>
                {review.name}
              </Typography>
            </Grid>
            <Grid
              display={"flex"}
              gap={"20px"}
              flexDirection={"column"}
              // alignItems="space-between"
              // justifyContent="center"
        
            >
              <Typography
                variant="caption"
                fontFamily={"iran-sans"}
                color={"gray"}
              >
                {new Date(review.creation_date).toLocaleDateString("fa-IR")}
              </Typography>
              <Typography
                variant="caption"
                fontFamily={"iran-sans"}
                color={"gray"}
                bgcolor={"rgba(76, 175, 80, 0.1)"}
                fontSize={"12px"}
                fontWeight={700}
                lineHeight={2.17}
                textAlign={"center"}
                borderRadius={"10rem"}
                width={"80px"}
              >
                {review?.is_buyer ? "خریدار" : "بازدید کننده"}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            color="textSecondary"
            fontFamily={"iran-sans"}
            fontSize={"12px"}
          >
            {review.comment}
          </Typography>
          {review.user_id === user?._id && (
            <Grid container justifyContent="flex-end">
              <IconButton
                onClick={() => {
                  setEditReviewId(review.id || review._id);
                  setReviewText(review.comment);
                  setScore(review.score);
                }}
              >
                <EditIcon style={{ color: "green" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleOpenDialog(review._id);
                  console.log(review, user?._id);
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </Grid>
          )}
        </Box>
      ))}
      <Box display="flex" flexDirection="column" mt={2}>
        <TextField
          label={editReviewId ? "ویرایش نظر" : "نظر خود را بنویسید"}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          multiline
          rows={4}
        />
        <Rating
          name={editReviewId ? "edit-rating" : "new-rating"}
          value={score}
          onChange={(event, newValue) => setScore(newValue)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editReviewId ? handleReviewEdit : handleReviewSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <CircularProgress size={24} />
          ) : editReviewId ? (
            "ویرایش نظر"
          ) : (
            "ارسال نظر"
          )}
        </Button>
      </Box>
      <DynamicModal
        open={openDialogDeleted}
        onClose={handleOpenDialog}
        title="حذف دیدگاه محصولات"
        description={` آیا واقعا قصد حذف دیدگاه محصول خود از لیست دیدگاه ها رو دارید؟ `}
        onConfirm={handleReviewDelete}
      />
    </Box>
  );
};

export default ProductReviews;
