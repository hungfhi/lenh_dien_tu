
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
        return axios.put(`${domain.ServiceAddress}/vehicle/${payload?.id}`, payload)
    },
    getProduct(payload) {
        return axios.get(`${domain.ServiceAddress}/product?${qs.stringify(payload)}`);
    },
    getPersons(payload) {
        return axios.get(`${domain.ServiceAddress}/staffs?${qs.stringify(payload)}`);
    },
    getDetailPersons(payload) {
        return axios.get(`${domain.ServiceAddress}/staffs/${payload?.uuid}`);
    },
    createPerson(payload) {
        return axios.post(`${domain.ServiceAddress}/staffs`, payload);
    },
    updatePerson(id, payload) {
        return axios.put(`${domain.ServiceAddress}/staffs/${id}`, payload);
    },
    getDrivingLicenseRank() {
        return axios.get(`${domain.ServiceAddress}/staffs/driving-license-rank`);
    },
    getPositions() {
        return axios.get(`${domain.ServiceAddress}/positions`);
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
    getDetailProduct(payload) {
        return axios.get(`${domain.ServiceAddress}/product/${payload?.uuid}`);
    },
    updateProduct(id, payload) {
        return axios.put(`${domain.ServiceAddress}/product/${id}`, payload);
    },
    createProduct(payload) {
        return axios.post(`${domain.ServiceAddress}/product`, payload);
    },
    getProvinceCity(payload) {
        return axios.get(`${domain.ServiceAddress}/provinces?${qs.stringify(payload)}`);
    },
    getDistrict(payload) {
        return axios.get(`${domain.ServiceAddress}/district?${qs.stringify(payload)}`);
    }
}

export default category