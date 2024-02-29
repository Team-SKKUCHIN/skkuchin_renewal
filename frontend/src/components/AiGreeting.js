import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Typography, Button, Grid, Popover, Modal, IconButton, Dialog,DialogContent,DialogActions } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import theme from '../theme/theme';
import { useState, useEffect } from 'react';
import {Container} from '@mui/material';
import { change_status_info, load_matching_info } from '../actions/matchingUser/matchingUser';

// 스위치
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Image from 'next/image';
import Link from 'next/link';

import closeIcon from '../image/close.png';
import profile from '../image/profile.png';

//mbti 프로필
import profile1 from '../image/mbti/profile/mainCharacter.png';
import profile2 from '../image/mbti/profile/mealCharacter.png';
import ENFJ from '../image/mbti/profile/ENFJ.png';
import ENTP from '../image/mbti/profile/ENTP.png';
import INFP from '../image/mbti/profile/INFP.png';
import ENFP from '../image/mbti/profile/ENFP.png';
import ISTJ from '../image/mbti/profile/ISTJ.png';
import ISTP from '../image/mbti/profile/ISTP.png';
import ISFP from '../image/mbti/profile/ISFP.png';
import INTP from '../image/mbti/profile/INTP.png';
import ESTJ from '../image/mbti/profile/ESTJ.png';
import INFJ from '../image/mbti/profile/INFJ.png';
import ENTJ from '../image/mbti/profile/ENTJ.png';
import ESTP from '../image/mbti/profile/ESTP.png';
import ESFJ from '../image/mbti/profile/ESFJ.png';
import INTJ from '../image/mbti/profile/INTJ.png';
import ISFJ from '../image/mbti/profile/ISFJ.png';
import ESFP from '../image/mbti/profile/ESFP.png';

const AiGreeting = ({option}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const user = useSelector(state => state.auth.user);
    const userInfo = useSelector(state => state.matchingUser.matchingUser);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [status, setStatus] = useState(false);

    const src ={
        DEFAULT1: profile1,
        DEFAULT2: profile2,
        INFP:INFP,
        ENFJ:ENFJ,
        ENTP:ENTP,
        ENFP:ENFP,
        ISTJ:ISTJ,
        ISTP:ISTP,
        ISFP:ISFP,
        INTP:INTP,
        ESTJ:ESTJ,
        INFJ:INFJ,
        ENTJ:ENTJ,
        ESTP:ESTP,
        ESFJ:ESFJ,
        INTJ:INTJ,
        ISFJ:ISFJ,
        ESFP:ESFP,
    }
    
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(load_matching_info(([result, message]) => {
                if (result) {
                    setLoad(true);
                } else {
                    setLoad(false);
                }
            }));
        } else {
            setLoad(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (userInfo) {
            setStatus(userInfo.matching);
        }
    }, [userInfo])
    
    //추가 프로필 정보 받아오기
    const [load, setLoad] = useState('');

    //프로필 설정하라는 다이얼로그
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (e) => {
        if(dialogOpen){
            setDialogOpen(false);
        } else{
            setDialogOpen(true);
        }
    }

    const handleMatching = () => {
        dispatch(change_status_info(!status));
        setStatus(!status);
    }

    const handleShowMoreBtn = () => {
        if(option == '여럿이서 먹어요') {
            router.push('/showAllGroupLists');
        } else if(option == '둘이 먹어요') {
            router.push('/showAllTwoLists');
        }
    }

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} onClick={handleMatching} checked={status} />
        ))(({ theme }) => ({
            width: 40,
            height: 22,
            padding: 0,

            '& .MuiSwitch-switchBase': {
            padding: 1,
            margin: 3,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#FFCE00',
                opacity: 1,
                border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#FFCE00',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
            },
            '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 15,
            height: 15,
            },
            '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
            },
    }));

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleMoveProfile = () => {
        router.push({
            pathname: '/makeProfile',
            query: { src : '스꾸챗프로필설정', }
        })
    }
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container disableGutters={true} maxWidth="xs" style={{height:"max-content", margin:"0", padding:"0"}} overflow="hidden">
            <div style={{ position:"relative", paddingTop:"10px", width: "100%", background: "white", alignContent:"center", maxWidth:"420px"}}>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <Typography style={{fontWeight:700, color: '#3C3C3C', fontSize: '21px', fontWeight: 700, padding:"10px 24px"}}>
                        같이 한끼 해요
                    </Typography>

                    <Button onClick={handleShowMoreBtn} style={{fontWeight:700, color: '#9E9E9E', fontSize: '16px', fontWeight: 700, padding:"10px 24px"}}>
                        전체보기
                    </Button>
                </div>
            </div>

            {user && userInfo !== null ?
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: "300px",
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '0',
                    borderRadius: "30px",
                }}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth:"420px", padding:"15px 15px 0px 15px"}}>
                <div style={{fontSize:"12px", paddingTop:"3px"}}>
                    매칭 활성화
                </div>

                {/* 토글 스위치 */}
                <FormControlLabel
                    style={{paddingTop:"2px"}}
                    control={<IOSSwitch sx={{ m: 1, marginLeft:"20px" }} defaultChecked />}
                />

                <div style={{flex: 1}} />
                    <div style={{ display: "flex", justifyContent: "flex-end", padding:"none" }}>
                            <Image
                                src={closeIcon}
                                width="35px"
                                height="35px"
                                onClick={handleClose}
                                layout='fixed'
                                />
                    </div>
                </div>

                {/* 유저 프로필 이미지 */}
                <div style={{textAlign:"center", marginTop:"30px"}}>
                    <Image 
                        src={user.image ? src[user.image] : profile}
                        width="140px"
                        height="140px"
                        placeholder="blur"
                        layout='fixed'
                    />
                </div>

                {/* 유저 nickname */}
                <div style={{textAlign:"center"}}>
                    <Typography style={{fontWeight:700, fontSize:"15px"}}>
                        {user.nickname}
                    </Typography>
                </div>

                {/* 유저 가입정보 및 성별 */}
                <div style={{textAlign:"center"}}>
                    <Grid style={{fontSize:"10px", color:"#BABABA", textAlign:"center"}}>
                        <Typography style={{
                            fontSize:"10px", 
                            color:"#BABABA", 
                            borderRadius:"10px", 
                            border:"1px solid #BABABA", 
                            display:"inline-block", 
                            marginRight:"3px",
                            padding:"1px 6.5px",
                            width:"34px"}}>
                        {user.campus}
                        </Typography>
                        {user.major} /&nbsp;
                        {user.student_id}학번 /&nbsp;
                        {userInfo.gender?.slice(0,1)}
                    </Grid>
                </div>

                {/* 유저 관심사, 추가 프로필 설정 후 연결 필요 */}
                <div style={{textAlign:"center", marginTop:"10px"}}>
                <Grid style={{fontSize:"12px", color:"#BABABA", textAlign:"center"}}>
                        <Typography style={{
                            fontSize:'12px',
                            color:"white", 
                            background:"#BABABA",
                            borderRadius:"20px", 
                            border:"1px solid #BABABA", 
                            display:"inline-block", 
                            marginRight:"5px",
                            padding:"4.5px 7px ",
                            }}>
                        {userInfo.mbti}
                        </Typography>
                    </Grid>
                </div>

                <div style={{width:"70%", margin:"40px auto"}}>
                    <Typography style={{textAlign:"center", fontSize:"13px"}}>
                        "{userInfo.introduction}"
                    </Typography>
                </div>

                {/* Link to 프로필 수정 */}
                <div style={{padding:"none", margin:"0 auto 30px auto", width:"80px", borderBottom:"1px solid black"}}>
                    <Link href="/changeProfile">
                        <Typography style={{textAlign:"center", fontSize:"12px", fontWeight:700}}>
                            프로필 수정하기
                        </Typography>
                    </Link>
                </div>
                
            </div>
            </Modal>
            : null }
            </Container>
            <Dialog open={dialogOpen} onClose={handleDialogOpen}>
                <DialogContent style={{width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight={theme.typography.h1}>
                    매칭 기능을 이용하시려면<br/>
                    추가 프로필 등록이 필요해요!
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center'}}>
                    <Button style={{fontSize:"12px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration: 'underline'}}>
                        <Typography style={{fontSize:"12px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`, marginBottom:'10px'}} onClick={handleMoveProfile}>
                            프로필 등록하기
                        </Typography>
                    </Button> 
                </DialogActions>
            </Dialog>
        </ThemeProvider>
)};

export default AiGreeting;