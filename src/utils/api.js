import {apiAxios} from './server'

export default class api{
  static register (url, params) {
    return apiAxios('POST', url, params)
  }
  static isExistUserEmail (url, params) {
    return apiAxios('GET', url, params)
  }
  static isExistUserName (url, params) {
    return apiAxios('GET', url, params)
  }
  static login (url, params) {
    return apiAxios('POST', url, params)
  }
  static courseList (url, params) {
    return apiAxios('GET', url, params)
  }
  static getUserName (url, params) {
    return apiAxios('GET', url, params)
  }
  static selectRecord (url, params) {
    return apiAxios('POST', url, params)
  }
  static getFileByFileId (url, params) {
    return apiAxios('GET', url, params)
  }
  static updateFileIdByUserId (url, params) {
    return apiAxios('GET', url, params)
  }
  static schoolList (url, params) {
    return apiAxios('GET', url, params)
  }
  /*static intoCourse (url, params) {
    return apiAxios('GET', url, params)
  }
  static quitCourse (url, params) {
    return apiAxios('GET', url, params)
  }
  static closeWebsocket (url, params) {
    return apiAxios('GET', url, params)
  }*/
}
