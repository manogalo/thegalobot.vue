import axios from 'axios'

const HTTPClient = axios.create({
	baseURL: 'https://tranquil-peak-11373.herokuapp.com/api',
	headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})

export default HTTPClient