
import axios from 'axios'
import domain from './domain'

const apis = {

    onLogin(payload) {
        return axios.post(`${domain.ServiceAddress}/auth/login`, {
          'phone': payload?.phone,
          'password': payload?.password,
        })
      },

    getUserInvestment(payload) {
        return axios.get(`${domain.ServiceAddress}admin/user-invest/${payload?.uuid}`, {
            params: payload
        })
    },


    getBusStation(payload) {
        return axios.get(`${domain.ServiceAddress}admin/user-invest/${payload?.uuid}`, {
            params: payload
        })
    },


    
}

export default apis