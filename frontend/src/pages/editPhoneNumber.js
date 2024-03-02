import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText, Button, TextField, Typography, Link, FormControl, InputLabel, Select, Container, Grid, Autocomplete } from '@mui/material';
import theme from '../theme/theme';
import back from '../image/close.png';
import { enroll_phone } from '../actions/pushToken/pushToken';
import VerificationPhone from '../components/Auth/Verification/Phone'

const editPhoneNumber = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const pushToken = useSelector(state => state.pushToken.pushToken);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [data, setData] = useState({
        username: "",
        phone: ""
    })

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleArrowClick = () => {
        console.log("cclick")
        router.push('/editNickname');
    }

    useEffect(() => {
        if (user)
            setData({...data, username: user.username})
    }, [user])

    // const handleDelete = () => {
    //     dispatch(enroll_phone(null, ([result, message]) => {
    //         if (result) {
    //             localStorage.removeItem("sms");
    //             setDialogOpen(false);
    //             setSmallDialogOpen2(true);
    //             setTimeout(() => {
    //                 router.push('/myPage');
    //               }, 1000); 
    //         }
    //     }));
    // };

    // const handleSubmit = () => {
    //     const phone = phone1+phone2+phone3
    //     dispatch(enroll_phone(phone, ([result, message]) => {
    //         if (result) {
    //             localStorage.setItem("sms", "true");
    //             setSmallDialogOpen(true);
    //             setTimeout(() => {
    //                 router.push('/myPage');
    //               }, 1000); 
    //         }
    //     }));
    // }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />

        <VerificationPhone handleNextStep={handleArrowClick} handlePrevStep={handleArrowClick} data={data} setData={setData} enroll={false} />
        {/* <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
            <Grid container>
                <Grid item style={{margin:'0px 0px 0px 25px', visibility:'none'}}>
                    <Image src={back} width={25} height={25} name='back' onClick={handleArrowClick} layout='fixed'/>
                </Grid>
                <Grid item style={{marginLeft:'25%'}}>
                    <Typography style={{margin:'0px 0px 0px 5px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>전화번호 변경</Typography>
                </Grid>
                <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'20px'}}>
                { validPhone2 !== null && validPhone2 != false &&  validPhone3 !== null && validPhone3 != false ?
                    <Button onClick={handleSubmit} style={{padding:'0', right:'0'}}>
                        <Typography style={{margin:'0px 0px 0px 10px',color:'#FFCE00', textAlign:'center',fontSize:'18px', fontWeight: '500'}}>저장</Typography>
                    </Button>
                    :
                    <Button style={{padding:'0', right:'0'}}>
                        <Typography style={{margin:'0px 0px 0px 10px',color:'#BABABA', textAlign:'center',fontSize:'18px', fontWeight: '500'}}>저장</Typography>
                    </Button>
                }
                </Grid>
            </Grid>
        </Container>
        {user && 
        <Box
            sx={{
            margin: '45px 10px 16px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <form style={{ width: '100%', padding:'0 20px'}}>
        <Typography style={{paddingBottom: '4px', fontSize: '12px', fontWeight: '900', color: '#3C3C3C', marginLeft: '4px', marginTop: '16px'}}>전화번호 <span style={{color: '#3C3C3C'}}>(선택)</span></Typography>
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
                    onChange={handlePhone2Change}
                    style={{
                        fontSize: '18px',
                        color: '#3C3C3C',
                        padding: '16px 0px 16px 12px',
                        height: '56px',
                        border: validPhone2 == false ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
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
                        border: validPhone3 == false ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
                        borderRadius: '8px',
                        width: '31%',
                        outline: 'none'
                    }}
                />
        </Grid>
        <div style={{display: 'flex', justifyContent: 'center', marginTop:'15px'}} onClick={handleDialogOpen}>
            <Button style={{color:'#3C3C3C', fontSize:'12px', textDecoration: 'underline'}}>전화번호 삭제하기</Button>
        </div>
        
        </form>
        </Box>}

        

        <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            PaperProps={{ style: { borderRadius: '10px' } }}
        >
            <DialogContent sx={{p: '20px 24px 13px'}}>
                <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                    <DialogTitle sx={{color: '#000', fontSize: '15px', p: '25px 35px 25px', m: '0', fontWeight: '700'}}>전화번호를 삭제하시겠습니까?</DialogTitle>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{p:'0'}}>
                <div style={{width: '100%', paddingBottom: '20px',  display: 'flex',justifyContent: 'space-between' }}>
                    <Button sx={{width: '43%', hegiht:'100px', p: '5', marginLeft:'15px', color: '#BABABA', borderRadius: '10px', border:'1px solid #F2F2F2', background:'#F2F2F2', fontWeight: '500'}} onClick={handleDialogClose}>아니요</Button>
                    <Button sx={{width: '43%', hegiht:'100px', p: '5', marginRight:'15px',color: 'white', borderRadius: '10px', border:'1px solid #FFCE00', background:'#FFCE00', fontWeight: '500'}} onClick={handleDelete}>확인</Button>
                </div>
            </DialogActions>
        </Dialog>
        <Dialog open={smallDialogOpen}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>저장이 완료되었습니다.</Typography></DialogContent></Dialog>
        <Dialog open={smallDialogOpen2}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>전화번호가 삭제되었습니다.</Typography></DialogContent></Dialog> */}

        </ThemeProvider>
    )
}

export default editPhoneNumber;
