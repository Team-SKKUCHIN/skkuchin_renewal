import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import FriendProfile from '../components/MealPromise/FriendProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Loading } from '../components/Loading';

const showFriendProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [updatedUserInfo, setUpdatedUserInfo] = useState(null);
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const candidate = JSON.parse(localStorage.getItem('selectedFriend'));
        setCandidate(candidate);
    }, []);


    const updateUserInfo = (user) => {
        let keywords = user.keywords;
    
        let selectedKeywords = keywords ? Object.values(keywords).flat().slice(0, 2) : [];
    
        setUpdatedUserInfo({
            ...user,
            keywords: selectedKeywords,
        });
    }

    useEffect(() => {
        if(candidate) {
            updateUserInfo(candidate);
            setIsLoading(false);
        }
    }, [candidate]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="둘이 먹어요" />
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <FriendProfile candidate={updatedUserInfo} />
                )
            }
        </ThemeProvider>
    )
}

export default showFriendProfile;