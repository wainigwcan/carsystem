import React, { Component } from 'react'
import { Tag } from 'antd';
import { connect } from 'dva';

class Tags extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                已选: {
                    this.props.filter.map((item, index) => {
                        return <Tag
                            key={index}
                            closable
                            onClose={(e) => { e.preventDefault(), this.props.delTag(item.tagname) }}
                        >{item.tagname} : {item.words}
                        </Tag>
                    })
                }
            </div>
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        filter: carpicker.filter
    }),
    (dispatch) => ({
        delTag(tagname) {
            dispatch({ "type": "carpicker/deltag", tagname })
        }
    })
)(Tags);