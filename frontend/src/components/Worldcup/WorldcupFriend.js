import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { load_nonuser_detail_worldcup, load_user_detail_worldcup } from '../../actions/worldcup/worldcup';
import { closeIcon } from '../../image/recommend';
import Image from 'next/image';
import { mbtiDict } from '../../image/mbti/profile';
import GoLogin from '../GoLogin';
import { useRouter } from 'next/router';

const WorldcupFriend = ({ winner, setPopup }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const user = useSelector(state => state.auth.user);
    const worldcup = useSelector(state => state.worldcup.worldcup);
    
    const matchingUser = worldcup && !Array.isArray(worldcup) && worldcup.users[0];

    const getKeyword = useCallback((index) => {
        if (!matchingUser) {
            return null;
        }
        
        return Object.values(matchingUser.keywords)[index][0];
    }, [matchingUser]);


    const handleFriendClick = useCallback((friendId) => {
        if (user) {
            router.push(`/clickProfile?id=${friendId}`);
        } else {
            setIsLogin(true);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            dispatch(load_user_detail_worldcup(winner.id));
        } else {
            dispatch(load_nonuser_detail_worldcup(winner.id));
        }
    }, [winner, user])

    const text = "에서\n같이 먹을 친구를 만들어봐요!";

    return (
        <>
            {isLogin && <GoLogin open={isLogin} onClose={setIsLogin} /> }
            <PopupContainer>
                <PopupSubContainer>
                    <PopupWrapper>
                        <div style={{ height: "24px", width: "100%", position: "relative" }}>
                            <div style={{ position: 'absolute', right: 0 }}>
                                <Image
                                    src={closeIcon}
                                    name='back'
                                    onClick={() => setPopup(false)}
                                    layout='fixed'
                                    width={24}
                                    height={24}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                        <p
                            style={{
                                margin: "40px 0",
                                color: "#000",
                                fontSize: "18px",
                                fontWeight: 700,
                                letterSpacing: "-0.36px",
                                whiteSpace: 'pre-line',
                                textAlign: 'center',
                            }}
                        >
                            <span style={{ fontWeight: 800 }}>{winner.name}</span>
                            {text}
                        </p>
                        <Image
                            src={mbtiDict[matchingUser?.mbti ?? 'ENTP']}
                            width={140}
                            height={140}
                            layout='fixed'
                        />
                        <div style={{ display: "flex", margin: "12px 0" }}>
                            <span
                                style={{
                                    color: "#3C3C3C",
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    letterSpacing: "-0.36px",
                                }}
                            >
                                {matchingUser?.nickname ?? null}
                            </span>
                            <div
                                style={{
                                    marginLeft: "8px",
                                    padding: "5px",
                                    borderRadius: "10px",
                                    backgroundColor: "#FFFCE4",
                                    color: "#FFAC0B",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    letterSpacing: "-0.24px",
                                }}
                            >
                                {matchingUser?.campus ?? null}
                            </div>
                        </div>
                        <p
                            style={{
                                display: "flex",
                                margin: "12px 0 8.17px",
                                color: "#777",
                                fontSize: "14px",
                                letterSpacing: "-0.28px",
                            }}
                        >
                            {matchingUser ? `${matchingUser.major} / ${matchingUser.student_id}학번 / ${matchingUser.gender[0]}` : null}
                        </p>
                        <div style={{ display: "flex" }}>
                            <AttributeDiv style={{ marginRight: "4px" }}>{matchingUser?.mbti ?? null}</AttributeDiv>
                            <AttributeDiv>{getKeyword(0)}</AttributeDiv>
                            <AttributeDiv style={{ marginLeft: "4px" }}>{getKeyword(1)}</AttributeDiv>
                        </div>
                        <p
                            style={{
                                margin: "15.83px 0 40px",
                                color: "#777",
                                fontSize: "14px",
                                letterSpacing: "-0.28px",
                            }}
                        >
                            {matchingUser ? `"${matchingUser.introduction}"` : null}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <button
                                style={{
                                    width: "48.5%",
                                    padding: "16px 0",
                                    border: 0,
                                    borderRadius: "10px",
                                    backgroundColor: "#F2F2F2",
                                    color: "#BABABA",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    letterSpacing: "-0.32px",
                                    cursor: "pointer",
                                }}
                                onClick={() => matchingUser ? handleFriendClick(matchingUser.id): {}}
                            >
                                프로필 보기
                            </button>
                            <button
                                style={{
                                    width: "48.5%",
                                    padding: "16px 0",
                                    border: 0,
                                    borderRadius: "10px",
                                    backgroundColor: "#FFCE00",
                                    color: "#FFF",
                                    fontSize: "16px",
                                    fontWeight: 800,
                                    letterSpacing: "-0.32px",
                                    cursor: "pointer",
                                }}
                            >
                                밥약걸기
                            </button>
                        </div>
                    </PopupWrapper>
                </PopupSubContainer>
            </PopupContainer>
        </>
    );
};

export default WorldcupFriend;

const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const PopupSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    max-width: 420px;
    background-color: rgba(34, 40, 48, 0.60);
    padding: 0 24px;
`;

const PopupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto 0;
    width: 100%;
    max-width: 327px;
    padding: 16px;
    border-radius: 16px;
    background-color: #FFF;
`;

const AttributeDiv = styled.div`
    padding: 4px 12px;
    border-radius: 24px;
    background-color: #F2F2F2;
    color: #777;
    font-size: 14px;
    letter-spacing: -0.28px;
`;
