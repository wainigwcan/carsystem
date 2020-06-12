import React, { Component } from 'react';
import Carshow from './components/carshow';
import CarPicker from './components/carpicker';

import "./style/carshow.less";
import "./style/carpicker.less";
import "./style/index.less";

import CloseBtn from './ui-components/CloseBtn';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            showxuanfu: false,
            chexing: "Corolla"
        }
    }

    changeXuanfu(boolean) {
        this.setState({
            showxuanfu: boolean
        });
    }
    // 换车型
    changeChexing(str) {
        this.setState({
            chexing: str
        })
    }

    render() {
        return (
            <div>
                <Layout>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="找车">
                                    <Menu.Item key="1">查看车联</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <CarPicker
                                    changeXuanfu={this.changeXuanfu.bind(this)}
                                    changeChexing={this.changeChexing.bind(this)}
                                ></CarPicker>
                                <div className="xuanfu" style={{ "display": this.state.showxuanfu ? "block" : "none" }}>
                                    <div className="cover"></div>
                                    <div className="inner">
                                        <CloseBtn onClick={() => { this.changeXuanfu(false) }}>x</CloseBtn>
                                        <Carshow chexing={this.state.chexing}></Carshow>
                                    </div>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>

            </div>
        )
    }
}
export default App;