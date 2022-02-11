import axios from 'axios'

const envConfig = {
  production: '/',
  development: ''
}
const baseURL = envConfig[process.env.NODE_ENV || 'development']
const service = axios.create({
  baseURL,
  timeout: 1000 * 60 * 5,
  headers: {
    common: {
      'X-Request-With': 'XMLHttpRequest',
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})
export default service

