import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider, Button, Container, Typography, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import theme from '../theme/theme';
import { displayProfile } from '../components/MyPage/ProfileList';
import { logout } from '../actions/auth/auth';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { change_status_info } from '../actions/matchingUser/matchingUser';

import UpperBar from "../components/UpperBar";

const myPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const userMatchInfo = useSelector(state => state.matchingUser.myMatchingInfo);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [MatchChecked, setMatchChecked] = useState(false);
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setDialogOpen(false);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleMatching = () => {
        if (userMatchInfo?.gender) {
            dispatch(change_status_info(!MatchChecked, ([result, message]) => {
                if (result)
                    setMatchChecked(!MatchChecked);
                else {
                    console.log(message);
                }
            }));
            
        } else {
            if (MatchChecked) {
                dispatch(change_status_info(false, ([result, message]) => {
                    if (result)
                        setMatchChecked(false);
                    else {
                        console.log(message);
                    }
                }));
            }
            router.push('/changeProfile');
        }
    }

    useEffect(()=>{
        if (userMatchInfo) {
            setMatchChecked(userMatchInfo.matching);

            const top3Keywords = [];
            for (const key in userMatchInfo.keywords) {
                if (top3Keywords.legnth >= 2) {
                    break;
                }
                const values = userMatchInfo.keywords[key];
                top3Keywords.push(values[0]);
            }
            if (top3Keywords.length < 2) {
                const keys = Object.keys(userMatchInfo.keywords);
                const values = userMatchInfo.keywords[keys];
                top3Keywords.push(values[1])
            }
            top3Keywords.unshift(userMatchInfo.mbti)
            setSelectedKeywords(top3Keywords);
        }
    },[userMatchInfo])

    const CustomSwitch = styled((props)=>(<Switch disableRipple {...props} onClick={handleMatching} checked={MatchChecked}/>))(({ theme }) => ({
        '& .MuiSwitch-thumb': {
          backgroundColor: 'white',
          height: '12px',
          width: '12px',
          marginTop: '9px',
          marginLeft: '5px',
          marginRight: '3px'
        },
        '& .MuiSwitch-track': {
          backgroundColor: MatchChecked ? '#FFCE00' : 'gray',
          height: '20px',
          width: '40px',
          marginTop:'2px',
          borderRadius: '12px',
        },
        marginTop:"-10px",
        marginLeft:'auto'
      }));

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <UpperBar />
        {user && <div style={{marginTop: '30px'}}>
            {/* 상단 회원 정보 */}
            <div style={{display: 'flex', gridTemplateColumns: '72px 1fr 38px', alignItems: 'center', margin: '0 10px 10px 0px'}}>
                <div style={{width: '80px', height:'80px', margin:'0 24px', backgroundColor:'#FFF8D9', border:'0px solid transparent', borderRadius:'10px'}}>
                    {displayProfile(user.image, 100, 100)}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '15px', marginTop: '10px'}}>
                    {/* 닉네임, 캠퍼스, 학과, 학번 */}
                    <div style={{display: 'flex', height: '24px', marginBottom: '6px'}}>
                        <Typography style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '9px'}}>{user.nickname}</Typography>
                        {user.campus == "명륜" ? <Typography sx={{height: '24px', border: "1px solid #FFFCE4", borderRadius:'10px', fontSize: '12px',  fontWeight:'700',p: '2px 4px 0px 4px', color:'#FFAC0B', backgroundColor:'#FFFCE4', margin:'2px 0px 0px 8px'}} >명륜</Typography> : <Typography sx={{height: '24px', border: "1px solid #DCF8DB", borderRadius:'10px', fontSize: '12px',  fontWeight:'700',p: '2px 4px 0px 4px', color:'#58C85A', backgroundColor:'#DCF8DB', margin:'2px 0px 0px 5px'}} >율전</Typography>}
                    </div>
                    <Typography sx={{fontSize: '12px', p: '0px 3.5px 0px 0px', color:'#3C3C3C'}}>{user.major} / {user.student_id}학번 {user.gender && <span>/ {user.gender[0]}</span>}</Typography>
                    <div style={{display: 'flex', marginTop: '6px'}}>
                        {selectedKeywords.length > 0 && selectedKeywords.slice(0, 3).map((keyword, index) => (
                            <div key={index} style={{backgroundColor: '#F2F2F2', borderRadius: '24px', padding: '3px 12px', marginRight: '4px', fontSize: '12px', color: '#777777'}}>{keyword}</div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* 내 정보 */}
            <Container style={{display: 'grid', padding: '0 24px', marginTop: '20px'}}>
                <Typography style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', marginTop: '30px', height: '20px'}}>내 정보</Typography>
                <div onClick={() => router.push('/editNickname')} style={{height: '20px', marginBottom: '15px'}}><Button variant="text" style={{fontSize: '16px', fontWeight: '400', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>계정 정보 &nbsp; &nbsp; &nbsp;</Button></div>
                <div onClick={() => router.push('/resetPassword')} style={{height: '20x'}}><Button variant="text" style={{fontSize: '16px', fontWeight: '400', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>비밀번호 재설정</Button></div>
            </Container>
            <div style={{height:'1px', backgroundColor:'#F2F2F2', margin:'24px'}}></div>

            {/* 밥약 프로필 */}
            <Container style={{display: 'grid', padding: '0 24px',}}>
                <Typography style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', height: '20px'}}>밥약 프로필</Typography>
                <div style={{display:'flex', height: '20px', marginBottom: '15px'}}><Typography variant="text" style={{fontSize: '16px', fontWeight: '400', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>개인 프로필 공개</Typography><CustomSwitch defaultChecked/></div>
                <div onClick={() => router.push('/changeProfile')} style={{height: '20px', marginBottom: '15px'}}><Button variant="text" style={{fontSize: '16px', fontWeight: '400', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>개인 프로필 수정</Button></div>
                <div onClick={() => router.push('/myGroupProfileLists')} style={{height: '28px'}}><Button variant="text" style={{fontSize: '16px', fontWeight: '400', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>그룹 프로필 수정</Button></div>
            </Container>
            <div style={{height:'1px', backgroundColor:'#F2F2F2', margin:'24px'}}></div>

            {/* 고객 지원 */}
            <Container style={{display: 'grid', padding: '0 24px', marginTop: '25px'}}>
                <Typography style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', height: '20px'}}>고객 지원</Typography>
                <div style={{height: '20px', marginBottom: '15px'}}><Typography onClick={() => window.open('http://pf.kakao.com/_KmNnG', '_blank')} style={{fontSize: '16px', fontWeight: '400',marginBottom: '5px', color: '#3C3C3C',}}>문의하기</Typography></div>
                <div style={{height: '20px', marginBottom: '15px'}}><Typography style={{fontSize: '16px', fontWeight: '400',marginBottom: '5px', color: '#3C3C3C',}}>서비스 정보</Typography></div>
            </Container>

            {/* 하단 */}
            <Container style={{width: '100%', display: 'grid', justifyItems: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <div style={{display: 'flex', fontSize: '14px'}}>
                    <Button onClick={handleLogout} variant="text" style={{color: "#BABABA"}}>로그아웃</Button>
                    <div style={{padding: '0 15px', color: '#BABABA', alignSelf: 'center', fontSize: '16px'}}>|</div>
                    <Button onClick={() => router.push('/deleteUser')} variant="text" style={{color: "#BABABA"}}>탈퇴하기</Button>
                </div>
            </Container>

        </div>}
        <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperProps={{ style: { borderRadius: '10px' } }}
            >
                <DialogContent sx={{p: '20px 24px 13px'}}>
                    <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                        <DialogTitle sx={{color: '#000', fontSize: '15px', p: '25px 35px 25px', m: '0', fontWeight: '700'}}>정말 로그아웃 하시겠어요?</DialogTitle>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{p:'0'}}>
                    <div style={{width: '100%', paddingBottom: '20px',  display: 'flex',justifyContent: 'space-between' }}>
                        <Button sx={{width: '43%', hegiht:'100px', p: '5', marginLeft:'15px', color: '#BABABA', borderRadius: '10px', border:'1px solid #F2F2F2', background:'#F2F2F2', fontWeight: '500'}} onClick={handleDialogClose}>아니요</Button>
                        <Button sx={{width: '43%', hegiht:'100px', p: '5', marginRight:'15px',color: 'white', borderRadius: '10px', border:'1px solid #FFCE00', background:'#FFCE00', fontWeight: '500'}} onClick={handleLogout}>확인</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default myPage;
