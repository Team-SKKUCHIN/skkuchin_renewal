import React, { useEffect, useState } from 'react';
import { CssBaseline,ThemeProvider, Typography, Grid } from '@mui/material';
import theme from '../../theme/theme';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import style from 'styled-components';

const CustomCalendar = () => {
  const [dates, setDates] = useState([null, null]); 

  const formatDate = (date) => {
    return dayjs(date).format('YYYY.MM.DD');
  };

  const handleDateChange = (newDate) => {
    setDates(newDate);
  };

  const isDatesSelected = dates[0] && dates[1];
  const selectedDatesText = isDatesSelected
    ? `${formatDate(dates[0])} - ${formatDate(dates[1])}`
    : '날짜를 선택해주세요';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div>
          <div style={{ padding: '10px 17px', textAlign: 'center', borderRadius: '8px', border: "1px solid #E2E2E2", margin: '10px 0'}}>
            <Typography style={{ fontSize: '16px' }}>{selectedDatesText}</Typography>
          </div>
          <Grid style={{ border: '1px solid #E2E2E2', borderRadius: '20px', width: '100%', height: "380px",  paddingTop: '10px' }}>
            <CalendarDesign>
                <Calendar
                    onChange={handleDateChange}
                    value={dates}
                    selectRange={true} 
                    next2Label={null}
                    prev2Label={null}
                    showNeighboringMonth={false} 
                    formatDay={(locale, date) =>
                        date.toLocaleString('en', { day: 'numeric' })
                    }
                />
            </CalendarDesign>
          </Grid>
      </div>
    </ThemeProvider>
  );
}

const CalendarDesign = style.div`
    .react-calendar { 
        width: 100%;
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        padding: 0px 12px;
        border-color: transparent;
       }
       .react-calendar__navigation button {
        color: black;
        min-width: 30px;
        background: none;
        font-size: 16px;
        margin-top: 8px;
        font-weight: 500px;
       }
       .react-calendar__navigation button:enabled:hover,
       .react-calendar__navigation button:enabled:focus {
        background-color: #f8f8fa;
       }
       .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
       }
       .react-calendar__month-view__weekdays {
        background: white;
        abbr { /*월,화,수... 글자 부분*/
          color: gray;
          font-weight: 500;
          text-decoration : none;
        }
      }
      .react-calendar__tile {
        text-align: center;
        padding: 10px;
        height:43px;
        margin: 3.5px 0;
      }
       .react-calendar__tile:enabled:hover,
       .react-calendar__tile:enabled:focus {
        background: #FC9712;
        color: white;
        font-weight: bold;
       }
       .react-calendar__tile--now:not(.react-calendar__tile--active) {
        background: #ffe885;
        border-radius: 50%;
        font-weight: bold;
        color: white;
       }
       .react-calendar__tile--active {
        background: #FC9712;
        color: white;
        font-weight: bold;
      }
       .react-calendar__tile--rangeEnd {
        border-radius: 0 25px 25px 0;
       }
       .react-calendar__tile--rangeStart {
        border-radius: 25px 0 0 25px;
       } 
    `

export default CustomCalendar;
