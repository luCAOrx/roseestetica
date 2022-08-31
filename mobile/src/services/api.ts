import axios from 'axios'
import Constants from 'expo-constants'

const serverUrl = Constants.manifest?.extra?.serverUrl

const api = axios.create({
  baseURL: serverUrl
})

export default api
