import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const Popup = ({ open, handleClose, type, message, question, description, onQuestionConfirm, onReasonConfirm }) => {
    const [deleteReason, setDeleteReason] = useState('');

    const handleReasonConfirm = () => {
        onReasonConfirm(deleteReason);
        handleClose();
    }

    return (
        <>
            {type !== '' && (
                <Dialog open={open} onClose={handleClose}>
                    <div style={{padding: '32px 16px 16px', textAlign: 'center', minWidth: 300}}>
                        <DialogContent sx={{p: '0 16px'}}>
                            <Typography sx={{fontSize: 16, fontWeight: 600, color: '#3C3C3C', whiteSpace: 'pre-line' }}>
                                {message}
                                {question !== '' && (
                                    <Typography sx={{fontSize: 16, fontWeight: 800, color: '#3C3C3C', mt: '15px'}}>
                                        {question}
                                    </Typography>
                                )}
                                {description !== '' && (
                                    <Typography sx={{fontSize: 14, fontWeight: 400, color: '#777777', mt: '16px'}}>
                                        {description}
                                    </Typography>
                                )}
                                {type === 'reason' && (
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="필수사항입니다."
                                        variant="outlined"
                                        value={deleteReason}
                                        onChange={(e) => setDeleteReason(e.target.value)}
                                        sx={{ mt: '16px' }}
                                    />
                                )}
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{p: '16px 0 0'}}>
                            {type === 'check' && (
                                <Button disableElevation fullWidth sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                                    확인
                                </Button>
                            )}
                            {type === 'question' && (
                                <div style={{display: 'flex', width: '100%', flexDirection: 'row', gap: '8px'}}>
                                    <Button disableElevation fullWidth onClick={handleClose} sx={{ backgroundColor: '#F2F2F2', color: '#BABABA', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                                        아니오
                                    </Button>
                                    <Button disableElevation fullWidth onClick={onQuestionConfirm} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                                        삭제
                                    </Button>
                                </div>
                            )}
                            {type === 'reason' && (
                                <div style={{display: 'flex', width: '100%', flexDirection: 'row', gap: '8px'}}>
                                    <Button disableElevation fullWidth onClick={handleClose} sx={{ backgroundColor: '#F2F2F2', color: '#BABABA', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                                        취소
                                    </Button>
                                    <Button disableElevation fullWidth onClick={handleReasonConfirm} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                                        확인
                                    </Button>
                                </div>
                            )}
                        </DialogActions>
                    </div>
                </Dialog>
            )}
        </>
    );
};

export default Popup;
