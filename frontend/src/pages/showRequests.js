import React, { useState } from 'react';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import { Header } from '../components/Header';
import { Menu } from '../components/Request/Menu';
import { Filter } from '../components/Request/Filter';
import { GroupRequest } from '../components/Request/GroupRequest';
import { PersonalRequest } from '../components/Request/PersonalRequest';

const showRequests = () => {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const filterOptions = ['전체', '여럿이서 먹어요', '둘이 먹어요'];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="신청 현황" handleBack={() => router.push('/')} />
            <Menu selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            <div style={{ margin: '24px'}}>
                <Filter
                    filterOptions={filterOptions}
                    selectedFilter={selectedFilter}
                    number={5}
                    onFilterSelect={(filter) => setSelectedFilter(filter)}
                />
                <GroupRequest />
                <PersonalRequest />
            </div>
        </ThemeProvider>
    )
}

export default showRequests;