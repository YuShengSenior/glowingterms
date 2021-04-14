const base = require("./base")
const axios = require("../utils/http")

// 获取彩虹屁
const getChpText = () => {
  return axios.instance.get(base.chp)
}

// 获取天气预报
const getWeatherInfo = (params) => {
  return axios.instance.post(base.jh_weather, params)
}

// 获取生活指数
const getLifeIndex = (params) => {
  return axios.instance.post(base.jh_lifeIndex, params)
}

// 空气指数
const getWeatherIndex = (params) => {
  return axios.instance.get(base.tx_weatherIndex, params)
}

// 土味情话
const getLoveTalk = (params) => {
  return axios.instance.get(base.tx_loveTalk, params)
}

// 情诗
const getLovePoem = (params) => {
  return axios.instance.post(base.tx_lovePoem, params)
}

// 朋友圈文案
const getPyqText = (params) => {
  return axios.instance.post(base.tx_pyqText, params)
}

// 网易云热评
const getWYYHot = (params) => {
  return axios.instance.post(base.tx_WYYHot, params)
}


module.exports = {
  getChpText,
  getWeatherInfo,
  getLifeIndex,
  getWeatherIndex,
  getLoveTalk,
  getLovePoem,
  getPyqText,
  getWYYHot
}
