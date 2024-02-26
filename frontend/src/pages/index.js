import { CssBaseline, ThemeProvider, Divider } from '@mui/material';
import UpperBar from '../components/UpperBar';
import theme from '../theme/theme';
import MatchPage from './match';
import styled from '@emotion/styled';
import Link from 'next/link';
import mainCharacter from '../image/login_enheng.png';
import Image from 'next/image';

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