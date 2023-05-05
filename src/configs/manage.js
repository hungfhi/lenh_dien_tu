
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const manage = {

    getRoles(payload) {
        return axios.get(`${domain.ServiceAddress}/roles?${qs.stringify(payload)}`)
    },
    getDetailRoles(payload) {
        return axios.get(`${domain.ServiceAddress}/roles/${payload?.uuid}`)
    },
    createRoles(payload) {
        return axios.post(`${domain.ServiceAddress}/roles`, payload)
    },
    updateInfoRoles(payload) {
        return axios.put(`${domain.ServiceAddress}/roles/${payload?.uuid}`, payload)
    },
    getPermissions(payload) {
        return axios.get(`${domain.ServiceAddress}/permissions?${qs.stringify(payload)}`)
    },



    //module
    getModule(payload) {
        return axios.get(`${domain.ServiceAddress}/menus?${qs.stringify(payload)}`)
    },

    createModule(payload) {
        return axios.post(`${domain.ServiceAddress}/menus`, payload)
    },
    updateModule(payload) {
        return axios.put(`${domain.ServiceAddress}/menus/${payload?.uuid}`, payload)
    },
    delModule(payload) {
        return axios.delete(`${domain.ServiceAddress}/menus/${payload?.uuid}`, payload)
    },



    //bến xe

    getCarPark(payload) {
        return axios.get(`${domain.ServiceAddress}/stations?${qs.stringify(payload)}`)
    },

    getDetailCarPark(payload) {
        return axios.get(`${domain.ServiceAddress}/stations/${payload}`)
    },

    getProvince(payload) {
        return axios.get(`${domain.ServiceAddress}/administrative/provinces?${qs.stringify(payload)}`)
    },

    getDistrict(payload) {
        return axios.get(`${domain.ServiceAddress}/administrative/districts?${qs.stringify(payload)}`)
    },

    createCarPark(payload) {
        return axios.post(`${domain.ServiceAddress}/stations`, payload)
    },
    updateCarPark(payload) {
        return axios.put(`${domain.ServiceAddress}/stations/${payload?.uuid}`, payload)
    },


    //đơn vị vận tải

    getTransport(payload) {
        return axios.get(`${domain.ServiceAddress}/merchants?${qs.stringify(payload)}`)
    },

    getDetailTransport(payload) {
        return axios.get(`${domain.ServiceAddress}/merchants/${payload}`)
    },

    getUserMerchant(payload) {
        return axios.get(`${domain.ServiceAddress}/merchantUser?${qs.stringify(payload)}`);
    },
    changeMerchantUserPassword(id, payload) {
        return axios.put(`${domain.ServiceAddress}/merchantUser/${id}/set-password`, payload);
    },
    changeStatusMerchantUser(id, payload) {
        return axios.put(`${domain.ServiceAddress}/merchantUser/${id}/change-status`, payload);
    },

    // Mô hình kinh doanh
    getBusinessModel(payload) {
        return axios.get(`${domain.ServiceAddress}/business`)
    },
    getDetailBusinessType(payload) {
        return axios.get(`${domain.ServiceAddress}/business/${payload.id}`);
    },
    createBusinessType(payload) {
        return axios.post(`${domain.ServiceAddress}/business`, payload);
    },
    updateBusinessType(id, payload) {
        return axios.put(`${domain.ServiceAddress}/business/${id}`, payload);
    }

}

export default manage