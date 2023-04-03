
import axios from 'axios'
import settings from './settings'

const apis = {

   

    getUserInvestment(payload) {
        return axios.get(`${settings.ServiceAddress}admin/user-invest/${payload?.uuid}`, {
            params: payload
        })
    },
}

export default apis