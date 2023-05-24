
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const category = {

    getCommand(payload) {
        return axios.get(`${domain.ServiceAddress}/commands?${qs.stringify(payload)}`)
    },
    getCommandRoutes(payload) {
        return axios.get(`${domain.ServiceAddress}/commands/merchant-routes`, payload)
    },
    getNode(payload) {
        return axios.get(`${domain.ServiceAddress}/commands/merchant-route-nodes?${qs.stringify(payload)}`)
    },
    getCommandVehicles(payload) {
        return axios.get(`${domain.ServiceAddress}/commands/${payload?.id}/driver-vehicles`, payload)
    },
    createCommand(payload) {
        return axios.post(`${domain.ServiceAddress}/commands`, payload)
    },
    updateCommand(payload) {
        return axios.put(`${domain.ServiceAddress}/commands/${payload?.id}`, payload)
    },
    delCommand(payload) {
        return axios.delete(`${domain.ServiceAddress}/commands/${payload?.id}`,{ data:payload});
    },
    signCommand(payload) {
        return axios.post(`${domain.ServiceAddress}/commands/merchant-sign`,payload);
    },
    
    viewCommand(payload) {
        return axios.get(`${domain.ServiceAddress}/commands/${payload?.ids}/view`,payload);
    }
}

export default category