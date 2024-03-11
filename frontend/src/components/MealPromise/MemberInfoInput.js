import React, { useState } from 'react';
import { Grid, Typography, FormControl, TextField } from '@mui/material';
import MajorInput from '../Custom/MajorInput';
import StudentIdInput from '../Custom/StudentIdInput';

const MemberInfoInput = ({ label, studentId, major, introduction, mode, onUpdate, onChange }) => {
  const [updatedIntroduction, setUpdatedIntroduction] = useState(introduction);

  const handleStudentIdChange = (value) => {
    onUpdate({ studentId: value });
  };

  const handleMajorChange = (value) => {
    onUpdate({ major: value });
  };

  const handleIntroductionChangeForNew = (e) => {
    onUpdate({ introduction: e.target.value });
  };

  const handleIntroductionChangeForModify = (e) => {
    setUpdatedIntroduction(e.target.value);
    onChange(e.target.value || updatedIntroduction);
  };

  const isRepresentative = label === '친구1';
  const isEditable = !isRepresentative;

  return (
    <Grid container>
      <div style={{ gap: 8, display: 'flex', alignItems: 'center' }}>
        {
            isRepresentative &&
            <Typography
                sx={{
                    color: '#FFAC0B',
                    backgroundColor: '#FFFCE4',
                    fontSize: 18,
                    fontWeight: 600,
                    p: '10px',
                    borderRadius: '12px',
                }}
                >
                대표
            </Typography>
        }
        <Typography sx={{ color: '#3C3C3C', fontSize: 18, fontWeight: 700 }}>
          {label}
          {!isRepresentative && <span style={{color: '#F47806'}}>*</span>}
        </Typography>
      </div>

      {/* 학번 */}
      <Grid container sx={{ m: '18px 0' }}>
        <FormControl variant="standard" style={{ width: '27%' }}>
          <Typography sx={{ fontSize: 14, color: '#3C3C3C', mb: '8px' }}>학번</Typography>
          <Grid container>
            <StudentIdInput value={studentId} onChange={handleStudentIdChange} editable={isEditable && ( mode !== 'modify') }/>
            <input
              readOnly
              value="학번"
              style={{
                fontSize: '16px',
                color: '#BABABA',
                textAlign: 'end',
                padding: '16px 12px 16px 0px',
                height: '56px',
                border: '1px solid #E2E2E2',
                borderLeft: 'white',
                borderRadius: '0 8px 8px 0',
                width: '50%',
                outline: 'none',
                backgroundColor: isEditable && ( mode !== 'modify')  ? 'white' : '#FBFBFB',
              }}
            />
          </Grid>
        </FormControl>

        {/* 학과 */}
        <FormControl variant="standard" style={{ width: '73%' }}>
          <Typography sx={{ fontSize: 14, color: '#3C3C3C', mb: '8px' }}>학부/학과</Typography>
          <MajorInput value={major} onChange={handleMajorChange} editable={isEditable && mode !== 'modify'}/>
        </FormControl>
      </Grid>

      <Typography sx={{ fontSize: 14, color: '#3C3C3C', mb: '8px' }}>한줄 소개</Typography>
      <TextField
        sx={{ mb: label === '친구3' ? '0px' : '50px' }}
        variant="outlined"
        fullWidth
        placeholder="한줄 소개를 입력해주세요 (필수, 30자 이내)"
        value={mode === 'modify' ? updatedIntroduction : introduction}
        inputProps={{ maxLength: 30 }}
        onChange={mode === 'modify' ? handleIntroductionChangeForModify : handleIntroductionChangeForNew}
      />
    </Grid>
  );
};

export default MemberInfoInput;