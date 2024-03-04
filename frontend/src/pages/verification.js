import { CssBaseline, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import VerificationPhone from '../components/Auth/Verification/Phone';
import VerificationAgreement from '../components/Auth/Verification/Agreement';
import theme from '../theme/theme';
import VerificationDone from '../components/Auth/Verification/Done';
import { useSelector } from 'react-redux';

const Verification = () => {
    const user = useSelector(state => state.auth.user);

    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        username: user.username,
        phone: "",
    })

    const handleNextStep = () => {
        setStep(step + 1);
    }
    const handlePrevStep = () => {
        setStep(step - 1);
    }


    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            {
                step === 1 && <VerificationPhone handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} enroll={true} />
            }
            {
                step === 2 && <VerificationAgreement handleNextStep={handleNextStep} />
            }
            {
                step === 3 && <VerificationDone />
            }
        </ThemeProvider>
    )
}

export default Verification;