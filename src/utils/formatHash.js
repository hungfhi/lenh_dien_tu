const formatHash = (hash) => {
    return hash.substring(0, 6) + "..." + hash.substring(hash.length - 6);
}

export default formatHash