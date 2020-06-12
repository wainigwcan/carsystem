import React, { Component } from 'react'
import { Row, Col, Slider } from 'antd';
import { connect } from 'dva';

class RangeCtrl extends Component {
    constructor() {
        super()
    }

    clickHandler(b, t) {
        this.props.addtag(this.props.tagname, [b, t], `${b}万到${t}万`)
    }

    render() {

        var _filter = this.props.filter.filter(item => {
            return item.tagname == this.props.tagname
        })[0];
        var value = [0, 100];
        if (_filter) {
            value = _filter.value
        }

        return (
            <div className="RangeCtrl">
                <div className="examples">
                    {
                        this.props.data.example.map((item, index) => {
                            return <a
                                key={index}
                                href="#"
                                onClick={() => { this.clickHandler(item.b, item.t) }}
                            >
                                {item.chinese}
                            </a>
                        })
                    }
                </div>
                <div className="slider">
                    <Row>
                        <Col span={14}>
                            <Slider
                                range
                                min={this.props.data.min}
                                max={this.props.data.max}
                                defaultValue={value}
                                onChange={([b, t]) => { this.clickHandler(b, t) }}
                            />
                        </Col>
                        <Col span={1}>

                        </Col>
                        <Col span={9}>
                            {value[0]}
                            ~
                            {value[1]}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        filter: carpicker.filter
    })
)(RangeCtrl);