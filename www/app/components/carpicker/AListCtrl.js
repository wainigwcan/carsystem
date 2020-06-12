import React, { Component } from 'react'
import { Row, Col } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';

class AListCtrl extends Component {
    constructor() {
        super();
        this.state = {
            showAll: false
        }
    }

    clickHandler(item) {
        this.props.addtag(this.props.tagname, item, item);
    }

    render() {
        //全局数据中它的值
        var _filter = this.props.filter.filter((item) => {
            return item.tagname == this.props.tagname;
        })[0];
        var value;
        if (_filter) { value = _filter.value };

        if (!this.props.data) return <div></div>
        return (
            <div className="AListCtrl">
                <Row>
                    <Col span={22}>
                        <div className="special">
                            {
                                this.props.data.special.map((item, index) => {
                                    return <a
                                        className={classnames({ "cur": value == item })}
                                        onClick={() => { this.clickHandler(item) }}
                                        key={index} href="#"
                                    >{item}</a>
                                })
                            }
                        </div>
                    </Col>
                    <Col span={2}><a onClick={() => { this.setState({ "showAll": !this.state.showAll }) }} href="#">更多</a></Col>
                </Row>
                <Row>
                    <Col span={22}>
                        <div className="all" style={{ "display": this.state.showAll ? "block" : "none" }}>
                            {
                                Object.keys(this.props.data.all).map((item, index) => {
                                    return <dl key={index}>
                                        <dt>{item}</dt>
                                        <dd>
                                            {
                                                this.props.data.all[item].map((item, index) => {
                                                    return <a
                                                        className={classnames({ "cur": value == item })}
                                                        onClick={() => { this.clickHandler(item) }} key={index} href="#">{item}</a>
                                                })
                                            }
                                        </dd>
                                    </dl>
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default connect(({ carpicker }) => ({
    filter: carpicker.filter
}))(AListCtrl);