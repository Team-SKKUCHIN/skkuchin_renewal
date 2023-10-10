export const convertName = (name) => {
    const charCode = name.charCodeAt(name.length - 1);

    const consonantCode = (charCode - 44032) % 28;
    
    if(consonantCode === 0){
        return '를';
    }

    return '을';
};
