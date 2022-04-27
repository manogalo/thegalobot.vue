import axios from 'axios'

const HTTPClient = axios.create({
	baseURL: 'http://localhost:8000/api',
	headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})

export default HTTPClient