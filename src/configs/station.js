
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const station = {

    getContract(payload) {
        return axios.get(`${domain.ServiceAddress}/contract?${qs.stringify(payload)}`)
    },

    getDetailContract(id) {
        return axios.get(`${domain.ServiceAddress}/contract/${id}`);
    },

    createContract(payload){
        return axios.post(`${domain.ServiceAddress}/contract`, payload)
    },

    updateTransport(payload){
        return axios.put(`${domain.ServiceAddress}/merchants/${payload?.uuid}`, payload)
    },

}

export default station