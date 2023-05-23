
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const plan = {
    // Kế hoạch vận tải
    // Gán ngày chạy cho node
    updateAssignNode(id, payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes/assign-node/${id}`, payload);
    },
    deleteAssignTime(payload) {
        return axios.delete(`${domain.ServiceAddress}/merchantRoutes/assign-time/${payload.merchant_route_id}`, payload);
    },
    // Gán phương tiện cho node
    assignVehicle(id, payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes/assign-vehicle/${id}`, payload)
    },
    updateAssignVehicle(id, payload) {
        return axios.put(`${domain.ServiceAddress}/merchantRoutes/assign-vehicle/${id}`, payload)
    },
    deleteVehicle(id, payload) {
        return axios.delete(`${domain.ServiceAddress}/merchantRoutes/assign-vehicle/${id}`, payload)
    },
    // Gán lái xe cho node
    assignStaff(id, payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes/assign-staff/${id}`, payload);
    },
    updateAssignStaff(id, payload) {
        return axios.put(`${domain.ServiceAddress}/merchantRoutes/assign-staff/${id}`, payload)
    },
    deleteStaff(id, payload) {
        return axios.delete(`${domain.ServiceAddress}/merchantRoutes/assign-staff/${id}`, payload)
    },
}

export default plan;