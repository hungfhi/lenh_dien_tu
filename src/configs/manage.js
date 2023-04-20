
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const manage = {

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


    //module
    getModule(payload) {
        return axios.get(`${domain.ServiceAddress}/menus?${qs.stringify(payload)}`)
      },
    
    createModule(payload) {
        return axios.post(`${domain.ServiceAddress}/menus`,payload)
    },
    updateModule(payload) {
        return axios.put(`${domain.ServiceAddress}/menus/${payload?.uuid}`,payload)
    },
    delModule(payload) {
        return axios.delete(`${domain.ServiceAddress}/menus/${payload?.uuid}`,payload)
    },





}

export default manage