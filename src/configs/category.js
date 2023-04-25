
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const category = {

    getVehicle(payload) {
        return axios.get(`${domain.ServiceAddress}/vehicle?${qs.stringify(payload)}`)
    },
    createVehicle(payload) {
        return axios.post(`${domain.ServiceAddress}/vehicle`, payload)
    },
    getDetailVehicle(payload) {
        return axios.get(`${domain.ServiceAddress}/vehicle/${payload?.id}`)
    },  
    updateVehicle(payload) {
        return axios.put(`${domain.ServiceAddress}/vehicle/${payload?.id}`,payload)
    },  
    getProduct(payload) {
        return axios.get(`${domain.ServiceAddress}/product`)
    },  

}

export default category