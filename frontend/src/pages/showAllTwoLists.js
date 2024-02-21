import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { load_candidate } from '../actions/candidate/candidate';
import theme from '../theme/theme';
import Header from "../components/MealPromise/Header";
import Filter from '../components/MealPromise/Filter';
import FriendItem from '../components/MealPromise/FriendItem';
import AddIcon from '@mui/icons-material/Add';

const showAllTwoLists = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const user = useSelector(state => state.auth.user);
    const candidate = useSelector(state => state.candidate.candidate);

    const [selectedFilter, setSelectedFilter] = useState('전체');
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* header */}
            <Header title="둘이 먹어요" />

            {/* 필터 */}
            <Filter
                filterOptions={filterOptions}
                selectedFilter={selectedFilter}
                onFilterSelect={(filter) => setSelectedFilter(filter)}
            />

            {/* 목록 */}
            <div style={{ overflow: 'scroll' }}>
                {filteredProfiles && filteredProfiles.length !== 0 ? (
                filteredProfiles.map((candidate, index) => (
                    <div style={{ marginBottom: '15px' }} key={index}>
                    <FriendItem candidate={candidate} />
                    </div>
                ))
                ) : (
                <p>필터링 조건에 부합하는 그룹이 없습니다.</p>
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
                onClick={() => router.push('/makeGroupProfile')}
                >
                <AddIcon fontSize="medium" />
                </IconButton>
            </div>
        </ThemeProvider>
    )
}

export default showAllTwoLists;