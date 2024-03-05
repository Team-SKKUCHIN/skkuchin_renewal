import React, { useEffect, useState } from 'react';
import theme from '../theme/theme';
import styled from '@emotion/styled';
import { CssBaseline, ThemeProvider, Typography, Button } from '@mui/material';
import Header from '../components/MealPromise/Header';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import MyGroupProfileCard from '../components/MealPromise/MyGroupProfileCard';
import { get_my_group_profile } from '../actions/groupProfile/groupProfile';
import { Loading } from '../components/Loading';

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
    const dispatch = useDispatch();

    const myGroups = useSelector(state => state.groupProfile.myGroupProfiles);

    const [selectedProfile, setSelectedProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = () => {
        console.log("확인 버튼 클릭");
        router.push({
            pathname: '/enrollOpenChat',
            query: { type: 'group'},
        });
        localStorage.setItem('myProfileId', selectedProfile.id);
    }

    useEffect(() => {
        if(myGroups === null) dispatch(get_my_group_profile());
    }, []);

    useEffect(() => {
        setLoading(false);
        if(myGroups && myGroups.length > 0) {
            setSelectedProfile(myGroups[0]);
        }
    },[myGroups]);

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
                {
                    !loading && myGroups &&
                    <div style={{overflowX: myGroups.length > 1 ? 'auto' : 'hidden', flexWrap: 'nowrap', display: 'flex', flexDirection: 'row', gap: 8, padding: '0 24px', justifyContent: myGroups.length === 1 ? 'center' : 'flex-start'}}>
                        {myGroups.map((group, index) => (
                            <MyGroupProfileCard
                                key={index}
                                group={group}
                                selected={selectedProfile && (selectedProfile.id == group.id)}
                                onClick={() => setSelectedProfile(group)}
                            />
                        ))}
                    </div>
                }
                <Button
                    onClick={handleSubmit}
                    disabled={selectedProfile === null}
                    color="primary"
                    variant="contained"
                    disableElevation
                    sx={{ color: '#fff', fontSize: 16, fontWeight: 800, position: 'fixed', bottom: 30, left: 24, right: 24, borderRadius: '12px', p: '16px'}}
                >
                    다음
                </Button>

                { loading && <Loading />}

            </ThemeProvider>
        </LayoutContainer>
    );
}

export default selectMyGroupProfile;