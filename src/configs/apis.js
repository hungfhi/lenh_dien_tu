
import axios from 'axios'
import domain from './domain'

const apis = {

    getMenu(payload) {
        return axios.get(`${domain.ServiceAddress}/menus`)
    },
    getBusStation(payload) {
        return axios.get(`${domain.ServiceAddress}/menus`)
    },
}

export default apis