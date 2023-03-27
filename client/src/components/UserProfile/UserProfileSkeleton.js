import React from "react";
import { Skeleton } from "@mui/material";
import { Box, Grid } from "@mui/material";

const UserProfileSkeleton = () => {
  return (
    <Box>
      <Box sx={{ padding: "75px", mb: 2, borderRadius: 10 }}>
        <Skeleton variant="rounded" width="100%" height={200} />
      </Box>

      <Box sx={{ padding: "75px", pt: 2 }}>
        <Grid container spacing={1}>
          {Array(6)
            .fill()
            .map((_, index) => (
              <Grid item key={index} xs={12} sm={12} md={12} lg={4}>
                <Skeleton variant="rounded" width="100%" height={400} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfileSkeleton;
