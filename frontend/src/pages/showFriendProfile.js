import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import FriendProfile from '../components/MealPromise/FriendProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const showFriendProfile = () => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const candidate = JSON.parse(localStorage.getItem('selectedFriend'));
        setCandidate(candidate);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="프로필 보기" />
            {
                candidate &&
                <FriendProfile candidate={candidate} />
                
            }
        </ThemeProvider>
    )
}

export default showFriendProfile;