// ShowAllHeader.js
import React from 'react';
import { Typography } from '@mui/material';
import Image from 'next/image';
import iconBack from '../../image/icon_header_back.png';
import iconSearch from '../../image/icon_header_search.png';
import iconClose from '../../image/close.png';
import { useRouter } from 'next/router';

const Header = ({title}) => {
    const router = useRouter();

    const onBackClick = () => {
        if(title === '여럿이서 먹어요' || title === '둘이 먹어요') {
            router.push('/mealPromise');
        } else router.back();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 12px' }}>
            {
                title === '그룹 프로필 등록' ? (
                    <div style={{ width: 30, display: 'flex', alignItems: 'center' }} />
                ) :
                <div onClick={onBackClick} style={{ width: 30, display: 'flex', alignItems: 'center' }}>
                    <Image src={iconBack} layout="fixed" width={10.82} height={18.98} />
                </div>
            }
            <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#3C3C3C', flex: 1, textAlign: 'center' }}>
                {title}
            </Typography>
            <div style={{ width: 30, display: 'flex', justifyContent: 'flex-end' }}>
                {
                    title === '그룹 프로필 등록' ? (
                        <Image src={iconClose} onClick={()=> router.back()} layout="fixed" width={24} height={24} />
                    ) : 
                    <Image src={iconSearch} layout="fixed" width={24} height={24} />
                }
            </div>
        </div>
    );
};

export default Header;
