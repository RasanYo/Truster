export const Helper = {
    stringifyAdress: (adress) => {
        var res = ""
        if (adress.number) res += `${adress.number} `
        if (adress.street) res += `${adress.street}, `
        if (adress.npa) res += `${adress.npa} `
        if (adress.city) res += `${adress.city} `
        if (adress.country) res += `${adress.country}`
        return res
    }
}