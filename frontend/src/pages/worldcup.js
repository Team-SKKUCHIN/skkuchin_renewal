import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { food, mainLogo } from '../image/recommend';
import { useToggle } from '../components/Recommend/useToggle';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { load_places } from '../actions/place/place';
import { useWorldcup } from '../components/Worldcup/useWorldcup';
import { enroll_worldcup, load_nonuser_worldcups, load_user_worldcups } from '../actions/worldcup/worldcup';
import { convertName } from '../utils/wordConvertor';
import { downArrow, upArrow } from '../image/worldcup';
import { mbtiDict } from '../image/mbti/profile';
import WorldcupFriend from '../components/Worldcup/WorldcupFriend';
import ClickProfile from './clickProfile';
import { Header } from "../components/Header";
import Popup from "../components/Recommend/Popup";
import { Loading } from "../components/Loading";

const SubTitle = () => (
    <div style={{ margin: "42px 0 8px" }}>
        <span style={{ 
            color: "#9E9E9E",
            fontSize: "16px",
            letterSpacing: "-0.32px",
        }}>
            #음식점판 이상형 월드컵
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

const StageSelect = ({ round, setRound, startGame }) => {
    const stages = [16, 8, 4, 2];

    const mainText = "스꾸친과 함께 내 최애 성대 음식점을 알아봐요";

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "52px 0 16px",
                    padding: screen.availHeight < 815 ? "21px 16px" : "79px 16px 21px",
                    borderRadius: "8px",
                    background: "#F2F2F2",
                }}
            >
                <Image
                    src={mainLogo}
                    width={screen.availHeight < 815 ? 128 : 152}
                    height={screen.availHeight < 815 ? 90 : 107}
                    layout='fixed'
                />
                <p
                    style={{
                        margin: screen.availHeight < 815 ? "21px 0" : "36px 0 76px",
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
                    marginBottom: "24px",
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
        setDarkenIndex(index);
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
                        objectFit="cover"
                        style={{
                            filter: darkenIndex === index ? "brightness(60%)" : undefined,
                        }}
                        placeholder="blur" 
                        blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
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

const Finish = ({
    clickProfile,
    getWinner,
    phase,
    selectedPlace,
    setPlacePopup,
    setPhase,
}) => {
    const dispatch = useDispatch();
    const [popup, setPopup] = useState(false);
    const start = useRef(false);
    const user = useSelector(state => state.auth.user);
    const userId = user ? user.id : null;
    const winner = getWinner();

    const clickPlace = useCallback((place) => {
        selectedPlace.current = place;
        setPlacePopup(true);
    }, []);

    useEffect(() => {
        if (!start.current) {
            dispatch(enroll_worldcup(winner.id, userId));

            if (!popup) {
                const timeId = setTimeout(() => {
                    setPopup(true);
                }, 2000);

                return () => clearTimeout(timeId);
            }

            start.current = true;
        }
    }, [phase])
    
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: screen.availHeight < 815 ? "22px 0 20px" : "122px 0 110px",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        cursor: "pointer",
                    }}
                    onClick={() => clickPlace(winner)}
                >
                    <Image
                        src={winner.images[0] ?? food}
                        layout='fill'
                        objectFit='cover'
                        placeholder="blur" 
                        blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
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
                onClick={() => setPhase('rank')}
                style={{
                    width: "100%",
                    padding: "16px 0",
                    marginBottom: "16px",
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
                랭킹보기
            </button>
            <button
                onClick={() => setPhase('ready')}
                style={{
                    width: "100%",
                    padding: "16px 0",
                    marginBottom: "60px",
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
            {popup && <WorldcupFriend clickProfile={clickProfile} place={winner} setPopup={setPopup} />}
        </>
    );
};

const DropDown = ({ worldcup, setPopup, selectedPlace, selectedUser }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (user) => {
        selectedPlace.current = worldcup;
        selectedUser.current = user;
        setPopup(true);
    };

    return (
        <>
            <div
                style={{
                    width: "100%",
                    padding: "16px 16px 16px 18px",
                    borderRadius: "8px",
                    backgroundColor: "#F2F2F2",
                }}
            >
                <div
                    style={{
                            position: 'relative',
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => setOpen(open => !open)}
                    >
                    <p
                        style={{
                            display: "inline-flex",
                            margin: 0,
                            fontSize: "12px",
                            fontWeight: 400,
                            letterSpacing: "-0.24px",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                maxWidth: "50%",
                                fontWeight: 700,
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                            }}
                        >
                            {worldcup.name}
                        </span>{convertName(worldcup.name)} 좋아하는 스꾸친을 찾아보세요!
                    </p>
                    <Image
                        width={11}
                        height={6}
                        layout='fixed'
                        src={open ? upArrow : downArrow}
                    />
                </div>
                {open &&
                    <div
                        style={{
                            marginTop: "14px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {worldcup.users.map((user, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: worldcup.users.length === 3 ? "31%" : (worldcup.users.length === 2 ? "48%" : "100%"),
                                    height: "120px",
                                    padding: "20px 0",
                                    borderRadius: "8px",
                                    border: "1px solid #E2E2E2",
                                    backgroundColor: "#FFF",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleClick(user)}
                            >
                                <div style={{ position: "relative", width: "44px", height: "44px", borderRadius: "22px", overflow: "hidden" }}>
                                    <Image
                                        layout='fill'
                                        objectFit='cover'
                                        src={mbtiDict[user.image]}
                                        placeholder="blur"
                                    />
                                </div>
                                <span
                                    style={{
                                        marginTop: "8px",
                                        textAlign: "center",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        letterSpacing: "-0.24px",
                                    }}
                                >
                                    {user.nickname}
                                </span>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    );
};

const Rank = ({
    clickProfile,
    selectedPlacePopup,
    setPlacePopup,
    phase,
    setLoading,
}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const worldcups = useSelector(state => state.worldcup.worldcup);
    const dispatch = useDispatch();
    const [popup, setPopup] = useState(false);
    const selectedPlace = useRef(null);
    const selectedUser = useRef(null);
    
    const clickPlace = useCallback((place) => {
        selectedPlacePopup.current = place;
        setPlacePopup(true);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(load_user_worldcups());
        } else {
            dispatch(load_nonuser_worldcups());
        }
    }, [phase, isAuthenticated])

    useEffect(() => {
        if (worldcups && Array.isArray(worldcups)) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [worldcups])

    return (
        <>
            <div
                style={{
                    width: "100%",
                    marginTop: "52px",
                }}
            >
                {worldcups && Array.isArray(worldcups) && worldcups.map((worldcup, index) => (
                    <div key={index} style={{ width: "100%", marginBottom: "16px" }}>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                padding: "16px 16px 16px 14px",
                                marginBottom: "6px",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #E2E2E2",
                            }}
                        >
                            <div style={{ display: "flex", width: "55%"  }}>
                                <span
                                    style={{
                                        marginRight: "12px",
                                        color: "#F47806",
                                        fontSize: "18px",
                                        fontWeight: 800,
                                        letterSpacing: "-0.36px",
                                        lineHeight: "36px",
                                    }}
                                >
                                    {index + 1}
                                </span>
                                <div
                                    style={{
                                        position: "relative",
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "36px",
                                        overflow: 'hidden',
                                        marginRight: "8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => clickPlace(worldcup)}
                                >
                                    <Image
                                        layout="fill"
                                        objectFit="cover"
                                        src={worldcup.images[0] ?? food}
                                        placeholder="blur"
                                        blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                                    />
                                </div>
                                <span
                                    style={{
                                        maxWidth: "50%",
                                        color: "#3C3C3C",
                                        fontSize: "16px",
                                        fontWeight: 800,
                                        letterSpacing: "-0.32px",
                                        lineHeight: "36px",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                    }}
                                >
                                    {worldcup.name}
                                </span>
                            </div>
                            <div style={{ display: "flex", width: "45%", alignItems: "center" }}>
                                <span
                                    style={{
                                        color: "#9E9E9E",
                                        textAlign: "center",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        letterSpacing: "-0.24px",
                                        lineHeight: "36px",
                                        marginRight: "10%",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    승률
                                </span>
                                <div style={{ width: "50px", overflow: "hidden" }}>
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "#3C3C3C",
                                            textAlign: "center",
                                            fontSize: "12px",
                                            fontWeight: 700,
                                            letterSpacing: "-0.24px",
                                            lineHeight: "36px",
                                        }}
                                    >
                                        {(worldcup.winning_rate * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div
                                    style={{
                                        position: "relative",
                                        height: "20px",
                                        width: "50%",
                                        backgroundColor: "#F2F2F2",
                                        borderRadius: "5px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#FFCE00",
                                            width: worldcup.winning_rate * 100,
                                            height: "100%",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <DropDown
                            worldcup={worldcup}
                            setPopup={setPopup}
                            selectedPlace={selectedPlace}
                            selectedUser={selectedUser}
                        />
                    </div>
                ))}
            </div>
            {popup &&
                <WorldcupFriend
                    clickProfile={clickProfile}
                    place={selectedPlace.current}
                    setPopup={setPopup}
                    userFromRank={selectedUser.current}
                />
            }
        </>
    );
};

const WorldCup = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { setGame, pickPlace, getNextGame, getWinner } = useWorldcup();
    const { Toggle, isOn } = useToggle();
    const places = useSelector(state => state.place.allplaces);
    const filteredPlaces = useRef(null);
    const matchingUserId = useRef(null);
    const selectedPlace = useRef(null);
    const [popup, setPopup] = useState(false);
    const [round, setRound] = useState(16);
    const [gameNum, setGameNum] = useState(0);
    const [phase, setPhase] = useState('ready');
    const [profileOpen, setProfileOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
        const tempPlaces = places?.filter(place => {
            return (isOn ? place.campus === "명륜" : place.campus === "율전") && place.category !== "카페";
        });
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

    const clickProfile = useCallback((friendId) => {
        matchingUserId.current = friendId;
        setProfileOpen(true);
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Header title="음식점 월드컵" handleBack={() => router.push('/')} />
                <div style={{ margin: "63px 24px 0", overflow: "hidden", display: profileOpen ? 'none' : 'block' }}>
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
                        <Finish
                            clickProfile={clickProfile}
                            getWinner={getWinner}
                            phase={phase}
                            selectedPlace={selectedPlace}
                            setPlacePopup={setPopup}
                            setPhase={setPhase}
                        />
                    }
                    {phase === 'rank' && 
                        <Rank
                            clickProfile={clickProfile}
                            selectedPlacePopup={selectedPlace}
                            setPlacePopup={setPopup}
                            phase={phase}
                            setLoading={setLoading}
                        />
                    }
                </div>
            <ClickProfile
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
                matchingUserId={matchingUserId.current}
            />
            {popup && <Popup selectedPlace={selectedPlace.current} setPopup={setPopup} />}
            {loading && <Loading />}
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