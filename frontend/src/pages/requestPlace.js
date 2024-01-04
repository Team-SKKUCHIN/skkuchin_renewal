import { useState } from "react";
import { useDispatch } from 'react-redux';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { closeIcon } from '../image/recommend';
import { useRouter } from 'next/router';
import { enroll_request } from "../actions/request/request";
import { Loading } from '../components/Loading';

const requestPlace = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [campus, setCampus] = useState('명륜');
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');

    const handleClose = () => {
        router.push('/myPage');
    }
    const handleCampus = () => {
        if (campus === '명륜') {
            setCampus('율전');
        } else {
            setCampus('명륜');
        }
    }

    const handleInputChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        dispatch(enroll_request(campus, name, reason, ([result, message]) => {
            setLoading(false);
            if (result) {
                setDialogMsg('요청 글이 작성되었습니다.')
            } else {
                if (typeof(message) == 'string')
                    setDialogMsg(message);
            }
            setDialogOpen(true);
        }));
    }

    const handleDialogOpen = () => {
        if (dialogOpen) {
            setDialogOpen(false);
        } else {
            setDialogOpen(true);
        }
    }
    const handleDialogClick = () => {
        setDialogOpen(false);
        router.push('/myPage');
    }
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{ margin: "0 24px" }}>
                <div style={{ margin: "24px 0", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    {/* <Image
                        src={backArrow}
                        onClick={handleBack}
                        layout="fixed"
                        width={24}
                        height={24}
                        style={{ cursor: 'pointer' }}
                    /> */}
                    <div></div>
                    <Typography style={{ height: '24px', fontSize: '20px', fontWeight: '700', color: '#3C3C3C'}}>식당 추가 요청</Typography>
                    <Image
                        src={closeIcon}
                        name='back'
                        onClick={handleClose}
                        layout='fixed'
                        width={24}
                        height={24}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            <Box
            sx={{
            margin: '24px 24px 31px 24px',
            display: 'flex',
            flexDirection: 'column',
            //alignItems: 'center',
            }}
            >
                <Typography style={{margin: '24px 0', fontSize: '18px', fontWeight: '900', color: '#3C3C3C'}}>무슨 식당을 추가할까요?</Typography>
                <Grid container>
                    <Typography style={{height: '21px', padding: '5px 0', marginRight: '10px', fontWeight: '700', fontSize: '14px', color: '#777777'}}>캠퍼스 종류</Typography>
                    <Button 
                        style={{maxWidth: '33px', minWidth: '33px', fontWeight: '700', fontSize: '12px', marginRight: '10px', padding: '5px', borderRadius: '10px', backgroundColor: campus == '명륜' ? '#FFFCE4' : '#DCF8DB', color: campus == '명륜' ? '#FDB714' : '#58C85A'}}
                        onClick={handleCampus}>
                    {campus}
                    </Button>
                    <Typography style={{height: '21px', padding: '6px 0', fontSize: '12px', color: '#777777'}}>클릭하여 변경</Typography>
                </Grid>

                <Box sx={{margin: '24px 0', width: '100%'}}>
                    <Typography style={{height: '21px', padding: '5px 0', fontWeight: '700', fontSize: '14px', color: '#777777'}}>식당 이름</Typography>
                    <input 
                        value={name}
                        onChange={handleInputChange}
                        placeholder="식당 이름을 입력해주세요."
                        style={{width: '100%', height: '42px', padding: '2px 12px', backgroundColor: '#F2F2F2', borderRadius: '8px', border: 'none', outline: 'none', marginTop: '20px'}} />
                </Box>

                <Box style={{width: '100%'}}>
                <Typography style={{height: '21px', padding: '5px 0', fontWeight: '700', fontSize: '14px', color: '#777777', marginBottom: '10px'}}>요청 이유 <span style={{color: '#BABABA'}}>(선택)</span></Typography>
                <textarea 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="내용을 입력해주세요."
                    style={{width: '100%', height: '230px', padding: '16px', border: '1px solid #E2E2E2', borderRadius: '12px', outline: 'none'}}
                />
                </Box>
            </Box>
            <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff'}}>
            {name !== '' ?
                        <Button variant="contained" onClick={handleSubmit} style={{margin: '24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            요청하기
                        </Button>
                    :
                        <Button variant="contained" disabled style={{margin: '24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            요청하기
                        </Button>
                }
            </div>

            <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px', width: '327px' } }}>
                <DialogContent style={{padding:'66px 16px 34px 16px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'16px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight='bold'>
                      {dialogMsg}
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center', padding: '16px'}}>
                    
                        <Button onClick={handleDialogClick} style={{fontSize:"16px", fontWeight: '700', color:'#fff', backgroundColor: '#FFCE00', width: '100%', height: '50px', padding: '16px'}}>
                            {/* <Typography style={{fontSize:"16px", fontWeight: '700', color:'#fff', marginBottom:'10px'}}> */}
                                확인
                            {/* </Typography> */}
                        </Button>

                </DialogActions>
            </Dialog>
            {loading && <Loading />}
        </ThemeProvider>
    )
}

export default requestPlace;
