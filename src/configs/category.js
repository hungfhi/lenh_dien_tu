
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
        return axios.get(`${domain.ServiceAddress}/administrative/provinces?${qs.stringify(payload)}`);
    },
    getDistrict(payload) {
        return axios.get(`${domain.ServiceAddress}/administrative/districts?${qs.stringify(payload)}`);
    },
    getModel(payload) {
        return axios.get(`${domain.ServiceAddress}/models`);
    },
    getByMerchant(payload) {
        return axios.get(`${domain.ServiceAddress}/roles/get-by-merchant`);
    },

    // Cấu hình tuyến
    getMerchantRoutes(payload) {
        return axios.get(`${domain.ServiceAddress}/merchantRoutes?${qs.stringify(payload)}`);
    },
    getDetailMerchantRoutes(id) {
        return axios.get(`${domain.ServiceAddress}/merchantRoutes/${id}`)
    },
    createMerchantRoutes(payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes`, payload);
    },
    updateMerchantRoute(payload) {
        return axios.put(`${domain.ServiceAddress}/merchantRoutes/${payload?.id}`, payload);
    },
    updateTime(payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes/assign-time/${payload?.id}`, payload);
    },
    delTime(payload) {
        return axios.delete(`${domain.ServiceAddress}/merchantRoutes/assign-time/${payload?.id}`);
    },
    updatePlace(payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes/assign-journey/${payload?.id}`, payload);
    },
    delPlace(payload) {
        return axios.delete(`${domain.ServiceAddress}/merchantRoutes/assign-journey/${payload?.id}`);
    },
    // Tiêu chuẩn chất lượng
    getQualityStandard(payload) {
        return axios.get(`${domain.ServiceAddress}/standards?${qs.stringify(payload)}`);
    },
    getDetailStandard(payload) {
        return axios.get(`${domain.ServiceAddress}/standards/${payload.id}`);
    },
    updateStandard(id, payload) {
        return axios.put(`${domain.ServiceAddress}/standards/${id}`, payload);
    },
    createStandard(payload) {
        return axios.post(`${domain.ServiceAddress}/standards`, payload);
    },
    deleteStandard(payload) {
        return axios.delete(`${domain.ServiceAddress}/standards/${payload.uuid}`);
    }

}

export default category