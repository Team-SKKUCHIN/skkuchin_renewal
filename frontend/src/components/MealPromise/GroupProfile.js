import React from 'react';
import { List, ListItem, ListItemText, Typography, Button, Divider } from '@mui/material';
import { displayMBTI } from "../Matching/MBTIList";
import { useRouter } from 'next/router';

const GroupProfile = ({ group }) => {
    const router = useRouter();

    const handleSubmit = () => {
        console.log("밥약 신청하기 버튼 클릭");
        router.push('/selectMyGroupProfile')
    }

    return (
        <>
            <div style={{padding: '19px 0 16px', textAlign: 'center'}}>
                {displayMBTI(group.mbti, 120, 120)}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{fontSize: '18px', fontWeight: '700', mr: '5px'}}>{group !== null && group.groupName}</Typography>
                    <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                        {(group.gender).charAt(0)}
                    </Typography>
                </div>
                <Typography sx={{ fontSize: '13px', mt: '20px', height: '36px', lineHeight: '18px', fontWeight: 400, color: '#3C3C3C', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                    {'"'+ group.introduction +'"'}
                </Typography>
                <Typography sx={{fontSize: '12px', color: '#777777', fontWeight: 'bold', mb: '20px', backgroundColor: '#FBFBFB', border: '1px solid #E2E2E2', borderRadius: '12px', padding: '4px 10px', width: 'max-content', margin: 'auto'}}>
                    선호 일정 : {group.date}
                </Typography>
            </div>

            <div style={{margin: '0 24px', borderTop: '1px solid #E2E2E2', paddingTop: '9px'}}>
                <List>
                    {group.members.map((member, index) => (
                        <ListItem key={index} disablePadding>
                        <ListItemText
                            primary={
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: '6px'}}>
                                {
                                    member.name === '친구1' &&
                                    <Typography sx={{ color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: 16, fontWeight: 600, p: '8px 10px', borderRadius: '12px' }} >
                                        대표
                                    </Typography>
                                }
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#3C3C3C' }}>{member.name}</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#777777' }}>
                                    {`${member.major} / ${member.studentId}`}
                                </Typography>
                            </div>
                            }
                            secondary={<Typography sx={{ fontSize: '16px', backgroundColor: '#FBFBFB', p: '10px 17px', border: '1px solid #E2E2E2', borderRadius: '0 8px 8px 8px', mb: '12px'}}>{member.introduction}</Typography>}
                        />
                        </ListItem>
                    ))}
                </List>
            </div>

            <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                disableElevation
                sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
            >
                밥약 신청하기
            </Button>
        </>
    )
}

export default GroupProfile;