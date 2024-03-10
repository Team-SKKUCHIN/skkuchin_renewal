import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Typography, Grid } from '@mui/material';
import { displayMBTI } from './MBTIList';
import { useRouter } from 'next/router';
import ErrorPopup from "../Custom/ErrorPopup";
import { change_status_info } from "../../actions/matchingUser/matchingUser";

const dummyProfiles = [
    {
        nickname: '바뱍',
        campus: '명륜',
        major: '경영학과',
        student_id: '23학번',
        gender: '남',
        mbti: 'ENFP',
        keywords: ['일식', '음악'],
        introduction:
            '성대 학우들과의 밥약 서비스를 이용하시려면 로그인해주세요 👀',
    },
    {
        nickname: '김꾸친',
        campus: '명륜',
        major: '무용학과',
        student_id: '20학번',
        gender: '여',
        mbti: 'ISFJ',
        keywords: ['여행', '동아리'],
        introduction:
            '성대 학우들과의 밥약 서비스를 이용하시려면 로그인해주세요 👀',
    },
    {
        nickname: '웅이',
        campus: '율전',
        major: '반도체시스템공학과',
        student_id: '22학번',
        gender: '남',
        mbti: 'INTP',
        keywords: ['연극/뮤지컬', '카페'],
        introduction:
            '성대 학우들과의 밥약 서비스를 이용하시려면 로그인해주세요 👀',
    },
];

const Friends = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const matchingUser = useSelector(state => state.matchingUser.myMatchingInfo);
    const candidate = useSelector(state => state.candidate.candidate);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [open, setOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');
    const [popupType, setPopupType] = useState('');

    const handleFriendClick = (friend) => {
        localStorage.setItem('candidateId', friend.id);
        localStorage.setItem('selectedFriend', JSON.stringify(friend));
        router.push(`/showFriendProfile`);
    };

    const handleRequestBtnClick = (id, nickname) => {
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
            localStorage.setItem('candidateName', nickname);
            router.push({
                pathname: '/enrollOpenChat',
                query: { type: 'friend'},
            });
        }
    };

    const handleChangeStatus = () => {
        dispatch(change_status_info(true, ([result, message]) => {
            if(result) {
                setPopupMessage('개인 프로필이 공개로 변경되었어요!\n이제 1:1 밥약을 신청해보세요.');
                setPopupBtnText('확인');
                setPopupType('success');
                setOpen(true);
            }
        }));
    }
    
    const filteredCandidate = user ? candidate?.filter((person) => person.id !== user.id) : candidate;

    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0'}}>
            { filteredCandidate ? 
            filteredCandidate.slice(0,5).map((person, index) => (
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
                        <Button
                            disableElevation
                            disableTouchRipple
                            key="apply-button"
                            onClick={()=> handleRequestBtnClick(person.id, person.nickname)}
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
                    </Grid>
                </Grid>
            </Card> 
            )) 
            :
            <>
                {
                    dummyProfiles.map((person, index) => (
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
                                    <div style={{ width: '2px', height: '12px', backgroundColor: '#E2E2E2', borderRadius: '10px' }}/>
                                    <Button
                                        disableElevation
                                        disableTouchRipple
                                        key="apply-button"
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
                                </Grid>
                            </Grid>
                        </Card> 
                    ))
                }
            </>
            }
            <ErrorPopup
                open={open}
                handleClose={() => setOpen(false)}
                message={popupMessage}
                btnText={popupBtnText}
                type={popupType}
                onConfirm={() => {
                    setOpen(false);
                    if (popupBtnText === '로그인하러 가기') {
                        router.push('/login');
                    } else if (popupBtnText === '개인 프로필 공개하기') {
                        setOpen(false);
                        handleChangeStatus();
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