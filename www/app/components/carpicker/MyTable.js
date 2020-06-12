import React, { Component } from 'react'
import { connect } from 'dva';
import { Table } from 'antd';

class MyTable extends Component {
    constructor() {
        super();
    }

    changeHandler(pagination, filters, sorter) {
        this.props.changeHandler(
            pagination.current,
            pagination.pageSize,
            sorter.field,
            sorter.order
        );
    }
    changXc(name, color) {
        this.props.changeXuanfu(true)
        this.props.changeChexing(name)
        this.props.changeColor(color);
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                sorter: true
            },
            {
                title: '图片',
                dataIndex: 'image',
                key: 'image',
                "render": (a, record, b) => {
                    return <span
                        onClick={
                            () => { this.changXc(record.directory, record.colorEnglist) }}
                    ><img src={`/carimages/${record.directory}/${record.colorEnglist}/view/${record.image}`} width="65" /></span>
                }
            },
            {
                title: '品牌',
                dataIndex: 'brand',
                key: 'brand',
            },
            {
                title: '车系',
                dataIndex: 'series_name',
                key: 'series_name',
            },
            {
                title: '颜色',
                dataIndex: 'color',
                key: 'color',
            },
            {
                title: '发动机',
                dataIndex: 'engine',
                key: 'engine'
            },
            {
                title: '变速箱',
                dataIndex: 'biansuxiang',
                key: 'biansuxiang'
            },
            {
                title: '日期',
                dataIndex: 'goumaidate',
                key: 'goumaidate',
                sorter: true
            },
            {
                title: '已行驶（km）',
                dataIndex: 'km',
                key: 'km',
                sorter: true
            },
            {
                title: '排放',
                dataIndex: 'paifang',
                key: 'paifang',
            },
            {
                title: '价格(万)',
                dataIndex: 'price',
                key: 'price',
                sorter: true
            },
            {
                title: '地区',
                dataIndex: 'province',
                key: 'province',
            },
            {
                title: '车主',
                dataIndex: 'saler',
                key: 'saler',
            }
        ];
        return (
            <div>
                <h3>共<b>{this.props.amount}</b>辆车符合条件</h3>
                <Table
                    rowKey="id"
                    dataSource={this.props.results}
                    columns={columns}
                    pagination={{
                        "current": this.props.page,
                        "pageSize": this.props.pageSize,
                        "total": this.props.amount
                    }}
                    onChange={(pagination, filters, sorter) => { this.changeHandler(pagination, filters, sorter) }}
                />;
            </div>
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        results: carpicker.results,
        amount: carpicker.amount,
        page: carpicker.page,
        pageSize: carpicker.pageSize
    }),
    (dispatch) => ({
        changeHandler(page, pagesize, field, order) {
            dispatch({ "type": "carpicker/changhandler", page, pagesize, field, order });
        },
        changeColor(color) {
            dispatch({ "type": "carshow/changcolor", color });
        }
    })
)(MyTable);
