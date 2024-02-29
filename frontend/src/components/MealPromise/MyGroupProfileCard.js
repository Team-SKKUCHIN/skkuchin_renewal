import React from 'react';
import { Card, Grid, Typography, Button } from '@mui/material';
import { displayMBTI } from '../Matching/MBTIList';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const StyledCard = styled(Card)`
  height: max-content;
  width: 242px;
  border-radius: 10px;
  border: 1px solid #E2E2E2;
  padding: 28px 16px;
  flex-shrink: 0;
  margin-right: 19px;
  margin-bottom: 10px;
  ${({ selected }) => selected && `
    background-color: #FFFCE4; 
    border-color: #FFCE00; 
    border-width: 2px;
  `}
`;

const MyGroupProfileCard = ({ group, selected, onClick }) => {
    const router = useRouter();

    const handleGroupClick = (groupId) => {
        console.log(groupId);
        router.push('/showGroupProfile');
    }

    return (
        <StyledCard selected={selected} variant="outlined" onClick={onClick}>
            <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    {displayMBTI(group.mbti, 90, 90)}
                    <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                        <Typography sx={{fontSize: '20px', fontWeight: '700', mr: '5px'}}>{group !== null && group.groupName}</Typography>
                        <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                            {(group.gender).charAt(0)}
                        </Typography>
                    </Grid>
                    <Typography sx={{ fontSize: '14px', height: '40px', lineHeight: '20px', fontWeight: 400, color: '#3C3C3C', m: '20px 0 30px', textAlign: 'center', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                        {'"'+ group.introduction +'"'}
                    </Typography>
                    <Grid item sx={{ display: 'flex',  alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                        <Button
                            disableElevation
                            disableTouchRipple
                            key="profile-button"
                            onClick={() => handleGroupClick(group.id)}
                            sx={{
                                color: '#777777',
                                fontSize: '14px',
                                fontWeight: 700,
                                textAlign: 'center',
                                pr: '15px',
                                textDecoration: 'underline', 
                            }}
                        >
                            프로필 보기
                        </Button>
                    </Grid>
                </Grid>
        </StyledCard>
    )
}

export default MyGroupProfileCard;