import { useEffect,useRef,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change_matching_info, load_matching_info } from "../actions/matchingUser/matchingUser";
import { useRouter } from "next/router";
import {ThemeProvider, CssBaseline,Dialog,DialogContent, Typography, Button, Container, Grid} from '@mui/material';
import Image from 'next/image';
import theme from "../theme/theme";
import back from '../image/close.png';
import AlertMessage from "../components/Alert";
import { displayProfile } from '../components/MyPage/ProfileList';
import Popup from '../components/Custom/Popup';

const makeProfile = () => { 
    const dispatch = useDispatch();
    const router = useRouter();
    const matchingUser = useSelector(state => state.matchingUser.myMatchingInfo);
    const user = useSelector(state => state.auth.user);
    const keywordNum = useRef(0);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('check');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupDescription, setPopupDescription] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    useEffect(() => {
        dispatch(load_matching_info());
    }, []);

    //초기값 받아오기
    useEffect(()=>{
        if (matchingUser) {
            //성별
            const gender = matchingUser.gender;
            if(gender == '남성'){
                setGender('남성');
            } else if(gender == '여성'){
                setGender('여성');
            }

            //mbti
            const mbti = matchingUser.mbti;
            const newMbtiChoose = { ...mbtiChoose };
            for (let i = 0; mbti && i < mbti.length; i++) {
              newMbtiChoose[mbti[i]] = true;
            }
            setMbtiChoose(newMbtiChoose);

            //관심사
            keywordNum.current = 0;
            const keyword = matchingUser.keywords;

            for (const key in keyword) {
                if (keyword.hasOwnProperty(key)) {
                  const elements = keyword[key];
                  keywordNum.current += elements.length;

                  elements.forEach((element) => {
                    if (key === '음식') {
                      setFood(prevState => ({
                        ...prevState,
                        [element]: true,
                     }))
                    }

                    if (key === '운동') {
                        setSports(prevState => ({
                            ...prevState,
                            [element]:true,
                        }))
                    }

                    if (key === '문화예술') {
                        setArt(prevState => ({
                            ...prevState,
                            [element]:true,
                        }))
                    }

                    if (key === '학술') {
                        setStudy(prevState => ({
                            ...prevState,
                            [element]:true,
                        }))
                    }
            })}}
            setKeyword(keyword);
            
            //한줄소개
            const introduction = matchingUser.introduction;
            setIntroduction(introduction);
        }
    }, [matchingUser]);

    const [mbtiChoose, setMbtiChoose] = useState({
        'E': false,
        'I': false,
        'N': false,
        'S': false,
        'F': false,
        'T': false,
        'P': false,
        'J': false,
    }); 
    const [food, setFood] = useState({
        '한식': false,
        '일식': false,
        '중식': false,
        '양식': false,
        '남미음식': false,
        '분식': false,
        '아시아음식': false,
        '카페': false,
    });
    const [sports, setSports] = useState({
        '축구': false,
        '야구': false,
        '농구': false,
        '골프': false,
        '테니스': false,
        '당구': false,
        '헬스': false,
        '보드스키': false,
        '주짓수': false,
        '서핑': false,
        '등산': false,
        '러닝': false,
        '스포츠관람': false,
        '볼링': false,
        '배드민턴': false,
        '댄스': false,
    });
    const [art, setArt] = useState({
        '영화': false,
        '음악': false,
        '전시회': false,
        '연극뮤지컬': false,
        '덕질': false,
        '여행': false,
        '게임': false,
        '노래방': false,
        '방탈출': false,
        '보드게임': false,
        '반려동물': false,
        '요리': false,
        '맛집탐방': false,
        '만화': false,
    })
    const [study, setStudy] = useState({
        '학회': false,
        '동아리': false,
        '교환학생': false,
        '봉사': false,
        '재테크': false,
        '빅데이터': false,
        '금융': false,
        '문학': false,
        '토론': false,
        '시사': false,
        '어학': false,
        'CPA': false,
        '피트': false,
        '로스쿨': false,
        '행시': false,
    })

    const [gender, setGender] = useState('');
    const [keyword, setKeyword] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [mbti, setMbti] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'back' ){
            
            router.back();
            
        } else if(event.target.name == '건너뛰기'){
            //웰컴페이지로 이동
        }
    };

    const handleGenderClick = (e) => {
        setGender(e.target.value)
    }

    const handleMbtiClick = (chosen) => {
        switch(chosen) {
            case 'E':
                setMbtiChoose({...mbtiChoose, 'E': true, 'I': false})
                break
            case 'I':
                setMbtiChoose({...mbtiChoose, 'E': false, 'I': true})
                break
            case 'N':
                setMbtiChoose({...mbtiChoose, 'N': true, 'S': false})
                break
            case 'S':
                setMbtiChoose({...mbtiChoose, 'N': false, 'S': true})
                break
            case 'F':
                setMbtiChoose({...mbtiChoose, 'F': true, 'T': false})
                break
            case 'T':
                setMbtiChoose({...mbtiChoose, 'F': false, 'T': true})
                break
            case 'P':
                setMbtiChoose({...mbtiChoose, 'P': true, 'J': false})
                break
            case 'J':
                setMbtiChoose({...mbtiChoose, 'P': false, 'J': true})
                break
            default:
                break
        }

    }

    const handleFoodClick = (chosen) => {
        if (food[chosen]) {
            setFood({
                ...food,
                [chosen] : false
            })
            keywordNum.current -= 1;
        } else {
            //if (keywordNum.current < 8) {
                setFood({
                    ...food,
                    [chosen] : true
                })
                keywordNum.current += 1;
            //}
        }
    }

    const handleSportsClick = (chosen) => {
        if (sports[chosen]) {
            setSports({
                ...sports,
                [chosen] : false
            })
            keywordNum.current -= 1;
        } else {
            //if (keywordNum.current < 8) {
                setSports({
                    ...sports,
                    [chosen] : true
                })
                keywordNum.current += 1;
            //}
        }
    }
    const handleArtClick = (chosen) => {
        if (art[chosen]) {
            setArt({
                ...art,
                [chosen] : false
            })
            keywordNum.current -= 1;
        } else {
            //if (keywordNum.current < 8) {
                setArt({
                    ...art,
                    [chosen] : true
                })
                keywordNum.current += 1;
            //}
        }
    }
    const handleStudyClick = (chosen) => {
        if (study[chosen]) {
            setStudy({
                ...study,
                [chosen] : false
            })
            keywordNum.current -= 1;
        } else {
            //if (keywordNum.current < 8) {
                setStudy({
                    ...study,
                    [chosen] : true
                })
                keywordNum.current += 1;
            //}
        }
    }
    
    //확인
    const handleOnSubmit = (event) => {
        
        event.preventDefault();
        const data = {
            gender: gender,
            keywords: keyword,
            introduction: introduction,
            mbti: mbti
        }
        dispatch(change_matching_info(data, ([result, message]) => {
                if (result) {
                    setPopupMessage('변경 내용을 저장하였습니다.');
                    setPopupOpen(true);
                    setPopupType('success');
                } else {
                    setAlertOpen(true);
                    setAlertMessage(message);
                }
            }));
        setAlertOpen(false);
        setAlertMessage('');
    } 
    
    const handlePopupClose = () => {
        setPopupOpen(false);
        router.push('/myPage');
    }

    //데이터 전달하기 위하여
    useEffect(() => {

        const newMbti = Object.entries(mbtiChoose)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join('');
        if(newMbti.length==4){
            setMbti(newMbti);
        } else{
            setMbti('');
        }
        
        const newKeywords = [sports, food, art, study];

        const allKeywords = Array.from(new Set(
            newKeywords.reduce((acc, current) => {
              return acc.concat(Object.entries(current));
            }, [])
            .filter(([, value]) => value)
            .map(([key]) => key)
          ));
            
            if(allKeywords.length >= 3 ){
                
                setKeyword(allKeywords);
            } else {
                setKeyword([]);
            }
      }, [mbtiChoose, food, study, art, sports]);

    useEffect(() => {
        if (matchingUser) {
            const top3Keywords = [];
            for (const key in matchingUser.keywords) {
                if (top3Keywords.legnth >= 2) {
                    break;
                }
                const values = matchingUser.keywords[key];
                top3Keywords.push(values[0]);
            }
            if (top3Keywords.length < 2) {
                const keys = Object.keys(matchingUser.keywords);
                const values = matchingUser.keywords[keys];
                top3Keywords.push(values[1])
            }
            top3Keywords.unshift(matchingUser.mbti)
            setSelectedKeywords(top3Keywords);
        }
    }, [matchingUser])

    //확인버튼 이미지 조건 반영 위해
    const isEnabled = 
        gender
        && keyword.length >= 3
        && introduction
        && introduction !== ''
        && ((!mbtiChoose.E && mbtiChoose.I) || (mbtiChoose.E && !mbtiChoose.I))
        && ((!mbtiChoose.N && mbtiChoose.S) || (mbtiChoose.N && !mbtiChoose.S))
        && ((!mbtiChoose.F && mbtiChoose.T) || (mbtiChoose.F && !mbtiChoose.T))
        && ((!mbtiChoose.P && mbtiChoose.J) || (mbtiChoose.P && !mbtiChoose.J));

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <AlertMessage alertOpen={alertOpen} setAlertOpen={setAlertOpen} alertMessage={alertMessage}/>
                <Container style={{padding:'0px', overflowX:'hidden'}}>
                    <Container style={{padding:'0px', alignItems: 'center',position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#fff', zIndex: '99', maxWidth: '420px', padding:'41px 0px 13px 0px', }}>
                        <Grid container style={{}}>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={25} height={25} name='back' onClick={handleIconOnclick} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'22%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight:'700'}} >개인 프로필 수정</Typography>
                            </Grid>
                            <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'20px'}}>
                                <Button onClick={(event) => isEnabled ? handleOnSubmit(event) : {}} style={{padding:'0', right:'0'}}>
                                    <Typography style={{margin:'0px 0px 0px 10px',color: isEnabled ? '#FFCE00' : '#BABABA', textAlign:'center',fontSize:'18px', fontWeight: 'bold'}}>저장</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                    {/* 상단 회원 정보 */}
                    {user && 
                    <div style={{width: '100%', marginTop: '100px'}}>
                        <div style={{marginTop: '30px'}}>
                        <div style={{display: 'flex', gridTemplateColumns: '72px 1fr 38px', alignItems: 'center', margin: '10px 10px 10px 0px'}}>
                            <div style={{width: '80px', height:'80px', margin:'0 24px', marginBottom: '10px', backgroundColor:'#FFF8D9', border:'0px solid transparent', borderRadius:'10px'}}>
                                {displayProfile(user.image, 100, 100)}
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '15px'}}>
                                {/* 닉네임, 캠퍼스, 학과, 학번 */}
                                <div style={{display: 'flex', height: '21px'}}>
                                    <Typography style={{fontSize: '18px', fontWeight: 'bold', alignSelf: 'start', justifySelf: 'start'}}>{user.nickname}</Typography>
                                    {user.campus == "명륜" ? <Typography sx={{height: '24px', border: "1px solid #FFFCE4", borderRadius:'10px', fontSize: '12px',  fontWeight:'700',p: '2px 4px 0px 4px', color:'#FFAC0B', backgroundColor:'#FFFCE4', margin:'1px 0px 0px 8px'}} >명륜</Typography> : <Typography sx={{height: '24px', border: "1px solid #DCF8DB", borderRadius:'10px', fontSize: '12px',  fontWeight:'700',p: '2px 4px 0px 4px', color:'#58C85A', backgroundColor:'#DCF8DB', margin:'1px 0px 0px 8px'}} >율전</Typography>}
                                </div>
                                <Typography sx={{fontSize: '12px', p: '0px 3.5px 0px 0px', color:'#3C3C3C', marginTop: '8px'}}>{user.major} / {user.student_id}학번 {user.gender && <span>/ {user.gender[0]}</span>}</Typography>
                                <div style={{display: 'flex', marginTop: '6px'}}>
                                    {selectedKeywords.length > 0 && selectedKeywords.slice(0, 3).map((keyword, index) => (
                                        <div key={index} style={{backgroundColor: '#F2F2F2', borderRadius: '24px', padding: '3px 12px', marginRight: '4px', fontSize: '12px', color: '#777777'}}>{keyword}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100px', marginLeft: '24px',}}>
                            <Button onClick={() => router.push('/editProfileImage')} style={{fontSize: '14px', fontWeight: 'bold', textDecoration: 'underline', color: '#777777'}}>이미지 변경</Button></div>
                        </div>
                    </div>}

                    <form style={{width: '100%'}}>
                        <div style={{margin: '30px 24px'}}>
                
                        {/* 성별 */}
                        <Typography style={{fontSize: '14px', marginBottom: '8px', color: '#3C3C3C'}}>성별</Typography>
                        <Grid container style={{marginBottom: '18px'}}>
                            <Button value="남성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '8px 0 0 8px', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '남성' ? '#FFFCE4' : '#fff'}}>남</Button>
                            <Button value="여성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderLeftColor:'transparent', borderRadius: '0 8px 8px 0', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '여성' ? '#FFFCE4' : '#fff'}}>여</Button>
                        </Grid>

                        {/* MBTI */}
                        <Typography style={{fontSize: '14px', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>MBTI</Typography>
                        <Grid container style={{marginBottom: '18px'}}>
                            <div style={{width: '22%'}}>
                                <Button onClick={() => handleMbtiClick("E")} style={{backgroundColor: mbtiChoose.E ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>E</Button>
                                <Button onClick={() => handleMbtiClick("I")} style={{backgroundColor: mbtiChoose.I ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderTopColor:'transparent',  borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>I</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={() => handleMbtiClick("N")} style={{backgroundColor: mbtiChoose.N ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>N</Button>
                                <Button onClick={() => handleMbtiClick("S")} style={{backgroundColor: mbtiChoose.S ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>S</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={() => handleMbtiClick("F")} style={{backgroundColor: mbtiChoose.F ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>F</Button>
                                <Button onClick={() => handleMbtiClick("T")} style={{backgroundColor: mbtiChoose.T ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2',borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>T</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={() => handleMbtiClick("P")} style={{backgroundColor: mbtiChoose.P ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>P</Button>
                                <Button onClick={() => handleMbtiClick("J")} style={{backgroundColor: mbtiChoose.J ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2',borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>J</Button>
                            </div>
                        </Grid>

                        {/* 한 줄 자기소개 */}
                        <Typography style={{fontSize: '14px', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>한줄 자기 소개</Typography>
                        {/* <div style={{width: '100%', border: '1px solid #E2E2E2', borderRadius: '8px'}}> */}
                        <textarea 
                        value={introduction}
                        onChange={(e)=> {setIntroduction(e.target.value)}}
                        //maxLength={29}
                        placeholder='간단히 자신을 소개해보세요 (필수)'
                        style={{width: '100%', outline: 'none', resize: 'none', fontSize: '16px', border: '1px solid #E2E2E2', borderRadius: '8px', height: '73px', padding: '12px 18px', fontFamily: 'inherit'}}>
                        </textarea>
                        {/* <div style={{width: '100%', height: '25px', display: 'flex', justifyContent: 'space-between'}}>
                            <div></div>
                            <Typography style={{padding: '0 18px 12px 0', color: '#FC9712', fontSize: '12px'}}>{introduction && `${introduction.length}/30자`}</Typography>
                        </div> */}
                        {/* </div> */}
                        </div>

                        <div style={{ borderTop: '10px solid #E2E2E2', margin: '40px 0 30px 0' }}></div>

                        <div style={{margin: '0 24px 50px 24px'}}>
                        {/* 관심사 */}
                        <Typography style={{fontSize: '18px', fonrtWeight: 'bold', marginBottom: '8px', color: '#3C3C3C'}}>관심사</Typography>
                        <Typography style={{fontSize:'12px', textAlign:'left', margin:'8px 0px 20px 0px'}} color='#9E9E9E'>태그를 3개 이상 선택해주세요.</Typography>

                        {/* 음식 */}
                        <Typography style={{fontSize: '16px', fonrtWeight: 'bold', marginBottom: '8px', color: '#3C3C3C'}}>음식</Typography>
                        {Object.keys(food).map((a, index) => <Button key={index} onClick={() => handleFoodClick(a)} style={{height: '32px', border: food[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: food[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 운동 */}
                        <Typography style={{fontSize: '16px', fonrtWeight: 'bold', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>운동</Typography>
                        {Object.keys(sports).map((a, index) => <Button key={index} onClick={() => handleSportsClick(a)} style={{height: '32px', border: sports[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: sports[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 문화 예술 */}
                        <Typography style={{fontSize: '16px', fonrtWeight: 'bold', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>문화 예술</Typography>
                        {Object.keys(art).map((a, index) => <Button key={index} onClick={() => handleArtClick(a)} style={{height: '32px', border: art[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: art[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 학술 */}
                        <Typography style={{fontSize: '16px', fonrtWeight: 'bold', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>학술</Typography>
                        {Object.keys(study).map((a, index) => <Button key={index} onClick={() => handleStudyClick(a)} style={{height: '32px', border: study[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: study[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}
                        </div>
                    </form>
                {/* <Dialog open={dialogOpen}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>저장이 완료되었습니다.</Typography></DialogContent></Dialog> */}

                </Container>
                <Popup 
                    open={popupOpen}
                    handleClose={handlePopupClose}
                    type={popupType}
                    message={popupMessage}
                    description={popupDescription}
                />
        </ThemeProvider>
    )
}

export default makeProfile;
