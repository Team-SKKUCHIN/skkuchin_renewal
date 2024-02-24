import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Button, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { load_candidate } from '../actions/candidate/candidate';
import theme from '../theme/theme';
import Header from "../components/MealPromise/Header";
import Filter from '../components/MealPromise/Filter';
import FriendItem from '../components/MealPromise/FriendItem';
import FriendProfile from '../components/MealPromise/FriendProfile';
import AddIcon from '@mui/icons-material/Add';

const showAllTwoLists = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector(state => state.auth.user);
    const candidate = useSelector(state => state.candidate.candidate);

    const [selectedFilter, setSelectedFilter] = useState('전체');
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const filterOptions = ['전체', '명륜', '율전'];

    useEffect(() => {
        if(!user || !candidate) {
            dispatch(load_candidate());
        }
        console.log('candidate', candidate);
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* header */}
            <Header title="둘이 먹어요" onBackClick={handleBackClick} icon={!selectedCandidate}/>

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
                            <div style={{ marginBottom: '15px' }} key={index} onClick={() => setSelectedCandidate(candidate)}>
                                <FriendItem candidate={candidate} />
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
                        onClick={() => router.push('/makeGroupProfile')}
                        >
                        <AddIcon fontSize="medium" />
                        </IconButton>
                    </div>
                )
            }
        </ThemeProvider>
    )
}

export default showAllTwoLists;