import { useState, useEffect } from "react";
import {  TextField, Button, InputLabel, Typography, Box, FormControl, Select, MenuItem, Container, Grid, Autocomplete, OutlinedInput} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import Image from 'next/image';
import { useRouter } from "next/router";
import { Loading } from '../../Loading';
import { enroll_phone, verify_phone } from '../../../actions/sms/sms';
import Popup from '../../Custom/Popup';

const SignUpPhone = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [phone1, setPhone1] = useState("010");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [validPhone2, setValidPhone2] = useState(null);
    const [validPhone3, setValidPhone3] = useState(null);
    const [showBelow, setShowBelow] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isValid, setIsValid] = useState(null);
    const phoneNumList = ['010']

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('question');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupDescription, setPopupDescription] = useState('');

    const handlePrevStep = () => {
      props.handlePrevStep();
    }

    const handleSendBtn = () => {
      setLoading(true);
      let data = {
        username: props.data.username,
        phoneNumber: phone1+phone2+phone3 
      }
      enroll_phone(data, ([result, message]) => {
        setLoading(false);
        if (result) {
          setShowBelow(true);
        } else {
          console.log(message);
          setPopupMessage(message);
          setPopupType('error');
          setPopupOpen(true);
        }
      })
    }

    const handleVerifyBtn = () => {
      let data = {
        phoneNumber: phone1+phone2+phone3,
        verificationCode: verificationCode
      }
      verify_phone(data, ([result, message]) => {
        setIsValid(result);
      })
    }

    const handleNextStep = () => {
      if (phone1 && validPhone2 && validPhone3) {
        props.setData({...props.data, phone: phone1+phone2+phone3})
      }
      props.handleNextStep();
    }

    const validatePhone2 = (p2) => {
      let isNum = /^\d+$/.test(p2)
      setPhone2(p2)
      if (p2 == "") {
        setValidPhone2(null)
      }
      else if (!isNum || p2.length !== 4) {
        setValidPhone2(false)
      } else {
        setValidPhone2(true)
      }
    }
    const validatePhone3 = (p3) => {
      let isNum = /^\d+$/.test(p3)
      setPhone3(p3)
      if (p3 == "") {
        setValidPhone3(null)
      }
      else if (!isNum || p3.length !== 4) {
        setValidPhone3(false)
      } else {
        setValidPhone3(true)
      }
    }

    // 숫자 네 자리 넘는지, 문자 포함되어 있는지 검사
    const handlePhone2Change = (e) => {
      let p2 = e.target.value
      validatePhone2(p2);
    }
    const handlePhone3Change = (e) => {
      let p3 = e.target.value
      validatePhone3(p3);
    }

    const handlePopupClose = () => {
      setPopupOpen(false);
    }

    useEffect(() => {
      if (props.data.phone.length === 11) {
        validatePhone2(props.data.phone.slice(3, 7));
        validatePhone3(props.data.phone.slice(7, 11));
      } 
    }, [])


    return (
      <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                {/* <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>회원가입</Typography> */}
                            </Grid>
                        </Grid>
        </Container>
      <Box
        sx={{
        margin: '35px 0px 55px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
      <form style={{ width: '100%'}}>
        <div style={{margin: '0 24px 29px'}}>
        <Grid container>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#FFCE00', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                </Grid>
                <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>휴대폰 본인인증</Typography>
                <Typography style={{marginBottom: '30px', fontWeight: 'bold', fontSize: '12px', color: '#777777'}}>등록하신 전화번호로 밥약 확정 알림이 발송될 예정이에요.</Typography>

          {/* 전화번호 */}
          <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#3C3C3C', marginTop: '10px'}}>전화번호</Typography>
          <Grid>
          <FormControl variant="standard" style={{width: '31%'}}>
          <Autocomplete
              //disablePortal
              value={phone1}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& input': {
                  fontSize: '16px',
                  padding: '0'
                },
                height: '56px',
                border: '1px solid #E2E2E2',
                borderRadius: '8px',
                outline: 'none',
                appearance: 'none',
                fontSize: '16px',
                padding: '0',
              }}
              onChange={(e, value) => setPhone1(value)}
              options={phoneNumList}
              renderInput={(params) => <TextField {...params} style={{fontSize: '12px'}} />} 
            />
            </FormControl>
            <input
                  variant="standard"
                  placeholder=""
                  value={phone2}
                  //onClick={e => setDialogOpen(false)}
                  onChange={handlePhone2Change}
                  style={{
                      fontSize: '18px',
                      color: '#3C3C3C',
                      padding: '16px 0px 16px 12px',
                      height: '56px',
                      border: '1px solid #E2E2E2',
                      borderRadius: '8px',
                      width: '33%',
                      outline: 'none',
                      margin: '0 8px'
                  }}
              />
              <input
                  variant="standard"
                  placeholder=""
                  value={phone3}
                  //onClick={e => setDialogOpen(false)}
                  onChange={handlePhone3Change}
                  style={{
                      fontSize: '18px',
                      color: '#3C3C3C',
                      padding: '16px 0px 16px 12px',
                      height: '56px',
                      border: '1px solid #E2E2E2',
                      borderRadius: '8px',
                      width: '31%',
                      outline: 'none'
                  }}
              />
          </Grid>
        </div>

        {!showBelow ? 
          (validPhone2 && validPhone3 ?
                    <Button variant="contained" onClick={handleSendBtn} style={{margin: '0 24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        인증문자 받기
                    </Button>
                :
                    <Button variant="contained" disabled style={{margin: '0 24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        인증문자 받기
                    </Button>)
          : <Button variant="contained" onClick={handleSendBtn} style={{margin: '0 24px', width: '88%', backgroundColor: "#BABABA", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
            인증문자 다시 받기
          </Button>
            }

            {showBelow && 
            <div style={{margin: '30px 24px'}}>
            <div style={{display: 'flex', }}>
            <input 
                variant="standard"
                placeholder=""
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={{
                    height: '57px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '18px',
                    color: '#3C3C3C',
                    padding: '16px 12px',
                    textAlign: 'center',
                    width: '72%'
                }}
            />
            <Button 
                onClick={handleVerifyBtn}
                style={{
                    height: '56px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '8px',
                    fontSize: '16px',
                    marginLeft: '4px',
                    color: '#BABABA',
                    backgroundColor: '#F2F2F2',
                    width: '28%',
                    marginLeft: '8px'
                }}>
                인증하기
            </Button>
            </div>
            {
              isValid == null ? <div></div>
             : <Typography style={{color: isValid ? '#FDB714' : '#F47806', fontSize: '12px', fontWeight: 'bold', marginTop: '6px'}}>
                {isValid ? '인증이 완료되었습니다' : '인증 번호를 다시 확인해주세요'}
              </Typography>
            }
            </div>
            }
        </form>
        
        <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff'}}>
        {isValid ?
                    <Button variant="contained" onClick={handleNextStep} style={{margin: '0 24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        다음
                    </Button>
                :
                    <Button variant="contained" disabled style={{margin: '0 24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        다음
                    </Button>
            }
        <div style={{display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '500', padding: '31px 0', color: '#505050'}}>
                <span style={{alignSelf: 'center'}}>이미 회원이신가요?</span><Button onClick={() => router.push('/login')} variant="text" style={{alignSelf: 'start', justifySelf: 'start', fontSize: '12px', color: '#FFCE00', padding: 0, fontWeight: '700'}}>로그인</Button>
        </div>
        </div>
      </Box>
      {loading && <Loading />}
      <Popup 
            open={popupOpen}
            handleClose={handlePopupClose}
            type={popupType}
            message={popupMessage}
            description={popupDescription}
        />
      </div>
    );
  };

  export default SignUpPhone;