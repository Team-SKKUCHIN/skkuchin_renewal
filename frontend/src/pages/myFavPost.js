import React, { useEffect } from 'react';
import { Grid, Container, Typography, ThemeProvider, CssBaseline, IconButton, Card } from '@mui/material';
import CommunityItem from '../components/SkkuChat/CommunityItem';
import { useRouter } from 'next/router';
import theme from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { load_fav_posts } from '../actions/post/post';
import close from '../image/close.png';
import Image from 'next/image';

// 좋아요 누른 게시글 페이지
const myFavPost = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const myFavPosts = useSelector(state => state.post.favPosts);

    useEffect(() => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            router.push('/login');
        } else {
            dispatch(load_fav_posts(([result, message]) => {
                if (result) {
                    console.log("좋아하는 게시글 불러오기 성공")
                } else {
                    console.log("좋아하는 게시글 불러오기 오류" + message);
                }
            }));
        }
    }, []);

    const handleBackClick = () => {
        router.back();
    };

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline/>
            {/* 헤더 */}
            <Container maxWidth="md"  style={{ position:'fixed', zIndex:'4', padding:'14px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <Card style={{
                    top: '18px',
                    height: '120%',
                    zIndex: '4',
                    borderRadius: 0,
                    boxShadow: 'none',
                }}>
                    <Grid container style={{justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid sx={{width: '24px'}}>
                        </Grid>
                        <Grid>
                            <Typography sx={{fontSize: '18px', fontWeight: 700, color: '#3C3C3C'}}>좋아요 누른 게시글</Typography>
                        </Grid>
                        <Grid onClick={()=>handleBackClick()}>
                            <Image src={close} width={24} height={24} name='search' layout='fixed' />
                        </Grid>
                    </Grid>
                </Card>
            </Container>
            {/* API 수정 후 변경 예정 */}
            <Container sx={{ p: '53px 24px 0', height: 'max-content', alignItems: 'center', mt: '10px' }}>
                {myFavPosts && myFavPosts.map((post) => (
                    <CommunityItem key={post.article_id} {...post} />
                ))}
            </Container>
        </ThemeProvider>
    );
};

export default myFavPost;
