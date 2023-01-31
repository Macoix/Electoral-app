import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

import SiderMenu from './SiderMenu';
import HeaderMenu from './HeaderMenu';

const { Content } = Layout;
const LayoutWithRoute = ({ children }) => {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <HeaderMenu />
        <Layout>
          <SiderMenu />
          <Content
            className="flex justify-center items-center flex-col"
            style={{ margin: '20px 16px' }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

LayoutWithRoute.propTypes = {
  children: PropTypes.any
};

export default LayoutWithRoute;
