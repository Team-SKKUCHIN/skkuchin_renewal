import React from 'react';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';
import iconBack from '../../image/icon_header_back.png';
import iconSearch from '../../image/icon_header_search.png';
import iconClose from '../../image/icon_header_close.png';
import { useRouter } from 'next/router';

const Header = ({title, onBackClick, icon, handleIconClick, mode}) => {
    const router = useRouter();

    const onBackBtnClick = () => {
        if(onBackClick !== undefined) {
            onBackClick();
        } else {
            router.back();
        }
    }
    
    const onBackToMyGroupLists = () => {
        router.push('/myGroupProfileLists');
    }

    return (
        <div style={{ width: "100%", position: "fixed", left: 0, top: 0, zIndex: 2, backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 12px' }}>
                {
                    title === '그룹 프로필 등록' ? (
                        <div style={{ width: 30, display: 'flex', alignItems: 'center' }} />
                    ) : icon === 'save' ? 
                        <div onClick={onBackToMyGroupLists} style={{ width: 30, display: 'flex', alignItems: 'center' }}>
                            <Image src={iconClose} layout="fixed" width={16} height={16} />
                        </div>
                    :
                        <div onClick={mode === 'edit' ? onBackToMyGroupLists : onBackBtnClick} style={{ width: 30, display: 'flex', alignItems: 'center' }}>
                            <Image src={iconBack} layout="fixed" width={10.82} height={18.98} />
                        </div>
                }
                <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#3C3C3C', flex: 1, textAlign: 'center' }}>
                    {title}
                </Typography>
                <div style={{ width: (icon === 'delete') || (icon === 'save') ? 'auto' : 18, display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        title == '그룹 프로필 등록' ? (
                            <div style={{ width: '16px', height: '16px' }}>
                                <Image src={iconClose} onClick={() => router.back() }/>
                            </div>
                        ) : 
                        icon === 'close' ?
                        <Image src={iconClose} onClick={()=> router.push('/mealPromise')}  sx={{width: '16px', height: '16px'}}/>
                        : icon === 'delete' ?
                        <Typography onClick={handleIconClick} style={{fontSize: 18, color: '#BABABA', fontWeight: 600, padding: 0}}>삭제</Typography>
                        : icon === 'save' ?
                        <Typography onClick={handleIconClick} style={{fontSize: 18, color: '#BABABA', fontWeight: 600, padding: 0}}>저장</Typography> 
                        : icon ?
                        <Image src={iconSearch} layout="fixed" width={24} height={24} />
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
