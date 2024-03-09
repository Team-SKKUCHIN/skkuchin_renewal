import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, Typography, Grid, TextField, Button, Divider } from '@mui/material';
import theme from '../theme/theme';
import Header from '../components/MealPromise/Header';
import MemberInfoInput from '../components/MealPromise/MemberInfoInput';
import CalendarContainer from '../components/MealPromise/CalendarContainer';
import Popup from '../components/Custom/Popup';
import { update_group_profile, load_candidate_profile } from '../actions/groupProfile/groupProfile';
import { useRouter } from 'next/router';

const ModifyGroupProfile = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const selectedGroup = useSelector(state => state.groupProfile.candidateGroup);

    const [updatedData, setUpdatedData] = useState({
        friend1_introduction: '',
        friend2_introduction: '',
        friend3_introduction: '',
        group_introduction: '',
    });

    const [selectedDates, setSelectedDates] = useState(selectedGroup?.meeting_start_date ? [new Date(selectedGroup.meeting_start_date), new Date(selectedGroup.meeting_end_date)] : []);
    
    const friends = [
        { label: '친구1', introduction: selectedGroup?.friend1_introduction || '', studentId : selectedGroup?.friend1_student_id || '', major: selectedGroup?.friend1_major || '' },    
        { label: '친구2', introduction: selectedGroup?.friend2_introduction || '', studentId : selectedGroup?.friend2_student_id || '', major: selectedGroup?.friend2_major || '' },
        { label: '친구3', introduction: selectedGroup?.friend3_introduction || '', studentId : selectedGroup?.friend3_student_id || '', major: selectedGroup?.friend3_major || '' },
    ]

    useEffect(() => {
        if (selectedGroup === null) {
            dispatch(load_candidate_profile(router.query.id));
        } else {
            setUpdatedData({
                group_introduction: selectedGroup.group_introduction || '',
                friend1_introduction: selectedGroup.friend1_introduction || '',
                friend2_introduction: selectedGroup.friend2_introduction || '',
                friend3_introduction: selectedGroup.friend3_introduction || '',
            });
        }
    }, [selectedGroup]);

    const handleInfoChange = (field, value) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        console.log('Updated Data:', updatedData);
        dispatch(update_group_profile(selectedGroup.id, updatedData, ([result, message]) => {
            if (result) {
                console.log('그룹 프로필 수정 완료');
                router.push({
                    pathname: `/showGroupProfile`,
                    query: { id: selectedGroup.id, mode: 'edit' },
                });
            } else {
                console.error('Error updating group profile:', message);
            }
        }));
    };

    const handleIconBtnClick = () => {
        handleSubmit();
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="그룹 프로필 수정" icon="save" handleIconClick={handleIconBtnClick}/>
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

                {/* Group Name */}
                <Typography sx={{ fontSize: 14, color: '#3C3C3C', mb: '8px' }}>그룹명</Typography>
                <TextField
                    disabled
                    InputProps={{
                        style: {
                            height: 48,
                            padding: '0 6px',
                            backgroundColor: '#FBFBFB',
                            color: '#3C3C3C'
                        },
                    }}
                    sx={{ mb: '18px' }}
                    variant='outlined'
                    fullWidth
                    placeholder='그룹명을 입력해주세요 (필수)'
                    value={selectedGroup ? selectedGroup.group_name || '' : ''}
                />

                {/* Gender */}
                <Typography sx={{ fontSize: 14, color: '#3C3C3C', mb: '8px' }}>성별</Typography>
                <Grid container sx={{ mb: '18px' }}>
                    <Button
                        value="남성"
                        disabled
                        style={{
                            width: '50%',
                            border: '1px solid #E2E2E2',
                            borderRadius: '8px 0 0 8px',
                            height: '48px',
                            color: '#3C3C3C',
                            fontSize: '16px',
                            backgroundColor: user.gender === '남성' ? '#F2F2F2' : '#fff'
                        }}>
                        남
                    </Button>
                    <Button
                        value="여성"
                        disabled
                        style={{
                            width: '50%',
                            border: '1px solid #E2E2E2',
                            borderRadius: '0 8px 8px 0',
                            height: '48px',
                            color: '#3C3C3C',
                            fontSize: '16px',
                            backgroundColor: user.gender === '여성' ? '#F2F2F2' : '#fff'
                        }}>
                        여
                    </Button>
                </Grid>

                {/* Group Introduction */}
                <Typography sx={{ fontSize: 14, color: '#3C3C3C', mb: '8px' }}>그룹 한줄 소개</Typography>
                <TextField
                    multiline
                    rows={2}
                    variant='outlined'
                    fullWidth
                    placeholder='그룹 한줄 소개를 입력해주세요 (필수)'
                    value={updatedData.group_introduction}
                    onChange={(e) => handleInfoChange('group_introduction', e.target.value)}
                />

                <Divider orientation="horizontal" sx={{ border: '5px solid #F2F2F2', margin: '25px -24px' }} />

                {/* Friends' Information */}
                {friends.map((friend, index) => (
                    <MemberInfoInput
                        key={index}
                        label={friend.label}
                        introduction={friend.introduction}
                        studentId={friend.studentId}
                        mode="modify"
                        major={friend.major}
                        value={friend.introduction}
                        onChange={(value) => handleInfoChange(`friend${index + 1}_introduction`, value)}
                    />
                ))}

                <Divider orientation="horizontal" sx={{ border: '5px solid #F2F2F2', margin: '25px -24px' }} />

                <CalendarContainer dates={selectedDates} editable={false}/>
            </div>
        </ThemeProvider>
    );
};

export default ModifyGroupProfile;
