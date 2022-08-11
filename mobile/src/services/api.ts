import Constants from 'expo-constants';
import axios from 'axios';

const serverUrl = Constants.manifest?.extra?.serverUrl

const api = axios.create({
  baseURL: serverUrl
});

export default api;