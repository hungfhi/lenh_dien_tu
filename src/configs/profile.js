
import axios from 'axios'
import domain from './domain'

const profile = {
    //login
    getMenu(payload) {
        return axios.get(`${domain.ServiceAddress}/menus`)
      },

}

export default profile