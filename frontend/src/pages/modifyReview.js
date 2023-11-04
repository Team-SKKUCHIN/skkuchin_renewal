// import { useDispatch, useSelector} from "react-redux";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react"; 

// import { modify_review, clear_my_review, load_reviews } from "../actions/review/review";

// import { CssBaseline, Box, ThemeProvider, Button, Card, CardContent, Typography, Grid, Container, CircularProgress  } from '@mui/material';
// import theme from '../theme/theme';
// import Image from 'next/image';

// // Icons
// import morePhoto from '../image/addPhoto.png';
// import close from '../image/close.png';
// import tag1 from '../image/tags/review_off/review_taste.png';
// import tag1on from '../image/tags/review_on/review_tasteY.png'
// import tag2 from '../image/tags/review_off/review_simple.png';
// import tag2on from '../image/tags/review_on/review_simpleY.png';
// import tag3 from '../image/tags/review_off/review_mood.png';
// import tag3on from '../image/tags/review_on/review_moodY.png';
// import tag4 from '../image/tags/review_off/review_money.png';
// import tag4on from '../image/tags/review_on/review_moneyY.png';
// import tag5 from '../image/tags/review_off/review_kind.png';
// import tag5on from '../image/tags/review_on/review_kindY.png';
// import tag6 from '../image/tags/review_off/review_clean.png';
// import tag6on from '../image/tags/review_on/review_cleanY.png';
// import tag7 from '../image/tags/review_off/review_two.png';
// import tag7on from '../image/tags/review_on/review_twoY.png';

// import emptyStar from '../image/Star_border-1.png';
// import filledStar from '../image/Star-1.png';
// import removeBtn from '../image/close.png';

// import TextField from '@mui/material/TextField';
// import dynamic from 'next/dynamic';

// const ModifyReview = () => {
//     const router = useRouter();
//     const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//     if (typeof window !== 'undefined' && !isAuthenticated) {
//         router.push('/login');
//     }

//     const handleOnclick = (event) =>{
//         if(event.target.name == 'close' ){
//             router.back();
//         } 
//     };  

//     // place.js에서 전달 받은 id 값 받아오기
//     const id = router.query.id;
//     const review_id = router.query.review_id;

//     // Part 1) place, 가게 정보 (place API)
//     const dispatch = useDispatch();
//     const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
   
//     const selectedPlace = useSelector(state => state.place.place);

//     const [rating, setRating] = useState();
//     const [textReview, setTextReview] = useState();
//     const [tagList, setTagList] = useState([]);
//     const [tagChoose, setTagChoose] = useState({
//       '맛집': false,
//       '간단한 한 끼': false,
//       '분위기 좋은': false,
//       '가성비': false,
//       '친절': false,
//       '청결도': false,
//       '둘이 가요': false
//     });

//     const reviews = useSelector(state => state.review.review);
//     const myReviews = useSelector(state => state.review.myReview);

//     const review = reviews && reviews.find(review => review.id == review_id && review.place_id == place_id) || myReviews && myReviews.find(review => review.id == review_id && review.place_id == place_id);

//     useEffect(() => {
//         setRating(review.rate);
//         setTextReview(review.content);
//         setTagList(review.tags);
//         // 태그 선택 상태 설정
//         const tagChooseTemp = {};
//         for (const tag of review.tags) {
//           tagChooseTemp[tag] = true;
//         }
//         setTagChoose(tagChooseTemp);

//       }, [review_id, place_id, reviews]);

      
//     const handleTouch = (index) => {
//         if (index + 1 === rating) {
//             setRating(0);
//         } else {
//             setRating(index + 1);
//         }
//     };

//     useEffect(() => {
//         if(dispatch && dispatch !== null && dispatch !== undefined && place_id!='' && id!='') {
//             setPlaceId(id);
//             dispatch(load_reviews(id));
//         }
//     }, [id]);

//     // 태그 관련
//     useEffect(()=>{
//         const newTags = [tagChoose];
//         const allTags = newTags.reduce((acc, current)=>{
//             return acc.concat(Object.entries(current));
//         }, [])
//             .filter(([, value]) => value)
//             .map(([key]) => key);

//         if(allTags.length <= 3){
//             setTagList(allTags);
//         }
//     }, [tagChoose]);

//     // 태그 클릭 시
//     const handleTagClick =(event)=>{
//         if(tagList.length == 3){
//             setTagChoose({
//                 ...tagChoose
//             })
//             if(tagChoose[event.target.id]){
//                 setTagChoose({
//                     ...tagChoose,
//                     [event.target.id]:false
//                 })
//             }
//         }
//         else if(tagChoose[event.target.id]){
//             setTagChoose({
//                 ...tagChoose,
//                 [event.target.id]:false
//             })
//         } else{
//             setTagChoose({
//                 ...tagChoose,
//                 [event.target.id]:true
//             })
//         }
//     }
//     // 이미지 URL 배열화
//     const [images, setImages] = useState([]);
//     const [previewImages, setPreviewImages] = useState(review?.images);

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setPreviewImages([...previewImages, ...files.map((file) => URL.createObjectURL(file))]);
//         setImages(files);
//       };
      
//     const handleImageRemove = (index) => {
//       const newPreviewImages = [...previewImages];
//       newPreviewImages.splice(index, 1);
//       setPreviewImages(newPreviewImages);
//     };

//     const [visibility, setVisibility] = useState({
//         enroll: 'visible',
//         loading:'hidden'
//     });

//     const [condition, setCondition] = useState(false); //확인버튼 조건 

//     //등록 조건 
//     useEffect(()=>{
//         if(rating && textReview !='' && images && tagList.length > 0){
//             setCondition(true)
//         } else( 
//             setCondition(false)
//         )
//     },[rating, textReview, images, tagList])
    
//      // 등록 클릭 시
//      const handleModifyClick = (event) =>{
//         event.preventDefault();
        
//         if(condition){
//             setVisibility({
//                 enroll: 'visible',
//                 loading:'visible'
//             });
//             dispatch(modify_review(review_id, rating, textReview, images, previewImages, tagList, ([result, message])=>{
//                 if(result){
//                     dispatch(clear_my_review());
//                     router.push({
//                         pathname: '/reviews',
//                         query: { id: place_id }
//                     });                  
//                 } else {
//                     setVisibility({
//                         enroll: 'visible',
//                         loading:'none'
//                     });
//                 }
//             }));
//         } else {
//             return
//         }
//     }
//     return(
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <div style={{position:'fixed', height: '100%', width:'100%',textAlign:'center', color:"#FFE885", visibility:visibility.loading, paddingTop: window.innerHeight /2.2,  zIndex:'6', background:'rgb(0,0,0, 0.4)'}}>
//                 <CircularProgress color="inherit" size={70}/>
//             </div>
//             {/* 전체 틀 */}
//             <div style={{ position: 'relative', width:'100%', height:'100%', visibility:visibility.enroll}}>  

//             {/* 상단 헤더 */}
//             <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
//                 <Card elevation={0} style={{
//                             position: 'fixed',
//                             top: '0px',
//                             width: '100%',
//                             maxWidth: '420px',
//                             height: '98px',
//                             zIndex: '4',
//                             border: 'none',
//                             }}>
//                     <Grid container style={{padding:'50px 17px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
//                         <Grid style={{padding: '0px 0px 0px 0px'}}>
//                             <a>
//                             <Image src={close} width={37} height={37} name='close' onClick={handleOnclick} layout='fixed' />
//                             </a>
//                         </Grid>
                    
//                         <Grid onClick={handleModifyClick}>
//                             <Typography sx={{fontSize:'18px', fontWeight:'700'}} color={condition? theme.palette.primary.main : theme.palette.fontColor.main }>
//                                 수정
//                             </Typography>
//                         </Grid> 
//                     </Grid>
//                 </Card>
//             </Container>
            
//             {/* Content */}
//             <Container component="main" maxWidth="xs" style={{listStyleType: "none"}}>
//                 <Grid container style={{padding: '10px 15px'}}>
//                     <Grid style={{width:'100%'}}>
//                         <CardContent>
//                         {/* { places ? places.filter(item => item.id == place_id).map((item,index) => ( */}
//                         { selectedPlace &&
//                             <Grid container sx={{mt:0, pt:11}} style={{ justifyContent:'center'}}>
//                                 <Grid>
//                                     <Typography sx={{fontSize: '23px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
//                                         {selectedPlace.name}
//                                     </Typography>
//                                 </Grid>
//                                 <Grid>
//                                     <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '250%', paddingLeft: '4px'}} color="#a1a1a1" component="div" align="center">
//                                         {selectedPlace.detail_category}
//                                     </Typography>
//                                 </Grid>
//                             </Grid>
//                         }

//                             <Grid sx={{width: '100%', marginTop:'10px'}}>
//                                 <Grid>
//                                 <div style={{ textAlign: "center", margin: '-20px -20px 0', padding: '13px 0px 5px 0px', borderBottom: '2px solid rgba(217, 217, 217, 0.54)'}}>
//                                     {[1, 2, 3, 4, 5].map((item, index) => {
//                                         let starImage = emptyStar;
//                                         if (index + 1 <= rating) {
//                                         starImage = filledStar;
//                                         }
//                                         return (
//                                             <Image key={index} width={40} height={40} src={starImage} onTouchStart={() => handleTouch(index)} alt='star' layout='fixed' />
//                                         );
//                                     })}
//                                     <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#FFCE00'}}>{`${rating}점`}</Typography>
//                                 </div>
//                                 </Grid>
//                             </Grid>

//                             <Grid container style={{margin:'30px auto 0px', justifyContent:'center'}}>
//                                 <Grid>
//                                 <Typography xs={6} sx={{fontSize: '17px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
//                                     어떤 점이 좋았나요?
//                                 </Typography>
//                                 </Grid>
//                                 <Grid>
//                                     <Typography xs={6} sx={{fontSize: '13px', fontWeight: '500', lineHeight: '150%', paddingLeft: '4px'}} color="#a1a1a1" component="div" align="center">
//                                         (최대 3개)
//                                     </Typography>
//                                 </Grid>
//                             </Grid>


//                             <Grid sx={{width: '100%'}}>
//                                 <div style={{margin: '-20px -20px 0', padding: '13px 0px 10px 0px',borderBottom: '2px solid rgba(217, 217, 217, 0.54)'}}>
//                                 <Grid container style={{margin: '13px 0px 11px 0px',  justifyContent: 'center', maxWidth:'350px'}}>
//                                     <Grid style={{marginRight:'8px'}}>
//                                         <Image
//                                             src={tagChoose['맛집'] ? tag1on : tag1}
//                                             width= {77}
//                                             height= {34}
//                                             alt="tag1"
//                                             onClick={handleTagClick}
//                                             id='맛집' 
//                                             layout='fixed'
//                                         />
//                                     </Grid>
//                                     <Grid style={{marginRight:'5px'}}>
//                                         <Image
//                                             src={tagChoose['간단한 한 끼'] ? tag2on : tag2}
//                                             width= {131}
//                                             height= {34}
//                                             alt="tag2"
//                                             onClick={handleTagClick}
//                                             id='간단한 한 끼' 
//                                             layout='fixed'
//                                         />
//                                     </Grid>
//                                     <Grid style={{marginRight:'5px'}}>
//                                         <Image
//                                             src={tagChoose['분위기 좋은'] ? tag3on : tag3}
//                                             width= {124}
//                                             height= {34}
//                                             alt="tag3"
//                                             onClick={handleTagClick}
//                                             id='분위기 좋은' 
//                                             layout='fixed'
//                                         />
//                                     </Grid>
//                                     <Grid style={{marginRight:'5px'}}>
//                                         <Image
//                                             src={tagChoose['가성비'] ? tag4on : tag4}
//                                             width= {88}
//                                             height= {34}
//                                             alt="tag4"
//                                             onClick={handleTagClick}
//                                             id='가성비' 
//                                             layout='fixed'
//                                         />
//                                     </Grid>
//                                     <Grid style={{marginRight:'5px'}}>
//                                         <Image
//                                             src={tagChoose['친절'] ? tag5on : tag5}
//                                             width= {77}
//                                             height= {34}
//                                             alt="tag5"
//                                             onClick={handleTagClick}
//                                             id='친절' 
//                                             layout='fixed'
//                                         />
//                                     </Grid>
//                                     <Grid style={{marginRight:'5px'}}>
//                                         <Image
//                                             src={tagChoose.청결도 ? tag6on : tag6}
//                                             width= {92}
//                                             height= {34}
//                                             alt="tag6"
//                                             onClick={handleTagClick}
//                                             id='청결도' 
//                                             layout='fixed'
//                                         />
//                                     </Grid>
//                                     <Grid style={{marginRight:'5px'}}>
//                                         <Image
//                                             src={tagChoose['둘이 가요'] ? tag7on : tag7}
//                                             width= {109}
//                                             height= {34}
//                                             alt="tag7"
//                                             onClick={handleTagClick}
//                                             id='둘이 가요' 
//                                             layout='fixed'
//                                         />
//                                     </Grid>
//                                 </Grid>
//                                 </div>
//                             </Grid>
//                             <Grid>
//                                 <Grid container style={{position:'relative', width:'100%'}}>
//                                     <Grid item style={{overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', marginTop:'20px'}}>
//                                         <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', borderRadius: '5px', backgroundColor: '#eee', color: '#333', fontSize: '16px', fontWeight: 'bold', marginRight:'5px'}}>
//                                             <input onChange={handleImageChange} style={{position: 'absolute', fontSize: '100px', left: '0', top: '0', opacity: '0', zIndex: '5' }} type="file" name="images" accept="image/*" multiple />
//                                             <label style={{width:'150px', height:'150px', textAlign:'center', display: 'inline-block', cursor: 'pointer',borderRadius:'10px', backgroundColor:'white', border:'1px solid grey', padding:'55px 0 0 7px'}} htmlFor="images">
//                                                 <Image src={morePhoto} width={40} height={40}/>
//                                             </label>
//                                         </div>
//                                         {previewImages.map((previewImage, index) => (
//                                         <Grid item key={index} style={{ display: 'inline-block', flexShrink: 0, paddingRight: '5px', position: 'relative' }}>
//                                             <img key={previewImage} src={previewImage} alt="preview" 
//                                             style={{ 
//                                                 width: '150px', 
//                                                 height: '150px', 
//                                                 objectFit: 'cover', 
//                                                 objectPosition: 'center center',
//                                                 borderRadius:'10px'
//                                                 }} />
//                                             <Button type="button" onClick={() => handleImageRemove(index)} style={{ position: 'absolute', top: '0', right: '3px', padding: '10px', justifyContent: 'right' }}>
//                                                 <Image src={removeBtn} width={25} height={25} layout='fixed'
//                                                     style={{ 
//                                                         backgroundColor:'white',
//                                                         borderRadius:'20px'
//                                                     }}/>
//                                             </Button>
//                                         </Grid>
//                                         ))}
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid>
//                             </Grid>
//                             <Grid container style={{margin:'10px auto 0px', justifyContent:'center'}}>
//                                 <Grid>
//                                     <Box
//                                     component="form"
//                                     noValidate
//                                     sx={{'& .MuiTextField-root': { m: 1, width: '80vw', maxWidth: '372px'  }, justifyContent:'center', alignItems:'center',}}>
//                                         <TextField
//                                         id="outlined-multiline-statiic"
//                                         multiline
//                                         rows={7}
//                                         label="솔직한 리뷰를 써주세요 :)"
//                                         value={textReview}
//                                         onChange={(e)=>{setTextReview(e.target.value)}}
//                                         maxLength={60}
//                                         />
//                                 </Box>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Grid>
//                 </Grid>
//             </Container>
//         </div>
//         </ThemeProvider>
        
//     )
// }

// export default dynamic(() => Promise.resolve(ModifyReview), {
//     ssr: false,
// });
