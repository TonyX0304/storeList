import React from 'react';
import './index.scss';
import store from '../../store'

class SearchResultList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }

    // 添加订阅
    store.subscribe(this.dataChange.bind(this))
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }

  // store数据变化重新复制
  dataChange() {
    this.setState({
      list: store.getState().searchList || []
    })
  }

  render() {
    return (
      <div className='searchList-container'>
        <ul className='list'>
          {
            this.state.list.map((item, index) => {
              return (
                <li className='list-item' key={index}>
                  <img className='app-img' src={item.artworkUrl100} alt="" />
                  <div className='app-info'>
                    <div className='app-name'>{item.trackName}</div>
                    <div className='app-type'>{item.primaryGenreName}</div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default SearchResultList;