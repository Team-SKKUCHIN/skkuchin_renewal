import { useState, useEffect } from "react";
import {  TextField, Button,  Typography,  Box, Link, Container, Grid} from '@mui/material';
import logo from '../../../image/login_enheng.png'
import Image from 'next/image';
import { useRouter } from 'next/router';

const SignUpWelcome = () => {
    const router = useRouter();
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 456 + "px");

    useEffect(() => {
        setRemainHeight(window.innerHeight - 327 + "px")
    }, [window.innerHeight])

    const handleButtonClick = () => {
        router.push({
          pathname: '/login',
          //query: { src : '회원가입', username: props.username }
        });
    }
      
    return (
      <div>
      <Box
            sx={{
            margin: `calc(${remainHeight} * 0.45) 24px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <div style={{ width: '100%', textAlign: 'center'}}>
            <Image width={121} height={95} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '20px', color: '#3C3C3C'}}>환영합니다</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', height: '37px', color: '#777777'}}>이제 스꾸친에서 다양한 친구를 만나보세요!</Typography>
        </div>
      </Box>
      <div style={{width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#fff'}}>
            <div style={{margin: '30px 24px'}}>
                        <Button variant="contained" onClick={handleButtonClick} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            로그인하러 가기
                        </Button>
            </div>
      </div>
      </div>
    );
  };

  export default SignUpWelcome;