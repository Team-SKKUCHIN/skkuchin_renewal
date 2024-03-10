import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider, Divider } from '@mui/material';
import UpperBar from '../components/UpperBar';
import theme from '../theme/theme';
import MatchPage from '../components/Matching/MatchPage';
import styled from '@emotion/styled';
import Link from 'next/link';
import mainCharacter from '../image/login_enheng.png';
import Image from 'next/image';
import close from '../image/close.png';
import share from '../image/ios_share.png';
import { useSelector, useDispatch } from 'react-redux';
import { load_all_group_profile, get_my_group_profile } from '../actions/groupProfile/groupProfile';
import { load_candidate } from '../actions/candidate/candidate';
import { load_matching_info } from '../actions/matchingUser/matchingUser';

const GameContent = () => {
    const games = [
        {
            name: "오늘은 이거다!",
            hashtag: "#성대 메뉴 추천 룰렛",
            link: "/recommend",
        },
        {
            name: "음식점 월드컵",
            hashtag: "#나의 최애 음식점 찾기",
            link: "/worldcup",
        },
        {
            name: "다음 게임을 기대해주세요!",
            hashtag: "#What's next?",
            link: "/",
        },
    ];

    return (
        <div style={{ margin: "22px 24px 0" }}>
            <span
                style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    letterSpacing: "-0.84px",
                }}
            >
                오늘 뭐 먹지?
            </span>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", overflowX: "scroll" }}>
                {games.map((game, index) => (
                    <Link href={game.link} key={index}>
                        <div
                            style={{
                                    minWidth: "230px",
                                    height: "100px",
                                    borderRadius: "12px",
                                    border: "1px solid #E2E2E2",
                                    padding: "19px 20px",
                                    margin: index === 0 ? "0 4px 0 0" : (index === 1 ? "0 4px" : "0 0 0 4px"),
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    display: "flex",
                                    gap: "20px",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#777",
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            letterSpacing: "-0.24px",
                                        }}
                                    >
                                        {game.hashtag}
                                    </p>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            letterSpacing: "-0.36px",
                                        }}
                                    >
                                        {game.name}
                                    </p>
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    {
                                        index == 0 ? (
                                            <Image src={mainCharacter} sx={{ width: "60px", height: "51px" }} />
                                        ) : null
                                    }
                                </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [popup, setPopup] = useState(false);

    const handleBtnClick = () => {
        setPopup(false);
        window.localStorage.setItem('first', true);
    }

    useEffect(() => {
        const onboarding = window.localStorage.getItem('onboarding');
        const first = window.localStorage.getItem('first');
        if (!onboarding) {
            router.push('/onboarding');
        } 
        if (!first) {
            setPopup(true);
        }
    }, [])

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const matchingUser = useSelector(state => state.matchingUser.myMatchingInfo);
    const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);

    useEffect(() => {
        dispatch(load_all_group_profile());
        dispatch(load_candidate());
    }, []);

    useEffect(() => {
        if(isAuthenticated && myGroupProfiles === null) dispatch(get_my_group_profile());
        if(isAuthenticated && matchingUser === null) dispatch(load_matching_info());
    }, [isAuthenticated]);

    return (
        <HomeContainer>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <UpperBar />
                <div style={{ width: '100%', height: '100%' }}>
                    <GameContent />
                    <Divider orientation="horizontal" sx={{ mt: "20px", border: '5px solid #F2F2F2' }} />
                    <MatchPage />
                </div>
                
                {popup &&
                <div style={{ position: 'fixed', bottom: '10%', left: '50%', width: '90%', transform: 'translate(-50%, 50%)', maxWidth: '420px', backgroundColor: 'rgba(0, 0, 0, 0.70)', marginBottom: '0 20px 100px 20px', borderRadius: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 10px 0 0', }}>
                        <div></div>
                        <Image onClick={handleBtnClick} src={close} width={20} height={20} style={{margin: '20px'}} />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '24px', marginTop: '4px', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '16px',}}>
                    <div>아래에 있는 
                        <span style={{padding: '10px 3px 0 7px', verticalAlign: 'middle'}}><Image src={share} width={15.6} height={19} /></span>
                        를 눌러 <span>[홈 화면에 추가]</span>하시면,</div>
                    <div>스꾸친 바로 가기를 홈 화면에 만들 수 있어요!</div>
                    </div>
                </div>}
            </ThemeProvider>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.div`
    ::-webkit-scrollbar {
        display: none;
    }
    *::-webkit-scrollbar {
        display: none;
    }
`;