import axios from 'axios';
/*import {mergeJsonObject} from './jsonArr'*/
import {getCookie} from "./cookie";

let http = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 600000,
  withCredentials: false,
  headers: {
    /*'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'*/
    'Content-Type':'application/json;charset=UTF-8'
  }/*,
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]*/
});

export function apiAxios(method, url, params) {
  /*if(getCookie("userEmail") != null){  //默认加上token
    params = mergeJsonObject(params,{"userEmail":getCookie("userEmail")})
  }*/
  return new Promise((resolve, reject) =>{
    http({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(res =>{
      resolve(res);
    }).catch(err =>{
      reject(err);
    })
  });
  /*.then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
  })*/
}
