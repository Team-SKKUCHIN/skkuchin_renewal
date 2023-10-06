import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { backArrow, closeIcon, food, mainLogo } from '../image/recommend';
import { useToggle } from '../components/Recommend/useToggle';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { load_places } from '../actions/place/place';
import { useWorldcup } from '../components/Worldcup/useWorldcup';

const SubTitle = () => (
    <div style={{ margin: "52px 0 8px" }}>
        <span style={{ 
            color: "#9E9E9E",
            fontSize: "16px",
            letterSpacing: "-0.32px",
        }}>
            #나의 최애 음식점 찾기
        </span>
    </div>
);

const MainTitle = () => (
    <h1 style={{
        margin: 0,
        fontSize: "32px",
        fontWeight: 800,
        letterSpacing: "-1.28px",
    }}>
        음식점 월드컵
    </h1>
);

const Header = () => {
    const router = useRouter();

    const handleBack = useCallback((e) => {
        router.back();
    }, [])

    const handleClose = useCallback((e) => {
        router.push('/');
    }, [])

    return (
        <div style={{ margin: "15px 0", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Image
                src={backArrow}
                onClick={handleBack}
                layout="fixed"
                width={24}
                height={24}
                style={{ cursor: 'pointer' }}
            />
            <Image
                src={closeIcon}
                name='back'
                onClick={handleClose}
                layout='fixed'
                width={24}
                height={24}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};



const StageSelect = ({ round, setRound, startGame }) => {
    const stages = [16, 8, 4, 2];

    const mainText = "스꾸친과 함께 취향의 음식점을 알아봐요\n스꾸친스꾸친스꾸친";

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "52px 0 16px",
                    padding: "79px 16px 21px",
                    borderRadius: "8px",
                    background: "#F2F2F2",
                }}
            >
                <Image
                    src={mainLogo}
                    width={152}
                    height={107}
                    layout='fixed'
                />
                <p
                    style={{
                        margin: "36px 0 76px",
                        fontSize: "14px",
                        lineHeight: "17px",
                        letterSpacing: "-0.5px",
                        whiteSpace: "pre-wrap",
                        textAlign: "center",
                    }}
                >
                    {mainText}
                </p>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {stages.map((stage, index) => (
                        <StageButton
                            isActive={round === stage}
                            onClick={() => setRound(stage)}
                            key={index}
                        >
                            {stage !== 2 ? `${stage}강` : '결승'}
                        </StageButton>
                    ))}
                </div>
            </div>
            <button
                onClick={() => startGame()}
                style={{
                    width: "100%",
                    padding: "16px 0",
                    borderRadius: "8px",
                    background: "#FFCE00",
                    border: "none",
                    color: "#FFF",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 800,
                    cursor: "pointer",
                }}
            >
                시작하기
            </button>
        </>
    );
};

const MainStage = ({ round, setRound, gameNum, setGameNum, pickPlace, getNextGame, setPhase }) => {
    const [places, setPlaces] = useState([]);
    const [darkenIndex, setDarkenIndex] = useState(null);
    const isRunning = useRef(false);

    useEffect(() => {
        setDarkenIndex(null);

        const tempPlaces = getNextGame(gameNum);
        setPlaces(tempPlaces);
    }, [gameNum]);

    const selectPlace = useCallback((index) => {
        if (isRunning.current) return;

        const removeIndex = index === 0 ? 1 : 0;
        setDarkenIndex(removeIndex);
        pickPlace(gameNum + removeIndex);

        isRunning.current = true;
        setTimeout(() => {
            if (round === 2) {
                setPhase('finish');
            } else if (gameNum + 1 === round / 2) {
                setRound(round => round / 2);
                setGameNum(0);
            } else {
                setGameNum(gameNum + 1);
            }

            isRunning.current = false;
        }, 1000);
    }, [isRunning, round, gameNum]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "36px",
                    background: "#3C3C3C",
                    borderRadius: "10px 10px 0 0",
                    color: "#FFF",
                    textAlign: "center",
                    lineHeight: "36px",
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "-1px",
                }}
            >
                {round === 2 ? (
                    '결승'
                ) : (
                    <span>
                        {round}강&nbsp;&nbsp;&nbsp;{gameNum + 1}/{round / 2}
                    </span>
                )}
            </div>
            {places.map((place, index) => (
                <div
                    onClick={() => selectPlace(index)}
                    style={{ position: "relative", width: "100%" , height: "200px", cursor: "pointer" }}
                    key={index}
                >
                    <Image
                        src={place.images[0] ?? food}
                        layout="fill"
                        style={{
                            width: "100%",
                            height: "100%",
                            filter: darkenIndex === index ? "brightness(60%)" : undefined,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "34px",
                            background: "rgba(34, 40, 48, 0.60)",
                            color: "#FFF",
                            textAlign: "center",
                            lineHeight: "34px",
                            fontSize: "16px",
                            fontWeight: 700,
                            letterSpacing: "-1px",
                        }}
                    >
                        {place.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

const Finish = ({ getWinner, setPhase }) => {
    const user = useSelector(state => state.auth.user);
    const winner = getWinner();
    
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "122px 0 110px",
                }}
            >
                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                    <Image
                        src={winner.images[0] ?? food}
                        width="100%"
                        height="100%"
                        layout='fill'
                    />
                </div>
                <p
                    style={{
                        margin: "36px 0 0",
                        fontSize: "18px",
                        fontWeight: 700,
                        letterSpacing: "-1px",
                    }}
                >
                    {user?.name ? user.name + "님" : "당신"}의 최애 음식점은
                </p>
                <p
                    style={{
                        margin: "0",
                        fontSize: "18px",
                        fontWeight: 700,
                        letterSpacing: "-1px",
                    }}
                >
                    <span style={{
                        fontSize: "24px",
                        fontWeight: 800,
                    }}>{winner.name}</span> 입니다~!
                </p>
            </div>
            <button
                onClick={() => setPhase('ready')}
                style={{
                    width: "100%",
                    padding: "16px 0",
                    borderRadius: "8px",
                    background: "#BABABA",
                    border: "none",
                    color: "#FFF",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 800,
                    cursor: "pointer",
                }}
            >
                다시하기
            </button>
        </>
    );
};

const WorldCup = () => {
    const dispatch = useDispatch();
    const { setGame, pickPlace, getNextGame, getWinner } = useWorldcup();
    const { Toggle, isOn } = useToggle();
    const places = useSelector(state => state.place.allplaces);
    const filteredPlaces = useRef(null);
    const [round, setRound] = useState(16);
    const [gameNum, setGameNum] = useState(0);
    const [phase, setPhase] = useState('ready');

    useEffect(() => {
        dispatch(load_places());
    }, [])

    useEffect(() => {
        if (phase === 'ready') {
            setRound(16);
            setGameNum(0);
        }
    }, [phase]);

    useEffect(() => {
        const tempPlaces = places?.filter(place => isOn ? place.campus === "명륜" : place.campus === "율전")
        filteredPlaces.current = tempPlaces;
    }, [filteredPlaces, places, isOn]);

    const startGame = useCallback(() => {
        if (!filteredPlaces.current) {
            alert("준비 중입니다. 잠시 후 클릭해주세요!");
        } else {
            setGame(filteredPlaces.current, round);
            setPhase('start');
        }
    }, [filteredPlaces, round]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{ margin: "0 24px" }}>
                <Header />
                <SubTitle />
                <div
                    style={{ 
                        marginBottom: "52px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <MainTitle />
                    {phase === 'ready' && <Toggle />}
                </div>
                {phase === 'ready' && 
                    <StageSelect
                        round={round}
                        setRound={setRound}
                        startGame={startGame}
                    />
                }
                {phase === 'start' && 
                    <MainStage
                        round={round}
                        setRound={setRound}
                        gameNum={gameNum}
                        setGameNum={setGameNum}
                        pickPlace={pickPlace}
                        getNextGame={getNextGame}
                        setPhase={setPhase}
                    />
                }
                {phase === 'finish' && 
                    <Finish getWinner={getWinner} setPhase={setPhase} />
                }
            </div>
        </ThemeProvider>
    );
};

export default WorldCup;

const StageButton = styled.div`
    height: 88px;
    line-height: 88px;
    width: 22%;
    text-align: center;
    margin: 0 auto;
    border-radius: 8px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.96px;
    border: none;
    cursor: pointer;
    background: ${props => (props.isActive ? '#FFCE00' : '#E2E2E2')};
    color: ${props => (props.isActive ? '#FFF' : '#BABABA')};
`