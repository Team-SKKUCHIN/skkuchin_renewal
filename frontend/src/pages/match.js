import React, { useState } from 'react';
import { Grid, Container, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Friends from '../components/Matching/Friends';
import OptionButton from '../components/Custom/OptionButton';
import Groups from '../components/Matching/Groups';
import { useRouter } from 'next/router';
import { load_all_group_profile, get_my_group_profile } from '../actions/groupProfile/groupProfile';
import { load_candidate } from '../actions/candidate/candidate';
import { load_matching_info } from '../actions/matchingUser/matchingUser';

const MatchContainer = styled.div`
  /* 데스크톱에서 스크롤 바를 숨김 */
  ::-webkit-scrollbar {
    display: none;
  }
  /* 모바일에서 스크롤 바를 숨김 */
  *::-webkit-scrollbar {
    display: none;
  }
`;

const MatchPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const matchingUser = useSelector(state => state.matchingUser.matchingUser);
    const allGroupProfiles = useSelector(state => state.groupProfile.allGroupProfiles);
    const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);
    const candidateProfiles = useSelector(state => state.candidate.candidate);

    useEffect(() => {
        if(allGroupProfiles === null) {
            console.log("그룹 프로필 불러오기", isAuthenticated, user);
            dispatch(load_all_group_profile(isAuthenticated));
        }
        if(candidateProfiles === null) dispatch(load_candidate(isAuthenticated));
        if(isAuthenticated && myGroupProfiles === null) dispatch(get_my_group_profile());
        if(isAuthenticated && matchingUser === null) dispatch(load_matching_info());
    }, [isAuthenticated]);

    const options = [
        { label: '여럿이서 먹어요', value: '여럿이서 먹어요' },
        { label: '둘이 먹어요', value: '둘이 먹어요' },
    ];
      
    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const handleButtonClick = (option) => {
      setSelectedOption(option);
    };

    const handleShowMoreBtn = () => {
        if(selectedOption == '여럿이서 먹어요') {
            router.push('/showAllGroupLists');
        } else if(selectedOption == '둘이 먹어요') {
            router.push('/showAllTwoLists');
        }
    }

    return(
        <MatchContainer>
            <div style={{ position:"relative", paddingTop:"10px", width: "100%", background: "white", alignContent:"center", maxWidth:"420px"}}>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <Typography style={{fontWeight:700, color: '#3C3C3C', fontSize: '21px', fontWeight: 700, padding:"10px 24px"}}>
                        같이 한끼 해요
                    </Typography>

                    <Button onClick={handleShowMoreBtn} style={{fontWeight:700, color: '#9E9E9E', fontSize: '16px', fontWeight: 700, padding:"10px 24px"}}>
                        전체보기
                    </Button>
                </div>
            </div>

            <OptionButton options={options} selectedOption={selectedOption} handleButtonClick={handleButtonClick} />

            <Container sx={{p: '0 24px', mt: '0', position:'relative'}}>
                <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
                    <Grid item >
                        {
                            selectedOption === '여럿이서 먹어요' ? 
                            <Groups />
                            : <Friends />
                        }
                    </Grid>
                </Grid>
            </Container>
        </MatchContainer>
    )
} 

export default MatchPage;
