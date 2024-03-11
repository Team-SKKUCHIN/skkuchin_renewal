import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Image from 'next/image';

import animatedIcon1 from '../../image/loading/animate1.png';
import animatedIcon2 from '../../image/loading/animate2.png';
import animatedIcon3 from '../../image/loading/animate3.png';
import animatedIcon4 from '../../image/loading/animate4.png';
import animatedIcon5 from '../../image/loading/animate5.png';
import animatedIcon6 from '../../image/loading/animate6.png';
import animatedIcon7 from '../../image/loading/animate7.png';
import animatedIcon8 from '../../image/loading/animate8.png';
import animatedIcon9 from '../../image/loading/animate9.png';

const AnimatedLoading = () => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % 9);
        }, 200);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const animatedIcons = [
        animatedIcon1,
        animatedIcon2,
        animatedIcon3,
        animatedIcon4,
        animatedIcon5,
        animatedIcon6,
        animatedIcon7,
        animatedIcon8,
        animatedIcon9,
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15% 0' }}>
            <Typography sx={{ fontWeight: 900, fontSize: '14px', color: '#3C3C3C' }}>Loading...</Typography>
            <Image
                src={animatedIcons[currentIconIndex]}
                alt={`Animated Icon ${currentIconIndex + 1}`}
                width={110.5}
                height={87.1}
            />
        </div>
    );
};

export default AnimatedLoading;
