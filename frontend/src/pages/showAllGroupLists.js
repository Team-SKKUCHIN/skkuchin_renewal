import { useState } from 'react';
import { CssBaseline, ThemeProvider, Grid, Button, Typography, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import iconBack from '../image/icon_header_back.png';
import iconSearch from '../image/icon_header_search.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupItem from '../components/MealPromise/GroupItem';
import Header from '../components/MealPromise/Header';
import Filter from '../components/MealPromise/Filter';

const dummyProfiles = [
    {
        groupName: '그룹명1',
        gender: '여',
        mbti: 'ENFJ',
        introduction:
            '그룹 한줄 소개입니다',
    },
    {
        groupName: '그룹명2',
        gender: '남',
        mbti: 'ISFP',
        introduction:
            '긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 👀',
    },
    {
        groupName: '그룹명3',
        gender: '남',
        mbti: 'ENFP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },
    {
        groupName: '그룹명4',
        gender: '여',
        mbti: 'ISFP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },
    {
        groupName: '그룹명5',
        gender: '남',
        mbti: 'INTJ',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },

];

const ShowAllGroupLists = () => {
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const filterOptions = ['전체', '여자', '남자'];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* header */}
            <Header title="여럿이서 먹어요" />

            {/* 필터 */}
            <Filter
                filterOptions={filterOptions}
                selectedFilter={selectedFilter}
                onFilterSelect={(filter) => setSelectedFilter(filter)}
            />

            {/* 목록 */}
            <div style={{overflow: 'scroll', padding: '12px 24px'}}>
                {
                    dummyProfiles.length !== 0 &&
                        dummyProfiles.map((group, index) => (
                            <div style={{marginBottom: '15px'}}>
                                <GroupItem key={index} group={group} />
                            </div>
                        ))
                }
            </div>
        </ThemeProvider>
    );
};

export default ShowAllGroupLists;