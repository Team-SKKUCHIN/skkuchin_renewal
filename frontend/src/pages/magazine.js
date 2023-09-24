import { Avatar, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, Badge, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; 
import { clear_search_results } from "../actions/place/place";
import { load_rank } from '../actions/rank/rank';
import styled from '@emotion/styled';

import food from '../image/food.png';
// import circles from '../image/frames.png';
import arrow from '../image/arrow.png';
import arrowY from '../image/arrowY.png';
import arrowL from '../image/arrowLeft.png'
import arrowR from '../image/arrowRight.png'
import emptyStar from '../image/Star_border-1.png';
import filledStar from '../image/Star-1.png';
import dynamic from 'next/dynamic';

import content from '../image/magazine/magazine/content1_1.png';
import review1_mr from '../image/magazine/review1_mr.png';
import review2_mr from '../image/magazine/review2_mr.png';
import review3_mr from '../image/magazine/review3_mr.png';
import review4_mr from '../image/magazine/review4_mr.png';
import review5_mr from '../image/magazine/review5_mr.png';

import review1_yj from '../image/magazine/review1_yj.png';
import review2_yj from '../image/magazine/review2_yj.png';
import review3_yj from '../image/magazine/review3_yj.png';
import review4_yj from '../image/magazine/review4_yj.png';
import review5_yj from '../image/magazine/review5_yj.png';

const reviewM = [
    {
        src: review4_mr,
        text: '여기 옛날 소친친 있던 자리인데, 바뀌고 처음와봤네요! 타코랑 퀘사디아 존맛탱. 가격대는 좀 있지만 매우 만족',
        user: '경도/경영학과',
        id: 42,
        rating: 5,
    },{
        src: review1_mr,
        text: '성대 근처 김치찌개 집 1티어 중 하나임. 먹어보시길',
        user: '강아지는 도그/경영학과',
        id: 288,
        rating: 5,
    },{
        src: review3_mr,
        text: '제육볶음을 좋아하신다면 꼭 추천드립니다! 불맛🔥이 살아있어용☺️ 순찌도 맛있습니다👍',
        user: '😚/컬처앤테크놀로지융합전공',
        id: 250,
        rating: 5,
    },{
        src: review2_mr,
        text: '인테리어도 이쁘고 사장님, 알바생도 친절하셔요🙂 이층은 카공하기 좋고, 일층은 수다떨기 좋은 분위기!! 낫컴플에 가면 당연히 크로플 하나씩은 먹어야해요...!',
        user: '효효/컬처앤테크놀로지융합전공',
        id: 369,
        rating: 5,
    },{
        src: review5_mr,
        text: '조용해서 좋아요! 혜화 쌀국수 파는 곳 중 가장 맛있어요',
        user: '예진_/데이터사이언스융합전공',
        id: 57,
        rating: 5,
    },
];

const reviewY = [
    {
        src: review3_yj,
        text: '튀김수육, 뭐 언제까지 맛있어? 내년에도 맛있어? 후년에도 맛있을거니?',
        user: '박연진/식품생명공학과',
        id: 207,
        rating: 4,
    },{
        src: review5_yj,
        text: '초밥 땡길 때 자주 가는 곳입니다 회전초밥집이라 원하는것만 골라먹을 수 있어서 좋아요 맛도 좋아요',
        user: '세미나시러/화학공학_고분자공학부',
        id: 102,
        rating: 5,
    },{
        src: review2_yj,
        text: '진짜 거의 맨날 가요 😌🥐💻\n'
        +'율전 카공 일티어..!',
        user: '진/컬처앤테크놀로지융합전공',
        id: 375,
        rating: 5,
    },{
        src: review4_yj,
        text: '도래창 홍창 다 맛있고 볶음밥 꼭 드세요! ',
        user: '100M/스포츠과학과',
        id: 97,
        rating: 5,
    },{
        src: review1_yj,
        text: '엄청난 양.. 맵도리탕도 다들 드셔보세요! 엄청난 술안주 겸 식사메뉴 입니다',
        user: '성대러문김진주/러시아어문학과',
        id: 135,
        rating: 5,
    },
]; 

const MagazineContainer = styled.div`
  /* 데스크톱에서 스크롤 바를 숨김 */
  ::-webkit-scrollbar {
    display: none;
  }
  /* 모바일에서 스크롤 바를 숨김 */
  *::-webkit-scrollbar {
    display: none;
  }
`;

const UpperBar = dynamic(() => import('../components/UpperBar'));

const Magazine = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [reviewNum, setReviewNum] = useState(0);
    const [toggleInfo, setToggleInfo] = useState(null);

    const user = useSelector(state => state.auth.user);
    const toggle = useSelector(state => state.auth.toggle_for_not_user);
    const rank = useSelector(state => state.rank.rank);
    const height = window.innerHeight;
    const width= window.innerWidth;

    useEffect(()=>{
        dispatch(clear_search_results());
    },[])

    useEffect(() => {
        if (user) {
            dispatch(load_rank(user.toggle));
            setToggleInfo(user.toggle);
        } else if (toggle) {
            dispatch(load_rank(toggle));
            setToggleInfo(toggle);
        }
    },[user, toggle])
    
    const handlePrev = () => {
        setReviewNum((prevIndex) =>
        prevIndex === 0 ? reviewM.length - 1 : prevIndex - 1
        );
    };
    
    const handleNext = () => {
        setReviewNum((prevIndex) =>
        prevIndex === reviewM.length - 1 ? 0 : prevIndex + 1
        );
    };

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <UpperBar />
            <Grid style={{overflowX:'hidden', position:'fixed', height:height, overflowY:'scroll', maxWidth:'420px',}}>
                <div style={{margin:'30px 0 20px 20px',}}>
                    <Typography style={{fontSize:'32px', fontWeight:'800'}}>제목제목제목제목</Typography>
                </div>
                
                <div onClick={()=>{router.push('/magazineDetail')}} style={{padding:'0 20px', position: 'relative'}}>
                    <div style={{ width: '100%', height: '230px', overflow: 'hidden', border: '1px solid transparent', borderRadius: '10px' }}>
                        <Image src={content} style={{ objectFit: 'cover', width: '100%', height: '100%'}} />
                    </div>
                    <div style={{ zIndex:'3', position: 'absolute', bottom: '20px', left: '40px', right: '0'}}>
                        <Typography sx={{width:'42px', height: '24px', border: "1px solid #FFFCE4", borderRadius:'10px', textAlign:'center', fontSize: '12px',  fontWeight:'800',p: '2px 4px 0px 4px', color:'#FFAC0B', backgroundColor:'#FFFCE4', margin:'-2px 0px 0px 5px'}}>쪽문</Typography>
                        <Typography sx={{fontSize:'24px', margin:"10px 0 0 5px", color:'white', fontWeight:'700'}}>제목제목제목제목</Typography>
                    </div>
                </div>

                {/* 맛집 콘텐츠 */}
                <div style={{margin:'45px 0px 0px 0px', position:'relative',width:width}}>
                    <div style={{position:'absolute',zIndex:'3'}}>
                        {/* 안에 자유롭게 수정가능 */}
                        <Typography fontSize='12px' fontWeight='700' style={{margin:'23px 0px 0px 15px'}} color="white">스꾸친 마케터의 특별한 맛집 가이드</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>스꾸친 마케터 pick</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">성대 돈가스 맛집 리스트</Typography>
                    </div>
                    <div>
                        <div style={{position:'absolute',zIndex:'3', bottom:'8%', right: '3%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                            <Button style={{margin:'', fontSize:'12px', color:'white'}} onClick={()=>{router.push('/magazineDetail')}}>콘텐츠 보러가기&nbsp;&nbsp; <Image src={arrow} width={15.57} height={15} layout='fixed'/></Button>
                        </div>
                        {/* <div style={{position:'absolute',zIndex:'3', bottom:'6%', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                            <Image src={circles} width={50} height={6} layout='fixed' />
                        </div> */}
                    </div>
                    <div style={{position:'relative', width:'100%', height:'100%'}}>
                        <Image 
                            src={content} 
                            height={400}
                            width={431}
                            layout='fixed'
                            objectFit='cover'
                            style={{ filter: 'brightness(0.6)' }}
                        />
                    </div>
                </div>

                {/* 리뷰 */}
                <div style={{position:'relative', margin:'35px 0px 0px 0px' ,width:width,}}>
                    <div style={{ display: "flex",  margin:'0px 0px 0px 15px' }}>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color="#2E2E2E">성대생의</Typography>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color={theme.palette.primary.main}>리얼 리뷰</Typography>
                        <Typography>👀</Typography>
                    </div>
                    <div style={{margin:'16px 0px 0px 0px'}}>
                        <div style={{position:'absolute',zIndex:'3', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                            <div style={{textAlign: 'center'}}>
                                <div style={{margin:'23px 0px 0px 0px'}}>
                                {[1, 2, 3, 4, 5].map((item, index) => {
                                    let starImage = emptyStar;
                                    if (index + 1 <= reviewM[reviewNum].rating) {
                                        starImage = filledStar;
                                    }
                                    return (
                                        <Image key={index} width={21.72} height={22.43} src={starImage} alt='star' layout='fixed' />
                                    );
                                })}
                                </div>
                                <Typography fontSize='16px' fontWeight='700' style={{margin:'15px 0px 0px 0px', whiteSpace: 'pre-wrap'}} color="white" maxWidth={237}>"{toggleInfo && toggleInfo === '명륜' ? reviewM[reviewNum].text: reviewY[reviewNum].text}"</Typography>
                                <Typography fontSize='12px' fontWeight='400' style={{margin:'15px 0px 0px 0px'}} color="white" maxWidth={237}>{toggleInfo && toggleInfo === '명륜'? reviewM[reviewNum].user :  reviewY[reviewNum].user}</Typography>
                            </div>
                        </div>

                        <div>
                            <div style={{position:'absolute',zIndex:'3', bottom: '6%', right: '3%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                                <Button style={{margin:'', fontSize:'12px'}} onClick={()=>{toggleInfo && toggleInfo === '명륜'? router.push(`/place?id=${reviewM[reviewNum].id}`) : router.push(`/place?id=${reviewY[reviewNum].id}`)}}>이 식당 어디일까?&nbsp;&nbsp; <Image src={arrowY} width={15.57} height={15}/></Button>
                            </div>
                        </div>
                        <div>
                            <div style={{position:'absolute',zIndex:'3', display: 'flex', alignItems: 'center', justifyContent: 'center', left: "0%", top: '50%', transform: 'translateY(-50%)'}}>
                                <Button onClick={handlePrev}><Image src={arrowL} width={10.29} height={18.48} layout='fixed' /></Button>
                            </div>
                        </div>
                        <div>
                            <div style={{position:'absolute',zIndex:'3', display: 'flex', justifyContent: 'center', alignItems: 'center', right: "0%",top: '50%', transform: 'translateY(-50%)'}}>
                                <Button onClick={handleNext}><Image src={arrowR} width={10.29} height={18.48} layout='fixed' /></Button>
                            </div>
                        </div>
                        <div style={{position:'relative', width:'100%', height:'100%', marginBottom:'140px'}}>
                            <Image 
                                src={toggleInfo && toggleInfo === '명륜'? reviewM[reviewNum].src : reviewY[reviewNum].src}
                                height={250}
                                width={431}
                                layout='fixed'
                                objectFit='cover'
                                placeholder='blur'
                                style={{ filter: 'brightness(0.6)' }}
                            />
                        </div>
                    </div>
                </div>
            </Grid> 
        </ThemeProvider>
    )
} 

export default dynamic(() => Promise.resolve(Magazine), {
    ssr: false,
});