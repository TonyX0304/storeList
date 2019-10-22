import React, { Component } from 'react';
import './index.scss'

class Recommend extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     list: this.props.list || []
  //   }
  // }

  render() {
    return (
      <div className='recommend-container'>
        <p className="title">推介</p>
        <ul className='app-list'>
          {
            this.props.list.map((item, index) => {
              return (
                <li className='app-item' key={index}>
                  <img className='app-icon' src={item['im:image'][0].label} alt="" />
                  <div className='app-name'>{item['im:name'].label}</div>
                  <div className='app-type'>{item.category.attributes.label}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Recommend;