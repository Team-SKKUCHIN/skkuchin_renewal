import { useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import theme from '../theme/theme';
import GroupItem from '../components/MealPromise/GroupItem';
import Header from '../components/MealPromise/Header';
import Filter from '../components/MealPromise/Filter';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

const dummyProfiles = [
    {
        groupName: '그룹명1',
        gender: '여자',
        mbti: 'ENFJ',
        introduction:
            '그룹 한줄 소개입니다',
    },
    {
        groupName: '그룹명2',
        gender: '남자',
        mbti: 'ISFP',
        introduction:
            '긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 👀',
    },
    {
        groupName: '그룹명3',
        gender: '남자',
        mbti: 'ENFP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },
    {
        groupName: '그룹명4',
        gender: '여자',
        mbti: 'ISFP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },
    {
        groupName: '그룹명5',
        gender: '남자',
        mbti: 'INTJ',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },

];

const ShowAllGroupLists = () => {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const filterOptions = ['전체', '여자', '남자'];

    const filteredProfiles =
        selectedFilter === '전체'
        ? dummyProfiles
        : dummyProfiles.filter((group) => group.gender === selectedFilter);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* header */}
            <Header title="여럿이서 먹어요" onBackClick={()=> router.push('/mealPromise')} />

            {/* 필터 */}
            <Filter
                filterOptions={filterOptions}
                selectedFilter={selectedFilter}
                onFilterSelect={(filter) => setSelectedFilter(filter)}
            />

            {/* 목록 */}
            <div style={{ overflow: 'scroll', padding: '12px 24px' }}>
                {filteredProfiles.length !== 0 ? (
                filteredProfiles.map((group, index) => (
                    <div style={{ marginBottom: '15px' }} key={index}>
                    <GroupItem group={group} />
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
    );
};

export default ShowAllGroupLists;