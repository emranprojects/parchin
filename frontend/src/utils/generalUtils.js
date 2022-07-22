export default {
    convertNumberToCommaSeparatedStr(num) {
        const str = num.toString()
        let result = ""
        for (let i = 0; i < str.length; i++) {
            result = str[str.length - i - 1] + result
            if (i % 3 === 2 && i !== str.length - 1)
                result = "," + result
        }
        return result
    },
    isDev() {
        return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    },
    normalizePhoneNumber(phoneNumber) {
        let normalPhoneNumber = ""
        if (phoneNumber.startsWith("+98"))
            normalPhoneNumber = phoneNumber
        else if (phoneNumber.startsWith("0098"))
            normalPhoneNumber = `+${phoneNumber.substr(2)}`
        else if (phoneNumber.startsWith("09"))
            normalPhoneNumber = `+98${phoneNumber.substr(1)}`
        else if (phoneNumber.startsWith("9"))
            normalPhoneNumber = `+98${phoneNumber}`
        else
            return [false, phoneNumber]
        if (normalPhoneNumber.length !== "+989120001122".length)
            return [false, normalPhoneNumber]
        return [true, normalPhoneNumber]
    }
}
