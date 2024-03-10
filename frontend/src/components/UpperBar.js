import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';
import theme from '../theme/theme';
import { useState } from 'react';
import {Container} from '@mui/material';
import mainLogo from '../image/upperBar/mainLogo.png'
import notiIcon from '../image/upperBar/notification_X.png';
import Image from 'next/image'
import { useEffect } from "react";
import { useSelector } from 'react-redux';

const UpperBar = () => {
    const [selected, setSelected] = useState("홈");
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const currentPathname = window.location.pathname;
        if (currentPathname === "/showRequests") {
            setSelected("신청 현황");
        } else if ( currentPathname === "/mealPromise") {
            setSelected("밥약");
        } else if (currentPathname === "/myPage"){
            setSelected("마이페이지");
        } else {
            setSelected("홈");
        }
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container disableGutters={true} maxWidth="xs" style={{height:"90px", margin:"0", padding:"0"}} overflow="hidden">
            <div style={{ zIndex:'99', position: "fixed", top: 0, width: "100%", background: "white", alignContent:"center", borderBottom: '1.5px solid rgba(234, 234, 234, 1)', maxWidth:'420px'}}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding:"20px 24px 0px 24px"}}>
                    <Link href="/">
                        <Image src={mainLogo} width={85} height={19} />
                    </Link>
                <div style={{flex: 1}} />
                {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div>
                        <Link href="/notification">
                            <Image src={notiIcon} width={24} height={24}/>
                        </Link>
                    </div>
                </div> */}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth:"420px", padding:"15px 24px 0px 24px"}}>
            <Link href="/">
                <a
                    style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        textDecoration: "none",
                        color: selected === "홈" ? "#3C3C3C" : "#BABABA",
                        borderBottom: selected === "홈" ? "2px solid #FFCE00" : "none",
                        paddingBottom: '8px',
                        width: '20px'
                }}
                onClick={() => setSelected("홈")}
                >
                <span style={{padding:"0 0 2px 3px"}}>
                    홈
                </span>
                </a>
            </Link>
            <Link href="/mealPromise">
                <a
                    style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: selected === "밥약" ? "#3C3C3C" : "#BABABA",
                        textDecoration: "none",
                        borderBottom: selected === "밥약" ? "2px solid #FFCE00" : "none",
                        paddingBottom: '8px',
                        width: '30px'
                }}
                onClick={() => setSelected("밥약")}
                >
                <span style={{padding:"0 0 2px 2px"}}>
                    밥약
                </span>
                </a>
            </Link>
            <Link href="/showRequests">
                <a
                    style={{
                        display: "flex",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: selected === "신청 현황" ? "#3C3C3C" : "#BABABA",
                        textDecoration: "none",
                        borderBottom: selected === "신청 현황" ? "2px solid #FFCE00" : "none",
                        paddingBottom: '8px'
                }}
                onClick={() => setSelected("신청 현황")}
                >
                    <span style={{padding:"0 0 2px 0"}}>
                        신청 현황
                    </span>
                    {/* {chatAlarm && <div
                        style={{
                            backgroundColor: "#FFCE00",
                            width: "5px",
                            height: "5px",
                            borderRadius: "2.5px",
                            margin: "0 0 auto 2.5px"
                        }}
                    />} */}
                </a>
            </Link>
            {
                user ?
                <Link href="/myPage">
                    <a
                        style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: selected === "마이페이지" ? "#3C3C3C" : "#BABABA",
                            textDecoration: "none",
                            borderBottom: selected === "마이페이지" ? "2px solid #FFCE00" : "none",
                            paddingBottom: '8px'
                    }}
                    onClick={() => setSelected("마이페이지")}
                    >
                    <span style={{padding:"0 0 2px 0"}}>
                        마이페이지
                    </span>
                    </a>
                </Link>
                :
                <Link href="/login">
                    <a
                        style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#BABABA",
                            textDecoration: "none",
                            borderBottom: "none"
                        }}
                    >
                    <span style={{padding:"0 0 2px 0"}}>
                        로그인
                    </span>
                    </a>
                </Link>
            }
        </div>
    </div>
            </Container>
        </ThemeProvider>
)};

export default UpperBar;