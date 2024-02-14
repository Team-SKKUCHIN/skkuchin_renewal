import { useState } from 'react';
import { CssBaseline, ThemeProvider, Grid, Button, Typography, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import Header from "../components/MealPromise/Header";

const showAllTwoLists = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* header */}
            <Header title="둘이 먹어요" />
        </ThemeProvider>
    )
}

export default showAllTwoLists;