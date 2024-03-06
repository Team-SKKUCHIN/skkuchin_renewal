import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Popup = ({ open, handleClose, type, message, description, confirmText=null, onConfirm }) => {
    const handleQuestionConfirm = () => {
        onConfirm();
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <div style={{padding: '32px 16px 16px', textAlign: 'center', minWidth: 300}}>
            {/* <DialogTitle> */}
                {
                    (type === 'settings' || type === 'verification') && (
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    )
                }
            {/* </DialogTitle> */}
            <DialogContent sx={{p: '25px 10px'}}>
                <Typography sx={{fontSize: 16, fontWeight: 600, color: '#3C3C3C', whiteSpace: 'pre-line' }}>
                    {message}
                    {
                        description !== '' && (
                        <Typography sx={{fontSize: 12, fontWeight: 400, color: '#3C3C3C', mt: '16px'}}>
                            {description}
                        </Typography>
                        )
                    }
                </Typography>
            </DialogContent>
            <DialogActions sx={{p: '16px 0 0'}}>
                {/* {type === 'info' && (
                    <Button disableElevation fullWidth onClick={onInfoConfirm} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        확인
                    </Button>
                )} */}
                {type === 'error' && (
                    <Button disableElevation fullWidth onClick={handleClose} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        확인
                    </Button>
                )}
                {type === 'question' && (
                <div style={{display: 'flex', width: '100%', flexDirection: 'row', gap: '8px'}}>
                    <Button disableElevation fullWidth onClick={handleClose} sx={{ backgroundColor: '#F2F2F2', color: '#BABABA', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        취소
                    </Button>
                    <Button disableElevation fullWidth onClick={handleQuestionConfirm} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        등록하기
                    </Button>
                </div>
                )}
                {type === 'request' && (
                <div style={{display: 'flex', width: '100%', flexDirection: 'row', gap: '8px'}}>
                    <Button disableElevation fullWidth onClick={handleClose} sx={{ backgroundColor: '#F2F2F2', color: '#BABABA', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        아니요
                    </Button>
                    <Button disableElevation fullWidth onClick={onConfirm} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        {confirmText}
                    </Button>
                </div>
                )}
                {type === 'settings' && (
                <Button disableElevation onClick={handleClose} variant="contained" sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 18, p: '16px' }}>
                    설정하기
                </Button>
                )}
                {type === 'verification' && (
                    <Button disableElevation fullWidth onClick={onConfirm} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        인증하러 가기
                    </Button>
                )}
            </DialogActions>
        </div>
        </Dialog>
    );
};

export default Popup;
