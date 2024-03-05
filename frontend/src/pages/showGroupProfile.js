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

const showGroupProfile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const id = router.query.id;
    const mode = router.query.mode;

    const group = useSelector(state => state.groupProfile.candidateGroup);
    const myGroupProfiles = useSelector((state) => state.groupProfile.myGroupProfiles);

    const [isMyProfile, setIsMyProfile] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const [reason, setReason] = useState('');
        
    // 팝업
    const handleIconClick = () => {
        if(mode === 'edit') {
            setPopupType('question');
            setPopupMessage(`그룹 프로필을 삭제하면` + '\n' + `더이상 그룹 밥약 신청을 받지 못해요.`)
            setPopupQuestion(`정말로 삭제하시겠어요?`);
            setPopupOpen(true);
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
        console.log('삭제 이유', reason);
        dispatch(delete_group_profile(id, reason, ([result, message]) => {
            console.log('그룹 프로필 삭제 결과', result, message);
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
            />
            
        </ThemeProvider>
    )
}

export default showGroupProfile;