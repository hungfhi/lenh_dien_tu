
import axios from 'axios'
import domain from './domain'
  
const definitions = {

    getStation(payload) {
        return axios.get(`${domain.ServiceAddress}/definitions/station`,payload)
    },
    getMerchant(payload) {
        return axios.get(`${domain.ServiceAddress}/definitions/merchant`,payload)
    },
    getModels(payload) {
        return axios.get(`${domain.ServiceAddress}/definitions/models`,payload)
    },
    getPositions(payload) {
        return axios.get(`${domain.ServiceAddress}/definitions/positions`,payload)
    },
}

export default definitions