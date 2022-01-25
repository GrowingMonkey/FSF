import { PageContainer } from '@ant-design/pro-layout';
import { Input, Card, Button, Tabs, Form, Table, Select } from 'antd';
import { history, Link } from 'umi';
const { TabPane } = Tabs;
const ChapterManager = () => {
    const [searchForm] = Form.useForm()
    const stateChaneTypes = {
        0: [
            {
                label: "草稿",
                value: 0,
                disabled: true,
            },
            {
                label: "发布",
                value: 1,
            },
        ],
        1: [
            {
                label: "预约面试",
                value: 1,
                disabled: true,
            },
            {
                label: "确认offer",
                value: 2,
            },
            {
                label: "客户确认",
                value: 3,
            },
            {
                label: "成功入职",
                value: 4,
            },
            {
                label: "推给客户",
                value: 4,
            },
        ],
        3: [
            {
                label: "发布",
                value: 1,
            },
            {
                label: "暂停",
                value: 3,
                disabled: true,
            },
        ],
    };
    const columns = [
        {
            title: '人选姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <Link to={`/project/p-detail/talent?`}>{text}</Link>,
        },
        {
            title: '类型',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '所在公司',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '当前职位',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '联系电话',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '推荐人状态',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '推荐人',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '推荐人时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '沟通记录',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                return <Select
                    value={1}
                    options={stateChaneTypes[1]}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                        handleStateChange(value, record.projectId);
                    }}
                ></Select>
            }
        },
    ];
    const handleStateChange = (value, projectId) => {
        console.log(value, projectId);
    };
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <>
            <Card>
                <Form
                    form={searchForm}
                    name="basic"
                    layout={'inline'}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="推荐人"
                        name="username"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button>搜索</Button>
                    </Form.Item>
                </Form>
                <Tabs centered>
                    <TabPane tab="加项目"></TabPane>
                    <TabPane tab="给客户"></TabPane>
                    <TabPane tab="约面试"></TabPane>
                    <TabPane tab="客户面试"></TabPane>
                    <TabPane tab="收offer"></TabPane>
                    <TabPane tab="已入职"></TabPane>
                    <TabPane tab="客服否决"></TabPane>
                    <TabPane tab="人选离职"></TabPane>
                </Tabs>
                <Table columns={columns} dataSource={[
                    {
                        key: '1',
                        name: '胡彦斌',
                        age: 32,
                        address: '西湖区湖底公园1号',
                    },
                    {
                        key: '2',
                        name: '胡彦祖',
                        age: 42,
                        address: '西湖区湖底公园1号',
                    },
                ]}>

                </Table>
            </Card>
        </>
    );
};

export default ChapterManager;
