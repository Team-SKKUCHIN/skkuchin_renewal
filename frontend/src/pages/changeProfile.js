import { useEffect,useRef,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change_matching_info, load_matching_info } from "../actions/matchingUser/matchingUser";
import { useRouter } from "next/router";
import {ThemeProvider, CssBaseline,Dialog,DialogContent, Typography, Button, Container, Grid} from '@mui/material';
import Image from 'next/image';
import theme from "../theme/theme";
import back from '../image/arrow_back_ios.png';
import dynamic from 'next/dynamic';

const AlertMessage = dynamic(() => import('../components/Alert'));

const makeProfile = () => { 
    const dispatch = useDispatch();
    const router = useRouter();
    const matchingUser = useSelector(state => state.matchingUser.matchingUser);
    const keywordNum = useRef(0);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (!isAuthenticated) {
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

                    if (key === '예술') {
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

    const handleMbtiClick = (e) => {
        let chosen = e.target.innerText

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

    const handleFoodClick = (e) => {
        if (food[e.target.innerText]) {
            setFood({
                ...food,
                [e.target.innerText] : false
            })
            keywordNum.current -= 1;
        } else {
            if (keywordNum.current < 8) {
                setFood({
                    ...food,
                    [e.target.innerText] : true
                })
                keywordNum.current += 1;
            }
        }
    }

    const handleSportsClick = (e) => {
        if (sports[e.target.innerText]) {
            setSports({
                ...sports,
                [e.target.innerText] : false
            })
            keywordNum.current -= 1;
        } else {
            if (keywordNum.current < 8) {
                setSports({
                    ...sports,
                    [e.target.innerText] : true
                })
                keywordNum.current += 1;
            }
        }
    }
    const handleArtClick = (e) => {
        if (art[e.target.innerText]) {
            setArt({
                ...art,
                [e.target.innerText] : false
            })
            keywordNum.current -= 1;
        } else {
            if (keywordNum.current < 8) {
                setArt({
                    ...art,
                    [e.target.innerText] : true
                })
                keywordNum.current += 1;
            }
        }
    }
    const handleStudyClick = (e) => {
        if (study[e.target.innerText]) {
            setStudy({
                ...study,
                [e.target.innerText] : false
            })
            keywordNum.current -= 1;
        } else {
            if (keywordNum.current < 8) {
                setStudy({
                    ...study,
                    [e.target.innerText] : true
                })
                keywordNum.current += 1;
            }
        }
    }
    
    //확인
    const handleOnSubmit = (event) => {
        
        event.preventDefault();
        
        dispatch(change_matching_info(gender, keyword, introduction, mbti, ([result, message]) => {
                if (result) {
                    setDialogOpen(true);
                    setTimeout(() => {
                        router.push('/myPage');
                    }, 1000); 
                } else {
                    setAlertOpen(true);
                    setAlertMessage(message);
                }
            }));
        setAlertOpen(false);
        setAlertMessage('');
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

    //확인버튼 이미지 조건 반영 위해
    const isEnabled = 
        gender
        && keyword.length > 0
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
                <Container style={{padding:'0px', margin:'41px 0px 53px 0px', overflowX:'hidden'}}>
                    <Container style={{padding:'0px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleIconOnclick} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'29%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight:'700'}} >프로필 수정하기</Typography>
                            </Grid>
                            <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'20px'}}>
                                <Button onClick={(event) => isEnabled ? handleOnSubmit(event) : {}} style={{padding:'0', right:'0'}}>
                                    <Typography style={{margin:'0px 0px 0px 10px',color: isEnabled ? '#FFCE00' : '#BABABA', textAlign:'center',fontSize:'18px', fontWeight: '500'}}>저장</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                    <form style={{width: '100%'}}>
                        <div style={{margin: '40px 24px'}}>
                
                        {/* 성별 */}
                        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>성별</Typography>
                        <Grid container style={{marginBottom: '16px'}}>
                            <Button value="남성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '8px 0 0 8px', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '남성' ? '#FFFCE4' : '#fff'}}>남</Button>
                            <Button value="여성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderLeftColor:'transparent', borderRadius: '0 8px 8px 0', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '여성' ? '#FFFCE4' : '#fff'}}>여</Button>
                        </Grid>

                        {/* MBTI */}
                        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>MBTI</Typography>
                        <Grid container style={{marginBottom: '16px'}}>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.E ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>E</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.I ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderTopColor:'transparent',  borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>I</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.N ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>N</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.S ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>S</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.F ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>F</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.T ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2',borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>T</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.P ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>P</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.J ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2',borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>J</Button>
                            </div>
                        </Grid>

                        {/* 한 줄 자기소개 */}
                        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>한 줄 자기소개</Typography>
                        <div style={{width: '100%', border: '1px solid #E2E2E2', borderRadius: '8px'}}>
                        <textarea 
                        value={introduction}
                        onChange={(e)=> {setIntroduction(e.target.value)}}
                        maxLength={29}
                        placeholder='스꾸친에 오신 걸 환영합니다'
                        style={{width: '100%', outline: 'none', resize: 'none', fontSize: '16px', border: 'none', height: '60px', padding: '12px 18px', fontFamily: 'inherit'}}>
                        </textarea>
                        <div style={{width: '100%', height: '25px', display: 'flex', justifyContent: 'space-between'}}>
                            <div></div>
                            <Typography style={{padding: '0 18px 12px 0', color: '#FC9712', fontSize: '12px'}}>{introduction && `${introduction.length}/30자`}</Typography>
                        </div>
                        </div>

                        {/* 관심사 */}
                        <Typography style={{fontSize: '16px', marginTop: '60px', marginBottom: '8px', color: '#3C3C3C', fontWeight:'800'}} fontWeight={theme.typography.h1}>관심사</Typography>
                        <Typography style={{fontSize:'12px', textAlign:'left', margin:'8px 0px 20px 0px'}} color={theme.palette.fontColor.main} fontWeight={theme.typography.h2}>3개 이상의 태그를 선택해주세요.</Typography>

                        {/* 음식 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#3C3C3C'}}>음식</Typography>
                        {Object.keys(food).map((a, index) => <Button key={index} onClick={handleFoodClick} style={{height: '32px', border: food[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: food[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 운동 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>운동</Typography>
                        {Object.keys(sports).map((a, index) => <Button key={index} onClick={handleSportsClick} style={{height: '32px', border: sports[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: sports[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 문화 예술 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>문화 예술</Typography>
                        {Object.keys(art).map((a, index) => <Button key={index} onClick={handleArtClick} style={{height: '32px', border: art[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: art[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 학술 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>학술</Typography>
                        {Object.keys(study).map((a, index) => <Button key={index} onClick={handleStudyClick} style={{height: '32px', border: study[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: study[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}
                        </div>
                    </form>
                <Dialog open={dialogOpen}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>저장이 완료되었습니다.</Typography></DialogContent></Dialog>

                </Container>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(makeProfile), {
    ssr: false,
});