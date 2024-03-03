import React from 'react';
import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton, Typography } from '@mui/material';
import theme from '../theme/theme';
import GroupItem from '../components/MealPromise/GroupItem';
import Header from '../components/MealPromise/Header';
import Filter from '../components/MealPromise/Filter';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import { load_all_group_profile } from '../actions/groupProfile/groupProfile';
import { useSelector, useDispatch } from 'react-redux';

const ShowAllGroupLists = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const groups = useSelector(state => state.groupProfile.allGroupProfiles);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if(!groups) { 
            dispatch(load_all_group_profile(isAuthenticated));
        }
    }, [isAuthenticated, groups]);

    const [selectedFilter, setSelectedFilter] = useState('전체');
    const filterOptions = ['전체', '여성', '남성'];

    const filteredProfiles =
        selectedFilter === '전체'
        ? groups
        : groups.filter((group) => group.gender == selectedFilter);

    const handleGroupClick = (id) => {
        router.push(`/showGroupProfile?id=${id}`);
    }

    const handleBackClick = () => {
        router.push(`/mealPromise`);
    }

    const handleAddBtnClick = () => {
        if(user && user.phone_number !== null) {
            router.push('/makeGroupProfile');
        } else {
            alert('밥약 서비스 이용을 위해선 휴대폰 본인인증이 필요해요. 안전한 서비스 이용을 위해 인증해주세요.');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* header */}
            <Header title="여럿이서 먹어요" onBackClick={handleBackClick} />

            {/* 필터 */}
            <Filter
                filterOptions={filterOptions}
                selectedFilter={selectedFilter}
                onFilterSelect={(filter) => setSelectedFilter(filter)}
            />

            {/* 목록 */}
            <div style={{ overflow: 'scroll', padding: '12px 24px' }}>
                {filteredProfiles && filteredProfiles.length !== 0 ? (
                    filteredProfiles.map((group, index) => (
                        <div style={{ marginBottom: '15px' }} key={index} onClick={() => handleGroupClick(group.id)}>
                            <GroupItem group={group} />
                        </div>
                    ))
                ) : (
                    <Typography>필터링 조건에 부합하는 그룹이 없습니다.</Typography>
                )}
            </div>

            <div style={{ position: 'fixed', right: '24px', bottom: '24px'}}>
                <IconButton
                style={{
                    backgroundColor: "#FFCE00",
                    color: '#fff',
                    borderRadius: '25px',
                    boxShadow: 'none',
                    height: '52px',
                    width: '52px'
                }}
                onClick={handleAddBtnClick}
                >
                <AddIcon fontSize="medium" />
                </IconButton>
            </div>
        </ThemeProvider>
    );
};

export default ShowAllGroupLists;