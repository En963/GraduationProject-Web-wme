import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.headers.post['Content-Type'] = ' application/json';

export function get(outerUrl, params) {
    return axios
      .get(outerUrl, {
        params: params,
      })
      .then(res => {
        return res.data;
      })
      .catch(err => Promise.reject(err));
  }
  
  export function post(outerUrl, params, config) {
    return axios
      .post(outerUrl, params)
      .then(res => {
        return res.data;
      })
      .catch(err => Promise.reject(err));
  }

  export function deleteFn(outerUrl, params, config) {
    return axios
      .delete(outerUrl, params)
      .then(res => {
        return res.data;
      })
      .catch(err => Promise.reject(err));
  }