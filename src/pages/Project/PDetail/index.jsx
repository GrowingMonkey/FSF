import { PageContainer } from '@ant-design/pro-layout';
import { Input, Dropdown, Menu, Button } from 'antd';
import { history } from 'umi';
const tabList = [
    {
        key: 'detail',
        tab: '职位详情',
    },
    {
        key: 'chapter-manager',
        tab: '推荐管理',
    },
];

const Search = (props) => {
    console.log(1111);
    console.log(props);
    const handleTabChange = (key) => {
        console.log(props);
        const { match } = props;
        const url = match.url === '/' ? '' : match.url;

        switch (key) {
            case 'detail':
                history.push(`${url}/detail${props.location.search}`);
                break;

            case 'chapter-manager':
                history.push(`${url}/chapter-manager${props.location.search}`);
                break;
            default:
                break;
        }
    };
    console.log(history)
    const handleFormSubmit = (value) => {
        // eslint-disable-next-line no-console
        console.log(value);
    };

    const getTabKey = () => {
        const { match, location } = props;
        const url = match.path === '/' ? '' : match.path;
        const tabKey = location.pathname.replace(`${url}/`, '');

        if (tabKey && tabKey !== '/') {
            return tabKey;
        }

        return 'detail';
    };

    return (
        <PageContainer
            header={{
                title: '职位详情',
                ghost: true,
                extra: [
                    <Dropdown
                        key="dropdown"
                        trigger={['click']}
                        overlay={
                            <Menu>
                                <Menu.Item key="1">下拉菜单</Menu.Item>
                                <Menu.Item key="2">下拉菜单2</Menu.Item>
                                <Menu.Item key="3">下拉菜单3</Menu.Item>
                            </Menu>
                        }
                    >
                        <Button key="4" style={{ padding: '0 8px' }}>
                            职位操作
                </Button>
                    </Dropdown>,
                ],
            }}
            tabList={tabList}
            tabActiveKey={getTabKey()}
            onTabChange={handleTabChange}
        >
            {props.children}
        </PageContainer>
    );
};

export default Search;
