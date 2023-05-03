const hashUtil = {
    generateHash: (username, originalLink) => {
        return btoa(username + originalLink)
    },
}
export default hashUtil
