import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from '../theme/theme';
import Image from "next/image";
import { copy, figure1, figure2, mbti } from '../image/event'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { eventAnswers, eventPercentage, eventQuestions, eventResult, useResults } from "../utils/eventHelper";
import { useRouter } from "next/router";
import { Loading } from "../components/Loading";
import AlertMessage from "../components/Alert";

const Result = ({ getResults }) => {
    const router = useRouter();
    const resultCount = useRef(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [resultIndex, setResultIndex] = useState(null);
    const { name, tags, explains, figures } = eventResult[resultIndex ?? 0];

    const statistics = {
        '점수': resultCount.current,
        '상위': eventPercentage[resultCount.current],
    };

    const clip = useCallback(() => {
        const url = window.document.location.href;

        navigator.clipboard.writeText(url)
          .then(() => {
            setAlertOpen(true);
          })
          .catch((err) => {
            console.error('Unable to copy to clipboard', err);
          });
    }, []);

    const checkAnswer = useCallback(() => {
        const results = getResults();

        const count = results.filter((value, index) => value === eventAnswers[index]).length;
        resultCount.current = count;
        let index;
        
        if (count < 5) {
            index = 3;
        } else if (count < 8) {
            index = 2;
        } else if (count < 10) {
            index = 1;
        } else {
            index = 0;
        }

        setResultIndex(index);
    }, [eventAnswers])

    useEffect(() => {
        checkAnswer();
        const timeId = setTimeout(() => {
            setLoading(false);
        }, 3000)

        return () => clearTimeout(timeId);
    }, [])

    return (
        <>
            <AlertMessage alertOpen={alertOpen} setAlertOpen={setAlertOpen} alertMessage="복사되었습니다" />
            {!loading && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ margin: '0 40px' }}>
                        <h3
                            style={{
                                margin: '20% 0 0',
                                color: '#BABABA',
                                textAlign: 'center',
                                fontSize: '16px',
                                fontWeight: 800,
                                letterSpacing: '-0.32px',
                            }}
                        >
                            나의 입맛 레벨은?
                        </h3>
                        <h1
                            style={{
                                margin: '15px 0 0',
                                color: '#3C3C3C',
                                textAlign: 'center',
                                fontSize: '32px',
                                fontWeight: 800,
                                letterSpacing: '-1.28px',
                            }}
                        >
                            {name}
                        </h1>
                        <div
                            style={{
                                marginTop: '25px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Image src={mbti} width={293} height={168} layout='fixed' placeholder='blur' />
                        </div>
                        <div
                            style={{
                                marginTop: '35px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: '#FFFCE4',
                                        color: '#FFAC0B',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        letterSpacing: '-0.28px',
                                    }}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            {explains.map((explain, index) => (
                                <li
                                    key={index}
                                    style={{
                                        listStyleType: 'circle',
                                        margin: 0,
                                        color: '#3C3C3C',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        lineHeight: '26px',
                                        letterSpacing: '-0.165px',
                                    }}
                                >
                                    {explain}
                                </li>
                            ))}
                        </div>
                        <div
                            style={{
                                marginTop: '50px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >​
                            {Object.entries(statistics).map(([key, value]) => (
                                <div
                                    key={key}
                                    style={{
                                        marginLeft: key !== '점수' && 'auto',
                                        marginRight: key === '점수' && 'auto',
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#9E9E9E',
                                            fontSize: '16px',
                                            fontWeight: 800,
                                            letterSpacing: '-0.32px',
                                        }}
                                    >
                                        {key}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: '25px',
                                            color: '#3C3C3C',
                                            textAlign: 'center',
                                            fontSize: '24px',
                                            fontWeight: 800,
                                            letterSpacing: '-0.96px',
                                        }}
                                    >
                                        {key === '점수' ? `${value} / 10점` : `${value}%`}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            <p
                                style={{
                                    color: '#9E9E9E',
                                    fontSize: '16px',
                                    fontWeight: 800,
                                    letterSpacing: '-0.32px',
                                }}
                            >
                                나와 입맛이 비슷한 동문
                            </p>
                            <div
                                style={{
                                    marginTop: '18px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {Object.entries(figures).map(([key, value]) => (
                                    <div key={key}>
                                        <div
                                            style={{
                                                width: '135px',
                                                height: '135px',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <Image
                                                src={value}
                                                layout='responsive'
                                                placeholder='blur'
                                                objectFit='cover'
                                            />
                                        </div>
                                        <div
                                            style={{
                                                marginTop: '10px',
                                                textAlign: 'center',
                                                color: '#3C3C3C',
                                                fontSize: '14px',
                                                fontWeight: 800,
                                                letterSpacing: '-0.28px',
                                            }}
                                        >
                                            {key}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            style={{
                                margin: '50px 0',
                                display: 'flex',
                            }}
                        >
                            <div
                                style={{
                                    width: '54px',
                                    height: '56px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={clip}
                            >
                                <Image
                                    src={copy}
                                    layout='responsive'
                                    objectFit='cover'
                                />
                            </div>
                            <button
                                style={{
                                    height: '56px',
                                    width: '265px',
                                    marginLeft: 'auto',
                                    border: 0,
                                    borderRadius: '8px',
                                    backgroundColor: '#FFCE00',
                                    color: '#FFF',
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                }}
                                onClick={() => router.replace('/')}
                            >
                                스꾸친 바로가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {loading && <Loading />}
        </>
    );
};

const Main = ({ setPhase, onResponse }) => {
    const [step, setStep] = useState(0);
    const [pressedButton, setPressedButton] = useState(null);
    const { questionId, question, choices } = eventQuestions[step];

    const press = useCallback((index) => {
        setPressedButton(null);
        onResponse(index);
        
        if (step + 1 < 10) {
            setStep(step + 1);
        } else {
            setPhase('result');
        }
    }, [step])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <h1
                style={{
                    margin: '20% 0 0',
                    color: '#FFCE00',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 800,
                    letterSpacing: '-0.96px',
                }}
            >
                Q{questionId + 1}.
            </h1>
            <div
                style={{
                    marginTop: '20px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Image src={mbti} width={288} height={165} layout='fixed' placeholder='blur' />
            </div>
            <div
                style={{
                    width: '100%',
                    marginTop: '34px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {question.map((text, index) => (
                    <p 
                        key={index}
                        style={{
                            margin: 0,
                            color: '#3C3C3C',
                            textAlign: 'center',
                            fontSize: '21px',
                            fontWeight: 800,
                            letterSpacing: '-0.84px',
                        }}
                    >
                        {text}
                    </p>
                ))}
            </div>
            <div
                style={{
                    position: 'fixed',
                    bottom: 30,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        width: '100%',
                        maxWidth: '430px',
                    }}
                >
                    {choices.map((choice, index) => (
                        <button
                            key={index}
                            style={{
                                margin: '12px auto 0',
                                width: '90%',
                                height: '64px',
                                border: pressedButton === index ? '2px solid #FFCE00' : 0,
                                borderRadius: '12px',
                                backgroundColor: pressedButton === index ? '#FFFCE4' : '#F2F2F2',
                                color: '#3C3C3C',
                                textAlign: 'center',
                                fontSize: '16px',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                            onClick={() => press(index)}
                            onMouseLeave={() => setPressedButton(null)}
                            onMouseOver={() => setPressedButton(index)}
                            onTouchStart={() => setPressedButton(index)}
                            onTouchEnd={() => setPressedButton(null)}
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Intro = ({ setPhase }) => {
    const count = 1398;
    const content = '새내기, 헌내기, 성균관 유생, 스꾸라테스 중\n나의 입맛 타입을 알려주는 테스트';

    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <h1
                    style={{
                        margin: '40% 0 0 0',
                        textAlign: 'center',
                        fontSize: '35px',
                        fontWeight: 800,
                        letterSpacing: '-1.4px',
                    }}
                >
                    나의 입맛 레벨은?
                </h1>
                <p
                    style={{
                        margin: '18px 0 0 0',
                        color: '#777',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: 700,
                        letterSpacing: '-0.32px',
                        whiteSpace: 'pre-line',
                    }}
                >
                    {content}
                </p>
                <div
                    style={{
                        marginTop: '69px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Image src={mbti} width={293} height={168} layout='fixed' placeholder='blur' />
                </div>
            </div>
            <div
                style={{
                    position: 'fixed',
                    bottom: 40,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        width: '100%',
                        maxWidth: '430px',
                    }}
                >
                    {/* <span
                        style={{
                            color: '#FFAC0B',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: 800,
                            letterSpacing: '-0.24px',
                        }}
                    >
                        지금까지 {count}명이 참여했어요!
                    </span> */}
                    <button
                        style={{
                            margin: '15px auto 0',
                            width: '90%',
                            height: '56px',
                            border: 0,
                            borderRadius: '8px',
                            backgroundColor: '#FFCE00',
                            color: '#FFF',
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: 800,
                            cursor: 'pointer',
                        }}
                        onClick={() => setPhase('main')}
                    >
                        스꾸테스트 시작하기
                    </button>
                </div>
            </div>
        </>
    );
}

const Event = () => {
    const { onResponse, getResults } = useResults();
    const [phase, setPhase] = useState('intro');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {phase === 'intro' && <Intro setPhase={setPhase} />}
            {phase === 'main' && <Main setPhase={setPhase} onResponse={onResponse} />}
            {phase === 'result' && <Result getResults={getResults} />}
        </ThemeProvider>
    )
}

export default Event;