import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button, Divider } from '@mui/material';
import styled from '@emotion/styled';
// import { useRouter } from 'next/router';
// import CommunityItem from '../components/SkkuChat/CommunityItem';
import { useDispatch, useSelector } from 'react-redux';
import { load_all_posts } from '../actions/post/post';
import { useEffect } from 'react';
import Friends from '../components/Matching/Friends';
import AiGreeting from '../components/AiGreeting';

const MatchContainer = styled.div`
  /* 데스크톱에서 스크롤 바를 숨김 */
  ::-webkit-scrollbar {
    display: none;
  }
  /* 모바일에서 스크롤 바를 숨김 */
  *::-webkit-scrollbar {
    display: none;
  }
`;

const MatchPage = () => {
    // const router = useRouter();

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const allPosts = useSelector(state => state.post.allPosts);

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(load_all_posts());
        }
    }, []);

    return(
        <MatchContainer>
            <AiGreeting />
            <Container sx={{p: '0 24px', mt: '0', position:'relative'}}>
                <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
                    <Grid item >
                        <Friends />
                    </Grid>
                </Grid>
            </Container>
            {/* <Divider orientation='horizontal' sx={{width: '100%', borderBottom: '8px solid #FBFBFB'}}/> 
            <Grid sx={{mt: '21px'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px 0'}}>
                    <Typography style={{fontSize:'21px', fontWeight: 700, color: '#3C3C3C'}}>
                        스꾸게시판 📌
                    </Typography>
                    <Button sx={{fontSize:'14px', fontWeight: 700, color: '#FFAC0B', p: 0}} onClick={() => router.push('/freeCommunity')}>
                        전체보기
                    </Button>
                </div>
                <Container sx={{ p: '0 24px', height: 'max-content', alignItems: 'center', mt: '10px' }}>
                    {allPosts && allPosts.slice(0,2).map((post) => (
                        <CommunityItem key={post.id} {...post} />
                    ))}
                </Container>
            </Grid> */}
        </MatchContainer>
    )
} 

export default MatchPage;
