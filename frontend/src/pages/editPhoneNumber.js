import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import VerificationPhone from '../components/Auth/Verification/Phone'

const editPhoneNumber = () => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <VerificationPhone handleNextStep={handleArrowClick} handlePrevStep={handleArrowClick} data={data} setData={setData} enroll={false} />
        </ThemeProvider>
    )
}

export default editPhoneNumber;
