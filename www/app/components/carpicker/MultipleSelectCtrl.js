import React, { Component } from 'react'
import classnames from 'classnames';
import { connect } from 'dva';

class MultipleSelectCtrl extends Component {
    constructor() {
        super();

        this.state = {
            showBd: false
        }
    }
    clickHandler(e, t, value) {
        if (e.target.checked) {
            var nextvalues = [
                ...value,
                t
            ];
        } else {
            var nextvalues = value.filter((item) => {
                return item != t;
            });
        }

        this.props.addtag(this.props.tagname, nextvalues, nextvalues.join(" 或 "));
    }

    //上树之后
    componentDidMount() {
        var self = this;
        //点击页面其他空白的地方，关闭bd下拉框
        $(document).click(function (event) {
            if ($(self.refs.MultipleSelectCtrl).find($(event.target)).length == 0) {
                self.setState({
                    "showBd": false
                });
            }
        });
    }
    render() {

        var _filter = this.props.filter.filter(item => {
            return item.tagname == this.props.tagname
        })[0];
        var value = [];
        if (_filter) {
            value = _filter.value
        }

        const showlist = () => {
            var ARR = [];
            for (let i = 0; i < this.props.data.options.length / 6; i++) {
                var temp = [];
                let slice_arr = this.props.data.options.slice(i * 6, i * 6 + 6);
                for (let j = 0; j < slice_arr.length; j++) {
                    temp.push(<li key={i * 6 + j}>
                        <label>
                            <input
                                type="checkbox"
                                checked={value.includes(slice_arr[j])}
                                onChange={(e) => { this.clickHandler(e, slice_arr[j], value) }}
                            />
                            {slice_arr[j]}
                        </label>
                    </li>)
                }
                ARR.push(<ul key={i}>{temp}</ul>)
            }
            return ARR;
        }

        return (
            <div className="MultipleSelectCtrl" ref="MultipleSelectCtrl">
                <div className={classnames({ "hd": true, "open": this.state.showBd })} onClick={() => { this.setState({ "showBd": !this.state.showBd }) }}>
                    {this.props.data.title}
                </div>
                <div className="bd" style={{
                    "width": Math.ceil(this.props.data.options.length / 6) * 80 + "px",
                    "display": this.state.showBd ? "block" : "none"
                }}>
                    {showlist()}
                </div>
            </div >
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        filter: carpicker.filter
    })
)(MultipleSelectCtrl);