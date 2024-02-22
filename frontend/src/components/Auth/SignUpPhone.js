import { useState, useEffect } from "react";
import {  TextField, Button, InputLabel, Typography, Box, FormControl, Select, MenuItem, Container, Grid, Autocomplete, OutlinedInput} from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import Image from 'next/image';
import { useRouter } from "next/router";
import { check_nickname } from "../../actions/auth/auth";
import { useDispatch } from 'react-redux';
import { Loading } from '../Loading';

const SignUpPhone = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [validNickname, setValidNickname] = useState(null);
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [validSId, setValidSId] = useState(null);
    const [phone1, setPhone1] = useState("010");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [validPhone2, setValidPhone2] = useState(null);
    const [validPhone3, setValidPhone3] = useState(null);

    const majorList = [
      '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과','국제통상학전공', '소비자학과',
      '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
      '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
      '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
      '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
      '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
      '사회복지학과', '사회학과', '심리학과',
      '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
      '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
      '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
      '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과', '컴퓨터공학과',
      '인문과학계열', '사회과학계열', '자연과학계열', '공학계열'
    ];
    const phoneNumList = ['010']

    const handlePrevStep = () => {
      props.handlePrevStep();
    }

    const checkNickname = (next) => {
      if (props.data.nickname.length > 10) {
        setLoading(false);
        setValidNickname(false);
        setNicknameMsg("닉네임은 최대 10자까지 가능합니다.")
        return;
      }
      check_nickname(props.data.nickname, ([result, message]) => {
        setLoading(false);
        setValidNickname(result);
        if (result) {
          if (next) {
            props.handleNextStep();
          }
        } else {
          if (typeof(message) == 'string') {
            setNicknameMsg(message);
          }
        }
      })
    }

    const handleNextStep = () => {
      setLoading(true);

      if (phone1 && validPhone2 && validPhone3) {
        props.setData({...props.data, phone: phone1+phone2+phone3})
      }
      checkNickname(true);
    }

    const handleNicknameChange = (e) => {
      if (validNickname != null) {
        setValidNickname(null);
      }
      props.setData({...props.data, nickname: e.target.value})
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

    useEffect(() => {
      if (props.data.nickname !== '') {
        checkNickname(false);
        validateSId(props.data.student_id);
        if (props.data.phone.length === 11) {
          validatePhone2(props.data.phone.slice(3, 7));
          validatePhone3(props.data.phone.slice(7, 11));
        } 
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

        {validPhone2 && validPhone3 ?
                    <Button variant="contained" onClick={handleNextStep} style={{margin: '0 24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        인증문자 받기
                    </Button>
                :
                    <Button variant="contained" disabled style={{margin: '0 24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        인증문자 받기
                    </Button>
            }

            <div style={{display: 'flex', margin: '30px 24px'}}>
            <input 
                variant="standard"
                placeholder=""
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
        </form>
        
        <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff'}}>
        {validPhone2 != false && validPhone3 != false ?
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
      </div>
    );
  };

  export default SignUpPhone;