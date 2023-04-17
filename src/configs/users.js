
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const users = {

    getUsers(payload) {
        return axios.get(`${domain.ServiceAddress}/users?${qs.stringify(payload)}`)
      },
    getInfoUser(payload) {
        return axios.get(`${domain.ServiceAddress}/users/${payload?.uuid}`)
    },
    createUser(payload) {
        return axios.post(`${domain.ServiceAddress}/users`,payload)
    },
    updateInfoUser(payload) {
        return axios.put(`${domain.ServiceAddress}/users/${payload?.uuid}`,payload)
    },
    changePassword(payload) {
        return axios.put(`${domain.ServiceAddress}/users/${payload?.uuid}/set-password`,payload)
    },
    lockUser(payload) {
        return axios.put(`${domain.ServiceAddress}/users/${payload?.uuid}/change-status`, {
            params: payload
        })
    },

}

export default users