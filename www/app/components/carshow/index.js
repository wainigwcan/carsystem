import React, { Component } from 'react'
import { connect } from 'dva';

import Picker from './Picker';
import PicNav from './PicNav';
import Bigimg from './Bigimg';

class Carshow extends Component {
    constructor(props) {
        super(props);

        props.init(props.chexing); //初始化数据
    }
    // 如果props更新的时候，需要重新拉取数据，不然页面上显示的还是以前的数据，
    //有可以找不到资源  需要判断props是否更新了
    shouldComponentUpdate(nextProps) {
        if (nextProps.chexing != this.props.chexing) {
            nextProps.init(nextProps.chexing)
            return true;
        }
        return false;
    }

    render() {

        return (
            <div className="albumWraper">
                <div className="bigimgPart">
                    <Bigimg chexing={this.props.chexing}></Bigimg>
                </div>
                <div className="rightPart">

                    <div className="titleBox">
                        <h1>{this.props.chexing}</h1>
                        <h3>2020年新款 1.6T</h3>
                    </div>
                    <Picker></Picker>

                    <PicNav chexing={this.props.chexing}></PicNav>
                </div>
            </div>
        )
    }
}
export default connect(null, (dispatch) => ({
    init(chexing) {
        dispatch({ "type": "carshow/init", chexing });
    }
}))(Carshow);
