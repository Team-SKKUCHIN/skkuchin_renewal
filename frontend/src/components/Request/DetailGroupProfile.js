import React, { useEffect, useState } from 'react';
import Header from '../MealPromise/Header';
import GroupProfile from '../MealPromise/GroupProfile';
import { useSelector, useDispatch } from 'react-redux';
import { clear_candidate_profile, load_candidate_profile } from '../../actions/groupProfile/groupProfile';
import { Loading } from '../Loading';
import styled from '@emotion/styled';

export const DetailGroupProfile = ({ id, isMine, setGroupOn }) => {
    const dispatch = useDispatch();
    const group = useSelector(state => state.groupProfile.candidateGroup);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(load_candidate_profile(id.current, ([result, message]) => {
            if (result) {
                console.log("그룹 프로필 불러오기 성공");
                setLoading(false);
            } else {
                console.log("그룹 프로필 불러오기 오류" + message);
            }
        }));

        return () => dispatch(clear_candidate_profile());
    }, []);

    return (
        <PopupContainer>
            <PopupSubContainer>
                <Header title= { isMine.current ? "나의 그룹 프로필" : "여럿이서 먹어요" } onBackClick={() => setGroupOn(false)} />
                {
                    loading ? <Loading />
                    : <GroupProfile isMyProfile={true} group={group}/>
                } 
            </PopupSubContainer>
        </PopupContainer>
    )
}

const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`;

const PopupSubContainer = styled.div`
    height: 100%;
    width: 100%;
    max-width: 420px;
    background-color: #fff;
`;
