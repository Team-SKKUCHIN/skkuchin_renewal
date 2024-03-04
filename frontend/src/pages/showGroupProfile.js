import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import GroupProfile from '../components/MealPromise/GroupProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';

const showGroupProfile = () => {
    const router = useRouter();
    const id = router.query.id;
    const isMyProfile =  router.query.isMyProfile === 'true';

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title= { isMyProfile ? "나의 그룹 프로필" : "여럿이서 먹어요" } />
            <GroupProfile id={id} isMyProfile={isMyProfile}/>
        </ThemeProvider>
    )
}

export default showGroupProfile;