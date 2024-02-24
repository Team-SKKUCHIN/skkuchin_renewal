import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import GroupProfile from '../components/MealPromise/GroupProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const showGroupProfile = () => {
    const dummyGroup= {
        groupName: '그룹명1',
        gender: '여',
        mbti: 'GROUP',
        introduction: '그룹 한줄 소개입니다',
        date: '23.02.13~23.03.13',
        members: [
            {
                name: '김스옹',
                studentId: '20학번',
                major: '컴퓨터공학과',
                introduction: '안녕하시오로로로~',
                gender: '여'
            },
            {
                name: '친구1',
                studentId: '20학번',
                major: '컬처앤테크놀로지융합전공',
                introduction: '안녕하세요 친해져요',
                gender: '여'
            },
            {
                name: '친구2',
                studentId: '21학번',
                major: '경제학과',
                introduction: '안녕하세요 안녕하세용~!',
                gender: '여'
            }
        ]
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="여럿이서 먹어요" />
            <GroupProfile group={dummyGroup}/>
        </ThemeProvider>
    )
}

export default showGroupProfile;