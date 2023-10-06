import { CssBaseline, ThemeProvider } from '@mui/material';
import UpperBar from '../components/UpperBar';
import theme from '../theme/theme';
import MatchPage from './match';
import styled from '@emotion/styled';
import Link from 'next/link';

const GameContent = () => {
    const games = [
        {
            name: "오늘 뭐먹지?",
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
                식당찾기 🍚
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
                                    // padding: "19px 113px 39px 20px",
                                    padding: "19px 20px",
                                    margin: "0 4px",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                }}
                            >
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