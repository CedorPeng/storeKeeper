import axios from 'axios'

const envConfig = {
  production: '/',
  development: 'http://localhost:8080/'
}

export const baseURL = envConfig[process.env.NODE_ENV || 'development']
export const HTTP = axios.create({
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

