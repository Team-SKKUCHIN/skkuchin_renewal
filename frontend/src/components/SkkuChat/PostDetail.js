import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Grid, CssBaseline, ThemeProvider, Button, Divider, Box } from '@mui/material';
import theme from '../../theme/theme';
import Header from './Header';
import { useRouter } from 'next/router';
import { displayMBTI } from '../Matching/MBTIList';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { load_comment, clear_prev_comment } from '../../actions/comment/comment';
import { load_post, clear_prev_post } from '../../actions/post/post';
import { enroll_like, delete_like } from '../../actions/like/like';
import Comment from './Comment';
import { Loading } from '../Loading';

const articleTypeToTag = {
  "GIVE_RECOMMEND": "맛집 추천해요",
  "GET_RECOMMEND": "맛집 추천 받아요",
};

const PostDetail = ({ postId }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const post = useSelector(state => state.post.post);
    const comments = useSelector(state => state.comment.comment);

    useEffect(() => {
      dispatch(clear_prev_post());
      dispatch(clear_prev_comment());
      
      if(postId) {
        dispatch(load_post(postId, ([result, message]) => {
          if (result) {
            console.log("게시글 불러오기 성공")
          } else {
            console.log("게시글 불러오기 오류" + message);
          }
        }));

        dispatch(load_comment(postId, ([result, message]) => {
            if (result) {
                console.log("댓글 불러오기 성공");
                console.log(comments)
            } else {
                console.log("댓글 불러오기 오류" + message);
            }
        }));
      }
    }, []);

    const handleBackClick = () => {
      router.back();
    };

    const handleLikeBtn = (postId) => {
        console.log(postId);
        dispatch(enroll_like(postId, ([result, message]) => {
          if (result) {
            console.log("좋아요 성공")
          }
          else {
            console.log("좋아요 실패" + message);
          }
        }));
    };

    const handleDeleteBtn = (postId) => {
        console.log(postId);
        dispatch(delete_like(postId, ([result, message]) => {
          if (result) {
            console.log("좋아요 취소 성공")
          }
          else {
            console.log("좋아요 취소 실패" + message);
          }
        }));

    };

    if (post === null || comments === null) return <Loading />;

    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
            {post && <Header title="스꾸게시판" onBackClick={handleBackClick} post={post} setLoading={setLoading} /> }
          </Container>
          <Container sx={{ p: '0 24px', mt: '72.5px'}}>
            {
              /* 작성자 프로필 */
              post?.anonymous === true ?
                <Grid sx={{display: 'flex', alignItems: 'center', p: '10px 0'}}>
                  {post && displayMBTI("DEFAULT2", 60, 60)}
                  <Grid sx={{ml: '10px'}}>
                      <Typography sx={{fontSize: '14px', fontWeight: 800, color: '#3C3C3C'}}>익명</Typography>
                      <Typography sx={{fontSize: '12px', fontWeight: 700, color: '#BABABA'}}>{post?.display_time}</Typography>
                  </Grid>
                </Grid>
                :
                <Grid sx={{display: 'flex', alignItems: 'center', p: '10px 0'}}>
                  {post && displayMBTI(post.user_image, 60, 60)}
                  <Grid sx={{ml: '10px'}}>
                      <Typography sx={{fontSize: '14px', fontWeight: 800, color: '#3C3C3C'}}>{post?.nickname}</Typography>
                      <Typography sx={{fontSize: '12px', fontWeight: 700, color: '#BABABA'}}>{post?.display_time}</Typography>
                  </Grid>
                </Grid>
            }

            {/* 게시글 */}
            <Grid sx={{display: 'flex', flexDirection: 'column', p: '10px 0', overflowX: 'hidden'}}>
              <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{fontSize: '18px', fontWeight: 800, color: '#3C3C3C'}}>{post?.title}</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: 400, color: '#3C3C3C', mt: '17px'}}>{post?.content}</Typography>
              </Grid>
              
              <Typography sx={{fontSize: '12px', fontWeight: 900, color: '#BABABA', mt: '17px'}}>{'#' + articleTypeToTag[post?.article_type]}</Typography>

              <Grid sx={{display: 'flex', overflowX: 'scroll', p: '10px 0', mt: post?.images && post?.images.length !== 0  ? '10px' : 0, gap: '10px',
                scrollbarWidth: 'none',  // Firefox에
                'msOverflowStyle': 'none',  // IE, Edge에
                '&::-webkit-scrollbar': {
                  display: 'none',  // Chrome, Safari
              } }}>
                {post?.images && post?.images.length !== 0 && post?.images.map((image, index) => (
                  <Box key={index}>
                    <img src={image} width={150} height={150} style={{borderRadius: '10px', cursor: 'pointer', objectFit: 'cover'}}/>
                  </Box>
                ))}
              </Grid>

              <Grid sx={{display: 'flex', mt: '10px', justifyContent: 'space-between'}}>
                  <Grid item sx={{ display: 'flex', alignItems: 'center'}}>
                      { post?.user_liked === true ?
                        <FavoriteIcon sx={{width: '15px', color: '#FFCE00'}} />
                        :
                        <FavoriteBorderIcon sx={{width: '15px', color: '#FFCE00'}} />
                      }
                      <Typography sx={{fontSize: '12px', ml: '3px', color: '#FFCE00', fontWeight: 600}}>
                        {post?.article_like_count}
                      </Typography>

                      <ChatBubbleOutlineIcon sx={{width: '13px', color: '#72D270', ml: '7px'}} />
                      <Typography sx={{fontSize: '12px', ml: '3px', color: '#72D270', fontWeight: 600, ml: 0.5}}>
                        {post?.comment_count}
                      </Typography>
                  </Grid>
                <div>
                { post?.user_liked === true ?
                  <Button onClick={()=> handleDeleteBtn(post?.id)} startIcon={<FavoriteIcon sx={{ width: '15px', color: '#BABABA' }} />} sx={{backgroundColor: '#FBFBFB', p: '7px 11px', borderRadius: '10px', color: '#9E9E9E', fontWeight: 700, fontSize: '12px'}}>
                    좋아요 취소
                  </Button>                
                  :
                  <Button onClick={()=> handleLikeBtn(post?.id)} startIcon={<FavoriteBorderIcon sx={{ width: '15px' }} />} sx={{backgroundColor: '#FBFBFB', p: '7px 11px', borderRadius: '10px', color: '#9E9E9E', fontWeight: 700, fontSize: '12px'}}>
                    좋아요
                  </Button>
                }
                </div>
              </Grid>
            </Grid>
          </Container>
          
          <Divider orientation='horizontal' sx={{width: '100%', borderBottom: '10px solid #FBFBFB'}}/> 

          {/* 댓글 */}
          { comments && 
            <Container sx={{p: '0 0 58px', overflow: 'hidden', height: 'max-content'}}>
              <Grid sx={{display: 'flex', flexDirection: 'column', p: '0 0 10px', overflowX: 'hidden'}}>
                <Comment comments={comments} postId={post?.id}/>
              </Grid>
            </Container>
          }
        {loading && <Loading />}
      </ThemeProvider>
    );
};

export default PostDetail;
