import { useState } from 'react';
import { CssBaseline, ThemeProvider, Grid, Button, Typography, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import iconBack from '../image/icon_header_back.png';
import iconSearch from '../image/icon_header_search.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupItem from '../components/MealPromise/GroupItem';

const dummyProfiles = [
    {
        groupName: '그룹명1',
        gender: '여',
        mbti: 'ENFJ',
        introduction:
            '그룹 한줄 소개입니다',
    },
    {
        groupName: '그룹명2',
        gender: '남',
        mbti: 'ISFP',
        introduction:
            '긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 👀',
    },
    {
        groupName: '그룹명3',
        gender: '남',
        mbti: 'ENFP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },
    {
        groupName: '그룹명4',
        gender: '여',
        mbti: 'ISFP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },
    {
        groupName: '그룹명5',
        gender: '남',
        mbti: 'INTJ',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },

];

const ShowAllGroupLists = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
        <div style={{ width: 30, display: 'flex', alignItems: 'center' }}>
          <Image src={iconBack} layout="fixed" width={10.82} height={18.98} />
        </div>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#3C3C3C', flex: 1, textAlign: 'center' }}>
          여럿이서 먹어요
        </Typography>
        <div style={{ width: 30, display: 'flex', justifyContent: 'flex-end' }}>
          <Image src={iconSearch} layout="fixed" width={24} height={24} />
        </div>
      </div>

      {/* 필터 */}
      <div style={{display: 'flex', justifyContent: 'right', padding: '0 24px'}}>
        <Grid
            onClick={handleClick}
            sx={{
                width: 'max-content',
                border: '1px solid #E2E2E2',
                borderRadius: 30,
                padding: '5px 10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: selectedFilter !== '전체' ? '#FFCE00' : 'inherit',
                borderColor: selectedFilter !== '전체' ? '#FFCE00' : '#E2E2E2',
            }}
        >
            <Typography>{selectedFilter}</Typography>
            <ExpandMoreIcon />
        </Grid>

        {/* Dropdown Menu */}
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            getContentAnchorEl={null}
            sx={{
              boxShadow: 'none', 
              '& .MuiList-root': {
                padding: '0', 
                boxShadow: 'none'
              },
            }}
        >
            <MenuItem onClick={() => handleFilterSelect('전체')}>전체</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('여자')} sx={{ color: selectedFilter === '여자' ? '#FFCE00' : 'inherit' }}>
              여자
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('남자')} sx={{ color: selectedFilter === '남자' ? '#FFCE00' : 'inherit' }}>
              남자
            </MenuItem>
        </Menu>
      </div>

      {/* 목록 */}
        {
            dummyProfiles.length !== 0 &&
                dummyProfiles.map((group, index) => (
                    <div style={{margin: '15px'}}>
                        <GroupItem key={index} group={group} />
                    </div>
                ))
        }
    </ThemeProvider>
  );
};

export default ShowAllGroupLists;