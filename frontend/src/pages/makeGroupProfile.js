import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Typography, Grid, TextField, Button, Divider } from '@mui/material';
import theme from '../theme/theme';
import Header from '../components/MealPromise/Header';
import MemberInfoInput from '../components/MealPromise/MemberInfoInput';
import CalendarContainer from '../components/MealPromise/CalendarContainer';

const MakeGroupProfile = () => {
    const [groupName, setGroupName] = useState('');
    const [gender, setGender] = useState('');
    const [groupIntro, setGroupIntro] = useState(''); 
    
    const [friends, setFriends] = useState([
        { name: '친구1', studentId: '', major: '', introduction: '' },
        { name: '친구2', studentId: '', major: '', introduction: '' },
        { name: '친구3', studentId: '', major: '', introduction: '' },
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
        

    const isValid = groupName !== '' && gender !== '' && groupIntro !== '' && friends && friends.every((friend) => friend.studentId !== '' && friend.major !== '' && friend.introduction !== '');

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Header title="그룹 프로필 등록" />
            <div style={{margin: '24px'}}>
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
                <TextField sx={{mb: '18px'}} variant='outlined' fullWidth placeholder='그룹명을 입력해주세요 (필수)' value={groupName} onChange={(event) => setGroupName(event.target.value)}/>

                <Typography sx={{fontSize: 14, color: '#3C3C3C', mb: '8px'}}>성별</Typography>
                <Grid container sx={{mb: '18px'}}>
                    <Button value="남성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '8px 0 0 8px', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '남성' ? '#FFFCE4' : '#fff'}}>남</Button>
                    <Button value="여성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '0 8px 8px 0', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '여성' ? '#FFFCE4' : '#fff'}}>여</Button>
                </Grid>

                <Typography sx={{fontSize: 14, color: '#3C3C3C', mb: '8px'}}>그룹 한줄 소개</Typography>
                <TextField multiline rows={2} variant='outlined' fullWidth placeholder='그룹 한줄 소개를 입력해주세요 (필수)' value={groupIntro} onChange={(event) => setGroupIntro(event.target.value)}/>

                <Divider orientation="horizontal" sx={{ border: '5px solid #F2F2F2', margin: '25px -24px' }} />

                {/* 개인별 프로필, 친구1(대표),친구2,친구3 */}
                {friends && friends.map((friend, index) => (
                    <MemberInfoInput
                        key={index}
                        friendName={friend.name}
                        studentId={friend.studentId}
                        major={friend.major}
                        introduction={friend.introduction}
                        onUpdate={(data) => updateFriendData(index, data)}
                    />
                ))}

                <Divider orientation="horizontal" sx={{ border: '5px solid #F2F2F2', margin: '25px -24px' }} />
                
                {/* 일정 */}
                <CalendarContainer />

                {/* 등록하기 버튼 */}
                <Button onClick={()=>console.log('등록하기')} fullWidth disabled={!isValid} sx={{backgroundColor: isValid ? '#FFCE00' : '#E2E2E2', color: '#fff', fontSize: 16, fontWeight: 700, borderRadius: '8px', height: 56, m: '44px 0 16px'}}>
                    등록하기
                </Button>
            </div>
        </ThemeProvider>
    );
}

export default MakeGroupProfile;