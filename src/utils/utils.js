const getSimple = (address) => {
    console.log(address);
    const result = address.slice(0,6) + '...' + address.slice(-4,address.length);
    return result;
}

export {
    getSimple
}