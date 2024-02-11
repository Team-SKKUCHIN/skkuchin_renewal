import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { load_all_posts } from '../actions/post/post';
import { useEffect } from 'react';
import Friends from '../components/Matching/Friends';
import AiGreeting from '../components/AiGreeting';
import OptionButton from '../components/Custom/OptionButton';
import Groups from '../components/Matching/Groups';

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

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(load_all_posts());
        }
    }, []);

    const options = [
        { label: '여럿이서 먹어요', value: '여럿이서 먹어요' },
        { label: '둘이 먹어요', value: '둘이 먹어요' },
    ];
      
    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const handleButtonClick = (option) => {
      setSelectedOption(option);
      console.log(option);
    };

    return(
        <MatchContainer>
            <AiGreeting />

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
