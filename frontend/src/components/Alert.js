import { CssBaseline, ThemeProvider, Alert } from '@mui/material';
import theme from '../theme/theme';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

export default function AlertMessage({ alertOpen, setAlertOpen, alertMessage }){
    const [open, setOpen] = useState(alertOpen);
    
    useEffect(() => {
        setOpen(alertOpen);
      }, [alertOpen]);

    useEffect(() => {
        if(alertOpen){
        const timer = setTimeout(() => {
          setOpen(false);
          setAlertOpen(false);
        }, 1000);
    
        return () => clearTimeout(timer);
        }
      }, [alertOpen]);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {open && (
              <PopupContainer>
                <div
                  style={{
                    position: 'fixed',
                    left: '50%',
                    top: screen.availHeight / 2,
                    transform: 'translate(-50%, -50%)',
                    zIndex: '6',
                  }}
                >
                  <Alert style={{width: `${alertMessage.length * 20}px`, color:'black', backgroundColor:'white', borderRadius:'10px', justifyContent: 'center' }} icon={false}>
                      <div style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                      }}>
                          <div style={{padding:'5px', whiteSpace: 'nowrap', fontSize: '16px', fontWeight: 700, lineHeight: '18px' }}>{alertMessage}</div>
                      </div> 
                  </Alert>
                </div>
              </PopupContainer>
            )}
            {/* </div> */}

        </ThemeProvider>
    )
}

const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.25);
`;