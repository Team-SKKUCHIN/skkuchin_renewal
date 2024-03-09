import React from 'react';
import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton, Typography } from '@mui/material';
import theme from '../theme/theme';
import GroupItem from '../components/MealPromise/GroupItem';
import Header from '../components/MealPromise/Header';
import Filter from '../components/MealPromise/Filter';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import { get_my_group_profile } from '../actions/groupProfile/groupProfile';
import { useSelector, useDispatch } from 'react-redux';

const myGroupProfileLists = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const myGroups = useSelector(state => state.groupProfile.myGroupProfiles);

    useEffect(() => {
        if(!myGroups) {
            dispatch(get_my_group_profile());
        } else return;
    }, []);

    const handleGroupClick = (id) => {
        router.push({
            pathname: `/showGroupProfile`,
            query: { id: id, mode: 'edit' },
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="나의 그룹 프로필" onBackClick={() => router.push('/myPage')}/>

            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px 24px', marginTop: '63px' }}>
                <Typography style={{ color: '#3C3C3C', fontSize: '16px', fontWeight: 700 }}>
                    그룹 목록 <span style={{color: '#FFCE00'}}>{myGroups && myGroups.length}</span>/5
                </Typography>
            </div>
            {/* 목록 */}
            <div style={{ overflow: 'scroll', padding: '0px 24px' }}>
                {myGroups && myGroups.length > 0 ? (
                    myGroups.map((group, index) => (
                        <div style={{ marginBottom: '12px' }} key={index} onClick={() => handleGroupClick(group.id)}>
                            <GroupItem group={group} />
                        </div>
                    ))
                ) : (
                    <Typography>나의 그룹 프로필이 없습니다.</Typography>
                )}
            </div>
        </ThemeProvider>
    );
};

export default myGroupProfileLists;