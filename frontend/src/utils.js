const utils = {
    logout(){
        // TODO
    },
    isLoggedIn(){
        // TODO
        return true
    },
    convertNumberToCommaSeparatedStr(num){
        const str = num.toString()
        let result = ""
        for (let i = 0; i < str.length ; i++) {
            result = str[str.length - i - 1] + result
            if (i % 3 === 2 && i !== str.length - 1)
                result = "," + result
        }
        return result
    }
}
export default utils;