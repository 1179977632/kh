import {apiAxios} from './server'

export default class api{
  static login (url, params) {
    return apiAxios('POST', url, params)
  }
  static courseNameList (url, params) {
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
