import React, { Component } from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import classnames from 'classnames';
import { connect } from "dva";

class TabCtrl extends Component {
    constructor() {
        super();
    }

    clickHandler(item) {
        this.props.changebrand(item);
        this.props.addtag(this.props.tagname, item, item);
    }

    render() {

        var _filter = this.props.filter.filter(item => {
            return item.tagname == this.props.tagname
        })[0];
        if (_filter) { var value = _filter.value }
        return (
            <div className="TabCtrl">
                <Tabs defaultActiveKey="0" onChange={() => { }}>
                    {
                        Object.keys(this.props.data).map((item, index) => {
                            return <TabPane tab={item} key={index}>
                                {
                                    this.props.data[item].map((item, index) => {
                                        return <a
                                            className={classnames({ "cur": item == value })}
                                            onClick={() => { this.clickHandler(item) }} key={index} href="#">{item}</a>
                                    })
                                }
                            </TabPane>
                        })
                    }
                </Tabs>
            </div>
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        filter: carpicker.filter
    })
)(TabCtrl);
