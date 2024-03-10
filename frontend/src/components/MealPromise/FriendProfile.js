import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { displayMBTI } from '../Matching/MBTIList';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { change_status_info } from '../../actions/candidate/candidate';
import ErrorPopup from '../Custom/ErrorPopup';
import { Loading } from '../Loading';

const interestCategories = {
    음식: ['한식', '일식', '중식', '양식', '남미음식', '분식', '아시아음식', '카페'],
    운동: ['축구', '야구', '농구', '골프', '테니스', '당구', '헬스', '보드스키', '주짓수', '서핑', '등산', '러닝', '스포츠관람', '볼링', '배드민턴', '댄스'],
    문화예술: ['영화', '음악', '전시회', '연극뮤지컬', '덕질', '여행', '게임', '노래방', '방탈출', '보드게임', '반려동물', '요리', '맛집탐방', '만화'],
    학술: ['학회', '동아리', '교환학생', '봉사', '재테크', '빅데이터', '금융', '문학', '토론', '시사', '어학', 'CPA', '피트', '로스쿨', '행시'],
};

const FriendProfile = ({ candidate, isButtonOn=true }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const myMatchingInfo = useSelector(state => state.candidate.myMatchingInfo);

    const [open, setOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');
    const [popupType, setPopupType] = useState('');

    const handleSubmit = () => {
        if (!isAuthenticated) {
            setPopupBtnText('로그인하러 가기');
            setPopupMessage('밥약 신청을 위해서는 로그인이 필요해요.');
            setOpen(true);
        }
        else if (myMatchingInfo === null)  {
            setPopupBtnText('개인 프로필 등록하기');
            setPopupMessage('1:1 밥약을 신청하기 위해선 개인 프로필 작성이 필요해요.');
            setOpen(true);
        }
        else if (myMatchingInfo && !myMatchingInfo.matching) {
            setPopupBtnText('개인 프로필 공개하기');
            setPopupMessage('1:1 밥약을 신청하기 위해선 개인 프로필을 공개로 변경해주세요');
            setOpen(true);
        } 
        else if (user && user.phone_number === null) {
            setPopupBtnText('휴대폰 본인인증 하기');
            setPopupMessage('밥약 서비스 이용을 위해선 휴대폰 본인인증이 필요해요. 안전한 서비스 이용을 위해 인증해주세요.');
            setOpen(true);
        }
        else {
            localStorage.setItem('candidateId', candidate.id);
            localStorage.setItem('candidateName', candidate.nickname);
            router.push({
                pathname: '/enrollOpenChat',
                query: { type: 'friend'},
            });
        }
    }

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

    const [interests, setInterests] = useState({
        음식: {},
        운동: {},
        문화예술: {},
        학술: {},
    });

    useEffect(() => {
        if (candidate) {
            const interestsData = {};
            Object.keys(interestCategories).forEach(category => {
                interestsData[category] = {};
                interestCategories[category].forEach(interest => {
                    interestsData[category][interest] = false;
                });
            });

            Object.keys(candidate.keywords).forEach(category => {
                candidate.keywords[category].forEach(interest => {
                    if (interestsData[category] && interestsData[category][interest] !== undefined) {
                        interestsData[category][interest] = true;
                    }
                });
            });

            setInterests(interestsData);
        }
    }, [candidate]);

    return (
        <div style={{marginTop: '63px', padding: '10px 24px 100px'}}>
            <style>
                    {`
                        .MuiOutlinedInput-notchedOutline {
                            border-color: #E2E2E2 !important; 
                        }
                        .Mui-focused .MuiOutlinedInput-notchedOutline {
                            border-width: 1px !important; 
                        }
                    `}
            </style>
            {
                candidate === null ? (
                    <Loading />
                ) : (
                    <>
                        <div style={{display: 'flex', flexDirection: 'row', gap : '15px'}}>
                            {displayMBTI(candidate.mbti, 100, 100)}
                            <div>
                                <Grid item sx={{ display: 'flex', m: '10px 0 5px' }}>
                                    {/* 닉네임 및 캠퍼스 정보 */}
                                    <Typography sx={{ fontSize: '18px', fontWeight: '700', mr: '5px' }}>{candidate !== null && candidate.nickname}</Typography>
                                    {candidate !== null &&
                                        candidate.campus === '명륜' ? (
                                            <Typography sx={{ width: 'max-content', color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px' }}>{candidate.campus}</Typography>
                                        ) : (
                                            <Typography sx={{ color: '#58C85A', backgroundColor: '#DCF8DB', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px' }}>{candidate.campus}</Typography>
                                        )}
                                </Grid>
                                <Grid item sx={{ display: 'flex', fontSize: '12px', fontWeight: 500, color: '#777777' }}>
                                    <Grid item sx={{ fontSize: '12px' }}>
                                        {/* 전공, 학번, 성별 정보 */}
                                        {candidate.major}&nbsp;/&nbsp;
                                        {candidate.student_id}학번&nbsp;/&nbsp;
                                        {(candidate.gender).charAt(0)}
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ display: 'flex', p: '3px 0 8px', gap: '4px' , m: '5px 0 28px'}}>
                                    <Grid item sx={{ color: '#777777', backgroundColor: '#F2F2F2', p: '3px 13px', fontSize: '12px', fontWeight: 400, borderRadius: '24px' }}>
                                        {candidate.mbti}
                                    </Grid>
                                    {
                                        (candidate.keywords) != null &&
                                            <>
                                                {(Object.values(candidate.keywords).flat().slice(0, 2).map((keyword, index) => (
                                                    <Grid item key={index} sx={{ color: '#777777', backgroundColor: '#F2F2F2', p: '3px 13px', fontSize: '12px', fontWeight: 400, borderRadius: '24px' }}>
                                                        {keyword}
                                                    </Grid>
                                                )))}
                                            </>
                                    }
                                </Grid >
                            </div>
                        </div>

                        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#3C3C3C' }}>한줄 자기 소개</Typography>
                        <TextField
                            label=""
                            multiline
                            rows={2}
                            defaultValue={candidate.introduction}
                            fullWidth
                            contentEditable={false}
                            style={{margin: '8px 0 0'}}
                        />

                        <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#3C3C3C', m: '40px 0 20px' }}>관심사 태그</Typography>
                        <div>
                            {Object.keys(interests).map((category, index) => (
                                <div key={index} style={{marginBottom: '20px'}}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#3C3C3C', m: '20px 0 10px' }}>{category}</Typography>
                                    <Grid container>
                                        {Object.keys(interests[category]).map((interest, index) => (
                                            <Grid item key={index}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    disableElevation
                                                    disabled
                                                    sx={{ height: '32px', padding: '6px 10px', fontSize: '14px', fontWeight: 500, borderRadius: '24px', borderColor: '#E2E2E2', color: '#3C3C3C !important', backgroundColor: interests[category][interest] ? '#FFFCE4' : '#fff', border: '1px solid #E2E2E2', margin: '0 8px 8px 0' }}
                                                >
                                                    {interest}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            ))}
                        </div>
                        {isButtonOn && 
                            <Button
                                onClick={handleSubmit}
                                color="primary"
                                variant="contained"
                                disableElevation
                                sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
                            >
                                밥약 신청하기
                            </Button>
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
                </>
            )}
        </div>
    );
}


export default FriendProfile;
