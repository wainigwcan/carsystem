import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';

class Picker extends Component {
    constructor() {
        super();
    }
    showAlbums() {
        var o = {
            "view": "外观",
            "center": "内饰",
            "detail": "细节"
        }
        // 初始化没完成会报错  如果初始化了
        var albumobj = this.props.images[this.props.position.color];

        if (albumobj) {
            var ARR = [];
            var count = 0;
            for (let k in o) {
                if (albumobj.hasOwnProperty(k)) {
                    ARR.push(<li
                        key={count++}
                        className={classnames({ "cur": k == this.props.position.album })}
                        onClick={() => { this.props.hangeAlbum(k) }}
                    >
                        {o[k]}{(albumobj[k].length)}
                    </li>);
                }
            }
        }
        return ARR;
    }

    render() {
        const color = Object.keys(this.props.images);
        const curColor = this.props.position.color;
        return (
            <div className="picker">
                <ul className="album">
                    {this.showAlbums()}
                </ul>
                <ul className="color clear">
                    {
                        color.map((item, index) => {
                            return <li onClick={() => { this.props.hangeColor(item) }} className={classnames({ "cur": curColor == item })} key={index} style={{ "backgroundColor": item }}></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default connect(
    ({ carshow }) => ({
        images: carshow.images,
        position: carshow.position
    }),
    (dispatch) => ({
        hangeAlbum(album) {
            dispatch({ "type": "carshow/hangealbum", album })
        },
        hangeColor(color) {
            dispatch({ "type": "carshow/hangecolor", color })
        }
    })
)(Picker);