
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
    
    getRoles(payload) {
        return axios.get(`${domain.ServiceAddress}/roles?${qs.stringify(payload)}`)
      },
    getDetailRoles(payload) {
        return axios.get(`${domain.ServiceAddress}/roles/${payload?.uuid}`)
    },
    createRoles(payload) {
        return axios.post(`${domain.ServiceAddress}/roles`,payload)
    },
    updateInfoRoles(payload) {
        return axios.put(`${domain.ServiceAddress}/roles/${payload?.uuid}`,payload)
    },
    getPermissions(payload) {
        return axios.get(`${domain.ServiceAddress}/permissions?${qs.stringify(payload)}`)
    },

    getTransportUnit(payload){
        return axios.get(`${domain.ServiceAddress}/users/get-current-merchant?${qs.stringify(payload)}`)
    },

    onTransportUnit(payload){
        return axios.post(`${domain.ServiceAddress}/users/set-current-merchant`,payload)
    }



}

export default users