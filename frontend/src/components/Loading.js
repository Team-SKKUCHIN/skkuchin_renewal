import styled from '@emotion/styled';
import { globalLoading } from '../assets/lottie';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export const Loading = () => {
    return (
        <PopupContainer>
            <PopupSubContainer>
                <Lottie animationData={globalLoading} style={{ width: "100%", height: "193px" }} />
            </PopupSubContainer>
        </PopupContainer>
    )
};



const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const PopupSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    max-width: 420px;
    background-color: rgba(34, 40, 48, 0.60);
`;