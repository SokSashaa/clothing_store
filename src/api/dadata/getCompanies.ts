import axios from "axios";


const token = '152956bd52d4ea856aa077e7fd05655b6b41a316'

export type getCompanyDADATA = {
    name: string,
    inn: string,
    ogrn: string,
    address: string
}
const axiasDADATA = axios.create();
export const getCompaniesDADATA = async (query: string) => {
    return await axiasDADATA.get('http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
        {
            params: {
                query: query,
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            }
        }
    ).then((res): getCompanyDADATA[] => {
        const companies = res.data.suggestions.map((item: any): getCompanyDADATA => {
            return {
                name: item.value,
                ogrn: item.data.ogrn,
                inn: item.data.inn,
                address: item.data.address?.value
            }
        }).slice(0, 5)
        return companies
    })
}

export const initialStateCompanyDADATA: getCompanyDADATA = {
    address: "",
    inn: "",
    name: "",
    ogrn: ""

}

