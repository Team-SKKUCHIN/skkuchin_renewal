import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { reset_password } from '../../../actions/auth/auth';
import {  TextField, Button, Typography, Box, Grid, Container, Dialog, DialogContent, DialogActions, OutlinedInput, InputAdornment, IconButton, Item } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import back from '../../../image/arrow_back_ios.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import check from '../../../image/check.png';
import check2 from '../../../image/checkYellow.png';
import { Loading } from '../../Loading';

const Step3 = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const email = router.query.email;
    const authNum = router.query.authNum;

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [validPW, setValidPW] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [containEng, setContainEng] = useState(false);
    const [containNum, setContainNum] = useState(false);
    const [containSpe, setContainSpe] = useState(false);
    const [validLen, setValidLen] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleNextStep = () => {
        setLoading(true);

        reset_password(props.email, password, rePassword, ([result, message]) => {
            setLoading(false);

            if (result) {
                props.handleNextStep();
            } else {
                console.log(message);
            }
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClickShowRePassword = () => setShowRePassword((show) => !show);

    const handleMouseDownRePassword = (event) => {
      event.preventDefault();
    };

    const checkPassword = (password) => {
        setContainEng(/[a-zA-Z]/.test(password));
        setContainNum(/\d/.test(password));
        //setContainSpe(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password));
        setValidLen(password.length >= 8 && password.length <= 16);
      }
    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        checkPassword(password);

        let num = password.search(/[0-9]/g)
        let eng = password.search(/[a-z]/ig)
        //let spe = password.search(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g)

        if (password.length < 8 || password.length > 16) {
            setValidPW(false);
        } else if (num < 0 || eng < 0) {
            setValidPW(false);
        } else {
            setValidPW(true);
        }
        
    }

    const handleDialogOpen = (e) => {
        if(dialogOpen){
            setDialogOpen(false);
        } else{
            setDialogOpen(true);
        }
    }

    return (
        <>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'28%'}}>
                                {/* <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>비밀번호 초기화</Typography> */}
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '55px 0 15px 0',
            display: 'flex',
            flexDirection: 'column',
            //alignItems: 'center',
            }}
        >
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
        </header> */}
       
        <form style={{ width: '100%'}}>
            <div style={{margin: '0 24px'}}>
            <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>비밀번호 재설정</Typography>
        <Typography style={{fontSize: '12px', fontWeight: '400', marginBottom: '13px', color: '#777777'}}>새로운 비밀번호를 입력해주세요.</Typography>
            <Typography style={{fontSize: '14px', marginTop: '45px', color: '#3C3C3C'}}>새로운 비밀번호</Typography>
            <OutlinedInput
                color='none'
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="새로운 비밀번호 입력"
                onChange={handlePasswordChange}
                style={{width:'100%', outline: 'none', marginTop: '8px'}}
                required
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& input': {
                      fontSize: '16px',
                    },
                    height: '56px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '8px',
                    outline: 'none',
                    appearance: 'none',
                    fontSize: '16px',
                  }}
                />
                {(password != '') ? 
                    validPW ? 
                    <div style={{height: '21px', marginBottom: '20px', marginTop:'5px', display:'flex', fontSize:'12px', color:'#FDB714'}}>
                        <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>영문</span>
                        </div>
                        <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>숫자 </span>
                        </div>
                        {/* <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>특수문자 </span>
                        </div> */}
                        <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>8~16자 이내</span>
                        </div>
                    </div>
                    : <div style={{height: '21px', marginBottom: '20px', marginTop:'5px', display:'flex', fontSize:'12px'}}>
                        <div style={{display:'flex', color: containEng ? '#FDB714' : '#777777'}}>
                            <Image src={containEng ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>영문</span>
                        </div>
                        <div style={{display:'flex',color: containNum ? '#FDB714' : '#777777'}}>
                            <Image src={containNum ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>숫자 </span>
                        </div>
                        {/* <div style={{display:'flex',color: containSpe ? '#12A054' : '#777777'}}>
                            <Image src={containSpe ? check2 :check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>특수문자 </span>
                        </div> */}
                        <div style={{display:'flex',color: validLen ? '#FDB714' : '#777777'}}>
                            <Image src={validLen ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>8~16자 이내</span>
                        </div>
                    </div> 
                :<div style={{height: '21px', marginBottom: '20px', marginTop:'5px', display:'flex', fontSize:'12px', color:'#777777'}}>
                    <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>영문</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>숫자 </span>
                    </div>
                    {/* <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>특수문자 </span>
                    </div> */}
                    <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>8~16자 이내</span>
                    </div>
                </div> 
                }

        <Typography style={{fontSize: '14px', marginTop: '20px', color: '#3C3C3C'}}>비밀번호 확인</Typography>
        <OutlinedInput
                color={(rePassword != '') && password !== rePassword ? 'wrong' : 'none'}
                type={showRePassword ? 'text' : 'password'}
                value={rePassword}
                placeholder="비밀번호 재입력"
                onChange={(e) => setRePassword(e.target.value)}
                style={{width:'100%', marginTop: '8px'}}
                required
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownRePassword}
                        edge="end"
                      >
                        {showRePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& input': {
                      fontSize: '16px',
                    },
                    height: '56px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '8px',
                    outline: 'none',
                    appearance: 'none',
                    fontSize: '16px',
                  }}
                />
        {(rePassword != '') && password !== rePassword ? <Typography sx={{fontSize: '12px', fontWeight: 'bold', color: '#F47806', marginTop: '6px'}}>일치하지 않는 비밀번호입니다.</Typography>
            : <div style={{height: '18px'}}></div>}
        </div>
            
            <div style={{margin: '32px 24px'}}>
            {validPW && (password == rePassword) ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        비밀번호 재설정하기
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        비밀번호 재설정하기
                    </Button>
            }
            </div>
        </form>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px', fontWeight: '700'}}>
                      {dialogMsg}
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center'}}>
                    
                        <Button onClick={e => setDialogOpen(false)} variant="text" style={{fontSize:"14px", fontWeight: '700', color:'#505050'}}>
                            <Typography style={{fontSize:"14px", fontWeight: '700', color:'#505050', marginBottom:'10px'}}>
                                확인
                            </Typography>
                        </Button>

                </DialogActions>
          </Dialog>
          {loading && <Loading />}
    </>
    )
}
export default Step3;