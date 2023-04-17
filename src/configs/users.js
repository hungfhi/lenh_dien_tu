
import axios from 'axios'
import domain from './domain'

const users = {

    getUsers(payload) {
        return axios.get(`${domain.ServiceAddress}/users`)
      },
    getInfoUser(payload) {
        return axios.get(`${domain.ServiceAddress}/users/${payload?.uuid}`)
    },
    createUser(payload) {
        return axios.post(`${domain.ServiceAddress}/users`, {
            params: payload
        })
    },
    updateInfoUser(payload) {
        return axios.put(`${domain.ServiceAddress}/users/${payload?.uuid}`, {
            params: payload
        })
    },
    changePassword(payload) {
        return axios.put(`${domain.ServiceAddress}/users/${payload?.uuid}/set-password`, {
            params: payload
        })
    },
    lockUser(payload) {
        return axios.put(`${domain.ServiceAddress}/users/${payload?.uuid}/change-status`, {
            params: payload
        })
    },

}

export default users