import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Button, IconButton, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { load_candidate } from '../actions/candidate/candidate';
import theme from '../theme/theme';
import Header from "../components/MealPromise/Header";
import Filter from '../components/MealPromise/Filter';
import FriendItem from '../components/MealPromise/FriendItem';
import FriendProfile from '../components/MealPromise/FriendProfile';
import AddIcon from '@mui/icons-material/Add';
import ErrorPopup from '../components/Custom/ErrorPopup';

const showAllTwoLists = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector(state => state.auth.user);
    const candidate = useSelector(state => state.candidate.candidate);

    const [selectedFilter, setSelectedFilter] = useState('전체');
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');

    const filterOptions = ['전체', '명륜', '율전'];

    useEffect(() => {
        dispatch(load_candidate());
    }, []);

    const filteredProfiles =
        selectedFilter === '전체'
        ? candidate
        : candidate.filter((candidate) => candidate.campus === selectedFilter);

    const handleBackClick = () => {
        if(selectedCandidate) {
            setSelectedCandidate(null);
        } else {
            router.push('/mealPromise');
        }
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
            <Header title="둘이 먹어요" onBackClick={handleBackClick} />

            {/* 필터링 */}
            {
                selectedCandidate == null && (
                    <Filter
                        filterOptions={filterOptions}
                        selectedFilter={selectedFilter}
                        onFilterSelect={(filter) => setSelectedFilter(filter)}
                    />
                )
            }

            {selectedCandidate ? (
                <FriendProfile candidate={selectedCandidate} />
                ) : (
                <div style={{ overflow: 'scroll' }}>
                    {
                    filteredProfiles && filteredProfiles.length !== 0 ? (
                        filteredProfiles.map((candidate, index) => (
                            <div key={index} onClick={() => setSelectedCandidate(candidate)}>
                                <FriendItem candidate={candidate} />
                                <Divider sx={{margin: '0 24px'}} />
                            </div>
                        ))
                    ) : (
                        <Typography>필터링 조건에 부합하는 학우가 없습니다.</Typography>
                    )
                }
                </div>
            )}
            
            {
                selectedCandidate == null && (
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
                )
            }
            <ErrorPopup
                open={popupOpen}
                handleClose={() => setPopupOpen(false)}
                message={popupMessage}
                btnText={popupBtnText}
                onConfirm={() => {
                    setPopupOpen(false);
                    if (popupBtnText === '휴대폰 본인인증 하기') {
                        router.push('/verification');
                    }
                }}
            />
        </ThemeProvider>
    )
}

export default showAllTwoLists;