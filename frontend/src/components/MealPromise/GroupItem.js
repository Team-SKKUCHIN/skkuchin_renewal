import React from 'react';
import { displayMBTI } from '../Matching/MBTIList';
import { Grid, Typography } from '@mui/material';

const GroupItem = ({ group }) => {
    return (
        <Grid container sx={{border: '1.5px solid #E2E2E2', borderRadius: '12px', p: '10px', gap: '15px', alignItems: 'center', maxHeight: 105}}>
            <div style={{flex: 1}}>
                { displayMBTI(group.mbti, 80, 80) }
            </div>
            <div style={{flex: 3}}>
                <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{fontSize: '18px', fontWeight: '700', mr: '5px'}}>{group !== null && group.groupName}</Typography>
                    <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                        {(group.gender).charAt(0)}
                    </Typography>
                </Grid>
                <Grid item sx={{display: 'flex', pr: '10px', pt: '5px'}}>
                    <Typography sx={{ fontSize: '13px', height: '36px', lineHeight: '18px', fontWeight: 400, color: '#3C3C3C', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                        {'"'+ group.introduction +'"'}
                    </Typography>
                </Grid>
            </div>
        </Grid>
    )
}

export default GroupItem;