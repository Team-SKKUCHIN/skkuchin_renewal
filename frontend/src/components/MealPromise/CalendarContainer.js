import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomCalendar from '../Custom/CustomCalendar';

const CalendarContainer = ({ dates, onDateChange }) => {
    return (
        <Grid>
            <div style={{display: 'flex', gap: 5}}>
                <Typography sx={{ color: '#3C3C3C', fontSize: 18, fontWeight: 700 }}>선호일정</Typography>
                <Typography sx={{ color: '#BABABA', fontSize: 18, fontWeight: 700 }}>(선택)</Typography>
            </div>

            <div>
                <Typography sx={{ fontSize: 14, color: '#3C3C3C', mt: '15px' }}>밥약 선호 기간</Typography>
                <CustomCalendar dates={dates} onDateChange={onDateChange} />
            </div>
        </Grid>
    )
}

export default CalendarContainer;