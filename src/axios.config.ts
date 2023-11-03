import axios from 'axios'

const API_URL = 'http://localhost:3000/'

const defaultOptions = {}

const getLocalStorage = () => {
  return localStorage.getItem('token')
}

axios.interceptors.request.use(async (config) => {
  const token = await getLocalStorage()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function getNotAuthApi(path: string, options: any = {}, apiURL?: string) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/ ^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function getApi(path: string, options: any = {}, apiURL?: string) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function getApiWithParams(path: string, params: object, options: any = {}, apiURL?: string) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    params: params,
    headers: {
      ...options.headers
    }
  })
}

function postApi(path: string, data: any, options: any = {}) {
  return axios.post(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function putApi(path: string, data: any, options: any = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function putApiWithParams(path: string, data: any, options: any = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function patchApi(path: string, data: any, options: any = {}) {
  return axios.patch(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function deleteApi(path: string, options: any = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function deleteWithParams(path: string, data: any, options: any = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    params: {
      ...data
    },
    headers: {
      ...options.headers
    }
  })
}

const handleLogout = async () => {}

function handleErrorStatus(error: any) {
  const status = error?.status || error?.response?.status || error?.data?.messages || null
  switch (status) {
    case 401:
      handleLogout()
      return error
    case 403: {
      return error
    }
    case 404:
      return error
    case 200:
    case 201:
    case 204:
    case 400:
    case 422:
      return error
    case 500:
      if (error?.data?.type === 'JWT::VerificationError') {
        handleLogout()
      }
      return error
    default:
      return error
  }
}

axios.interceptors.response.use(
  (response) => {
    const data = response?.data
    return handleErrorStatus({ ...response, data })
  },
  (error) => {
    const errorResponse = error.response

    return Promise.reject(handleErrorStatus(errorResponse))
  }
)

axios.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }
    if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig
    return newConfig
  },
  (error) => {
    return Promise.reject(error)
  }
)

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  patch: patchApi,
  getNotAuth: getNotAuthApi,
  getWithParams: getApiWithParams,
  putWithParams: putApiWithParams,
  deleteWithParams: deleteWithParams
}

export default Api
