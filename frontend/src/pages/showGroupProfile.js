import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import GroupProfile from '../components/MealPromise/GroupProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Popup from '../components/MyPage/Popup';
import { delete_group_profile, clear_candidate_profile, load_candidate_profile } from '../actions/groupProfile/groupProfile';
import { Loading } from '../components/Loading';
import { load_group_requests } from '../actions/groupChatRequest/groupChatRequest';

const showGroupProfile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const id = router.query.id;
    const mode = router.query.mode;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const group = useSelector(state => state.groupProfile.candidateGroup);
    const myGroupProfiles = useSelector((state) => state.groupProfile.myGroupProfiles);
    const groupChatRequests = useSelector(state => state.groupChatRequest.requests);
    const personalChatRequests = useSelector(state => state.personalChatRequest.requests);

    const [isMyProfile, setIsMyProfile] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(load_group_requests());
        }
    }, [isAuthenticated])

    useEffect(() => {
        dispatch(clear_candidate_profile());

        if(id) {
            dispatch(load_candidate_profile(id, ([result, message]) => {
                if (result) {
                    console.log("그룹 프로필 불러오기 성공");
                    setLoading(false);
                } else {
                    console.log("그룹 프로필 불러오기 오류" + message);
                }
            }));
        }
    }, []);

    useEffect(() => {
        if(!myGroupProfiles) return;
        else {
            setIsMyProfile(myGroupProfiles && myGroupProfiles.some(profile => profile.id == id))
        }
    }, [myGroupProfiles]);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('question');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupQuestion, setPopupQuestion] = useState('');
    const [popupDescription, setPopupDescription] = useState('');
        
    // 팝업
    const handleIconClick = () => {
        if(mode === 'edit') {
            if(groupChatRequests?.receive_requests?.length > 0 && groupChatRequests?.receive_requests?.some(request => request.receiver_profile.id == id)) {
                setPopupType('error');
                setPopupMessage('현재 받은 신청이 있어요');
                setPopupDescription('<신청현황>탭에서\n신청을 거절 혹은 수락 후 삭제해주세요.');
                setPopupOpen(true);
            } else {
                setPopupType('question');
                const hasSendRequests = groupChatRequests?.send_requests?.some(request => request.sender_profile.id == id);
                // console.log('hasSendRequests', hasSendRequests, id);
                const popupMessage = hasSendRequests
                    ? '그룹 프로필을 삭제하면\n밥약 신청내역도 함께 삭제돼요.'
                    : '그룹 프로필을 삭제하면\n더이상 그룹 밥약 신청을 받지 못해요.';
                setPopupMessage(popupMessage);
                setPopupQuestion(`정말로 삭제하시겠어요?`);
                setPopupOpen(true);
            }
        }
    }

    const handleClose = () => {
        setPopupOpen(false);
        setPopupType('');
        setPopupMessage('');
        setPopupQuestion('');
        setPopupDescription('');
    }

    const handleQuestionConfirm = () => {
        handleClose();
        setPopupMessage('삭제하시는 이유를 알려주세요.');
        setPopupType('reason');
        setPopupOpen(true);
    }

    const handleReasonConfirm = (reason) => {
        dispatch(delete_group_profile(id, reason, ([result, message]) => {
            if(result) {
                console.log('그룹 프로필 삭제 성공 : ', reason);
                router.push('/myGroupProfileLists');
            } else {
                console.log('그룹 프로필 삭제 실패 : ', message);
                handleClose();
                setPopupMessage('다시 시도해주세요.');
                setPopupType('info');
                setPopupOpen(true);
            }
        }));
    }

    const handleEditBtnClick = () => {
        console.log('그룹 프로필 수정 클릭');
        router.push(`/modifyGroupProfile?id=${id}`);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title= { isMyProfile ? "나의 그룹 프로필" : "여럿이서 먹어요" } icon={mode ? 'delete' : ''} handleIconClick={handleIconClick} mode={mode}/>
            {
                loading ? <Loading />
                : <GroupProfile isMyProfile={isMyProfile} mode={mode} group={group} handleEditProfileClick={handleEditBtnClick}/>
            }

            <Popup
                open={popupOpen}
                type={popupType}
                message={popupMessage}
                question={popupQuestion}
                description={popupDescription}
                handleClose={handleClose}
                onQuestionConfirm={handleQuestionConfirm}
                onReasonConfirm={handleReasonConfirm} 
                onErrorConfirm={() => router.push('/showRequests')}
            />
            
        </ThemeProvider>
    )
}

export default showGroupProfile;