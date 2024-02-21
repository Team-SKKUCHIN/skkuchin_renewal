import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { displayMBTI } from '../Matching/MBTIList';

const FriendProfile = ({ candidate }) => {
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '50%'}}>
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
                        <Grid item sx={{ color: '#777777', backgroundColor: '#F2F2F2', p: '4px 12px', fontSize: '12px', fontWeight: 400, borderRadius: '24px' }}>
                            {candidate.mbti}
                        </Grid>
                        {(candidate.keywords) != null ?
                            ((candidate.keywords).slice(0, 2).map((interest, index) => (
                                <Grid item key={index} sx={{ color: '#777777', backgroundColor: '#F2F2F2', p: '4px 12px', fontSize: '12px', fontWeight: 400, borderRadius: '24px' }}>
                                    {interest}
                                </Grid>
                            )))
                            : null}
                    </Grid >
                    <Typography sx={{ fontSize: '13px', height: '36px', lineHeight: '18px', fontWeight: 600, color: '#3C3C3C', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}>
                        {'"' + candidate.introduction + '"'}
                    </Typography>
                </div>
            </div>

            <Button
                onClick={() => {
                    console.log('밥약 신청하기 버튼 클릭', candidate);
                }}
                color="primary"
                variant="contained"
                disableElevation
                sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
            >
                밥약 신청하기
            </Button>
        </div>
    );
}

export default FriendProfile;
