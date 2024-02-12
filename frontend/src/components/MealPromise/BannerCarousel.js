import React from "react";
import { Grid, Typography, MobileStepper } from "@mui/material";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const BannerCarousel = ({ banners, activeStep, handleStepChange }) => {
  return (
    <>
      <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {banners.map((banner, index) => (
          <Grid
            key={index}
            sx={{
              border: '1px solid #E2E2E2',
              borderRadius: '12px',
              p: '28px 16px',
            }}
          >
            <Typography sx={{ color: '#3C3C3C', fontSize: '20px', fontWeight: 700 }}>{banner.title}</Typography>
            <Typography sx={{ color: '#777777', fontSize: '14px', fontWeight: 500 }}>{banner.content}</Typography>
          </Grid>
        ))}
      </AutoPlaySwipeableViews>
      
      <MobileStepper
        variant="dots"
        steps={banners.length}
        position="static"
        activeStep={activeStep}
        sx={{ mt: 1, justifyContent: 'center' }}
      />
    </>
  );
};

export default BannerCarousel;
