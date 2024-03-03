import { useState, useEffect } from "react";
import {  TextField, Button, InputLabel, Typography, Box, FormControl, Select, MenuItem, Container, Grid, Autocomplete, OutlinedInput} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import Image from 'next/image';
import check from '../../../image/checkYellowFilled.png'
import uncheck from '../../../image/checkGrayFilled.png'
import sepCheck from '../../../image/checkYellow.png'
import unSepCheck from '../../../image/check.png'

const VerificationAgreement = (props) => {
    const [isValid, setIsValid] = useState(false);
    const [allAgree, setAllAgree] = useState(false);
    const [checks, setChecks] = useState({
        first: false,
        second: false,
        third: false,
        fourth: false
    })

    const handlePrevStep = () => {

    }
    const handleNextStep = () => {
        props.handleNextStep();
    }

    const handleAllAgree = (toggle) => {
        setAllAgree(toggle);
        if (toggle) {
            setChecks({first: true, second: true, third: true, fourth: true});
        } else {
            setChecks({first: false, second: false, third: false, fourth: false});
        }
    }

    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <div style={{margin: '0 10px 0 24px', display: 'flex', justifyContent: 'space-between'}}>
                        <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                        {
                            allAgree || (checks.first && checks.second && checks.third) ? 
                            <Button onClick={handleNextStep} style={{color: '#FFCE00', padding: 0, fontSize: '16px', fontWeight: 'bolder'}}>다음</Button>
                            :
                            <Button style={{color: '#BABABA', padding: 0, fontSize: '16px', fontWeight: 'bolder'}}>다음</Button>
                        }
                        </div>
        </Container>
        <Box
            sx={{
            margin: '35px 0px 55px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <div style={{width: '100%'}}>
            <div style={{margin: '0 24px 29px'}}>
                <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '29px', color: '#3C3C3C'}}>약관에 동의해주세요</Typography>

                <div style={{marginTop: '42px'}}>
                    <div style={{borderBottom: '1px solid #E2E2E2'}}>
                        <div style={{display: 'flex'}}>
                            <div style={{width: '28px'}}>
                            {allAgree ?
                                <Image onClick={() => handleAllAgree(false)} src={check} width={20} height={20} layout='fixed' style={{marginTop: '2px', }} /> :
                                <Image onClick={() => handleAllAgree(true)} src={uncheck} width={20} height={20} layout='fixed' style={{marginTop: '2px', }} /> 
                            }
                            </div>
                            <Typography style={{fontSize: '16px', color: '#3C3C3C', fontWeight: 'bold'}}>모두 동의합니다</Typography>
                        </div>
                        <div style={{display: 'flex', marginTop: '8px', marginBottom: '17px'}}>
                            <div style={{width: '28px'}}>
                            </div>
                            <Typography style={{fontSize: '12px', color: '#9E9E9E',}}>
                                전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, <br />
                                개별적으로도 동의를 선택하실 수 있습니다.
                            </Typography>
                        </div>
                    </div>

                    <div style={{marginTop: '17px'}}>
                        <div style={{display: 'flex', marginBottom: '13px'}}>
                            {checks.first ? 
                                <Image onClick={() => {setChecks({...checks, first: false}); setAllAgree(false)}} src={sepCheck} width={22} height={22}/> :
                                <Image onClick={() => setChecks({...checks, first: true})} src={unSepCheck} width={22} height={22}/>
                            }
                            <Typography style={{fontSize: '14px', color: '#3C3C3C', marginLeft: '8px', marginTop: '2px'}}>(필수) 만 18세 이상입니다.</Typography>
                        </div>
                        <div style={{display: 'flex', marginBottom: '13px', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex'}}>
                            {checks.second ? 
                                <Image onClick={() => {setChecks({...checks, second: false}); setAllAgree(false)}} src={sepCheck} width={22} height={22}/> :
                                <Image onClick={() => setChecks({...checks, second: true})} src={unSepCheck} width={22} height={22}/>
                            }
                            <Typography style={{fontSize: '14px', color: '#3C3C3C', marginLeft: '8px', marginTop: '2px'}}>(필수) 서비스 이용약관 동의</Typography>
                            </div>
                            <div style={{cursor: 'pointer', textDecoration: 'underline', color: '#9E9E9E', fontSize: '12px', marginTop: '6px'}}>보기</div>
                        </div>
                        <div style={{display: 'flex', marginBottom: '13px', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex'}}>
                            {checks.third ? 
                                <Image onClick={() => {setChecks({...checks, third: false}); setAllAgree(false)}} src={sepCheck} width={22} height={22}/> :
                                <Image onClick={() => setChecks({...checks, third: true})} src={unSepCheck} width={22} height={22}/>
                            }
                            <Typography style={{fontSize: '14px', color: '#3C3C3C', marginLeft: '8px', marginTop: '2px'}}>(필수) 개인정보 수집 및 이용 동의</Typography>
                            </div>
                            <div style={{cursor: 'pointer', textDecoration: 'underline', color: '#9E9E9E', fontSize: '12px', marginTop: '6px'}}>보기</div>
                        </div>
                        <div style={{display: 'flex', marginBottom: '13px'}}>
                            {checks.fourth ? 
                                <Image onClick={() => {setChecks({...checks, fourth: false}); setAllAgree(false)}} src={sepCheck} width={22} height={22}/> :
                                <Image onClick={() => setChecks({...checks, fourth: true})} src={unSepCheck} width={22} height={22}/>
                            }
                            <Typography style={{fontSize: '14px', color: '#3C3C3C', marginLeft: '8px', marginTop: '2px'}}>(선택) 혜택/이벤트 정보 수신 동의</Typography>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Box>
        </div>
    )
}

export default VerificationAgreement;
