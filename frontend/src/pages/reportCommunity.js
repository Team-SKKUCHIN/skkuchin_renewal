import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import 'moment/locale/ko';
import {Box, TextField, CssBaseline, Checkbox, ThemeProvider, Typography, Grid, Container } from '@mui/material';
import theme from '../theme/theme';
import { useEffect, useState } from 'react';
import UploadHeader from "../components/SkkuChat/UploadHeader";
import { enroll_report_community } from "../actions/community/reportInCommunity";
import CustomPopupNoBtn from "../components/SkkuChat/CustomPopupNoBtn";
  
const reportCommunity = () => {
  
    const router = useRouter();
    const dispatch = useDispatch();
   
    const article_id = router.query.article_id;
    const comment_id = router.query.comment_id;

    const [isPopupMessageOpen, setPopupMessageOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    // 신고 선택
    const tags = [
      { id: '욕설_비하', text: '욕설/비하' },
      { id: '음란_선정성', text: '음란/선정적인 내용' },
      { id: '부적절', text: '게시판 성격에 부적절함' },
      { id: '영리목적_홍보성', text: '영리/홍보 목적의 내용' },
      { id: '정당_정치인_비하_및_선거운동', text: '정치/종교적인 내용' },
      { id: '사칭_사기', text: '낚시/도배' },
      { id: '기타', text: '기타' },
    ];

    const [checkedTag, setCheckedTag] = useState(null);
    const [tagChoose, setTagChoose] = useState({});
    const [showInputBox, setShowInputBox] = useState(false);
    const [content, setContent] = useState('');
    
    const isValidForm = Object.values(tagChoose).some((value) => value === true) &&
    (!tagChoose['기타'] || (tagChoose['기타'] && content !== ''));
    
    const handleTagClick = (event) => {
      const tagId = event.currentTarget.id;
  
      setTagChoose((prevTags) => {
          const updatedTags = {};
  
          Object.keys(prevTags).forEach((tag) => {
              updatedTags[tag] = false;
          });
  
          updatedTags[tagId] = true;
  
          setShowInputBox(tagId === '기타');
  
          return updatedTags;
      });
  
      setCheckedTag(tagId);
    };
    const handleCompleteClick = () => {
      const reportContent = checkedTag === '기타' ? content : null;
      dispatch(enroll_report_community(checkedTag, reportContent, comment_id, article_id, ([result, message]) => {
        if (result) {
          setPopupMessageOpen(true);
          setPopupMessage('신고가 완료되었습니다.');
        } else {
          console.log('실패!: ' + message);
          setPopupMessageOpen(true);
          setPopupMessage(message);
        }
      }));
      setCheckedTag(null);
      setTagChoose({});
      setShowInputBox(false);
      setContent('');
    };

    const handleBackClick = () => {
        router.back();
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
            <UploadHeader onBackClick={handleBackClick} onCompleteClick={handleCompleteClick} isValidForm={isValidForm} isReport={true}/>
        </Container>
        <Container sx={{ mt: '78px', p: '30px 24px', overflow: 'hidden', maxWidth: '420px' }}>
          <Typography sx={{fontSize: '18px', fontWeight: 700}}>
              해당 사용자에 대한 신고사유를 알려주세요.
          </Typography>
          <Container sx={{p: 0}}>
            <Typography sx={{fontSize: '14px', fontWeight: 700, color: '#9E9E9E', p: '30px 0 10px'}}>
              신고사유
            </Typography>
            <Grid>
              {tags.map((tag) => (
                <Grid key={tag.id} sx={{ display: 'flex', p: '10px 0', width: '100%', alignItems: 'center' }}>
                  <Checkbox
                    checked={tagChoose[tag.id] || false}
                    onChange={handleTagClick}
                    id={tag.id}
                    sx={{ p: '4px', mr: '8px', color: '#9E9E9E' }}
                  />
                  <Typography style={{ fontSize: '16px', fontWeight: 400, color: '#3C3C3C' }}>
                    {tag.text}
                  </Typography>
                </Grid>
              ))}
              <Box>
                {showInputBox && (
                  <>
                    <Typography sx={{color: '#9E9E9E', fontWeight: 700, fontSize: '14px'}}>
                      기타 신고사유
                    </Typography>
                    <div style={{ margin: '10px auto 10px auto' }}>
                      <TextField
                        sx={{ fontSize: 12 }}
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="상세한 신고 사유를 입력해주세요."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                      />
                    </div>
                  </>
                )}
              </Box>
            </Grid>
          </Container>

          <CustomPopupNoBtn
              open={isPopupMessageOpen}
              onClose={() => setPopupMessageOpen(false)}
              content={popupMessage}
          />
        </Container>
      </ThemeProvider>
    );
  };
  

export default reportCommunity;
