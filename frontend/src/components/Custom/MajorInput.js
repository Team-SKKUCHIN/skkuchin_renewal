import React from 'react';
import { Autocomplete, TextField } from '@mui/material';


const majorList = [
    '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과','국제통상학전공', '소비자학과',
    '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
    '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
    '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
    '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
    '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
    '사회복지학과', '사회학과', '심리학과',
    '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
    '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
    '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
    '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과', '컴퓨터공학과',
    '인문과학계열', '사회과학계열', '자연과학계열', '공학계열'
];

const MajorInput = ({ value, onChange, editable = true }) => {
  return (
    <Autocomplete
      value={value}
      readOnly={!editable}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '& input': {
          fontSize: '16px',
          padding: '0'
        },
        height: '56px',
        border: '1px solid #E2E2E2',
        borderRadius: '8px',
        outline: 'none',
        appearance: 'none',
        marginLeft: '8px',
        fontSize: '16px',
        padding: '0'
      }}
      onChange={(e, newValue) => onChange(newValue)}
      options={majorList.sort()}
      renderInput={(params) => <TextField {...params} style={{ fontSize: '12px' }} />}
    />
  );
};

export default MajorInput;
