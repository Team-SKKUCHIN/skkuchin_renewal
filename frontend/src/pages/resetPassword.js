import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import Step1 from "../components/Auth/Password/Step1";
import Step2 from "../components/Auth/Password/Step2";
import Step3 from "../components/Auth/Password/Step3";
import Step4 from "../components/Auth/Password/Step4";

const resetPassword = () => {

    const router = useRouter();
    const src = router.query.src;

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

    const handleNextStep = () => {
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }

    useEffect(() => {
        if (src == 'emailDone') {
            setStep(3);
        }
    }, [src])
    
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            {
                step === 1 && <Step1 handleNextStep={handleNextStep} setEmail={setEmail} />
            }
            {
                step === 2 && <Step2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} email={email} />
            }
            {
                step === 3 && <Step3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} email={email} />
            }
            {
                step === 4 && <Step4 />
            }
        </ThemeProvider>
    )
};

export default resetPassword;
