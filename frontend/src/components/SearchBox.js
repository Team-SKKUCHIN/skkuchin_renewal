// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import theme from "../theme/theme";
// import Image from 'next/image';
// import {Grid, CssBaseline, InputBase,TextField, Paper, styled, ThemeProvider, Container, Typography} from '@mui/material';
// import searchBox from '../image/searchHolder.png';
// import { load_places } from "../actions/place/place";
// import marker from '../image/location.png';
// import noAuto from '../image/noinfo_enheng.png';
// import Hangul from "hangul-js";
// import dynamic from 'next/dynamic';

// const MapDrawer = dynamic(() => import("./MapDrawer"));

// export default function SearchBox({openID, handleFocus, handleClick}){
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [value, setValue] = useState('');
//     const [filteredPlace, setFilteredPlace] =useState([]);
//     const [auto, setAuto] = useState([]);
//     const [autoBox, setAutoBox] = useState(false);
//     const [isLoaded, setIsLoaded] = useState(false);

//     const allPlaces = useSelector(state => state.place.allplaces);
//     const user = useSelector(state => state.auth.user);
//     const toggle = useSelector(state => state.auth.toggle_for_not_user);

//     useEffect(() => {
//         if (!allPlaces || allPlaces.length === 0) {
//             dispatch(load_places());
//         }
//     }, []);
    
//     //캠퍼스 필터링
//     useEffect(() => {
//         if (allPlaces && user) {
//             setFilteredPlace(allPlaces.filter((item) => item.campus === user.toggle));
//         } else if (allPlaces && toggle) {
//             setFilteredPlace(allPlaces.filter((item) => item.campus === toggle));
//         } else {
//             setFilteredPlace([]);
//         }
//     }, [allPlaces, user, toggle]);

//     const handleValue = (e) => {
//         setValue(e.target.value);

//         if(e.target.value == ''){
//             setAuto([]);
//         } else{
//             const regex = new RegExp(e.target.value, 'i');
//             const newAuto = filteredPlace.filter((item) => regex.test(Hangul.assemble(item.name)));
//             setAuto(newAuto);
            
//         }
//     }

    
//     const handleKeyDown = (e) => {
//         if(e.keyCode === 13){
//             setValue(e.target.value);
//             router.push({
//                 pathname: '/searchList',
//                 query: { keyword: value}
//             });
//             setValue('');
//         }
//     }

//     const handleAutoOnClick = (autoValue) => {
        
//         setValue(autoValue);
//         setAuto(autoValue);
//         router.push({
//             pathname:'/searchList',
//             query: {keyword: autoValue}
//         });
//         setValue('')
//         setAuto([]);
//     }

//     //드로워, 검색창 활성화되었을 때 true값 index.js로 전송
//     const handleOnFocus = () => {
//         handleFocus(true);
//     }

//     const handleInputOnFocus = () => {
//         setAutoBox(true);
//     }

//     const handleInputOnBlur = (e) => { 
//         setAutoBox(false);
//     }

//     const handleContainerMouseDown = (e) => {
//         e.preventDefault();
//     }

//     return(
//         <ThemeProvider theme={theme}>
//             <CssBaseline/>
//             <div onFocus={handleOnFocus} onBlur={handleInputOnBlur} >
//                 <div style={{marginTop:'5px'}} >
//                     <Grid container style={{position:'absolute', top:'53%', left:'60%', transform: 'translate(-50%, -50%)', zIndex:'10', alignItems: 'center'}} >
//                         <Grid item name="mapdrawer">
//                             <MapDrawer open={openID} />
//                         </Grid>
//                         <Grid item name='input' style={{marginTop:'-2px'}}>
                    
//                             <InputBase
//                                 sx={{ ml: 1, width:'155%'}}
//                                 placeholder="오늘은 라멘 어때요?"
//                                 value={value}
//                                 onChange={handleValue}
//                                 onKeyDown={handleKeyDown}
//                                 onFocus={handleInputOnFocus}
                                
//                             />
                        
//                         </Grid>
//                     </Grid>
//                     <div style={{position: 'relative', padding:'0px 12px 0px 16px', zIndex:'9'}}>
//                         <Image src={searchBox} layout="responsive" placeholder='blur' priority />
//                     </div>
//                 </div>
//                 { autoBox && value && (
//                 <div onMouseDown={handleContainerMouseDown}>
//                     <Paper style={{position:'absolute',height:'100vh', width:'100%', top:'0px', overflowY:'scroll', border: '1px solid transparent',
//                     borderRadius: '0px', zIndex: '8'}}> 
//                         <Container style={{padding:'0px', marginTop:'110px'}}>
//                             {auto.length > 0 ?
//                             <ul style={{padding:'0px 25px 0px 25px', listStyleType: "none",}}>
//                                 {auto.map((autoList) => (
//                                     <li
//                                         key={autoList.id}
//                                         onClick={()=>handleAutoOnClick(autoList.name)}
//                                         style={{ padding:'15px 10px 7px 10px',borderBottom: '1px solid #D9D9D9'}}
//                                     >   
//                                         <Grid container>
//                                             <Grid item style={{margin:'10px 0px 0px 0px'}}>
//                                                 <Image src={marker} width={16} height={21} layout='fixed' />
//                                             </Grid>
//                                             <Grid item style={{margin:'0px 0px 0px 12px'}}>
//                                                 <div style={{fontSize:'16px'}}>
//                                                 {autoList.name}
//                                                 </div>
//                                                 <div style={{fontSize:'12px', color:'#a1a1a1'}}>
//                                                     {autoList.address.substr(2)}
//                                                 </div>
//                                             </Grid>
                                            
//                                         </Grid>
                                        
//                                     </li>
//                                 ))}
//                             </ul>
//                             : (
//                                 <div style={{textAlign:'center', paddingTop:'110px'}}>        
//                                     <Image src={noAuto} width={129} height={108} placeholder="blur" layout='fixed' />
//                                     <Typography color={theme.palette.fontColor.light} fontWeight={theme.typography.h2} style={{fontSize:'14px'}} >검색결과가 없습니다.</Typography>
//                                 </div>
//                             )}
//                         </Container>
//                     </Paper>
//                 </div>
//                 )}
//             </div>
//         </ThemeProvider>
//     )
// }