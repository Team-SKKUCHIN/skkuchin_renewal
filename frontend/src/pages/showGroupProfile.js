import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import GroupProfile from '../components/MealPromise/GroupProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const showGroupProfile = () => {
    const router = useRouter();
    const id = router.query.id;
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="여럿이서 먹어요" />
            <GroupProfile id={id}/>
        </ThemeProvider>
    )
}

export default showGroupProfile;