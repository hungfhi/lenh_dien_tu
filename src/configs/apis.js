
import axios from 'axios'
import settings from './settings'

const apis = {

    onLogin(payload) {
        return axios.post(`${settings.ServiceAddress}/auth/login`, {
          'phone': payload?.phone,
          'password': payload?.password,
        })
      },

    getUserInvestment(payload) {
        return axios.get(`${settings.ServiceAddress}admin/user-invest/${payload?.uuid}`, {
            params: payload
        })
    },


    getBusStation(payload) {
        return axios.get(`${settings.ServiceAddress}admin/user-invest/${payload?.uuid}`, {
            params: payload
        })
    },


    
}

export default apis