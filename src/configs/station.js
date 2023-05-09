
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const manage = {

    getContract(payload) {
        return axios.get(`${domain.ServiceAddress}/contract?${qs.stringify(payload)}`)
    },

    createTransport(payload){
        return axios.post(`${domain.ServiceAddress}/merchants`, payload)
    },

    updateTransport(payload){
        return axios.put(`${domain.ServiceAddress}/merchants/${payload?.uuid}`, payload)
    },

}

export default manage