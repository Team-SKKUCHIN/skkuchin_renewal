import React, { useEffect } from 'react';
import { Grid, Container, Typography, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommunityItem from '../components/SkkuChat/CommunityItem';
import { useRouter } from 'next/router';
import theme from '../theme/theme';
// import Header from '../components/SkkuChat/Header';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { load_all_posts } from '../actions/post/post';
import UpperBar from '../components/UpperBar';

const FreeCommunity = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const allPosts = useSelector(state => state.post.allPosts);

    useEffect(() => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            router.push('/login');
        } else {
            dispatch(load_all_posts());
        }
    }, []);

    // const handleBackClick = () => {
    //     router.push('/');
    // };

    const handleAddClick = () => {
       router.push('/uploadPost');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UpperBar />
            {/* <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <Header title="스꾸게시판" onBackClick={handleBackClick} showSearchIcon={true}/>
            </Container> */}
            <Container sx={{p: '0 24px', height: 'max-content', alignItems: 'center', mt: '20px', display: 'flex'}}>
                <Typography sx={{fontSize: '14px', whiteSpace: 'nowrap', mr: '10px', color: '#FFAC0B', fontWeight: 700}}>인기🔥</Typography>
                <Grid container sx={{justifyContent: 'space-between', p: '10px 15px', backgroundColor: '#FFFCE4', borderRadius: '10px'}}>
                    <Typography sx={{fontSize: '14px', color: '#3C3C3C', fontWeight: 400}}>요즘 스꾸친 폼 미쳤다</Typography>
                    <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                        <FavoriteBorderIcon sx={{width: '15px', color: '#FFCE00'}} />
                        <Typography sx={{fontSize: '12px', ml: '3px', color: '#FFCE00', fontWeight: 600}}>5</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container sx={{ p: '0 24px', height: 'max-content', alignItems: 'center', mt: '10px' }}>
                {allPosts && allPosts.map((post) => (
                // {posts && posts.map((post) => (
                    <CommunityItem key={post.id} {...post} />
                ))}
            </Container>
            <Container
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton 
                    onClick={handleAddClick}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        width: '50px',
                        height: '50px',
                        '&:hover, &:active': {
                            backgroundColor: theme.palette.primary.main,
                        },
                    }} aria-label="add">
                    <AddIcon sx={{color: '#fff'}} />
                </IconButton>
            </Container>
        </ThemeProvider>
    );
};

export default FreeCommunity;
