import { useState } from "react";
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import Step1 from "../components/Auth/Username/Step1";
import Step2 from "../components/Auth/Username/Step2";

const findUsername = () => {

    const [step, setStep] = useState(1);

    const handleNextStep = (stepData) => {
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            {/* <Container component="main" maxWidth="xs"> */}
            {
                step === 1 && <Step1 handleNextStep={handleNextStep} />
            }
            {
                step === 2 && <Step2 handlePrevStep={handlePrevStep} />
            }
            {/* </Container> */}
        </ThemeProvider>
    )
}

export default findUsername;
