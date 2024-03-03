import { React, useState } from "react";
import {  TextField, Button, InputLabel, Typography, Box, Container, Grid, ThemeProvider, CssBaseline} from '@mui/material';
import theme from '../../../theme/theme'
import back from '../../../image/arrow_back_ios.png';
import Image from 'next/image';
import logo from '../../../image/email_enhang.png'


export default function SignUpEmailNotice(props) {
  const [remainHeight, setRemainHeight] = useState(window.innerHeight - 320 + "px")

  const handleBtnClick = () => {
    props.handleNextStep();
  }

  return (
    <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
          <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                          <Grid container>
                              <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                  {/* <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' /> */}
                                  <div style={{width: '11px', height: '18px'}}></div>
                              </Grid>
                              <Grid item style={{marginLeft:'35%'}}>
                                  <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}></Typography>
                              </Grid>
                          </Grid>
          </Container>
        <Box
              sx={{
              margin: `calc(${remainHeight} * 0.3) 24px`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              //justifyItems: 'center'
            }}
        >
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={121} height={91} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '29px', color: '#3C3C3C'}}>마지막 단계입니다!</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', mb: `calc(${remainHeight} * 0.2)`, lineHeight: '21px', color: '#777777'}}>
                스꾸친은 성균관대 학생만을 위한 서비스를 제공합니다.<br/>
                학교 이메일 인증을 진행해주세요
            </Typography>
        </div>
    </Box>
    {/* <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center', width: '100%'}}>
        <div style={{margin: '32px 24px 30px 24px'}}>
            <Typography style={{fontSize: '10px', color: '#3C3C3C', marginBottom: '10px'}}>개인 밥약 프로필은 [마이페이지]에서 변경 가능합니다.</Typography>
            <Button variant="contained" style={{width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#fff', 
              backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                학교 이메일 인증하기
            </Button>
        </div>
    </div> */}
    <div style={{width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#fff', paddingBottom: '30px'}}>
          <div style={{display: 'flex', flexDirection: 'column',  fontSize: '12px', fontWeight: '500', padding: '6px 0', color: '#505050', textAlign: 'center'}}>
          <Typography style={{fontSize: '12px', color: '#777777', marginBottom: '10px'}}>개인 밥약 프로필은 [마이페이지]에서 변경 가능합니다.</Typography>
            </div>
            <div style={{margin: '0 24px 12px'}}>
                        <Button onClick={handleBtnClick} variant="contained" style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            학교 이메일 인증하기
                        </Button>
            </div>
    </div>
    </ThemeProvider>
  )
}
