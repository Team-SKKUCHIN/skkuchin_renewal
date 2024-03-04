import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid, Divider } from '@mui/material';
import { displayMBTI } from './MBTIList';
import { load_candidate } from '../../actions/candidate/candidate'
import { load_request_id, request_chat } from '../../actions/chat/chatRoom';
import noCharacter from '../../image/mbti/profile/noCharacter.png'
import { useRouter } from 'next/router';
import Image from 'next/image';
import CustomPopup from "../SkkuChat/CustomPopup";
import CustomPopupNoBtn from "../SkkuChat/CustomPopupNoBtn";
import GoLogin from "../GoLogin";
import { load_all_group_profile } from "../../actions/groupProfile/groupProfile";

const dummyProfiles = [
    {
        groupName: '그룹명1',
        gender: '여',
        mbti: 'GROUP',
        introduction:
            '그룹 한줄 소개입니다',
    },
    {
        groupName: '그룹명2',
        gender: '남',
        mbti: 'GROUP',
        introduction:
            '긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 👀',
    },
    {
        groupName: '그룹명3',
        gender: '남',
        mbti: 'GROUP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },

];

const Groups = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.matchingUser.matchingUser);
    const groupProfiles = useSelector(state => state.groupProfile.allGroupProfiles);
    const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);
    const requestId = useSelector(state => state.chatRoom.requestId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(false);

    // 그룹 프로필 등록 여부, 추후 변경 필요
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [isGroupProfileEnrolled, setIsGroupProfileEnrolled] = useState(true);

    useEffect(() => {
        dispatch(load_all_group_profile());
    }, []);
    
    const handleSettingOpen = () => {
        if (isAuthenticated) {
            router.push({
                pathname: '/makeProfile',
                query: { src : '스꾸챗프로필설정', }
            });
        } else {
            setIsLogin(true);
        }
    }

    const handleGroupClick = (id) => {
        router.push(`/showGroupProfile?id=${id}`);
    }

    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0'}}>
            {isLogin && <GoLogin open={isLogin} onClose={setIsLogin} /> }
            { isGroupProfileEnrolled ? 
                groupProfiles && groupProfiles.map((group, index) => (
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
                                                onClick={() => router.push('/selectMyGroupProfile')}
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
                { groupProfiles && groupProfiles.length === 0 &&
                    dummyProfiles.map((group, index) => (
                    <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '28px 16px', flexShrink: 0, mr: '19px', mb: '21px'}}>
                        <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image src={noCharacter} width={80} height={80} placeholder="blur" layout='fixed' />
                            <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                                <Typography sx={{fontSize: '20px', fontWeight: '700', mr: '5px'}}>{group !== null && group.groupName}</Typography>
                                <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                                    {(group.gender).charAt(0)}
                                </Typography>
                            </Grid>
                            <Grid item sx={{width: '169px', textAlign: 'center', pb: '8px'}}>
                                <Typography sx={{ fontSize:'13px', fontWeight: '500', whiteSpace: 'pre-wrap'}}>
                                    {
                                        user?.matching === false ?
                                        '성대 학우와 채팅을 나누시려면\n\n[마이페이지]에서\n매칭 ON/OFF 버튼을 켜주세요 👀' 
                                        : '성대 학우와 채팅을 나누시려면 매칭 프로필을 등록해주세요 👀'
                                    }
                                </Typography>
                            </Grid>
                            {
                                (isAuthenticated === false || user === null || user?.matching ) === false ? null
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
    </Grid>
    )
}

export default Groups;