import axios from 'axios'

const instance = axios.create({
    //baseURL : 'http://localhost:4000/api',
    baseURL: 'https://backendpq.onrender.com/PQ',
    withCredentials: true,
    headers: {
        Accept: 'application/json'
    }
})

export default instance;