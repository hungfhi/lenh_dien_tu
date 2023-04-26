
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
    getPersons(payload) {
        return axios.get(`${domain.ServiceAddress}/staffs?${qs.stringify(payload)}`);
    },
    getDetailPersons(payload) {
        return axios.get(`${domain.ServiceAddress}/staffs/${payload?.uuid}`);
    },
    getRoute(payload) {
        return axios.get(`${domain.ServiceAddress}/routes?${qs.stringify(payload)}`);
    },
    createRoute(payload) {
        return axios.post(`${domain.ServiceAddress}/routes`, payload);
    },
    getDetailRoute(payload) {
        return axios.get(`${domain.ServiceAddress}/routes/${payload?.id}`);
    },
    updateRoute(payload) {
        return axios.put(`${domain.ServiceAddress}/routes/${payload?.id}`, payload);
    },
    deleteRoute(payload) {
        return axios.put(`${domain.ServiceAddress}/routes/${payload?.id}`);
    },
    getStation(payload) {
        return axios.get(`${domain.ServiceAddress}/stations`);
    },

}

export default category