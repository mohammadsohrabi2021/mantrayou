import React from "react";
import { Box, Card, CardContent, Skeleton, Chip } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

const StyledSkeleton = styled(Skeleton)`
  height: 300px;
`;

const SkeletonProductCard = () => {
  return (
    <StyledCard>
      <Chip
        label="Sale"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: "red",
          color: "white",
        }}
      />
      <StyledSkeleton variant="rectangular" animation="wave" />
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Skeleton variant="text" width="80%" height={30} animation="wave" />
          <Box display="flex" alignItems="center" my={1} width="100%">
            <Skeleton variant="text" width="40%" height={20} animation="wave" />
            <Skeleton variant="text" width="40%" height={20} animation="wave" />
          </Box>
          <Skeleton variant="text" width="60%" height={20} animation="wave" />
          <Skeleton variant="text" width="60%" height={20} animation="wave" />
          <Skeleton variant="rectangular" width="100%" height={40} animation="wave" sx={{ mt: 2 }} />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SkeletonProductCard;
