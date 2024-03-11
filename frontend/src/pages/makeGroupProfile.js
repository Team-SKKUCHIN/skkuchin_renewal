import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, Typography, Grid, TextField, Button, Divider, InputAdornment } from '@mui/material';
import theme from '../theme/theme';
import Header from '../components/MealPromise/Header';
import MemberInfoInput from '../components/MealPromise/MemberInfoInput';
import CalendarContainer from '../components/MealPromise/CalendarContainer';
import Popup from '../components/Custom/Popup';
import { add_group_profile, get_random_nickname, check_group_name_duplicate } from '../actions/groupProfile/groupProfile';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const MakeGroupProfile = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const matchingUser = useSelector(state => state.matchingUser.myMatchingInfo);

    const [generatedName, setGeneratedName] = useState(''); 
    const [groupName, setGroupName] = useState('');
    const [gender, setGender] = useState(user && user.gender || '');
    const [groupIntro, setGroupIntro] = useState(''); 

    const [selectedDates, setSelectedDates] = useState([]);
    const [isDateEdited, setIsDateEdited] = useState(false);

    const [friends, setFriends] = useState([
        { label: '친구1', studentId: user ? user.student_id.toString() : '', major: user && user.major, introduction: '' },
        { label: '친구2', studentId: '', major: '', introduction: '' },
        { label: '친구3', studentId: '', major: '', introduction: '' },
      ]);
    
    const updateFriendData = (index, data) => {
        setFriends((prevFriends) => {
          const newFriends = [...prevFriends];
          newFriends[index] = { ...newFriends[index], ...data };
          return newFriends;
        });
    };

    const handleGenderClick = (e) => {
        setGender(e.target.value)
    }

    const handleDateChange = (newDate) => {
        setSelectedDates(newDate);
        setIsDateEdited(true);
    };

    const [isNicknameEditable, setIsNicknameEditable] = useState(false);
    const [isDuplicateCheckVisible, setIsDuplicateCheckVisible] = useState(false);
    const [isValidNickname, setIsValidNickname] = useState(null);
    const [guideText, setGuideText] = useState('');
    const [showGuideText, setShowGuideText] = useState(false);

    const [completed, setCompleted] = useState(false);
    
    const getRandomNickname = async () => {
        const randomNickname = await dispatch(get_random_nickname());
        setGroupName(randomNickname);
        setGeneratedName(randomNickname);
    };

    useEffect(() => {
        getRandomNickname();
    }, []);

    const handleGroupNameInput = (event) => {
        const value = event.target.value;
        if(value.length <= 12) {
            setGroupName(value);
        }
    };

    useEffect(() => {
        if(generatedName === '') return;
        const isSameAsGeneratedName = groupName === generatedName;
        setIsDuplicateCheckVisible(!isSameAsGeneratedName);
    }, [groupName]);

    const handleDupicateCheck = async () => {
       const isValid = await check_group_name_duplicate(groupName);
       setIsValidNickname(isValid);
    };

    useEffect(() => {
        if (isValidNickname === null) return;
        else {
            if (!isValidNickname) {
                setGuideText('이미 사용중인 그룹명입니다.');
            } else {
                setGuideText('사용 가능한 그룹명입니다.');
                setIsNicknameEditable(false);
            }
            setShowGuideText(true); 
        }
    }, [isValidNickname]);

    const handleEditBtnClick = () => {
        setIsNicknameEditable(!isNicknameEditable);
        setGuideText('');
        setShowGuideText(false);
        setIsValidNickname(null);
    };

    const isValid = groupName !== '' && gender !== '' && groupIntro !== '' && friends && friends.every((friend) => friend.studentId !== '' && friend.major !== '' && friend.introduction !== '' && ((generatedName !== groupName) ? isValidNickname : true));

    // 팝업
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('info');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupDescription, setPopupDescription] = useState('');
    
    const handleSubmit = () => {
        if(isValid) {
            setPopupMessage(`프로필은 한줄 소개만 수정할 수 있어요.` + '\n' + `최종 등록하시겠어요?`);
            setPopupType('question');
        } else {
            setPopupMessage('필수 항목을 모두 입력해주세요.');
            setPopupType('error');
        }
        setPopupOpen(true);
    };

    const handleQuestionConfirm = () => {
        const formattedDates = selectedDates[0] || selectedDates[1] ? selectedDates.map((date) => dayjs(date).format('YYYY-MM-DD')) : ['',''];

        const profileData = {
            group_name: groupName,
            group_introduction: groupIntro,
            friend1_introduction: friends[0].introduction,
            friend2_introduction: friends[1].introduction,
            friend2_major: friends[1].major,
            friend2_student_id: parseInt(friends[1].studentId, 10),
            friend3_introduction: friends[2].introduction,
            friend3_major: friends[2].major,
            friend3_student_id: parseInt(friends[2].studentId, 10),
            meeting_start_date: isDateEdited ? formattedDates[0] : '', 
            meeting_end_date: isDateEdited ? formattedDates[1] : '',
        }

        dispatch(add_group_profile(profileData, ([result, message]) => {
            if(result) {
                setPopupMessage('프로필 등록이 완료되었어요!');
                setPopupDescription('한줄 소개 수정은 마이페이지에서 할 수 있어요.');
                setPopupOpen(true);
                setPopupType('info');
            } else {
                setPopupMessage(message);
                setPopupType('error');
                setPopupOpen(true);
            }
        }));
    }

    const handleErrorConfirm = () => {
        if(popupMessage === '그룹 프로필은 5개 이하로만 생성 가능합니다') {
            router.push('/mealPromise');
        }
        setPopupOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Header title="그룹 프로필 등록" icon="close"/>
            <div style={{ margin: '83px 24px 24px' }}>
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
                <Typography sx={{fontSize: 14, color: '#3C3C3C', mb: '8px'}}>그룹명</Typography>
                <TextField 
                    disabled={!isNicknameEditable}
                    InputProps={{ style: { height: 48, padding: '0 6px', backgroundColor: groupName === generatedName ? '#FBFBFB' : '#fff', color: '#3C3C3C'},
                    endAdornment: (
                        <InputAdornment position="end">
                            { !isNicknameEditable &&
                                <Button onClick={handleEditBtnClick} style={{color: '#BABABA', fontSize: 16, fontWeight: 700, padding: 0, textTransform: 'none'}}>
                                    수정
                                </Button>
                            }
                        </InputAdornment>
                    ), }}
                    sx={{mb: isDuplicateCheckVisible ? '8px' : '18px', color: 'red'}} variant='outlined' fullWidth placeholder='그룹명을 입력해주세요 (필수)' 
                    value={groupName} 
                    onChange={handleGroupNameInput}/>
                    {isDuplicateCheckVisible && (
                        <div style={{display: 'flex', flexDirection: 'row',  marginBottom: '18px', alignItems: 'center', gap: 6}}>
                            <Button onClick={handleDupicateCheck} style={{height: 28, backgroundColor: '#F2F2F2', color: '#3C3C3C', border: '1px solid #BABABA', borderRadius: 100, fontSize: '13px', padding: '7px 10px'}}>
                                중복확인
                            </Button>
                            {
                                showGuideText && isValidNickname ? 
                                    <Typography sx={{fontSize: 14, color: '#FFAC0B', fontWeight: 600}}>{guideText}</Typography>
                                : <Typography sx={{fontSize: 14, color: '#F47806', fontWeight: 600}}>{guideText}</Typography>
                            }
                        </div>
                    )}
                <Typography sx={{fontSize: 14, color: '#3C3C3C', mb: '8px'}}>성별</Typography>
                <Grid container sx={{mb: '18px'}}>
                    <Button value="남성" disabled={matchingUser === null ? false : true} onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '8px 0 0 8px', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '남성' ? '#FBFBFB' : '#fff'}}>남</Button>
                    <Button value="여성" disabled={matchingUser === null ? false : true} onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '0 8px 8px 0', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '여성' ? '#FBFBFB' : '#fff'}}>여</Button>
                </Grid>

                <Typography sx={{fontSize: 14, color: '#3C3C3C', mb: '8px'}}>그룹 한줄 소개</Typography>
                <TextField 
                    inputProps={{ maxLength: 29 }} 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" style={{ alignSelf: 'flex-end' }}>
                                <Typography variant="body2" color="textSecondary">
                                    {groupIntro.length}/30
                                </Typography>
                            </InputAdornment>
                        ),
                    }} multiline rows={2} variant='outlined' fullWidth placeholder='그룹 한줄 소개를 입력해주세요 (필수)' value={groupIntro} onChange={(event) => setGroupIntro(event.target.value)}/>

                <Divider orientation="horizontal" sx={{ border: '5px solid #F2F2F2', margin: '25px -24px' }} />

                {/* 개인별 프로필, 친구1(대표),친구2,친구3 */}
                {friends && friends.map((friend, index) => (
                    <MemberInfoInput
                        key={index}
                        label={friend.label}
                        studentId={friend.studentId}
                        major={friend.major}
                        introduction={friend.introduction}
                        onUpdate={(data) => updateFriendData(index, data)}
                    />
                ))}

                <Divider orientation="horizontal" sx={{ border: '5px solid #F2F2F2', margin: '25px -24px' }} />
                
                {/* 일정 */}
                <CalendarContainer dates={selectedDates} onDateChange={handleDateChange} editable={true} />

                {/* 등록하기 버튼 */}
                <Button onClick={handleSubmit} fullWidth sx={{backgroundColor: isValid ? '#FFCE00' : '#E2E2E2', color: '#fff', fontSize: 16, fontWeight: 700, borderRadius: '8px', height: 56, m: '60px 0 10px', '&:hover': { backgroundColor: isValid ? '#FFCE00' : '#E2E2E2'}, '&:active': { backgroundColor: isValid ? '#FFCE00' : '#E2E2E2' }}}>
                    등록하기
                </Button>

                <Popup
                    open={popupOpen}
                    handleClose={() => setPopupOpen(false)}
                    type={popupType}
                    message={popupMessage}
                    description={popupDescription}
                    onConfirm={handleQuestionConfirm}
                    onInfoConfirm={() => router.push('/mealPromise')}
                    onErrorConfirm={handleErrorConfirm}
                />
            </div>
        </ThemeProvider>
    );
}

export default MakeGroupProfile;