import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, ThemeProvider, CssBaseline, Grid, Checkbox } from '@mui/material';
import UploadHeader from '../components/SkkuChat/UploadHeader';
import theme from '../theme/theme';
import { useRouter } from 'next/router';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { modify_post, load_all_posts } from '../actions/post/post';
import removeBtn from '../image/close.png';

const tagToArticleType = {
    "맛집 추천해요": "WHAT_TO_EAT",
    "맛집 추천 받아요": "TOGETHER",
};

const ModifyPost = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([]);

    const post = useSelector(state => state.post.post);

    useEffect(() => {
        if(post !== null) {
            setTitle(post[0].title);
            setContent(post[0].content);
            setSelectedTag(post[0].tag_type);
            setIsAnonymous(post[0].anonymous);
        }
    }, []);

    const isValidForm = title !== '' && content !== '' && selectedTag !== null;

    const handleTagClick = (tag) => {
        if (selectedTag === tag) {
          setSelectedTag(null);
        } else {
          setSelectedTag(tag);
        }
    };    

    const onChangeImages = (e) => {
        const fileArray = Array.from(e.target.files);
        setPreviewImages([...previewImages, ...fileArray.map((file) => URL.createObjectURL(file))]);
        setImages(fileArray);

    };

    const handleImageRemove = (index) => {
        const newPreviewImages = [...previewImages];
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);
      };
        
    const handleAnonymousClick = () => {
        setIsAnonymous(!isAnonymous);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleBackClick = () => {
        router.back();
    };

    const handleModifyClick = () => {
        const selectedArticleType = tagToArticleType[selectedTag];

        dispatch(modify_post(post[0].id, title, content, selectedArticleType, isAnonymous, previewImages, images, ([result, message]) => {
            if (result) {
                console.log("게시글 수정 완료!!")
                dispatch(load_all_posts());
                router.push('/freeCommunity');
            } else {
                alert("게시글 수정 오류" + message);
            }
        }));
    };

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <UploadHeader onBackClick={handleBackClick} onCompleteClick={handleModifyClick} isValidForm={isValidForm} isReport={false}/>
            </Container>
            <Container sx={{ mt: '63px',  p: '24px'}}>
                <form>
                    {/* 익명 여부 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px', alignItems: 'center', justifyContent: 'end'}}>
                        <Typography sx={{ fontSize: '14px', color: isAnonymous ? '#FFCE00' : '#777777' , fontWeight: 700}}>
                            익명
                        </Typography>
                        <Checkbox
                            checked={isAnonymous}
                            onChange={handleAnonymousClick}
                            sx={{ color: '#FFCE00', p: 0 }}
                        />
                    </Grid>
                    {/* 제목 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777' }}>
                            제목
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (최대 00자)
                        </Typography>
                    </Grid>
                    <input
                        type='text'
                        placeholder='글 제목을 입력해주세요.'
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            padding: '16px',
                            marginBottom: '20px',
                            border: '1px solid #E2E2E2',
                            borderRadius: '12px',
                            outline: 'none',
                        }}
                        onChange={handleTitleChange}
                        value={title}
                    >
                    </input>
                    {/* 게시글 내용 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777'}}>
                            게시글
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (최대 00자)
                        </Typography>
                    </Grid>
                    <textarea
                        placeholder='내용을 입력해주세요.'
                        style={{
                            width: '100%',
                            height: '231px',
                            fontSize: '16px',
                            padding: '16px',
                            marginBottom: '20px',
                            border: '1px solid #E2E2E2',
                            borderRadius: '12px',
                            outline: 'none',
                            resize: 'none',
                        }}
                        onChange={handleContentChange}
                        value={content}
                    >
                    </textarea>

                    {/* 태그 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777' }}>
                            태그 선택
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (1개)
                        </Typography>
                    </Grid>
                    <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', mb: '20px'}}>
                        <Grid item>
                            {
                            ["맛집 추천해요", "맛집 추천 받아요"].map((tag, index) => (
                                <Button key={index} 
                                    style={{
                                        fontSize:'14px', 
                                        fontWeight: 400, 
                                        color: '#3C3C3C',
                                        backgroundColor: (selectedTag === tag) || (tagToArticleType[selectedTag] === tagToArticleType[tag]) ? '#FFFCE4' : 'transparent',
                                        padding: '3px 20px', 
                                        marginRight: '8px', 
                                        borderRadius: '20px', 
                                        border: (selectedTag === tag) || (tagToArticleType[selectedTag] === tagToArticleType[tag]) ? '1px solid #FFCE00' : '1px solid #E2E2E2',
                                    }}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </Grid>     
                    </Grid>                           
                    
                    {/* 사진 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777' }}>
                            사진
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (선택)
                        </Typography>
                    </Grid>
                    <Grid container style={{position:'relative', width:'100%'}}>
                        <Grid item style={{overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap'}}>
                            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', marginRight: '10px'}}>
                                <input onChange={e => onChangeImages(e)} style={{position: 'absolute', fontSize: '100px', left: '0', top: '0', opacity: '0', zIndex: '5' }} type="file" name="images" accept="image/*" multiple />
                                <label style={{width:'150px', height:'150px', textAlign:'center', display: 'inline-block', cursor: 'pointer',borderRadius:'10px', backgroundColor:'white', border: '1px solid #E2E2E2', padding:'55px 0 0 7px'}} htmlFor="images">
                                    <AddPhotoAlternateOutlinedIcon style={{width: '20px', color:'#BABABA'}}/>
                                </label>
                            </div>
                            {previewImages.map((previewImage, index) => (
                                <Grid item key={index} style={{ display:'inline-block',flexShrink: 0, position:'relative', width: '150px', height: '150px',overflow: 'hidden', borderRadius: '10px', marginRight: '10px'}}>
                                    <img key={previewImage} src={previewImage} alt="preview" 
                                        style={{
                                            width: '100%',
                                            height: '100%', 
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Button type="button" onClick={() => handleImageRemove(index)} style={{ position: 'absolute', top: '0', right: '3px', padding: '10px', justifyContent: 'right' }}>
                                        <Image src={removeBtn} width={25} height={25} layout='fixed'
                                            style={{
                                                backgroundColor:'white',
                                                borderRadius:'20px'
                                            }}/>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default ModifyPost;
