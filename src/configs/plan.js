
import axios from 'axios'
import domain from './domain'
import qs from 'qs'
const plan = {
    // Kế hoạch vận tải
    // Gán ngày chạy cho node
    updateAssignNode(payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes/assign-node/${payload.merchant_route_node_id}`, payload);
    },
    deleteAssignTime(payload) {
        return axios.delete(`${domain.ServiceAddress}/merchantRoutes/assign-time/${payload.merchant_route_id}`, payload);
    },
    assignVehicle(id, payload) {
        return axios.post(`${domain.ServiceAddress}/merchantRoutes/assign-vehicle/${id}`, payload)
    },
    updateAssignVehicle(id, payload) {
        return axios.put(`${domain.ServiceAddress}/merchantRoutes/assign-vehicle/${id}`, payload)
    },
    deleteVehicle(id, payload) {
        return axios.delete(`${domain.ServiceAddress}/merchantRoutes/assign-vehicle/${id}`, payload)
    },

}

export default plan;