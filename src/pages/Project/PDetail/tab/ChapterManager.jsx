import { PageContainer } from '@ant-design/pro-layout';
import { Input, Card, Button, Tabs, Form, Table, Select, Modal } from 'antd';
import { history, Link } from 'umi';
import { useEffect } from 'react';
import { selectTPList, recommendTalent, updateTP } from '@/services/project'
import { useState } from 'react';
import ProForm, {
    ProFormRadio, ProFormSelect, ProFormText, ProFormDatePicker, ProFormDateTimePicker, ProFormTextArea,
} from '@ant-design/pro-form';
import CustomerSearch from '@/components/CustomerSearch';
const { TabPane } = Tabs;
const ChapterManager = () => {
    const [searchForm] = Form.useForm()
    const [TPList, setTPList] = useState([])
    const [state, setState] = useState(0)
    const [customId, setCustomId] = useState('')
    const [isYuYueModalVisible, setIsYuYueModalVisible] = useState(false);
    const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);
    const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
    const stateChaneTypes = {
        0: [
            {
                label: "加入项目",
                value: 0,
                disabled: true,
            },
            {
                label: "预约面试",
                value: 5,
            },
            {
                label: "确认offer",
                value: 8,
            },
            {
                label: "客户确认",
                value: 7,
            },
            {
                label: "成功入职",
                value: 9,
            },
            {
                label: "推给客户",
                value: 3,
            },
            {
                label: "人选离职",
                value: 10,
            },
        ],
        1: [
            {
                label: "推给客户",
                value: 1,
                disabled: true
            },
            {
                label: "预约面试",
                value: 5,
            },
            {
                label: "确认offer",
                value: 8,
            },
            {
                label: "客户确认",
                value: 7,
            },
            {
                label: "成功入职",
                value: 9,
            },
            {
                label: "推给客户",
                value: 3,
            },
            {
                label: "人选离职",
                value: 10,
            },
        ],
        3: [
            {
                label: "预约面试",
                value: 5,
            },
            {
                label: "确认offer",
                value: 8,
            },
            {
                label: "客户确认",
                value: 7,
            },
            {
                label: "成功入职",
                value: 9,
            },
            {
                label: "推给客户",
                value: 1,
                disabled: true
            },
            {
                label: "人选离职",
                value: 10,
            },
        ],
    };
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { location: { query } } = history;
    useEffect(() => {
        selectTPList({ pageNo: pageNo, pageSize: pageSize, searchForm, projectId: query.projectId }).then(res => {
            console.log(res);
            setTPList(res?.data?.list || []);
            // setTPList([{ address: '111', username: 'hh' }])
            console.log(TPList);
        })
    }, [pageNo, pageSize, state, customId])

    const columns = [
        {
            title: '人选姓名',
            dataIndex: 'talentName',
            key: 'name',
            render: (text, record) => <Link to={`/project/p-detail/talent?talentId=${record.talentId}&id=${record.id}`}>{text}</Link>,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '所在公司',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: '当前职位',
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '推荐人状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '推荐人',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '推荐人时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '沟通记录',
            dataIndex: 'tpFlowList',
            key: 'tpFlowList',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                return <Select
                    value={record.state}
                    options={stateChaneTypes[+record.state]}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                        handleStateChange(value, record);
                    }}
                ></Select>
            }
        },
    ];
    const TabChange = (e) => {
        console.log(e)
        setState(e);
    }
    const handleStateChange = async (value, record) => {
        console.log(value, record.projectId);
        switch (value) {
            case 1://推给客户
                recommendTalent({ customerId: record.customerId, id: record.id }).then(res => {
                    //改变状态
                    updateTP({ id: record.id, state: value });
                })
                break;
            case 2://否决人选
                updateTP({ id: record.id, state: value })
                break;
            case 4://人选放弃
                updateTP({ id: record.id, state: value })
                break;
            case 5://约面试
                setIsYuYueModalVisible(true);
                break;
            case 6://客户面试
                break;
            case 7://客户否决
                break;
            case 8://收offer
                setIsOfferModalVisible(true);
                break;
            case 9://已入职
                break;
            case 10://人选离职
                setIsLeaveModalVisible(true);
                break;
        }
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
                        name="projectId"
                    >
                        <CustomerSearch CustomerStyle={{ width: '328px' }} onChange={e => setCustomId(e.customerId)} />
                    </Form.Item>
                </Form>
                <Tabs centered onChange={e => setState(e)}>
                    <TabPane tab="加项目" key="0"></TabPane>
                    <TabPane tab="给客户" key="1"></TabPane>
                    <TabPane tab="否决人选" key="2"></TabPane>
                    <TabPane tab="人选放弃" key="4"></TabPane>
                    <TabPane tab="约面试" key="5"></TabPane>
                    <TabPane tab="客户面试" key="6"></TabPane>
                    <TabPane tab="客户否决" key="7"></TabPane>
                    <TabPane tab="收offer" key="8"></TabPane>
                    <TabPane tab="已入职" key="9"></TabPane>
                    <TabPane tab="人选离职" key="10"></TabPane>
                </Tabs>
                <Table columns={columns} dataSource={TPList}>

                </Table>
                <Modal title="预约面试" visible={isYuYueModalVisible} footer={null} onCancel={() => setIsYuYueModalVisible(false)}>
                    <ProForm
                        hideRequiredMark
                        style={{
                            margin: 'auto',
                            marginTop: 8,
                            maxWidth: 600,
                        }}
                        name="basic"
                        layout="horizontal"
                        initialValues={{
                            public: '1',
                        }}
                    // onFinish={onFinish}
                    >
                        <ProFormSelect label="面试类型"
                            help=""//备注
                            options={[
                                {
                                    value: '0',
                                    label: '线下面试',
                                },
                            ]}
                            name="type" />
                        <ProForm.Group>
                            <ProFormSelect options={[
                                {
                                    value: '0',
                                    label: '初试',
                                },
                                {
                                    value: '1',
                                    label: '复试',
                                },
                                {
                                    value: '2',
                                    label: '终试',
                                },
                            ]} label="面试时间" />
                            <ProFormDateTimePicker />
                        </ProForm.Group>
                        <ProFormText help=""//备注 
                            label="面试地点"
                            name="address" />
                    </ProForm>
                </Modal>
                <Modal title="确认offer" visible={isOfferModalVisible} footer={null} onCancel={() => setIsOfferModalVisible(false)}>
                    <ProForm
                        hideRequiredMark
                        style={{
                            margin: 'auto',
                            marginTop: 8,
                            maxWidth: 600,
                        }}
                        name="basic"
                        layout="horizontal"
                        initialValues={{
                            public: '1',
                        }}
                    // onFinish={onFinish}
                    >
                        <ProFormDatePicker label="offer时间"
                            help=""//备注
                            name="type" />
                        <ProFormDatePicker label="入职时间"
                            help=""//备注
                            name="type" />
                        <ProForm.Group>
                            <ProFormSelect options={[
                                {
                                    value: '0',
                                    label: '税前',
                                },
                                {
                                    value: '1',
                                    label: '税后',
                                },
                            ]} label="年薪" />
                            <ProFormText />
                        </ProForm.Group>
                        <ProFormRadio.Group
                            options={[
                                {
                                    value: '0',
                                    label: '上班打卡',
                                },
                                {
                                    value: '1',
                                    label: '下班打卡',
                                },
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            label="人选状态"
                            help=""//备注
                            name="type"

                        />
                        <ProFormRadio.Group
                            options={[
                                {
                                    value: '0',
                                    label: '按固定比例收费',
                                },
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            label="收费方式"
                            help=""//备注
                            name="type"

                        />
                        <ProFormSelect options={[
                            {
                                value: '0',
                                label: '税前',
                            },
                            {
                                value: '1',
                                label: '税后',
                            },
                        ]} label="税率" />
                        <ProFormTextArea label="备注" />
                    </ProForm>
                </Modal>
                <Modal title="人选离职" visible={isLeaveModalVisible} footer={null} onCancel={() => setIsLeaveModalVisible(false)}>
                    <ProForm
                        hideRequiredMark
                        style={{
                            margin: 'auto',
                            marginTop: 8,
                            maxWidth: 600,
                        }}
                        name="basic"
                        layout="vertical"
                        initialValues={{
                            public: '1',
                        }}
                    // onFinish={onFinish}
                    >
                        <ProFormRadio.Group
                            options={[
                                {
                                    value: '0',
                                    label: '上班打卡',
                                },
                                {
                                    value: '1',
                                    label: '下班打卡',
                                },
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                },
                            ]}
                            label="打卡类型"
                            help=""//备注
                            name="type"

                        />

                    </ProForm>
                </Modal>
            </Card>
        </>
    );
};

export default ChapterManager;
