import styled from '@emotion/styled';
import { closeIcon } from '../image/recommend';
import Image from 'next/image';

const NoticePopup = ({ setPopup }) => {
    const text1 = `[게시판 이용 전 읽어주세요]
    
    스꾸게시판은 인생 최대 고민인 ‘밥’을 해결하자는 취지에서 만들어졌어요
    
    오직 성대생만 참여할 수 있기 때문에
    맛집에서 나아가 맞춤식당을 추천받을 수 있어요!
    
    무엇을 먹을까, 누구와 먹을까
    함께 고민하고 활발히 소통하는 공간이 되길 바래요
    그러기 위해선 여러분의 적극적인 도움이 필요하구요!
    
    밥을 매개로 논하는 다양한 취미 공유는 언제나 환영이에요!
    다만, 커뮤니티 분위기에 악영향을 미치는 행위는 모두 삼가해주세요🙏

    `

    const link = <a style={{ color: '#777', textDecoration: 'none' }} href="https://chiseled-porch-e69.notion.site/68ae07cde8d54720933275cdf463ef03" target='_blank'>[스꾸친 이용가이드]</a>

    const text2 = `
    
    그럼 이제 스꾸게시판에서 여러분의 밥잘알 능력을 보여주세요!
    `


    return (
        <PopupContainer>
            <PopupSubContainer>
                <PopupWrapper>
                    <div style={{ height: "24px", width: "100%", position: "relative" }}>
                        <div style={{ position: 'absolute', right: 0 }}>
                            <Image
                                src={closeIcon}
                                name='close'
                                onClick={() => setPopup(false)}
                                layout='fixed'
                                width={24}
                                height={24}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div style={{ height: "100%", width: "100%", overflowY: "scroll", paddingBottom: "16px" }}>
                        <p
                            style={{
                                color: "#000",
                                fontSize: "13px",
                                letterSpacing: "-0.36px",
                                whiteSpace: 'pre-line',
                            }}
                        >
                            <span style={{ fontWeight: 800 }}>{text1}</span>
                            <span style={{ fontWeight: 800 }}>{'>> '}</span>
                            <span style={{ fontWeight: 800 }}>{link}</span>
                            <span style={{ fontWeight: 800 }}>{' 클릭'}</span>
                            <span style={{ fontWeight: 800 }}>{text2}</span>
                        </p>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <button
                                style={{
                                    border: 0,
                                    backgroundColor: "transparent",
                                    fontSize: "15px",
                                    letterSpacing: "-0.32px",
                                    cursor: "pointer",
                                    textDecorationLine: "underline",
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setPopup(false);
                                    localStorage.setItem('guide', false);
                                }}
                            >
                                다시 보지 않기
                            </button>
                        </div>
                    </div>
                </PopupWrapper>
            </PopupSubContainer>
        </PopupContainer>
    );
};

export default NoticePopup;

const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const PopupSubContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    max-width: 420px;
    background-color: rgba(34, 40, 48, 0.60);
    padding: 0 24px;
`;

const PopupWrapper = styled.div`
    margin: auto 0;
    height: 300px;
    width: 100%;
    padding: 16px 16px 32px;
    border-radius: 10px;
    background-color: #FFF;
`;
