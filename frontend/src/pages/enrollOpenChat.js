import React, { useEffect, useState } from 'react';
import theme from '../theme/theme';
import { CssBaseline, ThemeProvider, Typography, OutlinedInput, Button } from '@mui/material';
import Header from '../components/MealPromise/Header';
import Popup from '../components/Custom/Popup';
import { useRouter } from 'next/router';

const enrollOpenChat = () => {
    const router = useRouter();

    const { type } = router.query;

    const [openChatLink, setOpenChatLink] = useState(''); 

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('question');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupDescription, setPopupDescription] = useState('');

    const handleSubmit = () => {
        console.log("확인 버튼 클릭");
        if(openChatLink !== '') {
            setPopupMessage(`밥약을 신청하시겠어요?\n(신청 후 취소는 불가해요)`);
            setPopupType('question');
        }
        setPopupOpen(true);
    }

    const handleQuestionConfirm = () => {
        setPopupMessage(`밥약 신청을 완료했어요!\n밥약이 성사되면 SMS로 알려드릴게요`);
        setPopupDescription('밥약 신청 내역은 홈 > 신청현황에서 확인할 수 있어요.');
        setPopupOpen(true);
        setPopupType('info');
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header title="" icon='close'/>
            <div style={{padding: '0 24px', fontSize: '16px', flex: 1}}>
                <Typography sx={{ fontWeight: 'bold', m: '50px 0', p: '25px 0', textAlign: 'center' }}>
                    [상대]에게 전달할<br />
                    <span style={{ backgroundColor: '#FFCE00', padding: '0 3px', display: 'inline-block', lineHeight: '0.65em' }}>카카오톡 {type === 'friend' ? '개인' : '그룹'} 오픈 채팅방 링크</span>를 입력해주세요.
                </Typography>
                <Typography sx={{fontSize: '14px', color: '3C3C3C'}}>
                    카카오톡 오픈 채팅 링크
                </Typography>
                <OutlinedInput
                    fullWidth
                    sx={{ p: '12px 17px', borderRadius: '8px','& input': { padding: '0' }, m: '8px 0 50px' }}
                    placeholder="링크를 붙여넣기 해주세요."
                    value={openChatLink}
                    onChange={(e) => setOpenChatLink(e.target.value)}
                />

                <div>
                    <Typography sx={{fontSize: '12px', color: '#777777', fontWeight: 'bold', mb: '20px'}}>• 첨부된 링크는 수정이 불가하니 한번  더 체크해주세요.</Typography>
                    <Typography sx={{fontSize: '12px', color: '#777777', fontWeight: 'bold', mb: '20px'}}>• 밥약이 성사되면 상대에게 카카오톡 오픈채팅방 링크가 공개돼요.</Typography>
                    <Typography sx={{fontSize: '12px', color: '#777777', fontWeight: 'bold', mb: '20px'}}>• 밥약 신청이 거절되면 링크는 공개되지 않으니 걱정마세요.</Typography>
                    <Typography sx={{fontSize: '12px', color: '#777777', fontWeight: 'bold', mb: '20px'}}>• 
                        {
                            type == 'friend' ?
                            <a href='#' style={{color: '#777777'}}>카카오톡 오픈 채팅방 링크 생성 가이드</a>
                            : <a href='#' style={{color: '#777777'}}>카카오톡 그룹 오픈 채팅방 링크 생성 가이드</a>
                        }
                    </Typography>
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                disableElevation
                disabled={openChatLink === ''}
                sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
            >
                확인
            </Button>

            <Popup
                open={popupOpen}
                handleClose={() => setPopupOpen(false)}
                type={popupType}
                message={popupMessage}
                description={popupDescription}
                onConfirm={handleQuestionConfirm}
            />
        </ThemeProvider>
    );
}

export default enrollOpenChat;
