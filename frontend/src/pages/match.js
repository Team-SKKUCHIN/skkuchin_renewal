import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Layout from "../hocs/Layout";
import UpperBar from "../components/UpperBar";
import AiGreeting from "../components/AiGreeting"

import Friends from '../components/Matching/Friends';

const MatchPage = () => {
    const user = useSelector(state => state.auth.user); 

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout
                    title='스꾸친 | Match'
                    content='Match page'
                > 
            {/* 0211 상단바 및 내 프로필 보기 컴포넌트 추가 완 (재현) */}
            <UpperBar />
            <AiGreeting />

                <Container sx={{p: '0 15px', mt: '0'}}>
                    {/* 상대 프로필 */}
                    <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
                        <Grid item sx={{flexShrink: 0, pr: '13px'}}>
                            <Friends />
                        </Grid>
                        <Grid item sx={{flexShrink: 0, pr: '13px'}}>
                            <Friends />
                        </Grid>
                        <Grid item sx={{flexShrink: 0}}>
                            <Friends />
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </ThemeProvider>
    )
} 

export default MatchPage;