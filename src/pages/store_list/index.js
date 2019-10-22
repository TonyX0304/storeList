import React from 'react';
import Search from '../../components/Search'
import Recommend from '../../components/Recommend'
import AppList from '../../components/AppList'
import $api from '../../api/storeList.js';
import ReactPullLoad, { STATS } from "react-pullload";
import "react-pullload/dist/ReactPullLoad.css";
import './index.scss'

class StoreListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendList: [], // 推荐列表数据
      appListAll: [], // App列表所有数据
      appList: [], // App列表数据
      hasMore: true,
      action: STATS.init,
      pageSize: 10,
      page: 1
    }
  }

  // 初始化 获取数据
  componentDidMount() {
    this.loadData();
  }

  // 获取数据
  loadData() {
    // 推荐列表
    $api.getRecommendData().then((res) => {
      this.setState({
        recommendList: res.feed.entry
      })
    })

    // app列表
    $api.getAppListData().then((res) => {
      let list = res.feed.entry;
      this.setState({
        appListAll: list,
        hasMore: true,
        action: STATS.refreshed
      })
      this.getPageData(1);
    }).catch(() => {
      this.setState({
        action: STATS.refreshed
      })
    })
  }

  // 分页加载
  getPageData(page) {
    let resultList = [], list = [];
    let appListAll = this.state.appListAll;
    let pageSize = this.state.pageSize;
    let totalPage = Math.ceil(appListAll.length / pageSize);//总页数
    let startIndex = pageSize * (page - 1);
    let endIndex = pageSize * page;
    for (let i = startIndex; i < endIndex; i++) {
      resultList.push(appListAll[i]);
    }
    if (page >= totalPage) {
      this.setState({ hasMore: false });
    }
    if (page === 1) {
      list = resultList;
    } else {
      list = this.state.appList.concat(resultList);
    }
    this.setState({
      appList: list,
      page: page,
      pageSize: pageSize,
      action: STATS.reset
    })
  }


  handleAction = action => {
    if (action === this.state.action ||
      action === STATS.refreshing && this.state.action === STATS.loading ||
      action === STATS.loading && this.state.action === STATS.refreshing) {
      return false;
    }
    if (action === STATS.refreshing) {
      this.refreshPageData();
    } else if (action === STATS.loading) {
      this.handLoadMore();
    } 

    this.setState({
      action: action
    })
  };


  // 上拉刷新页面数据
  refreshPageData = () => {
    this.setState({
      action: STATS.refreshing
    });
    this.loadData();
  }

  // 加载更多
  handLoadMore = () => {
    if (STATS.loading === this.state.action) {
      return false;
    }
    //无更多内容则不执行后面逻辑
    if (!this.state.hasMore) {
      return;
    }
    // 显示正在加载
    this.setState({
      action: STATS.loading
    });
    let page = this.state.page + 1;
    setTimeout(() => {
      this.getPageData(page);
    }, 1000);
  }

  // 查询跳转
  searchOnFoucs() {
    this.props.history.push("/search/result");
  }

  render() {
    return (
      <div className='storelist-container'>
        <Search onFoucs={() => this.searchOnFoucs()} onCancel={() => { }} />
        <div className='storelist-content'>
          <ReactPullLoad
            className="block"
            isBlockContainer={true}
            downEnough={100}
            action={this.state.action}
            handleAction={this.handleAction}
            hasMore={this.state.hasMore}
            distanceBottom={100}>
            {/* 推荐列表 */}
            <Recommend list={this.state.recommendList} />
            {/* app列表 */}
            <AppList list={this.state.appList}></AppList>
          </ReactPullLoad>
        </div>
      </div>
    );
  }
}

export default StoreListPage;