import axios from 'axios';
import domain from './domain';
import qs from 'qs';

const categories = {
    // Nhân sự (Lái xe)
    getPersonnels(payload) {
        return axios.get(`${domain.ServiceAddress}/staffs?${qs.stringify(payload)}`);
    },
    getDetailPersonnel(payload) {
        return axios.get(`${domain.ServiceAddress}/staffs/${payload?.uuid}`);
    }
    
}

export default categories;