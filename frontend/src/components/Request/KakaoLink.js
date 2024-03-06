import Image from 'next/image';
import { Header } from '../Header';
import { linkCharacter } from '../../image/request';
import styled from '@emotion/styled';
import AlertMessage from '../Alert';
import { useCallback, useState } from 'react';
import { convertName } from '../../utils/wordConvertor';


export const KakaoLink = ({ senderName, link, setLinkOn }) => {
    const [alertOpen, setAlertOpen] = useState(false);

    const clip = useCallback(() => {
        navigator.clipboard.writeText(link.current)
            .then(() => {
                setAlertOpen(true);
            })
            .catch((err) => {
                console.error('Unable to copy to clipboard', err);
            });
    }, []);

    return (
        <PopupContainer>
            <PopupSubContainer>
                <AlertMessage alertOpen={alertOpen} setAlertOpen={setAlertOpen} alertMessage="링크가 복사되었습니다." />
                <Header title="" handleBack={() => setLinkOn(false)} />
                <div style={{ width: '100%', margin: '37% 0 15px', display: 'flex', justifyContent: 'center' }}>
                    <Image src={linkCharacter} width={67} height={55.73} layout='fixed' />
                </div>
                <p style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 800, lineHeight: '18px', textAlign: 'center' }}>
                    [{senderName.current}] {convertName(senderName.current, 'subject')} 애타게 연락을 기다리고 있어요.
                </p>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: 700, lineHeight: '16px', textAlign: 'center' }}>
                    지금 바로 오픈 채팅방에 입장하여 인사를 나눠보세요.
                </p>
                <div style={{ marginTop: '77px', width: '100%' }}>
                    <span style={{ fontSize: '14px', lineHeight: '16px', textAlign: 'left' }}>
                        카카오톡 오픈 채팅 링크
                    </span>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <input
                            value={link.current}
                            readOnly
                            style={{ width: '100%', height: '46px', padding: '10px 13px 10px 17px',
                                borderRadius: '8px', backgroundColor: '#FBFBFB', border: '1px solid #E2E2E2',
                                fontSize: '16px', lineHeight: '18px', marginRight: '10px', overflowX: 'auto'
                        }} />
                        <button
                            onClick={clip}
                            style={{ width: '60px', height: '46px', border: '1px solid #E2E2E2',
                                borderRadius: '8px', backgroundColor: '#FFFFFF'
                        }}>
                            복사
                        </button>
                    </div>
                </div>
            </PopupSubContainer>
        </PopupContainer>
    );
};

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
    padding: 0 24px;
    background-color: #fff;
`;
