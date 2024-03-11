import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import CustomCalendar from '../Custom/CustomCalendar';

const CalendarContainer = ({ dates, onDateChange, editable }) => {

    const handleResetClick = () => {
        onDateChange([]);
    };

    return (
        <Grid>
            <div style={{display: 'flex', gap: 5}}>
                <Typography sx={{ color: '#3C3C3C', fontSize: 18, fontWeight: 700 }}>선호일정</Typography>
                <Typography sx={{ color: '#BABABA', fontSize: 18, fontWeight: 700 }}>(선택)</Typography>
            </div>

            <div style={{marginTop: '18px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography sx={{ fontSize: 14, color: '#3C3C3C' }}>밥약 선호 기간</Typography>
                    <button onClick={handleResetClick} style={{border: 0, borderRadius: 10, fontSize: '12px', color: '#777777', padding: 5, height: 24}}>선택초기화</button>
                </div>
                <CustomCalendar dates={dates} onDateChange={onDateChange} editable={editable} />
            </div>
        </Grid>
    )
}

export default CalendarContainer;