import Axios from 'axios'
import {Component} from 'react'
Axios.defaults.withCredentials=true;
Component.prototype.$axios=Axios.create({
                baseURL: 'http://127.0.0.1:5757/fy',
                timeout:5000
            }) //将axios挂载到Component上，以供全局使用

//配置过滤器请求响应（通过查npm官网，axios文档）
Axios.interceptors.response.use(function (response) {
    return response.data;//只获取data数据
  }, function (error) {
    return Promise.reject(error);
  });

