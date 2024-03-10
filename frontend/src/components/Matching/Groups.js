import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Typography, Grid} from '@mui/material';
import { displayMBTI } from './MBTIList';
import { useRouter } from 'next/router';
import ErrorPopup from "../Custom/ErrorPopup";

const dummyProfiles = [
    {
        group_name: '명륜에이스모임',
        gender: '남',
        mbti: 'GROUP',
        group_introduction:
            '성대 학우들과의 밥약 서비스를 이용하시려면 로그인해주세요 👀',
    },
    {
        group_name: '방탄성대단',
        gender: '남',
        mbti: 'GROUP',
        group_introduction:
            '성대 학우들과의 밥약 서비스를 이용하시려면 로그인해주세요 👀',
    },
    {
        group_name: '명륜핑크',
        gender: '여',
        mbti: 'GROUP',
        group_introduction:
            '성대 학우들과의 밥약 서비스를 이용하시려면 로그인해주세요 👀',
    },
];

const Groups = () => {
    const router = useRouter();

    const groupProfiles = useSelector(state => state.groupProfile.allGroupProfiles);
    const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);
    const requestId = useSelector(state => state.chatRoom.requestId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');

    const handleRequestBtnClick = (id, name) => {
        if(isAuthenticated) {
            if (myGroupProfiles && myGroupProfiles.length > 0) {
                localStorage.setItem('candidateId', id);
                localStorage.setItem('candidateName', name);
                router.push('/selectMyGroupProfile')
            }
            else {
                setPopupMessage('그룹 밥약을 신청하기 위해선\n그룹 프로필 작성이 필요해요.');
                setPopupBtnText('그룹 프로필 등록하기');
                setPopupOpen(true);
            }
        } else {
            setPopupMessage('밥약 신청을 위해서는 로그인이 필요해요.');
            setPopupBtnText('로그인하러 가기');
            setPopupOpen(true);
        }
    }

    const handleGroupClick = (id) => {
        if (isAuthenticated) {
            router.push(`/showGroupProfile?id=${id}`);
        } else {
            setPopupMessage('상세 프로필을 보기 위해서는\n로그인이 필요해요.');
            setPopupBtnText('로그인하러 가기');
            setPopupOpen(true);
        }
    }

    const filteredProfiles = myGroupProfiles ? groupProfiles && groupProfiles.filter((group) => !myGroupProfiles.some((myGroup) => myGroup.id == group.id)) : groupProfiles;
    
    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0'}}>
            { filteredProfiles && filteredProfiles.length !== 0 ?
                filteredProfiles.slice(0,5).map((group, index) => (
                        <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '28px 16px', flexShrink: 0, mr: '19px', mb: '10px'}}>
                            <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                                {displayMBTI('GROUP', 90, 90)}
                                <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                                    <Typography sx={{fontSize: '20px', fontWeight: '700', mr: '5px'}}>{group !== null && group.group_name}</Typography>
                                    <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                                        {(group.gender).charAt(0)}
                                    </Typography>
                                </Grid>
                                <Typography sx={{ fontSize: '14px', height: '40px', lineHeight: '20px', fontWeight: 400, color: '#3C3C3C', m: '20px 0 30px', textAlign: 'center', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                    {'"'+ group.group_introduction +'"'}
                                </Typography>
                                <Grid item sx={{ display: 'flex',  alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Button
                                        disableElevation
                                        disableTouchRipple
                                        key="profile-button"
                                        onClick={() => handleGroupClick(group.id)}
                                        sx={{ color: '#777777', fontSize: '14px', fontWeight: 700, textAlign: 'center', pr: '15px'}}
                                    >
                                        그룹 프로필
                                    </Button>
                                    <div style={{ width: '2px', height: '12px', backgroundColor: '#E2E2E2', borderRadius: '10px'}} />
                                        {requestId && requestId.includes(group.id) ? (
                                            <Button
                                                disableElevation
                                                disableTouchRipple
                                                key="completed-button"
                                                sx={{ color: '#505050', fontSize: '14px', fontWeight: 700, textAlign: 'center', pl: '15px'}}
                                            >
                                                신청 완료
                                            </Button>
                                        ) : (
                                            <Button
                                                disableElevation
                                                disableTouchRipple
                                                key="apply-button"
                                                onClick={() => handleRequestBtnClick(group.id, group.group_name)}
                                                sx={{ color: '#FFAC0B', fontSize: '14px', fontWeight: 700, textAlign: 'center', pl: '15px' }}
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
                {
                    dummyProfiles.map((group, index) => (
                        <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '28px 16px', flexShrink: 0, mr: '19px', mb: '10px'}}>
                            <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                                {displayMBTI('GROUP', 90, 90)}
                                <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                                    <Typography sx={{fontSize: '20px', fontWeight: '700', mr: '5px'}}>{group !== null && group.group_name}</Typography>
                                    <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                                        {(group.gender).charAt(0)}
                                    </Typography>
                                </Grid>
                                <Typography sx={{ fontSize: '14px', height: '40px', lineHeight: '20px', fontWeight: 400, color: '#3C3C3C', m: '20px 0 30px', textAlign: 'center', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                    {'"'+ group.group_introduction +'"'}
                                </Typography>
                                <Grid item sx={{ display: 'flex',  alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Button
                                        disableElevation
                                        disableTouchRipple
                                        key="profile-button"
                                        sx={{ color: '#777777', fontSize: '14px', fontWeight: 700, textAlign: 'center', pr: '15px'}}
                                    >
                                        그룹 프로필
                                    </Button>
                                    <div style={{ width: '2px', height: '12px', backgroundColor: '#E2E2E2', borderRadius: '10px'}} />
                                    <Button
                                        disableElevation
                                        disableTouchRipple
                                        key="apply-button"
                                        sx={{ color: '#FFAC0B', fontSize: '14px', fontWeight: 700, textAlign: 'center', pl: '15px' }}
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
                open={popupOpen}
                handleClose={() => setPopupOpen(false)}
                message={popupMessage}
                btnText={popupBtnText}
                onConfirm={() => {
                    setPopupOpen(false);
                    if (popupBtnText === '그룹 프로필 등록하기') {
                        router.push('/makeGroupProfile');
                    } else if (popupBtnText === '로그인하러 가기') {
                        router.push('/login');
                    }
                }}
            />
    </Grid>
    )
}

export default Groups;