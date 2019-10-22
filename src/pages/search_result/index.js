import React from 'react';
import Search from '../../components/Search';
import SearchResultList from '../../components/SearchResultList';
import './index.scss';
import $api from '../../api/storeList.js';
import store from '../../store'
import { saveSearchList, removeSearchList } from '../../store/actions'

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: []
    }
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  // 取消按钮
  onCancel() {
    // 清除store数据
    store.dispatch(removeSearchList())
    // 页面跳转
    this.props.history.push("/");
  }

  // input框内容变化
  getListData() {
    $api.getSearchList().then((res) => {
      // 存到store
      store.dispatch(saveSearchList(res.results))
    })
  }

  render() {
    return (
      <div className='searchResult-container'>
        <Search showCancelBtn={true} onSearch={() => { this.getListData() }} onFoucs={() => { }} ref={(ref) => this.searchInput = ref} onCancel={() => this.onCancel()}></Search>
        <SearchResultList />
      </div>
    );
  }
}


// 通过connect生成容器组件
export default SearchResult;