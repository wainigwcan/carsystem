import React, { Component } from 'react'
import { connect } from 'dva';

// 自己的组件
import TabCtrl from './TabCtrl';
import AListCtrl from './AListCtrl';
import RangeCtrl from './RangeCtrl'
import MultipleSelectCtrl from './MultipleSelectCtrl';
import SelectCtrl from './SelectCtrl';
import Tags from './Tags';
import MyTable from './MyTable';

class CarPicker extends Component {
    constructor(props) {
        super(props);

        this.props.fetchInit();

        this.state = {
            "brand": ""
        }

        this.state = {
            carbrands: {
                "a": ["奥迪", "奥斯顿马丁"],
                "b": ["别克", "宝马", "奔驰", "标致", "比亚迪", "奔腾", "宝骏"],
                "c": ["长安", "长城", "长安欧尚", "昌河", "成功汽车"],
                "d": ["大众", "东风风行", "东南", "东风风神", "道奇", "东风风光", "东风"],
                "f": ["丰田", "风火轮"],
                "s": ["三菱", "散散"],
                "j": ["吉利", "吉祥"],
                "q": ["奇瑞", "QQ"]
            },
            series: {
                "奥迪": {
                    "special": ["A1", "A2", "A3"],
                    "all": {
                        "奥迪汽车": ["A3", "A1", "A2"],
                        "奥迪新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "宝马": {
                    "special": ["X1", "X2", "X3"],
                    "all": {
                        "宝马汽车": ["X1", "X2", "X3"],
                        "宝马新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "别克": {
                    "special": ["英朗", "凯越", "verano"],
                    "all": {
                        "别克汽车": ["verano", "英朗", "凯越"],
                        "别克新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "大众": {
                    "special": ["途观", "途观1", "途观2"],
                    "all": {
                        "大众汽车": ["途观", "途观1", "途观2"],
                        "大众新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "丰田": {
                    "special": ["雷凌双擎E+", "雷凌双擎E+1", "雷凌双擎E+2"],
                    "all": {
                        "丰田汽车": ["雷凌双擎E+", "雷凌双擎E+1", "雷凌双擎E+2"],
                        "丰田新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "三菱": {
                    "special": ["嘉悦", "嘉悦1", "嘉悦2"],
                    "all": {
                        "三菱汽车": ["嘉悦", "嘉悦1", "嘉悦2"],
                        "三菱新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "吉利": {
                    "special": ["嘉悦", "嘉悦1", "嘉悦2"],
                    "all": {
                        "吉利汽车": ["嘉悦", "嘉悦1", "嘉悦2"],
                        "吉利新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "奇瑞": {
                    "special": ["艾瑞泽", "瑞虎", "E3"],
                    "all": {
                        "奇瑞汽车": ["A1", "A2", "QQ", "艾瑞泽"],
                        "奇瑞新能源": ["擎天柱", "大熊猫"]
                    }
                },
                "长安": {
                    "special": ["CS55PLUS", "CS55PLUS1", "CS55PLUS2"],
                    "all": {
                        "长安汽车": ["CS55PLUS", "CS55PLUS1", "CS55PLUS2"],
                        "长安新能源": ["擎天柱", "大熊猫"]
                    }
                },
            },
            price: {
                "example": [
                    {
                        "chinese": "3万以下",
                        "b": 0,
                        "t": 2.99
                    },
                    {
                        "chinese": "3万到6万",
                        "b": 3,
                        "t": 5.99
                    },
                    {
                        "chinese": "6万到16万",
                        "b": 6,
                        "t": 15.99
                    },
                    {
                        "chinese": "16万到26万",
                        "b": 16,
                        "t": 25.99
                    }
                ]
                ,
                "min": 0,
                "max": 200
            },
            km: {
                "example": [
                    {
                        "chinese": "3万以下",
                        "b": 0,
                        "t": 30000
                    },
                    {
                        "chinese": "6万以下",
                        "b": 0,
                        "t": 60000
                    },
                    {
                        "chinese": "10万下",
                        "b": 0,
                        "t": 100000
                    }
                ]
                ,
                "min": 0,
                "max": 1000000
            },
            "cartype": {
                "title": "车型",
                "options": ["豪华", "商务", "紧凑", "面包"]
            },
            "seat": {
                "title": "座位数",
                "options": ["4座", "5座", "7座"]
            },
            "color": {
                "title": "颜色",
                "options": ["白色", "红色", "黑色", "绿色", "银色", "橙色", "棕色", "金色", "其他颜色"]
            },
            "engine": {
                "title": "发动机",
                "options": ["1.0", "1.2T", "1.8", "2.0", "3.0", "4.0"]
            },
            "biansuxiang": {
                "title": "变速箱",
                "options": ["手动", "自动"]
            }
        }
    }

    addtag(tagname, value, words) {
        this.props.addtag(tagname, value, words);
    }
    // 换品牌
    changebrand(brand) {
        this.setState({
            brand
        });
    }

    render() {
        return (
            <div>
                <div className="ant-table">
                    <div className="ant-table-body">
                        <table>
                            <tbody className="ant-table-tbody">
                                <tr className="ant-table-row">
                                    <td className="td_h">
                                        品牌
                                    </td>
                                    <td>
                                        <TabCtrl
                                            data={this.state.carbrands}
                                            tagname="品牌"
                                            addtag={this.addtag.bind(this)}
                                            changebrand={this.changebrand.bind(this)}
                                        ></TabCtrl>
                                    </td>
                                </tr>
                                <tr className="ant-table-row">
                                    <td className="td_h">
                                        车系
                                    </td>
                                    <td>
                                        <AListCtrl
                                            data={this.state.series[this.state.brand]}
                                            tagname="车系"
                                            addtag={this.addtag.bind(this)}
                                        ></AListCtrl>
                                    </td>
                                </tr>
                                <tr className="ant-table-row">
                                    <td className="td_h">
                                        价格
                                    </td>
                                    <td>
                                        <RangeCtrl
                                            data={this.state.price}
                                            tagname="价格"
                                            addtag={this.addtag.bind(this)}
                                        ></RangeCtrl>
                                    </td>
                                </tr>
                                <tr className="ant-table-row">
                                    <td className="td_h">
                                        公里数
                                    </td>
                                    <td>
                                        <RangeCtrl
                                            data={this.state.km}
                                            tagname="公里数"
                                            addtag={this.addtag.bind(this)}
                                        ></RangeCtrl>
                                    </td>
                                </tr>
                                <tr className="ant-table-row">
                                    <td className="td_h">
                                        更多
                                    </td>
                                    <td>
                                        <MultipleSelectCtrl
                                            data={this.state.cartype}
                                            tagname="车型"
                                            addtag={this.addtag.bind(this)}
                                        ></MultipleSelectCtrl>
                                        <MultipleSelectCtrl
                                            data={this.state.seat}
                                            tagname="座位数"
                                            addtag={this.addtag.bind(this)}
                                        ></MultipleSelectCtrl>
                                        <MultipleSelectCtrl
                                            data={this.state.engine}
                                            tagname="发动机"
                                            addtag={this.addtag.bind(this)}
                                        ></MultipleSelectCtrl>
                                        <SelectCtrl
                                            data={this.state.color}
                                            tagname="颜色"
                                            addtag={this.addtag.bind(this)}
                                        ></SelectCtrl>
                                        <SelectCtrl
                                            data={this.state.biansuxiang}
                                            tagname="变速箱"
                                            addtag={this.addtag.bind(this)}
                                        ></SelectCtrl>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <Tags></Tags>
                        <MyTable
                            changeXuanfu={this.props.changeXuanfu}
                            changeChexing={this.props.changeChexing}
                        ></MyTable>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    null,
    (dispatch) => ({
        addtag(tagname, value, words) {
            dispatch({ "type": "carpicker/addtag", tagname, value, words })
        },
        fetchInit() {
            dispatch({ "type": "carpicker/fetchinit" })
        }
    })
)(CarPicker);
