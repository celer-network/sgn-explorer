const getSimple = (address, startIndex, endIndex) => {
    const result = address.slice(0,startIndex) + '...' + address.slice(endIndex,address.length);
    return result;
}

export {
    getSimple
}