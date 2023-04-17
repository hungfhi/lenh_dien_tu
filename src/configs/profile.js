
import axios from 'axios'
import domain from './domain'

const profile = {
    //login
    getMenu(payload) {
        return axios.get(`${domain.ServiceAddress}/menus`,{},{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer 1|McD9VJUNPwhDlcxDxpbUwWXjQfyhixwHukGulmtd`,
            }
        })
      },

}

export default profile