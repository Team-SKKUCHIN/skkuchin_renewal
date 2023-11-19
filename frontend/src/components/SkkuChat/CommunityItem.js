import React, { useCallback, useState } from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import GoLogin from '../GoLogin';

const CommunityItem = ({ id, title, content, article_like_count, comment_count, display_time, images }) => {
    const router = useRouter();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(false);

    const handleClick = () => {
        if (isAuthenticated) {
            router.push(`/posts/${id}`); 
        } else {
            setIsLogin(true);
        }
    };   

    const sliceContent = useCallback((content) => {
        const length = 13;

        if (content.length > length) {
            content = content.substr(0, length - 2) + '...';
        }

        return content;
    }, [])
    
    return (
        <>
            {isLogin && <GoLogin open={isLogin} onClose={setIsLogin} /> }
            <Box
                onClick={handleClick}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%', p: '13px 0px', borderBottom: '1px solid #E2E2E2'}}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{fontSize: '14px', fontWeight: 800, color: '#3C3C3C'}}>{title}</Typography>
                    <Typography
                        sx={{
                            width: '100%',
                            p:' 8px 0px',
                            fontSize: '14px',
                            color: '#3C3C3C',
                        }}
                    >
                        {sliceContent(content)}
                    </Typography>
                    <Grid container sx={{ alignItems: 'center', p: 0, m: 0 }}>
                    <Grid item sx={{ display: 'flex', alignItems: 'center'}}>
                        <FavoriteBorderIcon sx={{width: '15px', color: '#FFCE00'}} />
                        <Typography sx={{fontSize: '12px', ml: '3px', color: '#FFCE00', fontWeight: 600}}>
                        {article_like_count}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', alignItems: 'center', ml: 1, mr: '7px' }}>
                        <ChatBubbleOutlineIcon sx={{width: '13px', color: '#72D270'}} />
                        <Typography sx={{fontSize: '12px', ml: '3px', color: '#72D270', fontWeight: 600, ml: 0.5}}>
                        {comment_count}
                        </Typography>
                    </Grid>
                    <Divider orientation='vertical' sx={{width: '2px', height: '10px'}}/>
                    <Grid item sx={{ml: '7px'}}>
                        <Typography sx={{color: '#BABABA', fontWeight: 700, fontSize: '12px'}}>
                        {display_time}
                        </Typography>
                    </Grid>
                    </Grid>
                </Box>
                {images?.length > 0 && (
                    <Box sx={{pl: '15px'}}>
                        <img src={images[0]} alt="" width={75} height={75} style={{borderRadius: '20px', objectFit: 'cover'}}/>
                    </Box>
                )}
            </Box>
        </>
  );
};

export default CommunityItem;
