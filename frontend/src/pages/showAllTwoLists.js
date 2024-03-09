import { useState } from 'react';
import { ThemeProvider, CssBaseline, Button, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import theme from '../theme/theme';
import Header from "../components/MealPromise/Header";
import Filter from '../components/MealPromise/Filter';
import FriendItem from '../components/MealPromise/FriendItem';
import FriendProfile from '../components/MealPromise/FriendProfile';
import ErrorPopup from '../components/Custom/ErrorPopup';

const showAllTwoLists = () => {
    const router = useRouter();

    const user = useSelector(state => state.auth.user);
    const candidate = useSelector(state => state.candidate.candidate);

    const [selectedFilter, setSelectedFilter] = useState('전체');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [displayCount, setDisplayCount] = useState(20); 

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');

    const filterOptions = ['전체', '명륜', '율전'];

    const filteredProfiles =
        selectedFilter === '전체'
        ? candidate.filter((candidate) => candidate.id !== user.id)
        : candidate.filter((candidate) => candidate.campus === selectedFilter && candidate.id !== user.id);

    const handleBackClick = () => {
        if(selectedCandidate) {
            setSelectedCandidate(null);
        } else {
            router.push('/mealPromise');
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
            <Header title="둘이 먹어요" onBackClick={handleBackClick} />

            {/* 필터링 */}
            {
                selectedCandidate == null && (
                    <Filter
                        filterOptions={filterOptions}
                        selectedFilter={selectedFilter}
                        onFilterSelect={handleFilterChange}
                    />
                )
            }

            {selectedCandidate ? (
                <FriendProfile candidate={selectedCandidate} />
                ) : (
                <div style={{ overflow: 'scroll', marginTop: '109px'}}>
                    {
                        filteredProfiles && filteredProfiles.length !== 0 ? (
                            filteredProfiles.slice(0, displayCount).map((candidate, index) => (
                                <div key={index} onClick={() => setSelectedCandidate(candidate)}>
                                    <FriendItem candidate={candidate} />
                                    <Divider sx={{margin: '0 24px'}} />
                                </div>
                            ))
                        ) : (
                            <Typography>필터링 조건에 부합하는 학우가 없습니다.</Typography>
                        )
                    }
                    {filteredProfiles && ( displayCount < filteredProfiles.length ) && (
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%', padding: '12px'}}>
                            <Button disableElevation onClick={handleLoadMore}  sx={{color: '#9E9E9E', fontWeight: 600, fontSize: '18px', textDecorationLine: 'underline'}}>
                                더보기
                            </Button>
                        </div>
                    )}
                </div>
            )}
            
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
    )
}

export default showAllTwoLists;