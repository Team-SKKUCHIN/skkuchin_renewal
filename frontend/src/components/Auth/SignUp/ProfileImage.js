import { useState, useEffect } from "react";
import {  Container, Typography, Box, Grid, Button } from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import close from '../../../image/close.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

import profile1 from '../../../image/mbti/profile/mbti_non_select/mainCharacter.png';
import profile2 from '../../../image/mbti/profile/mbti_non_select/mealCharacter.png';
import profile3 from '../../../image/mbti/profile/mbti_non_select/ENFJ.png';
import profile4 from '../../../image/mbti/profile/mbti_non_select/ENTP.png';
import profile5 from '../../../image/mbti/profile/mbti_non_select/INFP.png';
import profile6 from '../../../image/mbti/profile/mbti_non_select/ENFP.png';
import profile7 from '../../../image/mbti/profile/mbti_non_select/ISTJ.png';
import profile8 from '../../../image/mbti/profile/mbti_non_select/ISTP.png';
import profile9 from '../../../image/mbti/profile/mbti_non_select/ISFP.png';
import profile10 from '../../../image/mbti/profile/mbti_non_select/INTP.png';
import profile11 from '../../../image/mbti/profile/mbti_non_select/ESTJ.png';
import profile12 from '../../../image/mbti/profile/mbti_non_select/INFJ.png';
import profile13 from '../../../image/mbti/profile/mbti_non_select/ENTJ.png';
import profile14 from '../../../image/mbti/profile/mbti_non_select/ESTP.png';
import profile15 from '../../../image/mbti/profile/mbti_non_select/ESFJ.png';
import profile16 from '../../../image/mbti/profile/mbti_non_select/INTJ.png';
import profile17 from '../../../image/mbti/profile/mbti_non_select/ISFJ.png';
import profile18 from '../../../image/mbti/profile/mbti_non_select/ESFP.png';

import profile1On from '../../../image/mbti/profile/mbti_select/MainCharacter.png';
import profile2On from '../../../image/mbti/profile/mbti_select/MealCharacter.png';
import profile3On from '../../../image/mbti/profile/mbti_select/ENFJ.png';
import profile4On from '../../../image/mbti/profile/mbti_select/ENTP.png';
import profile5On from '../../../image/mbti/profile/mbti_select/INFP.png';
import profile6On from '../../../image/mbti/profile/mbti_select/ENFP.png';
import profile7On from '../../../image/mbti/profile/mbti_select/ISTJ.png';
import profile8On from '../../../image/mbti/profile/mbti_select/ISTP.png';
import profile9On from '../../../image/mbti/profile/mbti_select/ISFP.png';
import profile10On from '../../../image/mbti/profile/mbti_select/INTP.png';
import profile11On from '../../../image/mbti/profile/mbti_select/ESTJ.png';
import profile12On from '../../../image/mbti/profile/mbti_select/INFJ.png';
import profile13On from '../../../image/mbti/profile/mbti_select/ENTJ.png';
import profile14On from '../../../image/mbti/profile/mbti_select/ESTP.png';
import profile15On from '../../../image/mbti/profile/mbti_select/ESFJ.png';
import profile16On from '../../../image/mbti/profile/mbti_select/INTJ.png';
import profile17On from '../../../image/mbti/profile/mbti_select/ISFJ.png';
import profile18On from '../../../image/mbti/profile/mbti_select/ESFP.png';
import { register } from '../../../actions/auth/auth';
import { useDispatch } from 'react-redux';

export default function SignUpProfileImage(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [profile, setProfile] = useState({
        'DEFAULT1': false,
        'DEFAULT2': false,
        'ENFJ': false,
        'ENTP': false,
        'INFP': false,
        'ENFP': false,
        'ISTJ': false,
        'ISTP': false,
        'ISFP': false,
        'INTP': false,
        'ESTJ': false,
        'INFJ': false,
        'ENTJ': false,
        'ESTP': false,
        'ESFJ': false,
        'INTJ': false,
        'ISFJ': false,
        'ESFP': false,
    })

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleProfileClick = (event) => {
        if(profile[event.target.name]){
            setProfile({
                ...profile,
                [event.target.name] : false
                
            })
            setImage('');
            props.setData({...props.data, image: ''})
        } else{
            setProfile({
                ...profile,
                [event.target.name] : true,
                ...Object.keys(profile).reduce((acc, key) => {
                    if (key !== event.target.name) {
                        acc[key] = false;
                    }
                    return acc;
                }, {}),
            })
            setImage(event.target.name);
            props.setData({...props.data, image: event.target.name});
        }
    }

    const handleNextStep = () => {
        let data = props.data;
        if (props.data.major == '화학공학/고분자공학부') {
            data = {...props.data, major: '화학공학_고분자공학부'}
        }
        dispatch(register(data, ([result, message]) => {
            if (result) {
                props.handleNextStep();
            } else {
                console.log(result, message)
            }
        }));
        //props.handleNextStep();
    }
    useEffect(() => {
        if (props.data.image !== '') {
            setProfile({
                ...profile,
                [props.data.image] : true
                
            })
            setImage(props.data.image);
        }
    }, [])

    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container justifyContent='space-between'>
                            <Grid item style={{margin:'4px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={8} height={16} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginRight:'24px'}}>
                                <Image src={close} width={25} height={25} name='close' onClick={() => router.push('/login')} layout='fixed' />
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '35px 0px 155px 0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            >
            <div style={{width: '100%'}}>
                <div style={{margin: '0 24px 29px'}}>
                <Grid container>
                    <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                    <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                    <Typography style={{fontSize: '26px', color: '#FFCE00', marginRight: '7px'}}>&bull;</Typography>
                    <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                </Grid>
                    <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C', textAlign: 'left'}}>개인 밥약 프로필</Typography>
                    <Typography style={{marginBottom: '30px', fontWeight: 'bold', fontSize: '12px', color: '#777777', textAlign: 'left'}}>1개의 이미지를 선택해주세요.</Typography>
                </div>
            </div>

            <div name='스꾸챗 프로필 사진' style={{textAlign:'center', display:'flex', justifyContent:'center', width: '100%'}}>
                        <div>
                            <div  style={{padding:'0px', margin:'0px 0px 0px 0px', justifyContent:'center'}}>
                                {/* <Grid container>
                                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                                <Typography style={{fontSize: '26px', color: '#FFCE00', marginRight: '7px'}}>&bull;</Typography>
                                </Grid>
                                <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C', textAlign: 'left'}}>개인 밥약 프로필</Typography>
                                <Typography style={{marginBottom: '30px', fontWeight: 'bold', fontSize: '12px', color: '#777777', textAlign: 'left'}}>1개의 이미지를 선택해주세요.</Typography> */}
                                <div style={{marginTop:'10px'}}>
                                    <Grid container style={{maxWidth:'340px'}}>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.DEFAULT1 ? profile1On : profile1} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='DEFAULT1'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.DEFAULT2 ? profile2On : profile2} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='DEFAULT2'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ENFJ ? profile3On : profile3} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ENFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ENTP ? profile4On : profile4} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ENTP'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.INFP ? profile5On : profile5} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='INFP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ENFP ? profile6On : profile6} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ENFP'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ISTJ ? profile7On : profile7} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ISTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ISTP ? profile8On : profile8} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ISTP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ISFP ? profile9On : profile9} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ISFP'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.INTP ? profile10On : profile10} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='INTP'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ESTJ ? profile11On : profile11} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ESTJ'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.INFJ ? profile12On : profile12} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='INFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ENTJ ? profile13On : profile13} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ENTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ESTP ? profile14On : profile14} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ESTP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ESFJ ? profile15On : profile15} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ESFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.INTJ ? profile16On : profile16} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='INTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ISFJ ? profile17On : profile17} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ISFJ'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ESFP ? profile18On : profile18} width={100} height={100} onClick={handleProfileClick} placeholder="blur" layout='fixed' name='ESFP'/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div> 
                            </div>
                        </div>
                    </div>
            
        </Box>
            <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff', paddingTop: '30px', paddingBottom: '32px'}}>
            {image ?
                        <Button variant="contained" onClick={handleNextStep} style={{margin: '0 24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            다음
                        </Button> 
                    :
                        <Button variant="contained" disabled style={{margin: '0 24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            다음
                        </Button>
                }
        
            <div style={{display: 'flex', flexDirection: 'column',  fontSize: '12px', fontWeight: '500', paddingTop: '20px', color: '#505050', textAlign: 'center'}}>
                <span style={{alignSelf: 'center'}}>이미 회원이신가요?<Button onClick={() => router.push('/login')} variant="text" style={{alignSelf: 'start', justifySelf: 'start', fontSize: '12px', color: '#FFCE00', padding: 0, fontWeight: '700', textDecoration: 'underline'}}>로그인하기</Button></span>
            </div>
            </div>
        </div>
    )
}
