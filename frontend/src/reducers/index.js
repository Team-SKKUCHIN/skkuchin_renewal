import { combineReducers } from 'redux';
import authReducer from './auth';
import favoriteReducer from './favorite';
import menuReducer from './menu';
import placeReducer from './place';
import reviewReducer from './review';
import candidateReducer from './candidate';
import matchingUserReducer from './matchingUser';
import chatMessageReducer from './chatMessage';
import chatRoomReducer from './chatRoom';
import chatRequestReducer from './chatRequest';
import chatAlarmReducer from './chatAlarm';
import noticeAlarmReducer from './noticeAlarm';
import noticeReducer from './notice';
import rankReducer from './rank';
import postReducer from './post';
import commentReducer from './comment';
import likeReducer from './like';
import magazineReducer from './magazine';
import worldcupReducer from './worldcup';
import groupProfileReducer from './groupProfile';

export default combineReducers({
    auth: authReducer,
    favorite: favoriteReducer,
    place: placeReducer,
    menu: menuReducer,
    review: reviewReducer,
    candidate: candidateReducer,
    matchingUser: matchingUserReducer,
    chatMessage: chatMessageReducer,
    chatRequest: chatRequestReducer,
    chatRoom: chatRoomReducer,
    chatAlarm: chatAlarmReducer,
    notice: noticeReducer,
    noticeAlarm: noticeAlarmReducer,
    rank: rankReducer,
    post: postReducer,
    comment: commentReducer,
    like: likeReducer,
    magazine: magazineReducer,
    worldcup: worldcupReducer,
    groupProfile: groupProfileReducer
});