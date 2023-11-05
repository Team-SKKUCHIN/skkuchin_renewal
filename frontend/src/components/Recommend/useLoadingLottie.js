import Lottie from "lottie-react";
import { useCallback, useRef } from 'react';
import { lottieDict, lotties } from '../../assets/lottie';

export const useLoadingLottie = () => {
    const lottieIndex = useRef(0);
    const lottieRef = useRef(null);

    const setSpeed = useCallback(() => {
        lottieRef.current?.setSpeed(lottieDict[lottieIndex.current ?? 0].speed);
    }, [lottieRef, lottieIndex])

    const getNextLottie = useCallback(() => {
        if (lottieIndex.current + 1 < lotties.length) {
            lottieIndex.current = lottieIndex.current + 1;
        } else {
            lottieIndex.current = 0;
        }
    }, [lottieIndex, lottieRef]);

    const duration = lottieDict[lottieIndex.current ?? 0].duration;
    
    const LottieView = window === undefined ? null :
        <Lottie
            lottieRef={lottieRef}
            animationData={lotties[lottieIndex.current ?? 0]}
            style={{ width: "100%", height: "193px" }}
        />;
    
    return { LottieView, getNextLottie, setSpeed, duration };
}
