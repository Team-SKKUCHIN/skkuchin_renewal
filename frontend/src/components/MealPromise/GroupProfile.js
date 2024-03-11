import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Button, Divider } from '@mui/material';
import { displayMBTI } from "../Matching/MBTIList";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import ErrorPopup from '../Custom/ErrorPopup';

const GroupProfile = ({isMyProfile, mode, group, handleEditProfileClick}) => {
    const router = useRouter();
    const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');

    const handleSubmit = () => {
        if (isAuthenticated) {
            if (myGroupProfiles && myGroupProfiles.length > 0) {
                router.push('/selectMyGroupProfile')
                localStorage.setItem('candidateId', group.id);
                localStorage.setItem('candidateName', group.group_name);
            } else {
                setPopupMessage('그룹 밥약을 신청하기 위해선\n그룹 프로필 작성이 필요해요.');
                setPopupBtnText('그룹 프로필 등록하기');
                setPopupOpen(true);
            }
        } else {
            setPopupBtnText('로그인하러 가기');
            setPopupMessage('밥약 신청을 위해서는 로그인이 필요해요.');
            setPopupOpen(true);
        }
    }

    return (
        <>
            <div style={{padding: '19px 0 16px', textAlign: 'center', marginTop: '63px'}}>
                {displayMBTI('GROUP', 120, 120)}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{fontSize: '18px', fontWeight: '700', mr: '5px'}}>{group !== null && group.group_name}</Typography>
                    <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor:  (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                        {(group.gender).charAt(0)}
                    </Typography>
                </div>
                <Typography sx={{ fontSize: '13px', mt: '20px', height: '36px', lineHeight: '18px', fontWeight: 400, color: '#3C3C3C', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                    {'"'+ group.group_introduction +'"'}
                </Typography>
                {
                    group.meeting_start_date !== null && group.meeting_end_date !== null &&
                    <Typography sx={{fontSize: '12px', color: '#777777', fontWeight: 'bold', mb: '20px', backgroundColor: '#FBFBFB', border: '1px solid #E2E2E2', borderRadius: '12px', padding: '4px 10px', width: 'max-content', margin: 'auto'}}>
                        선호 일정 : {group.meeting_start_date} ~ {group.meeting_end_date}
                    </Typography>
                }
            </div>

            <div style={{ margin: '0 24px 100px', borderTop: '1px solid #E2E2E2', paddingTop: '9px' }}>
            <List>
                {[1, 2, 3].map((friendIndex) => (
                <ListItem key={friendIndex} disablePadding>
                    <ListItemText
                      primary={
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: '6px' }}>
                        {friendIndex === 1 &&
                            <Typography sx={{ color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: 16, fontWeight: 600, p: '8px 10px', borderRadius: '12px', marginBottom: '8px' }}>
                            대표
                            </Typography>
                        }
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#3C3C3C', mb: '8px' }}>
                            {`친구${friendIndex}`} 
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: '#777777', mb: '8px' }}>
                            {`${group[`friend${friendIndex}_major`]} / ${group[`friend${friendIndex}_student_id`]}`}
                        </Typography>
                        </div>
                    }
                      secondary={<Typography sx={{ fontSize: '16px', backgroundColor: '#FBFBFB', p: '10px 17px', border: '1px solid #E2E2E2', borderRadius: '0 8px 8px 8px', mb: '12px' }}>{group[`friend${friendIndex}_introduction`]}</Typography>}
                    />
                </ListItem>
                ))}
            </List>
            </div>
            {
                !isMyProfile &&
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disableElevation
                        sx={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 800,
                        }}
                    >
                    밥약 신청하기
                </Button>
            }
            {
                isMyProfile && mode === 'edit' &&
                <Button
                    onClick={handleEditProfileClick}
                    color="primary"
                    variant="contained"
                    disableElevation
                    sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
                >
                    프로필 수정하기
                </Button>
            }
            <ErrorPopup
                open={popupOpen}
                handleClose={() => setPopupOpen(false)}
                message={popupMessage}
                btnText={popupBtnText}
                onConfirm={() => {
                    setPopupOpen(false);
                    if (popupBtnText === '로그인하러 가기') {
                        router.push('/login');
                    } else if (popupBtnText === '그룹 프로필 등록하기') {
                        router.push('/makeGroupProfile');
                    }
                }}
            />
        </>
    )
}

export default GroupProfile;