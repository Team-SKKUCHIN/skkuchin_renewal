import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import FriendProfile from '../components/MealPromise/FriendProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Loading } from '../components/Loading';
import { load_other_matching_info, clear_matching } from '../actions/matchingUser/matchingUser';
import { useDispatch } from 'react-redux';

const showFriendProfile = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const candidate = JSON.parse(localStorage.getItem('selectedFriend'));
        setCandidate(candidate);
    }, []);

    useEffect(() => {
        if(candidate) {
            clear_matching();
            dispatch(load_other_matching_info(candidate.id, ([result, message]) => {
                if(result) {
                    setIsLoading(false);
                }
            }));
        }
    }, [candidate]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="프로필 보기" />
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <FriendProfile />
                )
            }
        </ThemeProvider>
    )
}

export default showFriendProfile;