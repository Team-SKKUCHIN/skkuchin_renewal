import { useState, useEffect } from "react";
import {  TextField, Button,  Typography,  Box, Link, Container, Grid} from '@mui/material';
import logo from '../../../image/login_enheng.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { load_user } from '../../../actions/auth/auth';
import { Loading } from '../../Loading';

const VerificationDone = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 456 + "px");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRemainHeight(window.innerHeight - 327 + "px")
    }, [window.innerHeight])

    const handleButtonClick = () => {
        setLoading(true);
        dispatch(load_user(([result, message]) => {
            setLoading(false);
            if (result) {
                router.push({
                    pathname: '/',
                });
            } else {
                console.log(message);
            }
        }))
        
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
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '20px', color: '#3C3C3C'}}>본인 인증을 완료했어요</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', height: '37px', color: '#777777'}}>이제 스꾸친에서 마음껏 밥약해보세요!</Typography>
        </div>
      </Box>
      <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff', paddingTop: '30px', paddingBottom: '32px'}}>
        <Button variant="contained" onClick={handleButtonClick} style={{margin: '0 24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
            스꾸친 이용하기
        </Button> 
      </div>
      </div>
    );
  };

  export default VerificationDone;