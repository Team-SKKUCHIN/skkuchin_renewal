import styled from '@emotion/styled';
import { closeIcon } from '../image/recommend';
import Image from 'next/image';

const NoticePopup = ({ setPopup }) => {
    const text = `스꾸게시판은 성대생들의 밥 고민을 해결하기 위해 만들어졌어요

    오직 성대생만 참여할 수 있기 때문에 찐맛집을 추천하고, 추천 받을 수 있어요!

    무엇을 먹을까, 누구와 먹을까
    함께 고민하고 활발히 소통하는 공간이 되길 바랍니다

    밥을 매개로 논하는 다양한 취미 공유는 언제나 환영이에요. 다만, 커뮤니티 분위기에 악영향을 미치는 행위는 모두 삼가해주세요🙏

    `

    const link = <a style={{ textDecoration: 'none', color: '#777' }} href="https://chiseled-porch-e69.notion.site/68ae07cde8d54720933275cdf463ef03" target='_blank'>참고: 스꾸친 이용가이드</a>

    return (
        <PopupContainer>
            <PopupSubContainer>
                <PopupWrapper>
                    <div style={{
                        height: "100%",
                        width: "100%",
                        overflowY: "scroll",
                        paddingRight: "32px",
                    }}>
                        <p
                            style={{
                                margin: '0 0 16px',
                                color: "#000",
                                fontSize: "14px",
                                letterSpacing: "-0.36px",
                                whiteSpace: 'pre-line',
                            }}
                        >
                            <span style={{ fontWeight: 800 }}>{text}</span>
                            <span style={{ fontWeight: 800 }}>{link}</span>
                        </p>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <PopupButton
                                onClick={() => {
                                    setPopup(false);
                                    localStorage.setItem('guide', false);
                                }}
                            >
                                다시 보지 않기
                            </PopupButton>
                            <PopupButton onClick={() => setPopup(false)}>
                                닫기
                            </PopupButton>
                        </div>
                    </div>
                </PopupWrapper>
            </PopupSubContainer>
        </PopupContainer>
    );
};

export default NoticePopup;

const PopupContainer = styled.div`
    ::-webkit-scrollbar {
        display: none;
    }
    *::-webkit-scrollbar {
        display: none;
    }
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
    width: 100%;
    padding: 32px 16px;
    border-radius: 10px;
    background-color: #FFF;
    overflow: hidden;
`;

const PopupButton = styled.div`
    margin: 0 1%;
    width: 100%;
    padding: 8px;
    height: 40px;
    border-radius: 8px;
    background-color: #F2F2F2;
    color: #BABABA;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
`