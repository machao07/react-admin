import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV,
  timeout: 3000
})

instance.interceptors.request.use(
  config => {

  }
)

instance.interceptors.response.use(
  response => {

  }
)