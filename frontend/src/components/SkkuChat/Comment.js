import React, { useEffect, useState } from 'react';
import { Typography, Grid, Divider, Container } from '@mui/material';
import { displayMBTI } from '../Matching/MBTIList';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CustomPopup from './CustomPopup';
import CustomInputField from './CustomInputField';
import Image from 'next/image';
import replyArrow from '../../image/turn_right.png';

const Comment = ({ comments, postId }) => {

    const [isReplyPopupOpen, setReplyPopupOpen] = useState(false); 
    const [tempComment, setTempComment] = useState(null); 
    const [selectedComment, setSelectedComment] = useState(null);

    // 대댓글 팝업
    const openReplyPopup = (comment) => {
        setTempComment(comment);
        setReplyPopupOpen(true);
    };

    const closeReplyPopup = () => {
        setTempComment(null);
        setReplyPopupOpen(false);
    };

    const handleAddReply = () => {
        setSelectedComment(tempComment);
        closeReplyPopup();
    };

    return (  
        <div>
        {comments && comments.map((comment, index) => (
            <div key={index} style={{ borderBottom: '1px solid #F2F2F2', padding: '10px 24px', backgroundColor: selectedComment && comment.id === selectedComment.id ? '#FFFCE4' : 'transparent'}}>
                {/* 프로필 이미지, 닉네임 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    {displayMBTI(comment.user_image, 35, 35)}
                    <Typography style={{ fontSize: '12px', fontWeight: 800, color: '#3C3C3C' }}>
                        {comment.nickname}
                        {(comment.my_comment && comment.writer) || (comment.my_comment && !comment.writer) ? <span style={{ color: '#FFAC0B' }}> (나)</span> : null}
                        {comment.writer && !comment.my_comment ? <span style={{ color: '#FFAC0B' }}> (작성자)</span> : null}
                    </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#FBFBFB', padding: '0px 9px', borderRadius: '10px' }}>
                    <FavoriteBorderIcon style={{ width: '13px', color: '#BABABA' }} />
                    <Divider orientation='vertical' style={{ height: '7px', backgroundColor: '#E2E2E2' }} />
                    <ChatBubbleOutlineIcon onClick={() => openReplyPopup(comment)} style={{ width: '13px', color: '#BABABA' }} />
                    <Divider orientation='vertical' style={{ height: '7px', backgroundColor: '#E2E2E2' }} />
                    <MoreVertOutlinedIcon style={{ width: '13px', color: '#BABABA' }} />
                    </div>
                </div>
                {/* 댓글 내용 */}
                <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#3C3C3C', margin: '10px 0' }}>{comment.content}</Typography>
                {/* 업로드 시간, 좋아요 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Typography style={{ fontSize: '12px', fontWeight: 700, color: '#BABABA' }}>{comment.display_time}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FavoriteBorderIcon style={{ width: '15px', color: '#FFCE00' }} />
                    <Typography style={{ fontSize: '12px', color: '#FFCE00', marginLeft: '3px', fontWeight: 600 }}> {comment.comment_likes}</Typography>
                    </div>
                </div>

                {/* 대댓글 */}
                {
                    comment.reply && comment.reply.length > 0 &&
                        <div>
                            {comment.reply.map((reply, replyIndex) => (
                                    <div key={replyIndex} style={{display: 'flex'}}>
                                        <div>
                                            <Image src={replyArrow} alt="" width={13} height={13} style={{marginRight: '10px'}}/>
                                        </div>
                                        <div style={{flexGrow: 1, backgroundColor: '#FBFBFB', borderRadius: '10px', padding: '5px 10px', margin: '10px 0'}}>
                                            {/* 프로필 이미지, 닉네임 */}
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                                {displayMBTI(reply.user_image, 35, 35)}
                                                <Typography style={{ fontSize: '12px', fontWeight: 800, color: '#3C3C3C' }}>
                                                    {reply.nickname}
                                                    {(reply.my_comment && reply.writer) || (reply.my_comment && !reply.writer) ? <span style={{ color: '#FFAC0B' }}> (나)</span> : null}
                                                    {reply.writer && !reply.my_comment ? <span style={{ color: '#FFAC0B' }}> (작성자)</span> : null}
                                                </Typography>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#FBFBFB', padding: '0px 9px', borderRadius: '10px' }}>
                                                <FavoriteBorderIcon style={{ width: '13px', color: '#BABABA' }} />
                                                <Divider orientation='vertical' style={{ height: '7px', backgroundColor: '#E2E2E2' }} />
                                                <MoreVertOutlinedIcon style={{ width: '13px', color: '#BABABA' }} />
                                                </div>
                                            </div>
                                            {/* 댓글 내용 */}
                                            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#3C3C3C', margin: '10px 0' }}>{reply.content}</Typography>
                                            {/* 업로드 시간, 좋아요 */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Typography style={{ fontSize: '12px', fontWeight: 700, color: '#BABABA' }}>{reply.display_time}</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <FavoriteBorderIcon style={{ width: '15px', color: '#FFCE00' }} />
                                                <Typography style={{ fontSize: '12px', color: '#FFCE00', marginLeft: '3px', fontWeight: 600 }}> {reply.comment_likes}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }  
                        </div>
                }
            </div>
        ))}

        <CustomPopup
            open={isReplyPopupOpen}
            onClose={closeReplyPopup}
            content={`대댓글을 작성하시겠습니까?`} // 팝업 내용을 원하는 텍스트로 변경
            leftButtonLabel="아니요"
            rightButtonLabel="작성"
            onLeftButtonClick={closeReplyPopup} // 아니오 버튼 클릭 시 팝업 닫기
            onRightButtonClick={() => {
                handleAddReply();
            }}
        />


        <Container sx={{justifyContent: 'center', position: 'fixed', backgroundColor: '#fff', bottom: '0px', pb: '24px'}}>
            <CustomInputField article_id={postId} isReply={selectedComment ? true : false} parentCommentId={selectedComment ? selectedComment.id : null}/>
        </Container>
        </div>
    );
};

export default Comment;
