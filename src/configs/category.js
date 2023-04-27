
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
        return axios.get(`${domain.ServiceAddress}/product`)
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
    }
}

export default category