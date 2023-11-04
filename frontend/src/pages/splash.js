// import { CssBaseline, ThemeProvider, Container, } from '@mui/material';
// import theme from '../theme/theme';
// import logo from '../image/main_logo.png';
// import Image from 'next/image';
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import loading0 from '../image/loading0.png';
// import loading1 from '../image/loading1.png';
// import loading2 from '../image/loading2.png';
// import loading3 from '../image/loading3.png';
// import { useDispatch } from 'react-redux';
// import { load_user, change_toggle_for_not_user, update_last_accessed_time } from '../actions/auth/auth';
// import dynamic from 'next/dynamic';

// const loadingImages = [loading0, loading1, loading2, loading3];

// const splash = () => {

//     const [loadingIndex, setLoadingIndex] = useState(0);
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const campus = localStorage.getItem('map');

//     useEffect(() => {
//         const timerId = setTimeout(() => {
//             dispatch(load_user(([result, message]) => {
//                 if (result) {
//                     dispatch(update_last_accessed_time(true));
//                     router.push('/');
//                 } else {
//                     if (campus) {
//                         dispatch(change_toggle_for_not_user(campus));
//                     } else {
//                         localStorage.setItem('map', '명륜');
//                         dispatch(change_toggle_for_not_user('명륜'));
//                     }
//                     let isUser = localStorage.getItem("user");
//                     if (isUser == "true") {
//                         router.push('/');
//                     } else {
//                         localStorage.setItem("user", "true")
//                         router.push('/nextSplash')
//                     }
//                 }
//             }));
//         }, 3000);

//         return () => clearTimeout(timerId);
//     }, []);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setLoadingIndex((loadingIndex + 1) % loadingImages.length);
        
//         }, 1000);
//         return () => clearInterval(intervalId);
//     }, [loadingIndex]);

//     const height = window.innerHeight / 2 - 140;
    
//     return(
//         <ThemeProvider theme={theme}>
//             <CssBaseline/>
//             <Container style={{height:'100vh', width:'100%', overflowY:'hidden', position:'relative', padding:'0px'}}>
//                 <div style={{ width:'100%', height:'100%', textAlign:'center', position:'absolute', display:'block', justifyContent:'center', marginTop:height}}>
//                     <Image src={logo} width={169} height={185}/>
//                 </div>
//                 <div style={{width:'100%', textAlign:'center', position:'absolute', bottom:55}}>
//                     <Image src={loadingImages[loadingIndex] }width={133} height={30} layout='fixed' />
//                 </div>
//             </Container>
//         </ThemeProvider>
//     )
// }

// export default dynamic(() => Promise.resolve(splash), {
//     ssr: false,
// });