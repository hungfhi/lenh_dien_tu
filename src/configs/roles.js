
import axios from 'axios'
import domain from './domain'

const roles = {

    getRoles(payload) {
        return axios.get(`${domain.ServiceAddress}/roles`)
      },
    getDetailRoles(payload) {
        return axios.get(`${domain.ServiceAddress}/roles/${payload?.id}`)
    },
    createRoles(payload) {
        return axios.post(`${domain.ServiceAddress}/roles`, {
            params: payload
        })
    },
    updateInfoRoles(payload) {
        return axios.put(`${domain.ServiceAddress}/roles/${payload?.id}`, {
            params: payload
        })
    }
}

export default roles