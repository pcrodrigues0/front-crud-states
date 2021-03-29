import Vue from 'vue'
import axios from 'axios'

const Http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

Vue.prototype.$axios = Http
