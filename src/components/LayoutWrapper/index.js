import React from 'react';
import {Icon, Layout, Menu} from "antd";
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;

// An example of High Order Component(HOC) whose responsibility
// is to wrap any component given to it and return the new resulting
// component.
const LayoutWrapper = (WrappedComponent) => {
     class LayoutWrapper extends React.Component {
        render() {
            return (
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                    >
                        <div className="logo slider-header">React App</div>
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">
                                <Link to="/" >
                                    <Icon type="home"/>
                                    <span className="nav-text">Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/registration" >
                                    <Icon type="form"/>
                                    <span className="nav-text">Registration</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className="header" style={{background: '#e6f7ff', padding: 0}}>
                            <span>Demonstration of React app</span>
                        </Header>
                        <Content className="content" style={{margin: '24px 16px 0'}}>
                            <WrappedComponent {...this.props}/>
                        </Content>
                        <Footer className="footer" style={{textAlign: 'center'}}>React App ©2019 Created by Software
                            Engineering</Footer>
                    </Layout>
                </Layout>
            );
        }
    }

    //Display name with the wrapped component for ease in debugging using react debugger tools
    LayoutWrapper.displayName = `LayoutWrapper(${getDisplayName(WrappedComponent)})`;
     return LayoutWrapper;
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default LayoutWrapper;