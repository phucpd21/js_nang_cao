import axios from 'axios'
import { axiosClient } from './axiosClient.js'


const OrderDetailAPI = {
  getAll(){
    const url = `/order_detail`
    return axiosClient.get(url)
  },

  get(id){
    const url = `/order_detail/${id}`
    return axiosClient.get(url)
  },

  add(data){
    const url = `/order_detail`
    return axiosClient.post(url, data)
  },

  remove(id){
    const url = `/order_detail/${id}`
    return axiosClient.delete(url)
  },

  update(id, data){
    const url = `/order_detail/${id}`
    return axiosClient.put(url, data)
  }
}

export default OrderDetailAPI