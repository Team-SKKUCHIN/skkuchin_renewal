import React from "react";
import { Grid, Typography, MobileStepper } from "@mui/material";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import mainCharacterImage from "../../image/bannerImage.png";
import Image from "next/image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const BannerCarousel = ({ banners, activeStep, handleStepChange, handleBannerClick }) => {
  return (
    <>
      <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {banners.map((banner, index) => (
          <Grid
            key={index}
            sx={{
              border: '1px solid #E2E2E2',
              borderRadius: '12px',
              p: '28px 20px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid item xs={9}>
              <Typography sx={{ color: '#3C3C3C', fontSize: '18px', fontWeight: 700 }}>
                {banner.title}
              </Typography>
              <Typography sx={{ color: '#777777', fontSize: '12px', fontWeight: 500, marginTop: '5px' }}>
                <span onClick={() => handleBannerClick(banner.instagramLink)}>{banner.content}</span>
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Image src={mainCharacterImage} alt="mainCharacter" width={60.3} height={51.18} />
            </Grid>
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
