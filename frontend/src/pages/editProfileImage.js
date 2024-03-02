import { CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../theme/theme';
import { useEffect, useState} from "react";
import EditProfileImage from '../components/MyPage/EditProfileImage';

const editProfileImage = () => {
    const [image, setImage] = useState("");

    useEffect(() => {
        //console.log("image: ", image);
    }, [image]);
    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <EditProfileImage image={image} setImage={setImage}/>
        </ThemeProvider>

    )

}

export default editProfileImage;
