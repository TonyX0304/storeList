import axios from '../service/axios';

let _api = {
  // 推荐列表
  getRecommendData(params) {
    return axios.get('/mock/recomendData.json', params);
  },
  // app列表
  getAppListData(params){
    return axios.get('/mock/appListData.json', params);
  },
  // 搜索结果列表
  getSearchList(params) {
    return axios.get('/mock/lookUp.json', params);
  }
}

export default _api