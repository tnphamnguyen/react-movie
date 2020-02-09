export const limitLength = (str, len) => {
    if (typeof str === 'undefined')
        return ''
    if (str.length <= len)
        return str;
    let res = str;
    for (let i = len; i < str.length; i++) {
        if (str.charAt(i) === ' ') {
            res = str.substring(0, i) + ' ...'
            return res;
        }

    }
    return res;
}

export const getRandomOfArray=(arr)=>{
    const indexRd=Math.floor(Math.random() * Math.floor(arr.length));
    return arr[indexRd]
}