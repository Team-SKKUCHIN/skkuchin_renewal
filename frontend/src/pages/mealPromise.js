import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Typography, Button, Grid, Divider, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import UpperBar from "../components/UpperBar";
import theme from "../theme/theme";
import styled from '@emotion/styled';
import BannerCarousel from "../components/MealPromise/BannerCarousel";
import Groups from "../components/Matching/Groups";
import Friends from "../components/Matching/Friends";
import { load_all_group_profile, get_my_group_profile } from "../actions/groupProfile/groupProfile";
import { load_matching_info } from "../actions/matchingUser/matchingUser";
import ErrorPopup from "../components/Custom/ErrorPopup";

const LayoutContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  *::-webkit-scrollbar {
    display: none;
  }
`;

const MealPromisePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const matchingUser = useSelector(state => state.matchingUser.matchingUser);
  const allGroupProfiles = useSelector(state => state.groupProfile.allGroupProfiles);
  const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);

  const [activeStep, setActiveStep] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupBtnText, setPopupBtnText] = useState('');

  const banners = [
    {
      title: "그룹 밥약은 이렇게 진행돼요",
      content: "눌러서 자세히 보기",
    },
    {
      title: "두번째 배너 제목",
      content: "눌러서 자세히 보기",
    },
  ];

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleShowMoreBtn = (type) => {
    if(type === 'two') {
      router.push('/showAllTwoLists');
    } else {
      router.push('/showAllGroupLists');
    }
  };

  const handleScroll = () => {
    setIsScrollingDown(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddBtnClick = () => {
    if(!isAuthenticated) {
        setPopupMessage('그룹 프로필을 등록하기 위해서는\n로그인이 필요해요.');
        setPopupBtnText('로그인하러 가기');
        setPopupOpen(true);
    } else if (user && user.phone_number === null) {
          setPopupBtnText('휴대폰 본인인증 하기');
          setPopupMessage('밥약 서비스 이용을 위해선 휴대폰 본인인증이 필요해요. 안전한 서비스 이용을 위해 인증해주세요.');
          setPopupOpen(true);
    } else {
          router.push('/makeGroupProfile');
    } 
  }

  useEffect(() => {
    console.log(user)
  }, [user]);

  useEffect(() => {
    if(allGroupProfiles === null) dispatch(load_all_group_profile());
    if(isAuthenticated && myGroupProfiles === null) dispatch(get_my_group_profile());
    if(isAuthenticated && matchingUser === null) dispatch(load_matching_info());
  }, [user, isAuthenticated]);

  return (
    <LayoutContainer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UpperBar />
        <div style={{ width: "100%", height: "100%", padding: '24px' }}>
          {/* 배너 */}
          <BannerCarousel
            banners={banners}
            activeStep={activeStep}
            handleStepChange={handleStepChange}
          />

          {/* 그룹 밥약 */}
          <div style={{ margin: '24px 0' }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '10px'}}>
                <Typography style={{fontWeight:700, color: '#3C3C3C', fontSize: '21px', fontWeight: 700}}>
                    여럿이서 먹어요
                </Typography>

                <Button onClick={() => handleShowMoreBtn('group')} style={{fontWeight:700, color: '#9E9E9E', fontSize: '16px', fontWeight: 700}}>
                    전체보기
                </Button>
            </div>
            <Grid sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '10px 0 0'}}>
                <Groups />
            </Grid>
          </div>

          <Divider orientation="horizontal" sx={{ border: '5px solid #F2F2F2', margin: '0 -24px' }} />

          {/* 밥약 */}
          <div style={{ margin: '24px 0' }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '10px'}}>
                <Typography style={{fontWeight:700, color: '#3C3C3C', fontSize: '21px', fontWeight: 700}}>
                    둘이 먹어요
                </Typography>

                <Button onClick={() => handleShowMoreBtn('two')} style={{fontWeight:700, color: '#9E9E9E', fontSize: '16px', fontWeight: 700}}>
                    전체보기
                </Button>
            </div>
            <Grid sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', mt: '10px'}}>
                <Friends />
            </Grid>
          </div>
        </div>

        {/* floating button */}
        <div style={{ position: 'fixed', right: '24px', bottom: '24px', left: isScrollingDown ? 'auto' : '24px'}}>
          {isScrollingDown ? (
            <IconButton
              style={{
                backgroundColor: "#FFCE00",
                color: '#fff',
                borderRadius: '25px',
                boxShadow: 'none',
                height: '52px',
                width: '52px'
              }}
              onClick={handleAddBtnClick}
            >
              <AddIcon fontSize="medium" />
            </IconButton>
          ) : (
            <Button
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#FFCE00",
                color: '#fff',
                fontSize: '18px',
                fontWeight: 800,
                borderRadius: '25px',
                height: '52px',
                boxShadow: 'none',
              }}
              onClick={handleAddBtnClick}
            >
              + 그룹 프로필 작성
            </Button>
          )}
        </div>
        <ErrorPopup
          open={popupOpen}
          handleClose={() => setPopupOpen(false)}
          message={popupMessage}
          btnText={popupBtnText}
          onConfirm={() => {
            setPopupOpen(false);
            if (popupBtnText === '로그인하러 가기') {
              router.push('/login');
            } else if (popupBtnText === '휴대폰 본인인증 하기') {
              router.push('/verification');
            }
          }}
        />

      </ThemeProvider>
    </LayoutContainer>
  );
};

export default MealPromisePage;
