import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ErrorPopup = ({ open, handleClose, message, btnText, type, onConfirm }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <div style={{ padding: '12px 16px 16px', textAlign: 'center', minWidth: 300}}>
                <div style={{width: '100%', justifyContent: 'flex-end', display: 'flex'}}>
                    <IconButton
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{p: 0}}
                    >
                        <CloseIcon width={24} height={24}/>
                    </IconButton>
                </div>

                <DialogContent sx={{p: '20px 10px'}}>
                <Typography sx={{fontSize: 16, fontWeight: 600, color: '#3C3C3C', whiteSpace: 'pre-line' }}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{p: '16px 0 0'}}>
                {
                    type === 'success' ?
                    <Button disableElevation fullWidth onClick={handleClose} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        {btnText}
                    </Button>
                    :
                    <Button disableElevation fullWidth onClick={onConfirm} sx={{ backgroundColor: '#FFCE00', color: '#fff', fontSize: 16, fontWeight: 700, p: '9px', borderRadius: '10px'}}>
                        {btnText}
                    </Button>
                }
            </DialogActions>
        </div>
        </Dialog>
    );
};

export default ErrorPopup;
