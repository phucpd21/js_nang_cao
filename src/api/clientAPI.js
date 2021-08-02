import axios from 'axios'
import { axiosClient } from './axiosClient.js'


const ClientAPI = {
  getAll(){
    const url = `/clients`
    return axiosClient.get(url)
  },

  get(id){
    const url = `/clients/${id}`
    return axiosClient.get(url)
  },

  add(data){
    const url = `/clients`
    return axiosClient.post(url, data)
  },

  remove(id){
    const url = `/clients/${id}`
    return axiosClient.delete(url)
  },

  update(id, data){
    const url = `/clients/${id}`
    return axiosClient.put(url, data)
  }
}

export default ClientAPI