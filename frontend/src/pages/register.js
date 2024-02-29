import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import SignUpUsername from "../components/Auth/SignUp/Username";
import SignUpNickname from "../components/Auth/SignUp/Nickname";
import SignUpPhone from '../components/Auth/SignUp/Phone';
import SignUpProfileImage from "../components/Auth/SignUp/ProfileImage";
import SignUpMatchInfo from "../components/Auth/SignUp/MatchInfo";
import SignUpEmailNotice from '../components/Auth/SignUp/EmailNotice';
import SignUpEmail from '../components/Auth/SignUp/Email';
import SignUpEmailCheck from '../components/Auth/SignUp/EmailCheck';
import SignUpWelcome from '../components/Auth/SignUp/Welcome';

const RegisterPage = () => {

    const router = useRouter();
    const register_success = useSelector(state => state.auth.register_success);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const src = router.query.src;
    const pathUsername = router.query.username;
    const pathEmail = router.query.email;

    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        username: "",
        password: "",
        re_password: "",
        nickname: "",
        major: "",
        student_id: "",
        email: "",
        image: "DEFAULT1",
        phone: ""
    })
    // 유효성검사 완료했다는 object state value

    const handleNextStep = (stepData) => {
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }

    if (typeof window !== 'undefined' && isAuthenticated)
        router.push('/');

    if(register_success)
        router.push('/login');

    useEffect(() => {
        if (src == '이메일') {
            setData({...data, username: pathUsername})
            //setStep(4);
            setStep(6);
        } else if (src == 'emailDone') {
            setStep(8);
        } else if (src == '인증') {
            setData({...data, username: pathUsername, email: pathEmail})
            setStep(7);
        } else if (src == 'agreement') {
            setData({...data, username: pathUsername})
            setStep(6);
        }
    }, [src])
    
    
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            {/* <Container component="main" maxWidth="xs"> */}
            {
                step === 1 && <SignUpUsername handleNextStep={handleNextStep} data={data} setData={setData} />
            }
            {
                step === 2 && <SignUpNickname handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 3 && <SignUpPhone handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 4 && <SignUpProfileImage handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 5 && <SignUpMatchInfo handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 6 && <SignUpEmailNotice handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 7 && <SignUpEmail handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} />
            }
            {
                // step === 8 && <SignUpEmailCheck handlePrevStep={handlePrevStep} username={data.username} /> 
                step === 8 && <SignUpEmailCheck handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} />
            }
            {
                step === 9 && <SignUpWelcome />
            }
            {/* </Container> */}
        </ThemeProvider>
    )
};

export default RegisterPage;
