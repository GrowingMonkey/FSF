import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import { history } from 'umi';
const tabList = [
    {
        key: 'prodetail',
        tab: '职位详情',
    },
    {
        key: 'prostep',
        tab: '推荐管理',
    },
];

const Search = (props) => {
    const handleTabChange = (key) => {
        const { match } = props;
        const url = match.url === '/' ? '' : match.url;

        switch (key) {
            case 'prodetail':
                history.push(`${url}/prodetail`);
                break;

            case 'prostep':
                history.push(`${url}/prostep`);
                break;
            default:
                break;
        }
    };

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

        return 'prodetail';
    };

    return (
        <PageContainer
            tabList={tabList}
            tabActiveKey={getTabKey()}
            onTabChange={handleTabChange}
        >
            {props.children}
        </PageContainer>
    );
};

export default Search;
