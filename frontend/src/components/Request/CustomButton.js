import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reply_personal_request } from '../../actions/personalChatRequest/personalChatRequest';
import Popup from '../Custom/Popup';
import { reply_group_request } from '../../actions/groupChatRequest/groupChatRequest';
import { convertName } from '../../utils/wordConvertor';
import { Loading } from '../Loading';

const OneButton = ({ request, senderName, link, setLinkOn, text, isDisabled, style }) => (
    <div style={{ width: '100%', marginBottom: '30px' }}>
        <button
            disabled={isDisabled}
            onClick={() => {
                senderName.current = request.gender ? request.nickname : request.sender_profile.group_name;
                link.current = request.link ?? null;
                setLinkOn(true);
            }}
            style={{ width: '100%', height: '50px', border: style?.border ?? 'none',
                borderRadius: '10px', backgroundColor: style?.backgroundColor ?? '#FFF', fontSize: '16px',
                color: style?.color ?? '#FFF', fontWeight: 800, lineHeight: '18px'
        }}>
            {text}
        </button>
    </div>
);

const TwoButton = ({ onReply }) => (
    <div style={{ display: 'flex', width: '100%', marginBottom: '30px' }}>
        <button
            onClick={() => onReply('REFUSE')}
            style={{ width: '100%', height: '41px', marginRight: '1.5%',
                border: 'none', borderRadius: '10px', backgroundColor: '#F2F2F2',
                fontSize: '16px', color: '#BABABA', fontWeight: 800, lineHeight: '18px'
        }}>
            거절
        </button>
        <button
            onClick={() => onReply('ACCEPT')}
            style={{ width: '100%', height: '41px', marginRight: '1.5%',
                border: 'none', borderRadius: '10px', backgroundColor: '#FFCE00',
                fontSize: '16px', color: '#FFFFFF', fontWeight: 800, lineHeight: '18px'
        }}>
            수락
        </button>
    </div>
);


export const CustomButton = ({ selectedIndex, request, senderName, link, setLinkOn }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('request');
    const popupMessage = useRef('');
    const popupDescription = useRef('');
    const statusType = useRef('');
    const btnText = useRef('');
    const isMine = request.receiver_profile?.is_mine || request.receiver_id === user.id;

    const statusTextDict = useMemo(() => {
        return {
            text: {
                HOLD: '수락 대기 중',
                ACCEPT: isMine ? '오픈 채팅방 링크 보기' : '상대가 밥약을 수락했어요',
                REFUSE: '다음 기회에 만나요',
            },
            style: {
                HOLD: {
                    border: 'none',
                    backgroundColor: '#F2F2F2',
                    color: '#BABABA',
                },
                ACCEPT: isMine ? {
                    border: 'none',
                    backgroundColor: '#FFCE00',
                    color: '#FFFFFF',
                } : {
                    border: '1px solid #FFCE00',
                    backgroundColor: '#FFFCE4',
                    color: '#FFAC0B',
                },
                REFUSE: {
                    border: 'none',
                    backgroundColor: '#E2E2E2',
                    color: '#9E9E9E',
                },
            }
        }
    }, [request])

    const handleReply = useCallback((status) => {
        statusType.current = status;
        popupMessage.current = status === 'ACCEPT' ? '밥약 신청을 수락하시겠어요?' : '정말 밥약 신청을 거절하시겠어요?\n한번 거절한 밥약은 되돌릴 수 없어요.';
        btnText.current = status === 'ACCEPT' ? '수락' : '거절';
        popupDescription.current = '';
        setPopupType('request');
        setPopupOpen(true);
    }, [])

    const handleQuestionConfirm = useCallback(() => {
        setIsLoading(true);
        let name = '';
        if (request.gender) {
            name = request.nickname;
            dispatch(reply_personal_request(request.request_id, statusType.current, ([result, message]) => {
                setIsLoading(false);
            }));
        } else {
            name = request.sender_profile.group_name;
            dispatch(reply_group_request(request.request_id, statusType.current, ([result, message]) => {
                setIsLoading(false);
            }));
        }

        if (statusType.current === 'ACCEPT') {
            popupMessage.current = `[${name}]${convertName(name, 'andOr')}의 밥약이 성사되었어요!`;
            popupDescription.current = '지금 바로 [확정 내역]에서\n상대의 오픈 채팅 링크를 확인하고 입장해주세요.';
        } else {
            popupMessage.current = '밥약 신청을 거절했습니다.\n다음에 더 좋은 기회로 만나요!';
            popupDescription.current = '';
        }
        setPopupType('check');
        setPopupOpen(true);
    }, [request]);

    return (
        <>
            {isLoading && <Loading />}
            {selectedIndex === 0 ?
                <TwoButton onReply={handleReply} />
                :
                <OneButton
                    request={request}
                    senderName={senderName}
                    link={link}
                    setLinkOn={setLinkOn}
                    text={statusTextDict.text[request.status]}
                    isDisabled={request.status !== 'ACCEPT' || !isMine}
                    style={statusTextDict.style[request.status]}
                />
            }
            <Popup
                open={popupOpen}
                handleClose={() => setPopupOpen(false)}
                type={popupType}
                message={popupMessage.current}
                description={popupDescription.current}
                confirmText={btnText.current}
                onConfirm={handleQuestionConfirm}
            />
        </>
    )
};
