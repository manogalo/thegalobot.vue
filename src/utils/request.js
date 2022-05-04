import axios from 'axios'

const HTTPClient = axios.create({
	baseURL: 'https://tranquil-peak-11373.herokuapp.com/api'
})

export default HTTPClient