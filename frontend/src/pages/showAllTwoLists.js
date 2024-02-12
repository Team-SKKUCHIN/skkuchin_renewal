import { useState } from 'react';
import { CssBaseline, ThemeProvider, Grid, Button, Typography, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import Header from "../components/MealPromise/Header";
import Filter from '../components/MealPromise/Filter';

const showAllTwoLists = () => {
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const filterOptions = ['전체', '명륜', '율전'];

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

        </ThemeProvider>
    )
}

export default showAllTwoLists;