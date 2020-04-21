// import axios from 'axios'
// // import {getToken}  from'./auth'
// axios.defaults.withCredentials=true;
// const instance=axios.create(
//     {
//         baseURL: 'http://127.0.0.1:5757/fy',
//         timeout:5000
//     }
// )
//请求拦截
// instance.interceptors.request.use(
//     function(config){
//         // config.headers["authorization"]="Bearer" + getToken();
//         return config
//     },
//     function(error){
//         return Promise.reject(error)
//     }
// )
//响应拦截
// instance.interceptors.response.use({
//     function(response){
//         return response.data
        
//     }
// })

// export function get(url,params){
//     return axios.get(
//         url,{params}
//     )
// }
// export function post(url,data){
//     return axios.post(
//         url,data
//     )
// }
// export function put(url,data){
//     return axios.put(
//         url,data
//     )
// }
// export function del(url){
//    return axios.delete(url)
// }