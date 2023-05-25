
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
    createTabContract(payload){
        return axios.post(`${domain.ServiceAddress}/contract/car-contract`, payload)
    },
    getRoute() {
        return axios.get(`${domain.ServiceAddress}/routes`);
    },

    addCarCreate(payload) {
        return axios.post(`${domain.ServiceAddress}/contract/add-car-contract`, payload);
    },
    addTimeCreate(payload) {
        return axios.post(`${domain.ServiceAddress}/contract/add-node-contract`, payload);
    },
    updateCar(payload) {
        return axios.patch(`${domain.ServiceAddress}/contract/update-car-contract/${payload?.id}`, payload);
    },
    updateTime(payload) {
        return axios.patch(`${domain.ServiceAddress}/contract/update-node-contract/${payload?.id}`, payload);
    },
    addCarEdit(payload) {
        return axios.post(`${domain.ServiceAddress}/contract/add-car-to-contract/${payload?.id}`, payload);
    },
    addTimeEdit(payload) {
        return axios.post(`${domain.ServiceAddress}/contract/add-node-to-contract/${payload?.id}`, payload);
    },
    endContract(payload) {
        return axios.patch(`${domain.ServiceAddress}/contract/cancel-contract/${payload?.id}`);
    },
}

export default station