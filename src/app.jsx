import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { Button, Menu } from 'antd';
// 查询当前用户
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { currentUser as queryCurrentUser } from './services/employ';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      console.log('msg====msg', msg)
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行
  console.log(history);
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState }) => {
  return {
    // logo: false,
    // titleRender: () => <div>123</div>,
    title: false,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        // <Link to="/umi/plugin/openapi" target="_blank">
        //   <LinkOutlined />
        //   <span>OpenAPI 文档</span>
        // </Link>,
        // <Link to="/~docs">
        //   <BookOutlined />
        //   <span>业务组件文档</span>
        // </Link>,
      ]
      : [],
    menuItemRender: (menuItemProps, defaultDom) => {
      // console.log(menuItemProps);
      if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
        return defaultDom;
      }
      return (
        <Link to={menuItemProps.path} target={menuItemProps.target ? "_blank" : undefined}>
          <ul>
            <Menu.Item key={menuItemProps.key} style={{ fontSize: '12px' }}>
              {/* <IconFont type={menuItemProps.icon} style={{ fontSize: '12px' }} /> */}
              {menuItemProps.name}
            </Menu.Item>
          </ul>
        </Link>
      );
    },
    // subMenuItemRender: (_, dom) => <div>{dom}</div>,
    // menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      if (initialState.loading) return <PageLoading />;
      return children;
    },
    ...initialState?.settings,
  };
};
