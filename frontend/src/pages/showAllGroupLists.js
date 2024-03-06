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
import ErrorPopup from '../components/Custom/ErrorPopup';

const ShowAllGroupLists = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const groups = useSelector(state => state.groupProfile.allGroupProfiles);

    useEffect(() => {
        if(groups === null) { 
            dispatch(load_all_group_profile());
        }
    }, []);

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
        if(user && user.phone_number !== null) {
            router.push('/makeGroupProfile');
        } else {
            setPopupBtnText('휴대폰 본인인증 하기');
            setPopupMessage('밥약 서비스 이용을 위해선 휴대폰 본인인증이 필요해요. 안전한 서비스 이용을 위해 인증해주세요.');
            setPopupOpen(true);
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
                        <div style={{ marginBottom: '12px' }} key={index} onClick={() => handleGroupClick(group.id)}>
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

            <ErrorPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                message={popupMessage}
                confirmText={popupBtnText}
                onInfoConfirm={() => {
                    setPopupOpen(false);
                    if (popupBtnText === '휴대폰 본인인증 하기') {
                        router.push('/phoneAuth');
                    }
                }}
            />
        </ThemeProvider>
    );
};

export default ShowAllGroupLists;