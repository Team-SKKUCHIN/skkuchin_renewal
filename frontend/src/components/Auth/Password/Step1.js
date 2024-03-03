import { useState } from "react";
import {  TextField, Button, Typography, Box, Select, MenuItem, Link, Container, Grid, Dialog, DialogContent, DialogActions} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { password_email_send } from '../../../actions/email/email';
import { Loading } from "../../Loading";

const Step1 = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [emailId, setEmailId] = useState('');
    const [domain, setDomain] = useState('@g.skku.edu');

    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');

    const handleLinkClick = () => {
        router.push('/findUsername');
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setLoading(true);

        dispatch(password_email_send(emailId+domain, ([result, message]) => {
            setLoading(false);

            if (result) {
                props.setEmail(emailId+domain);
                props.handleNextStep();
            } else {
                setDialogMsg(message);
                setDialogOpen(true);
            }
        }));
    }

    const backClick = () => {
        router.push('/myPage');
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
                                <Image src={back} width={11} height={18} name='back' onClick={backClick} layout='fixed' />
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
        alignItems: 'center',
        }}
    >
    {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '55px'}}>
            <Image width={12.02} height={21.55} src={back} />
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
    </header> */}
    <form onSubmit={handleSubmit} style={{ width: '100%'}}>
    <div style={{margin: '0 24px'}}>
        <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>비밀번호 재설정</Typography>
        <Typography style={{fontSize: '12px', fontWeight: '400', marginBottom: '13px', color: '#777777'}}>회원가입시 입력하신 이메일을 입력해주세요.</Typography>
        <Typography style={{fontSize: '14px', marginTop: '45px', color: '#3C3C3C'}}>이메일</Typography>

        <div style={{textAlign: 'center', display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '8px'}}>
        <input
            variant="standard"
            value={emailId}
            onClick={e => setDialogOpen(false)}
            onChange={(e) => setEmailId(e.target.value)}
            style={{
                fontSize: '16px',
                padding: '20px 15px 21px 12px',
                height: '56px',
                border: '1px solid #E2E2E2',
                borderRadius: '8px 0 0 8px',
                width: '100%',
                outline: 'none'
            }}
        />
        <Select
            //xs={2}
            sx={{ 
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
            }, 
            color: '#3C3C3C',
            fontSize: '16px',
            //padding: '0px 0px 1px 12px',
            textAlign: 'left',
            height: '56px',
            border: '1px solid #E2E2E2',
            borderLeft: '1px solid white',
            borderRadius: '0 8px 8px 0',
            outline: 'none',
            appearance: 'none',}}
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
        >
            <MenuItem value='@g.skku.edu'>@g.skku.edu</MenuItem>
            <MenuItem value='@skku.edu'>@skku.edu</MenuItem>
        </Select>   
        </div>
        <div>{dialogOpen ? <Typography sx={{fontSize: '12px', fontWeight: 'bold', color: '#F47806', mt: '4px'}}>가입되어 있지 않은 이메일입니다.</Typography> : <div style={{height: '20px'}}></div>}</div>
        </div>
        <div style={{margin: '19px 24px 12px'}}>
        {emailId != '' && !dialogOpen?
            <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                비밀번호 재설정하기
            </Button>
            :
            <Button variant="contained"  disabled style={{width: '100%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                비밀번호 재설정하기
            </Button>
        }
        </div>

        </form>
      </Box>
        {loading && <Loading />}
      </>
    );
  };

  export default Step1;