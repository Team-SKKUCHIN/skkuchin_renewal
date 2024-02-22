import React, { useEffect, useState } from 'react';
import Header from '../components/MealPromise/Header';
import FriendProfile from '../components/MealPromise/FriendProfile';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import { load_other_matching_info } from '../actions/matchingUser/matchingUser';
import { useDispatch, useSelector } from 'react-redux';

const showFriendProfile = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const friendId = router.query.id;
    const matchingUser = useSelector(state => state.matchingUser.matchingUser);

    const [isLoading, setIsLoading] = useState(true);
    const [updatedUserInfo, setUpdatedUserInfo] = useState(null);

    useEffect(() => {
        if(!friendId) {
            router.push('/mealPromise');
        } else {
            dispatch(load_other_matching_info(friendId));
        } 
    }, [friendId]);


    const updateUserInfo = (user) => {
        let keywords = user.keywords;
    
        let selectedKeywords = keywords ? Object.values(keywords).flat().slice(0, 2) : [];
    
        setUpdatedUserInfo({
            ...user,
            keywords: selectedKeywords,
        });
    }

    useEffect(() => {
        if(matchingUser !== null && matchingUser.id == friendId) {
            setIsLoading(false);
            updateUserInfo(matchingUser);
        }
    }, [matchingUser]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="둘이 먹어요" />
            {
                isLoading ? (
                    <div></div>
                ) : (
                    <FriendProfile candidate={updatedUserInfo} />
                )
            }
        </ThemeProvider>
    )
}

export default showFriendProfile;