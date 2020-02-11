import axios from 'axios';

const API = axios.create({
    headers: {
        'Client-ID' : '10y1efcd8nghnzvpz8xw6d6d99gjbb'
    }
})

export default API;