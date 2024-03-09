import React from 'react';
import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton, Typography, Button } from '@mui/material';
import theme from '../theme/theme';
import GroupItem from '../components/MealPromise/GroupItem';
import Header from '../components/MealPromise/Header';
import Filter from '../components/MealPromise/Filter';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import { load_all_group_profile, get_my_group_profile } from '../actions/groupProfile/groupProfile';
import { useSelector, useDispatch } from 'react-redux';
import ErrorPopup from '../components/Custom/ErrorPopup';

const ShowAllGroupLists = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);
    const groups = useSelector(state => state.groupProfile.allGroupProfiles);

    useEffect(() => {
        if(groups === null) dispatch(load_all_group_profile());
        if (myGroupProfiles === null) dispatch(get_my_group_profile());
    }, []);

    const [displayCount, setDisplayCount] = useState(20);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');

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
        if(!isAuthenticated) {
            setPopupMessage('그룹 프로필을 등록하기 위해서는\n로그인이 필요해요.');
            setPopupBtnText('로그인하러 가기');
            setPopupOpen(true);
        } else if (user && user.phone_number === null) {
              setPopupBtnText('휴대폰 본인인증 하기');
              setPopupMessage('밥약 서비스 이용을 위해선 휴대폰 본인인증이 필요해요. 안전한 서비스 이용을 위해 인증해주세요.');
              setPopupOpen(true);
        } else {
              router.push('/makeGroupProfile');
        } 
    }

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 20);
    }

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setDisplayCount(20);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* header */}
            <Header title="여럿이서 먹어요" onBackClick={handleBackClick}/>

            {/* 필터 */}
            <Filter
                filterOptions={filterOptions}
                selectedFilter={selectedFilter}
                onFilterSelect={handleFilterChange}
            />

            {/* 목록 */}
            <div style={{ overflow: 'scroll', padding: '12px 24px', marginTop: '109px' }}>
                {filteredProfiles && filteredProfiles.length !== 0 ? (
                    filteredProfiles
                        .filter((group) => !myGroupProfiles.some((myGroup) => myGroup.id == group.id))
                        .slice(0, displayCount)
                        .map((group, index) => (
                            <div style={{ marginBottom: '12px' }} key={index} onClick={() => handleGroupClick(group.id)}>
                                <GroupItem group={group} />
                            </div>
                        ))
                ) : (
                    <Typography>필터링 조건에 부합하는 그룹이 없습니다.</Typography>
                )}
                {filteredProfiles && (displayCount < filteredProfiles.length) && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '12px' }}>
                        <Button onClick={handleLoadMore} sx={{ color: '#9E9E9E', fontWeight: 600, fontSize: '18px', textDecorationLine: 'underline' }}>
                            더보기
                        </Button>
                    </div>
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

            <ErrorPopup
                open={popupOpen}
                handleClose={() => setPopupOpen(false)}
                message={popupMessage}
                btnText={popupBtnText}
                onConfirm={() => {
                    setPopupOpen(false);
                    if (popupBtnText === '로그인하러 가기') {
                        router.push('/login');
                    } else if (popupBtnText === '휴대폰 본인인증 하기') {
                        router.push('/verification');
                    }
                }}
            />
        </ThemeProvider>
    );
};

export default ShowAllGroupLists;