import React, { Component } from 'react';
import './index.scss'
import store from '../../store'
import { removeSearchList } from '../../store/actions'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelBtn: false,
      searchValue: ''
    };
  }

  componentDidMount() {
    this.setState({
      showCancelBtn: this.props.showCancelBtn
    })
  }

  // 获取焦点
  onFocus() {
    this.props.onFoucs();
  }

  // input框值改变
  handleInputChange(event) {
    this.setState({
      searchValue: event.target.value
    });

    this.props.onSearch()
  }

  // 清空input框
  handleClear() {
    this.setState({
      searchValue: ''
    })

    store.dispatch(removeSearchList())
  }

  // 取消按钮
  handleCancel() {
    this.props.onCancel();
  }

  focus() {
    this.refs.keyword.focus();
  }
  render() {
    return (
      <div className='search-container'>
        <div className='search-bar'>
          <div className='search-input-box'>
            <i className='iconfont icon-search'></i>
            <input className='search-input' type="text" ref='keyword' placeholder="搜索" value={this.state.searchValue}
              onChange={this.handleInputChange.bind(this)} onFocus={() => this.onFocus()} />
            <i className={`iconfont icon-close ${this.state.searchValue.length ? "active" : ''}`} onClick={() => this.handleClear()}></i>
          </div>
          {
            this.state.showCancelBtn &&
            <div className='search-cancel' onClick={this.handleCancel.bind(this)}>取消</div>
          }
        </div>
      </div>
    );
  }
}

// function debounce(fn, delay) {
//   // 记录上一次的延时器
//   var timer = null;
//   delay = delay || 200;
//   return function () {
//     var args = arguments;
//     var that = this;
//     // 清除上一次延时器
//     clearTimeout(timer)
//     timer = setTimeout(function () {
//       fn.apply(that, args)
//     }, delay);
//   }
// }

export default Search;