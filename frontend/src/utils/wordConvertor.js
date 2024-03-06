export const convertName = (name, option) => {
    const charCode = name.charCodeAt(name.length - 1);
    const consonantCode = (charCode - 44032) % 28;
    
    if (option === 'subject') {
        return consonantCode === 0 ? '가' : '이';
    } else if (option === 'andOr') {
        return consonantCode === 0 ? '와' : '과';
    } else {
        return consonantCode === 0 ? '를' : '을';
    }
};