
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

    //update pass
    onUpdatePass(payload) {
      return axios.put(`${domain.ServiceAddress}/auth/change-password`, {
        'password_confirmation': payload?.password_confirmation,
        'password': payload?.password,
        'logout_other_devices':payload?.logout_other_devices,
      })
    },


    
}

export default auth