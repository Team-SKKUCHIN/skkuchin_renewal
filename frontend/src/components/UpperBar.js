import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';
import theme from '../theme/theme';
import { useState } from 'react';
import {Container} from '@mui/material';
import mainLogo from '../image/upperBar/mainLogo.png'
// import messageIcon from '../image/upperBar/message_X.png'
import notiIcon from '../image/upperBar/notification_X.png'
// import messageOnIcon from '../image/upperBar/message.png'
import notiOnIcon from '../image/upperBar/notification.png'
import Image from 'next/image'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { get_chat_alarm } from '../actions/chat/chatAlarm';
import { get_notice_alarm } from '../actions/notice/noticeAlarm';

const UpperBar = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("홈");
    const chatAlarm = useSelector(state => state.chatAlarm.chatAlarm);
    const noticeAlarm = useSelector(state => state.noticeAlarm.noticeAlarm);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (user) {
            dispatch(get_chat_alarm());
            dispatch(get_notice_alarm());
        }
    }, [user]);

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
        <div style={{ zIndex:'99', position: "fixed", top: 0, width: "100%", background: "white", alignContent:"center", paddingBottom:'9px',borderBottom: '1.5px solid rgba(234, 234, 234, 1)', maxWidth:'420px'}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding:"15px 15px 0px 15px"}}>
                <Link href="/">
                    <Image src={mainLogo} width={85} height={19} />
                </Link>
            <div style={{flex: 1}} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {/* <div style={{marginRight:"18px"}}>
                        <Link href="/message">
                            <Image src={chatAlarm ? messageOnIcon : messageIcon} width={24} height={24}/>
                        </Link>
                    </div> */}
                    <div>
                        <Link href="/notification">
                            <Image src={noticeAlarm ? notiOnIcon : notiIcon} width={24} height={24}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth:"420px", padding:"15px 15px 0px 15px"}}>
            <Link href="/">
                <a
                    style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textDecoration: "none",
                        color: selected === "홈" ? "#FFCE00" : "#505050",
                        borderBottom: selected === "홈" ? "2px solid #FFCE00" : "none",
                }}
                onClick={() => setSelected("홈")}
                >
                <span style={{padding:"0 0 2px 0"}}>
                    홈
                </span>
                </a>
            </Link>
            <Link href="/mealPromise">
                <a
                    style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: selected === "밥약" ? "#FFCE00" : "#505050",
                        textDecoration: "none",
                        borderBottom: selected === "밥약" ? "2px solid #FFCE00" : "none"
                }}
                onClick={() => setSelected("밥약")}
                >
                <span style={{padding:"0 0 2px 0"}}>
                    밥약
                </span>
                </a>
            </Link>
            <Link href="/showRequests">
                <a
                    style={{
                        display: "flex",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: selected === "신청 현황" ? "#FFCE00" : "#505050",
                        textDecoration: "none",
                        borderBottom: selected === "신청 현황" ? "2px solid #FFCE00" : "none"
                }}
                onClick={() => setSelected("신청 현황")}
                >
                    <span style={{padding:"0 0 2px 0"}}>
                        신청 현황
                    </span>
                    {chatAlarm && <div
                        style={{
                            backgroundColor: "#FFCE00",
                            width: "5px",
                            height: "5px",
                            borderRadius: "2.5px",
                            margin: "0 0 auto 2.5px"
                        }}
                    />}
                </a>
            </Link>
            {
                user ?
                <Link href="/myPage">
                    <a
                        style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: selected === "마이페이지" ? "#FFCE00" : "#505050",
                            textDecoration: "none",
                            borderBottom: selected === "마이페이지" ? "2px solid #FFCE00" : "none"
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
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#505050",
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