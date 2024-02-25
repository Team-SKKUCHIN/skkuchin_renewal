import React, { useEffect, useState } from 'react';
import theme from '../theme/theme';
import styled from '@emotion/styled';
import { CssBaseline, ThemeProvider, Typography, Button } from '@mui/material';
import Header from '../components/MealPromise/Header';
import { useRouter } from 'next/router';
import MyGroupProfileCard from '../components/MealPromise/MyGroupProfileCard';

const dummyGroup= [
    {
        id: 1,
        groupName: '나의 그룹1',
        gender: '여',
        mbti: 'GROUP',
        introduction: '첫번째 그룹 한줄 소개입니다',
    },
    {
        id: 2,
        groupName: '나의 그룹2',
        gender: '남',
        mbti: 'GROUP',
        introduction: '두번째 그룹 한줄 소개입니다',
    },
    {
        id: 3,
        groupName: '나의 그룹3',
        gender: '여',
        mbti: 'GROUP',
        introduction: '마지막 한줄 소개입니다',
    },
]

const LayoutContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  *::-webkit-scrollbar {
    display: none;
  }
  width: 100vw;
  overflow-x: hidden;
`;

const selectMyGroupProfile = () => {
    const router = useRouter();

    const [selectedProfile, setSelectedProfile] = useState(dummyGroup[0]);

    const handleSubmit = () => {
        console.log("확인 버튼 클릭");
        router.push('/enrollOpenChat', { type: 'group'})
    }

    useEffect(() => {
        console.log(selectedProfile.id);
    }, [selectedProfile]);

    return (
        <LayoutContainer>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header title="" icon='close'/>

                <div style={{padding: '0 24px', fontSize: '16px', flex: 1}}>
                    <Typography sx={{fontWeight: 'bold', m: '50px 0', p: '25px 0', textAlign: 'center'}}>
                        [상대 그룹명]에게 밥약을 신청할<br />
                        나의 그룹을 선택해주세요.
                    </Typography>
                </div>

                <div style={{overflowX: 'auto', flexWrap: 'nowrap', display: 'flex', flexDirection: 'row', gap: 20, padding: '0 24px'}}>
                    {dummyGroup.map((group, index) => (
                        <MyGroupProfileCard
                            key={index}
                            group={group}
                            selected={selectedProfile.id == group.id}
                            onClick={() => setSelectedProfile(group)}
                        />
                    ))}
                </div>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disableElevation
                    sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
                >
                    다음
                </Button>

            </ThemeProvider>
        </LayoutContainer>
    );
}

export default selectMyGroupProfile;