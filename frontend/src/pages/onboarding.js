import { useEffect } from 'react';
import { CssBaseline, ThemeProvider,Container } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { useState } from "react";
import { useRouter } from "next/router";
import splash0 from '../image/onboarding1.png';
import splash1 from '../image/onboarding2.png';
import splash2 from '../image/onboarding3.png';
import start from '../image/startBtn.png';


const splashData = [
    {
        id: 1, 
        title: "'밥 한끼'로 시작하는 만남", 
        content: "같은 학과가 아니면 만나기 어려운 사람들.", 
        content2: "'밥 한끼'를 매개로 부담없이 만나볼 수 있어요.", 
        src: splash0, 
        width:'309', 
        height:'254'
    }, 
    {
        id: 2, 
        title: "동기랑 선배랑 후배랑", 
        content: "학교 생활 꿀팁을 공유하고", 
        content2: "끈끈한 학연도 느껴보아요!", 
        src: splash1, 
        width:'321', 
        height:'228'
    }, 
    {
        id: 3, 
        title: "우리들만의 안전한 공간", 
        content: "학교와 본인 인증을 통해 안전한 만남이 가능해요.", 
        content2: "프로필을 등록하고, 다양한 성대 동문을 사귀어보세요!", 
        src: splash2, 
        width:'232', 
        height:'179'
    },
    {
        id: 4, 
        title: "", 
        content: "", 
        content2: "", 
        src: splash2, 
        width:'232', 
        height:'179'
    }
];
const VirtualizeSwipeableViews = virtualize(SwipeableViews);
const AutoPlaySwipeableViews = autoPlay(VirtualizeSwipeableViews);

export default function Onboarding(){

    const router = useRouter();
    const [splashIndex, setSplashIndex] = useState(0);
    const handleSplashChange = (index) => {
        setSplashIndex(index);
    };
    const handleStartClick = () => {
        router.push('/login')
    }

    useEffect(() => {
        console.log(splashIndex)
        if (splashIndex === 3) {
            window.localStorage.setItem('onboarding', true);
            router.push('/')
        }
    }, [splashIndex])

    const height = window.innerHeight / 2 - 250;

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* <Container> */}
                <div style={{ height: "100vh", textAlign: "center" }}>
                <SwipeableViews
                index={splashIndex}
                onChangeIndex={handleSplashChange}
                >
                {splashData.map((data, index) => (
                    index < 3 && (
                    <div key={index} style={{marginTop: data.id === 3 ? height+50 : height, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center'}}>
                    <Image src={data.src} width={data.width} height={data.height} />
                    <div style={{
                        backgroundColor: '#FFFCE4', 
                        color: '#FC9712', 
                        fontSize: '21px', 
                        fontWeight: '900', 
                        borderRadius: '1000px', 
                        width: '44px', 
                        height: '44px',
                        marginTop: '20px',
                        textAlign: 'center',
                        lineHeight: '44px'}}>
                        {data.id}
                    </div>
                    <div style={{
                        margin: '25px 24px',
                        fontSize: '22px',
                        fontWeight: '900' 
                    }}>
                        {data.title}
                    </div>
                    <div style={{
                        margin: '0 0px 10px 0px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#777777'
                    }}>
                        {data.content}
                    </div>
                    <div style={{
                        margin: '0 0px 10px 0px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#777777'
                    }}>
                        {data.content2}
                    </div>
                    <div style={{display: 'flex', marginTop: '30px'}}>
                        <div style={{fontSize: '26px', color: data.id === 1 ? '#FFCE00' : '#E2E2E2', marginRight: '7px'}}>&bull;</div>
                        <div style={{fontSize: '26px', color: data.id === 2 ? '#FFCE00' : '#E2E2E2', marginRight: '7px'}}>&bull;</div>
                        <div style={{fontSize: '26px', color: data.id === 3 ? '#FFCE00' : '#E2E2E2', marginRight: '7px'}}>&bull;</div>
                    </div>
                    </div>)
                ))}
                </SwipeableViews>
                </div>
            {/* </Container> */}
        </ThemeProvider>
     )
}