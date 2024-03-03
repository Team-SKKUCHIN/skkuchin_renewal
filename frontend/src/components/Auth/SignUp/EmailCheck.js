import { useState, useEffect } from "react";
import {  TextField, Button,  Typography,  Box, Link, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import theme from '../../../theme/theme';
import back from '../../../image/arrow_back_ios.png';
import logo from '../../../image/email_enhang.png'
import Image from 'next/image';
import { signup_email_check, signup_email_send } from '../../../actions/email/email';
import { Loading } from "../../Loading";
import Popup from '../../Custom/Popup';

const SignUpEmailCheck = (props) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 456 + "px");

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('error');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupDescription, setPopupDescription] = useState('');
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }
    
    const handleResend = () => {
        setLoading(true);

        dispatch(signup_email_send(props.data.username, props.data.email, true, ([result, message]) => {
          setLoading(false);

          if (result) {
            setPopupMessage("이메일을 재전송했습니다.");
          } else {
            if (typeof(message) == 'string') {
              setPopupMessage(message);
            }
          }
          setPopupOpen(true);
        }));
    }

    const handleSubmit= (e) => {
      e.preventDefault();

      dispatch(signup_email_check(props.data.username, ([result, message]) => {
        if (result) {
          props.handleNextStep();
        } else {
          setDialogMsg(message);
          setDialogOpen(true);
        }
      }));
    }

    const handlePopupClose = () => {
      setPopupOpen(false);
    }

    useEffect(() => {
      setRemainHeight(window.innerHeight - 558 + "px");
    })
      
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                                <div style={{width: '11px', height: '18px'}}></div>
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}></Typography>
                            </Grid>
                        </Grid>
        </Container>
      <Box
            sx={{
            margin: `calc(${remainHeight} * 0.45) 24px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            //justifyItems: 'center'
            }}
        >
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={121} height={85} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '20px', color: '#3C3C3C'}}>메일을 확인해주세요!</Typography>
            <Typography sx={{fontSize: '14px', lineHeight: '21px', color: '#777777'}}>
                성균관대학교 인증 메일이 발송되었습니다. <br/>
                발송된 메일을 통해 인증 후 아래 확인 버튼을 눌러주세요
            </Typography>
            
        </div>

        <div style={{marginTop: '65px'}}>
          <Typography sx={{fontSize: '10px', lineHeight: '16px', color: '#505050', textAlign: 'center'}}>
                          @g.skku.edu인 경우 [성균관대 홈페이지 로그인 {'>'} 우측 상단 Google 메일], 
          </Typography>
          <Typography sx={{fontSize: '10px', lineHeight: '16px', color: '#505050', textAlign: 'center', mb: '8px'}}>
          @skku.edu인 경우 [킹고M {'>'} 메뉴 {'>'} 킹고포털 {'>'} 메일]에서 확인 가능합니다
          </Typography>
          <Typography sx={{fontSize: '10px', lineHeight: '16px', color: '#BABABA', textAlign: 'center'}}>
          * 이메일 인증을 완료하지 않으면 서비스 이용에 어려움이 있을 수 있습니다. 
          </Typography>
          <Typography sx={{fontSize: '10px', lineHeight: '16px', color: '#BABABA', textAlign: 'center', mb: '10px'}}>
          이메일이 도착하지 않을 경우, 스팸메일함을 확인해주세요.
          </Typography>
        </div>
      </Box>

      <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
            <div style={{margin: '0 24px 30px 24px'}}>
            <Button variant="contained" onClick={handleResend} style={{width: '100%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none', marginBottom: '10px'}}>
                이메일 재전송
            </Button>
            <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                확인
            </Button>
            </div>
      </div>
        
        {loading && <Loading />}
        <Popup 
            open={popupOpen}
            handleClose={handlePopupClose}
            type={popupType}
            message={popupMessage}
            description={popupDescription}
          />
      </ThemeProvider>
    );
  };

  export default SignUpEmailCheck;