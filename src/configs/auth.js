
import axios from 'axios'
import domain from './domain'

const auth = {
    //login
    onLogin(payload) {
        return axios.post(`${domain.ServiceAddress}/auth/login`, {
          'phone': payload?.phone,
          'password': payload?.password,
        })
      },

    //logout

    onLogout(payload) {
        return axios.post(`${domain.ServiceAddress}/auth/logout`, {
          'phone': payload?.phone,
          'password': payload?.password,
        })
    },


    // getBusStation(payload) {
    //     return axios.get(`${domain.ServiceAddress}admin/user-invest/${payload?.uuid}`, {
    //         params: payload
    //     })
    // },


    
}

export default auth