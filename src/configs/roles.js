
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const roles = {

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
}

export default roles