import React, { Component } from 'react'
import { connect } from 'dva';
import classnames from 'classnames';

class PicNav extends Component {
    constructor() {
        super();
    }

    showAlbum() {
        const length = this.props.imgarr.length;
        const { color, album, idx } = this.props.position;
        const chexing = this.props.chexing;
        var ARR = [];

        for (let i = 0; i < Math.ceil(length / 6); i++) {
            ARR.push(<ul key={i}>
                {
                    this.props.imgarr.slice(i * 6, i * 6 + 6).map((item, index) => {
                        return <li
                            className={classnames({ "cur": i * 6 + index == idx })}
                            key={index}
                            onClick={() => { this.props.changeIdx(i * 6 + index) }}
                        ><img src={`/carimages/${chexing}/${color}/${album}/${item}`} alt="" /></li>
                    })
                }
            </ul>);
        }
        return ARR;
    }

    // 挂载之前
    componentDidMount() {
        var self = this;
        //采用事件委托的方式，给翻页条（蓝色块）添加监听
        $(this.refs.ol).delegate("li", "mouseenter", function () {
            //点击那个蓝色块，哪个块块加cur，其他去cur
            $(this).addClass("cur").siblings().removeClass("cur");
            //拉动unit火车进行移动
            $(self.refs.unit).stop(true).animate({ "left": -290 * $(this).data("pagenumber") }, 400);
        });
        //当鼠标离开本组件的时候，回滚
        $(this.refs.picnav).bind("mouseleave", function () {
            var page = Math.floor(self.props.position.idx / 6);
            //拉动火车
            $(self.refs.unit).stop(true).animate({ "left": -290 * page }, 400);
            //点击那个蓝色块，哪个块块加cur，其他去cur
            $(self.refs.ol).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
        });
    }
    //更新之前
    componentWillUpdate(nextProps) {
        //计算改变之后的page值
        var page = Math.floor(nextProps.position.idx / 6);
        //哪个块块加cur，其他去cur
        $(this.refs.ol).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
        //拉动火车
        $(this.refs.unit).stop(true).animate({ "left": -290 * page }, 400);
    }

    render() {
        const pageAmount = Math.ceil(this.props.imgarr.length / 6);
        const curPage = Math.floor(this.props.position.idx / 6);
        return (
            <div className="prcNav" ref="picnav">
                <div className="unit clear" ref="unit" style={{ "left": curPage * -290 + "px" }}>
                    {this.showAlbum()}
                </div>
                <ol className="clear" ref="ol">

                    {
                        pageAmount > 1 ?
                            new Array(pageAmount).fill("").map((item, index) => {
                                return <li
                                    className={classnames({ "cur": index == curPage })}
                                    key={index}
                                    style={{ "width": 100 / pageAmount + "%" }}
                                    data-pagenumber={index}
                                ></li>
                            })
                            :
                            null
                    }
                </ol>
            </div>
        )
    }
}
export default connect(
    ({ carshow: { images, position } }) => ({
        imgarr: (() => {
            if (images[position.color]) {
                return images[position.color][position.album]
            }
            return []
        })(),
        position
    }),
    (dispatch) => ({
        changeIdx(idx) {
            dispatch({ "type": "carshow/changeidx", idx })
        }
    })
)(PicNav);