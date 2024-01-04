import { useCallback, useRef } from 'react';

export const useWorldcup = () => {
    const worldcupPlaces = useRef([]);

    const getRandomPlaces = (places, round) => {
        const shuffledPlaces = places.slice().sort(() => Math.random() - 0.5);
        return shuffledPlaces.slice(0, round);
    }

    const setGame = useCallback((places, round) => {
        const shuffledPlaces = getRandomPlaces(places, round);
        worldcupPlaces.current = shuffledPlaces;
    }, [worldcupPlaces]);

    const pickPlace = useCallback((index) => {
        worldcupPlaces.current.splice(index, 1);
    }, [worldcupPlaces]);

    const getNextGame = useCallback((gameNum) => {
        const tempPlaces = worldcupPlaces.current;
        return tempPlaces.slice(gameNum, gameNum + 2);
    }, [worldcupPlaces]);

    const getWinner = useCallback(() => {
        return worldcupPlaces.current[0];
    }, [worldcupPlaces]);

    return { setGame, pickPlace, getNextGame, getWinner }
};
