import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { displayMBTI } from '../Matching/MBTIList';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ErrorPopup from '../Custom/ErrorPopup';

const FriendProfile = ({ candidate }) => {
    const router = useRouter();

    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const matchingUser = useSelector(state => state.matchingUser.matchingUser);

    const [open, setOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');

    const handleSubmit = () => {
        if (!isAuthenticated) {
            setPopupBtnText('로그인하러 가기');
            setPopupMessage('밥약 신청을 위해서는 로그인이 필요해요.');
            setOpen(true);
        }
        else if (!matchingUser)  {
            setPopupBtnText('개인 프로필 등록하기');
            setPopupMessage('1:1 밥약을 신청하기 위해선 개인 프로필 작성이 필요해요.');
            setOpen(true);
        }
        else if (matchingUser && !matchingUser.matching) {
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

    return (
        <div style={{marginTop: '63px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '45%'}}>
                {displayMBTI(candidate.mbti, 120, 120)}
                <div>
                    <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: '10px 0 7px' }}>
                        {/* 닉네임 및 캠퍼스 정보 */}
                        <Typography sx={{ fontSize: '18px', fontWeight: '700', mr: '5px' }}>{candidate !== null && candidate.nickname}</Typography>
                        {candidate !== null &&
                            candidate.campus === '명륜' ? (
                                <Typography sx={{ width: 'max-content', color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px' }}>{candidate.campus}</Typography>
                            ) : (
                                <Typography sx={{ color: '#58C85A', backgroundColor: '#DCF8DB', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px' }}>{candidate.campus}</Typography>
                            )}
                    </Grid>
                    <Grid item sx={{ display: 'flex', fontSize: '12px', alignItems: 'center', fontWeight: 500, color: '#777777' }}>
                        <Grid item sx={{ flexGrow: 1, fontSize: '12px' }}>
                            {/* 전공, 학번, 성별 정보 */}
                            {candidate.major}&nbsp;/&nbsp;
                            {candidate.student_id}학번&nbsp;/&nbsp;
                            {(candidate.gender).charAt(0)}
                        </Grid>
                    </Grid>
                    <Grid item sx={{ display: 'flex', p: '3px 0 8px', gap: '4px' , m: '10px 0 22px'}}>
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
                    <Typography sx={{ fontSize: '13px', height: '36px', lineHeight: '18px', fontWeight: 600, color: '#3C3C3C', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}>
                        {'"' + candidate.introduction + '"'}
                    </Typography>
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                disableElevation
                sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
            >
                밥약 신청하기
            </Button>

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
        </div>
    );
}

export default FriendProfile;
