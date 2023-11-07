import { CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../theme/theme';
import { useState} from "react";
import EditProfileImage from '../components/MyPage/EditProfileImage';

const editProfileImage = () => {
    const [image, setImage] = useState("");

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <EditProfileImage image={image} setImage={setImage}/>
        </ThemeProvider>

    )

}

export default editProfileImage;
