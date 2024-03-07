import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Typography, Grid } from '@mui/material';
import { displayMBTI } from './MBTIList';
import { load_candidate } from '../../actions/candidate/candidate'
import noCharacter from '../../image/mbti/profile/noCharacter.png'
import { useRouter } from 'next/router';
import Image from 'next/image';
import GoLogin from "../GoLogin";
import ErrorPopup from "../Custom/ErrorPopup";

const dummyProfiles = [
    {
        name: '바뱍',
        campus: '명륜',
        major: '경영학과',
        student_id: '23학번',
        gender: '남',
        mbti: 'ENFP',
        keywords: ['일식', '음악'],
        description:
            '성대 학우와 채팅을 나누시려면 매칭 프로필을 등록해주세요 👀',
    },
    {
        name: '김꾸친',
        campus: '명륜',
        major: '무용학과',
        student_id: '20학번',
        gender: '여',
        mbti: 'ISFJ',
        keywords: ['여행', '동아리'],
        description:
            '성대 학우와 채팅을 나누시려면 매칭 프로필을 등록해주세요 👀',
    },
    {
        name: '웅이',
        campus: '율전',
        major: '반도체시스템공학과',
        student_id: '22학번',
        gender: '남',
        mbti: 'INTP',
        keywords: ['연극/뮤지컬', '카페'],
        description:
            '성대 학우와 채팅을 나누시려면 매칭 프로필을 등록해주세요 👀',
    },

];
  
const Friends = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const matchingUser = useSelector(state => state.matchingUser.matchingUser);
    const candidate = useSelector(state => state.candidate.candidate);
    const requestId = useSelector(state => state.chatRoom.requestId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(false);
    
    useEffect(() => {
        if(candidate === null) dispatch(load_candidate());
    }, []);

    const [open, setOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');
    
    const handleSettingOpen = () => {
        if (isAuthenticated) {
            router.push({
                pathname: '/changeProfile',
                query: { src : '스꾸챗프로필설정', }
            });
        } 
    }

    const handleFriendClick = (friend) => {
        localStorage.setItem('candidateId', friend.id);
        localStorage.setItem('selectedFriend', JSON.stringify(friend));
        router.push(`/showFriendProfile`);
    };

    const handleRequestBtnClick = (id) => {
        if (!isAuthenticated) {
            setPopupMessage('밥약 신청을 위해서는 로그인이 필요해요.');
            setPopupBtnText('로그인하러 가기');
            setOpen(true);
        } else if (!matchingUser) {
            setPopupMessage('1:1 밥약을 신청하기 위해선\n개인 프로필 작성이 필요해요.');
            setPopupBtnText('개인 프로필 등록하기');
            setOpen(true);
        } else if (matchingUser && !matchingUser.matching) {
            setPopupMessage('1:1 밥약을 신청하기 위해선\n개인 프로필을 공개로 변경해주세요');
            setPopupBtnText('개인 프로필 공개하기');
            setOpen(true);
        } else if (user && user.phone_number === null) {
            setPopupMessage('밥약 서비스 이용을 위해선 휴대폰 본인인증이 필요해요. 안전한 서비스 이용을 위해 인증해주세요.');
            setPopupBtnText('휴대폰 본인인증 하기');
            setOpen(true);
        } 
        else {
            localStorage.setItem('candidateId', id);
            router.push({
                pathname: '/enrollOpenChat',
                query: { type: 'friend'},
            });
        }
    };
    
    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0'}}>
            {isLogin && <GoLogin open={isLogin} onClose={setIsLogin} /> }
            { candidate ? 
            candidate.map((person, index) => (
            <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '28px 16px', flexShrink: 0, mr: '19px', mb: '21px'}}>
                <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    {displayMBTI(person.mbti, 90, 90)}
                    <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                        <Typography sx={{fontSize: '16px', fontWeight: '700', mr: '5px'}}>{person !== null && person.nickname}</Typography>
                        {
                            person !== null && 
                            person.campus == '명륜' ?
                            <Typography sx={{width: 'max-content',color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                            : 
                            <Typography sx={{color: '#58C85A', backgroundColor: '#DCF8DB', fontSize: '12px',fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                        }
                    </Grid>
                    <Grid item sx={{display: 'flex', fontSize: '12px', alignItems: 'center', fontWeight: 400, color: '#3C3C3C'}}>
                        <Grid item sx={{flexGrow: 1, fontSize: '12px'}}>
                            {person.major}&nbsp;/&nbsp; 
                            {person.student_id}학번&nbsp;/&nbsp; 
                            {(person.gender).charAt(0)}
                        </Grid>
                    </Grid>
                    <Grid item sx={{display: 'flex', p: '10px 0', m: '10px 0', gap: '4px'}}>
                        <Grid item sx={{color: '#777777', backgroundColor: '#F2F2F2', p: '3px 13px', fontSize: '12px', fontWeight: 400, borderRadius: '24px'}}>
                            {person.mbti}
                        </Grid>
                        {
                            (person.keywords) != null &&
                            <>
                                {(Object.values(person.keywords).flat().slice(0, 2).map((keyword, index) => (
                                    <Grid item key={index} sx={{color: '#777777', backgroundColor: '#F2F2F2', p: '3px 13px', fontSize: '12px', fontWeight: 400, borderRadius: '24px'}}>
                                        {keyword}
                                    </Grid>
                                )))}
                            </>
                        }
                    </Grid >
                    <Typography sx={{ fontSize: '14px', height: '40px', lineHeight: '20px', fontWeight: 400, color: '#3C3C3C', textAlign: 'center', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                        {'"'+person.introduction+'"'}
                    </Typography>
                    <Grid item sx={{ display: 'flex',  alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                        <Button
                            disableElevation
                            disableTouchRipple
                            key="profile-button"
                            onClick={() => handleFriendClick(person)}
                            sx={{
                                color: '#777777',
                                fontSize: '14px',
                                fontWeight: 700,
                                textAlign: 'center',
                                pr: '15px',
                            }}
                        >
                            프로필 보기
                        </Button>
                        <div
                            style={{
                                width: '2px',
                                height: '12px', 
                                backgroundColor: '#E2E2E2',
                                borderRadius: '10px',
                            }}
                        />
                        {requestId && requestId.includes(person.id) ? (
                            <Button
                                disableElevation
                                disableTouchRipple
                                key="completed-button"
                                sx={{
                                    color: '#505050',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    pl: '15px',
                                }}
                            >
                                신청 완료
                            </Button>
                        ) : (
                            <Button
                                disableElevation
                                disableTouchRipple
                                key="apply-button"
                                onClick={()=> handleRequestBtnClick(person.id)}
                                sx={{
                                    color: '#FFAC0B',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    pl: '15px',
                                }}
                            >
                                밥약 걸기
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Card> 
            )) 
            :
            <>
                { dummyProfiles.length !== 0 &&
                    dummyProfiles.map((person, index) => (
                    <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '28px 16px', flexShrink: 0, mr: '19px', mb: '21px'}}>
                        <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image src={noCharacter} width={80} height={80} placeholder="blur" layout='fixed' />
                            <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                                <Typography sx={{fontSize: '16px', fontWeight: '700', mr: '5px'}}>{person.name}</Typography>
                                {
                                        person !== null && 
                                        person.campus == '명륜' ?
                                        <Typography sx={{width: 'max-content',color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                                        : 
                                        <Typography sx={{color: '#58C85A', backgroundColor: '#DCF8DB', fontSize: '12px',fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                                }
                            </Grid>
                            <Grid item sx={{display: 'flex', fontSize: '12px', alignItems: 'center', fontWeight: 400, color: '#3C3C3C'}}>
                                <Grid item sx={{flexGrow: 1, fontSize: '12px'}}>
                                    {person.major}&nbsp;/&nbsp; 
                                    {person.student_id}학번&nbsp;/&nbsp; 
                                    {(person.gender).charAt(0)}
                                </Grid>
                            </Grid>
                            <Grid item sx={{display: 'flex', p: '10px 0', m: '10px 0'}}>
                                <Grid item sx={{color: '#9E9E9E', p: '0px 2.5px', fontSize: '12px', fontWeight: 700}}>
                                    {'#'+person.mbti}
                                </Grid>
                                {(person.keywords) != null ?
                                    ((person.keywords).slice(0, 2).map((interest, index)=> (
                                        <Grid item key={index} sx={{ color: '#9E9E9E', p: '0px 1.5px', fontSize: '12px', fontWeight: 700}}>
                                            {'#'+interest}
                                        </Grid>
                                    )))
                                : null}
                            </Grid >
                            <Grid item sx={{width: '169px', textAlign: 'center', pb: '8px'}}>
                                <Typography sx={{ fontSize:'13px', fontWeight: '500', whiteSpace: 'pre-wrap'}}>
                                    {
                                        matchingUser?.matching === false ?
                                        '성대 학우와 채팅을 나누시려면\n\n[마이페이지]에서\n매칭 ON/OFF 버튼을 켜주세요 👀' 
                                        : '성대 학우와 채팅을 나누시려면 매칭 프로필을 등록해주세요 👀'
                                    }
                                </Typography>
                            </Grid>
                            {
                                matchingUser?.matching === false ? null
                                :
                                <Button onClick={()=>handleSettingOpen()}  sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                                    프로필 등록하기
                                </Button>
                            }
                        </Grid>
                    </Card>
                ))}
            </>
            }
            <ErrorPopup
                open={open}
                handleClose={() => setOpen(false)}
                message={popupMessage}
                btnText={popupBtnText}
                onConfirm={() => {
                    setOpen(false);
                    if (popupBtnText === '로그인하러 가기') {
                        router.push('/login');
                    } else if (popupBtnText === '개인 프로필 공개하기') {
                        router.push('/myPage');
                    } else if (popupBtnText === '개인 프로필 등록하기') {
                        router.push('/changeProfile');
                    } else if (popupBtnText === '휴대폰 본인인증 하기') {
                        router.push('/verification');
                    }
                }}
            />
    </Grid>
    )
}

export default Friends;