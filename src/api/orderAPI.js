import axios from 'axios'
import { axiosClient } from './axiosClient.js'


const OrderAPI = {
  getAll(){
    const url = `/orders`
    return axiosClient.get(url)
  },

  get(id){
    const url = `/orders/${id}`
    return axiosClient.get(url)
  },

  add(data){
    const url = `/orders`
    return axiosClient.post(url, data)
  },

  remove(id){
    const url = `/orders/${id}`
    return axiosClient.delete(url)
  },

  update(id, data){
    const url = `/orders/${id}`
    return axiosClient.put(url, data)
  }
}

export default OrderAPI