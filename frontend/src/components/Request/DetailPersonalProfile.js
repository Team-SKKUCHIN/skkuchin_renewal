import React, { useEffect } from 'react';
import Header from '../MealPromise/Header';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { clear_matching, load_other_matching_info } from '../../actions/matchingUser/matchingUser';
import FriendProfile from '../MealPromise/FriendProfile';

export const DetailPersonalProfile = ({ id, setPersonalOn }) => {
    const dispatch = useDispatch();
    const candidate = useSelector(state => state.matchingUser.matchingUser);

    useEffect(() => {
        dispatch(load_other_matching_info(id.current));
        return () => dispatch(clear_matching());
    }, []);

    return (
        <PopupContainer>
            <PopupSubContainer>
                <Header title="프로필 보기" onBackClick={() => setPersonalOn(false)} />
                <FriendProfile candidate={candidate} />
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
