import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import routes from '../../routes';
// import Icon from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderMenu = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => setCollapsed(collapsed);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      width="300"
    >
      <Menu mode="inline" selectedKeys={[location.pathname]}>
        {routes.map((route, i) => {
          if (!route.children) {
            return (
              <Menu.Item key={route.key} icon={<FontAwesomeIcon icon={route.icon} />}>
                <span>{route.title}</span>
                <Link to={route.path} />
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu
                key={route.key}
                title={route.title}
                icon={<FontAwesomeIcon icon={route.icon || faFile} />}
              >
                {route.children.map((child, i) => {
                  if (!child.children) {
                    return (
                      <Menu.Item
                        key={child.key}
                        icon={<FontAwesomeIcon icon={child.icon ? child.icon : faFile} />}
                      >
                        <span>{child.title}</span>
                        <Link to={child.path} />
                      </Menu.Item>
                    );
                  } else {
                    return (
                      <SubMenu
                        key={child.key}
                        title={child?.title}
                        icon={<FontAwesomeIcon icon={child?.icon || faFile} />}
                      >
                        {child.children.map((childT) => {
                          return (
                            <Menu.Item
                              key={childT.key}
                              icon={
                                <FontAwesomeIcon
                                  icon={childT.icon ? childT.icon : faFile}
                                />
                              }
                              style={{ paddingLeft: '60px' }}
                            >
                              <span>{childT.title}</span>
                              <Link to={childT.path} />
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                })}
              </SubMenu>
            );
          }
        })}
        {/* <Menu.Item key="/dashboard">
          <span>Dashboard</span>
          <Link to="/dashboard"></Link>
        </Menu.Item>
        <Menu.Item key="/users">
          <span>users</span>
          <Link to="/users"></Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
