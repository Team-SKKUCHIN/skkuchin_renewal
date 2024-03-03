import {useState} from 'react'
import {  Button, Typography, Box } from '@mui/material';
import logo from '../../../image/email_enhang.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/auth/auth';

const Step4 = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [remainHeight, setRemainHeight] = useState(window.innerHeight - 290 + "px");

  const handleSubmit = () => {
    dispatch(logout());
  }
  if (typeof window !== 'undefined' && !isAuthenticated) {
    router.push('/login');
  }
  
  return (
    <Box
      sx={{
      //marginTop: '245px',
      margin: `calc(${remainHeight} * 0.45) 24px`,
      innerHeight: window.innerHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      }}
    >
      <Image width={121} height={101} src={logo} placeholder="blur" layout='fixed' />
      <Typography align='center' style={{fontSize: '24px', color: '#3C3C3C', fontWeight: '700', margin: '32px 0 12px 0'}}>비밀번호 재설정 완료!</Typography>
      <Typography align='center' style={{fontSize: '14px', color: '#777777'}}>이제 새로운 비밀번호로 로그인할 수 있어요</Typography>
      {/* <div style={{margin: '24px'}}>
      <Button variant="contained" onClick={handleSubmit} style={{position: 'fixed', bottom: '0', width: '100%', maxWidth: '420px', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
        로그인 하러가기
      </Button>
      </div> */}
      <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff'}}>
                    <Button variant="contained" onClick={handleSubmit} style={{margin: '24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        로그인 하러가기
                    </Button> 
        </div>
    </Box>
  )
}
export default Step4;