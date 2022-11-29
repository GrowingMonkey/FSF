import { PageContainer } from '@ant-design/pro-layout';
import { Input, Card, Button, Tabs, Form, Table, Select, Modal, message } from 'antd';
import { history, Link } from 'umi';
import { useEffect } from 'react';
import {
    selectTPList, recommendTalent, updateTP, Interview, rejectTalent, talentGiveUp, sendOffer, confirmOffer,
    customerReject, quitWork, changeTPOwner, customerInterview
} from '@/services/project'
import { useState } from 'react';
import ProForm, {
    ProFormRadio, ProFormSelect, ProFormDependency, ProFormText, ProFormDatePicker, ProFormDateTimePicker, ProFormTextArea,
} from '@ant-design/pro-form';
import CustomerSearch from '@/components/CustomerSearch';
import SearchInput from '@/components/SearchInput'
const { TabPane } = Tabs;
const ChapterManager = () => {
    const [searchForm] = Form.useForm();
    const [remarkForm] = Form.useForm();
    const [TPList, setTPList] = useState([])
    const [state, setState] = useState('')
    const [customId, setCustomId] = useState('')
    const [isYuYueModalVisible, setIsYuYueModalVisible] = useState(false);
    const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);
    const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
    const [isRemarkModalVisible, setIsRemarkModalVisible] = useState(false);
    const [currentState, setCurrentState] = useState(0);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);
    const [recordId, setRecordId] = useState(null);
    const [yuYueForm] = Form.useForm();
    const [isfresh, setIsfresh] = useState(false);
    const [total, setTotal] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [ModalVisible, setModalVisible] = useState({
        state: false,
        current: null,
    });

    const stateChaneTypes = {
        0: [
            {
                label: "加入项目",
                value: 0,
                disabled: true,
            },
            {
                label: "推给客户",
                value: 1,
            },
            // {
            //     label: "否决人选",
            //     value: 2,
            // },
            {
                label: "放弃人选",
                value: 4,
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
            // {
            //     label: "否决人选",
            //     value: 2,
            // },
            {
                label: "放弃人选",
                value: 4,
            },
            // {
            //     label: "客户否决",
            //     value: 7,
            // }
        ],
        2: [
            // {
            //     label: "否决人选",
            //     value: 2,
            //     disabled: true
            // },
        ],
        3: [
            {
                label: "推给顾问",
                value: 3,
                disabled: true,
            },
            // {
            //     label: "否决人选",
            //     value: 2,
            // },
        ],
        4: [
            {
                label: "放弃人选",
                value: 4,
                disabled: true,
            },
            {
                label: "推给客户",
                value: 1,
                disabled: false,
            },
        ],
        5: [
            {
                label: "请选择",
                value: '',
            },
            {
                label: "预约面试",
                value: 5,
            },
            // {
            //     label: "否决人选",
            //     value: 2,
            // }, 

            {
                label: "客户面试",
                value: 6,
            },
            {
                label: "放弃人选",
                value: 4,
            },
            // {
            //     label: "客户否决",
            //     value: 7,
            // },
            // {
            //     label: "确认offer",
            //     value: 8,
            // },
        ],
        6: [
            {
                label: "客户面试",
                value: 6,
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
                label: "放弃人选",
                value: 4,
            },
        ],
        7: [
            // {
            //     label: "客户否决",
            //     value: 7,
            //     disabled: true
            // }
        ],
        8: [
            {
                label: "确认offer",
                value: 8,
                disabled: true
            },
            {
                label: "放弃人选",
                value: 4,
            },
            {
                label: "确认入职",
                value: 9,
            },
        ],
        9: [
            {
                label: "成功入职",
                value: 9,
                disabled: true
            },
            {
                label: "人选离职",
                value: 10,
            }
        ],
        10: [
            {
                label: "人选离职",
                value: 10,
                disabled: true
            }],
    };

    const { location: { query } } = history;
    useEffect(() => {
        selectTPList({ pageNo: pageNo, pageSize: pageSize, state: state, projectId: query.projectId }).then(res => {
            console.log(res);
            setTPList(res?.data?.list || []);
            setTotal(res.data?.count)
            // setTPList([{ address: '111', username: 'hh' }])
            console.log(TPList);

        })
    }, [pageNo, pageSize, state, customId, isfresh])
    const changeUserName = (record) => {
        console.log(record)
        setModalVisible({ state: true, current: record });
    }
    const updatePage = () => {
        if (isfresh) {
            setIsfresh(false)
        } else {
            setIsfresh(true)
        }
    }
    const columns = [
        {
            title: '人选姓名',
            dataIndex: 'talentName',
            key: 'name',
            ellipsis: true,
            render: (text, record) => <Link to={`/project/talent?talentId=${record.talentId}&id=${record.id}`}>{text}</Link>,
        },

        {
            title: '所在公司',
            dataIndex: 'company',
            ellipsis: true,
            key: 'company',
        },
        {
            title: '当前职位',
            dataIndex: 'job',
            ellipsis: true,
            key: 'job',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            ellipsis: true,
            key: 'phone',
        },

        {
            title: '推荐人',
            dataIndex: 'userName',
            key: 'userName',
            width: 150,
            ellipsis: true,
            render: (text, record) => [text, <Button type="link" onClick={() => changeUserName(record)}>变更顾问</Button>]
        },
        {
            title: '推荐人时间',
            dataIndex: 'createTime',
            key: 'createTime',
            ellipsis: true,
        },
        {
            title: '沟通记录',
            dataIndex: 'tpFlowList',
            key: 'tpFlowList',
            ellipsis: true,
            render: (text, record) => <Link to={`/project/talent?talentId=${record.talentId}&id=${record.id}`}>查看</Link>
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            flexd: 'right',
            render: (text, record) => {
                return <Select
                    value={record.state == 5 ? '' : record.state}
                    options={stateChaneTypes[+record.state]}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                        handleStateChange(value, record);
                    }}
                ></Select>
            }
        },
    ];
    const stateStr = (state) => {
        switch (state) {
            case 0:
                return '加入项目';
                break;
            case 1:
                return '推给客户';
                break;
            case 2:
                return '否决人选';
                break;
            case 4:
                return '放弃人选';
                break;
            case 5:
                return '预约面试';
                break;
            // case 6:
            //     return '客户面试';
            //     break;
            case 7:
                return '客户否决';
                break;
            case 8:
                return '确认Offer';
                break;
            case 9:
                return '确认入职';
                break;
            case 10:
                return '人选离职';
                break;

        }
    }
    const TabChange = (e) => {
        console.log(e)
        setState(e);
    }
    const updateGuWen = (values) => {
        console.log(ModalVisible.current.id)
        changeTPOwner({ appUserId: values.talent.recommenderUserId, appUserName: values.talent.recommenderName, tpId: ModalVisible.current.id }).then(res => {
            message.info(res.message);
            setModalVisible({ ...ModalVisible, state: false });
            updatePage();
        })
    }
    const handleStateChange = async (value, record) => {
        console.log(value, record.projectId);
        setCurrentState(value);
        setRecordId(record.id);
        setCurrentCustomerId(record.customerId);
        switch (value) {
            case 1://推给客户
                setIsRemarkModalVisible(true);
                break;
            case 2://否决人选
                setIsRemarkModalVisible(true);
                updateTP({ id: record.id, state: value })
                break;
            case 4://放弃人选
                setIsRemarkModalVisible(true);
                updateTP({ id: record.id, state: value })
                break;
            case 5://约面试
                setIsYuYueModalVisible(true);
                break;
            case 6://客户面试
                setIsRemarkModalVisible(true);
                break;
            case 7://客户否决
                setIsRemarkModalVisible(true);
                break;
            case 8://收offer
                setIsOfferModalVisible(true);
                break;
            case 9://已入职
                setIsRemarkModalVisible(true);
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
    const onFinishYuYue = (values) => {
        Interview({ ...values, id: recordId, projectId: query.projectId }).then(res => {
            message.success(res.data || '更改成功');
            yuYueForm.resetFields();
            setIsYuYueModalVisible(false);
        })
    }
    const onOfferFinish = (values) => {
        console.log(values);
        sendOffer({ ...values, id: recordId, projectId: query.projectId }).then(res => {
            message.success(res.data || '更改成功');
            setIsOfferModalVisible(false);
        })
    }
    const onLeaveFinish = (values) => {
        quitWork({ ...values, id: recordId, projectId: query.projectId }).then(res => {
            message.success(res.data || '更改成功');
            setIsLeaveModalVisible(false);
        })
    }
    const onFinishRemark = async (values) => {
        debugger;
        console.log(values);
        console.log(currentCustomerId, recordId)
        switch (+currentState) {
            case 1:
                await recommendTalent({ projectId: query.projectId, id: recordId, remark: values.remark })
                break;
            case 2:
                // //否决人选
                await rejectTalent({ projectId: query.projectId, id: recordId, remark: values.remark });
                break;
            case 4:
                //放弃人选
                await talentGiveUp({ projectId: query.projectId, id: recordId, remark: values.remark });
                break;
            case 9:
                // 确认入职
                await confirmOffer({ projectId: query.projectId, id: recordId, remark: values.remark })
                break;
            case 7:
                // 客户否决
                await customerReject({ projectId: query.projectId, id: recordId, remark: values.remark })
                break;
            case 6:
                // 客户面试
                await customerInterview({ projectId: query.projectId, id: recordId, remark: values.remark })
                break;
            //
        }
        remarkForm.resetFields();
        message.success('更改成功');
        setIsRemarkModalVisible(false);
        updatePage();
    }
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
                <Tabs centered onChange={e => { setState(e); setPageNo(1) }}>
                    <TabPane tab="全部" key=""></TabPane>
                    <TabPane tab="加项目" key="0"></TabPane>
                    <TabPane tab="给客户" key="1"></TabPane>
                    {/* <TabPane tab="否决人选" key="2"></TabPane> */}

                    <TabPane tab="约面试" key="5"></TabPane>
                    <TabPane tab="客户面试" key="6"></TabPane>
                    {/* <TabPane tab="客户否决" key="7"></TabPane> */}
                    <TabPane tab="确认offer" key="8"></TabPane>
                    <TabPane tab="已入职" key="9"></TabPane>
                    <TabPane tab="人选离职" key="10"></TabPane>
                    <TabPane tab="放弃人选" key="4"></TabPane>
                </Tabs>
                <Table columns={columns} dataSource={TPList} pagination={{
                    total: total,
                    pageSize: 10,
                    defaultCurrent: pageNo,
                    onChange: e => { setPageNo(e) },
                    showTotal: total => `共${total}条`
                }} size="small" bordered scroll={{ x: 600 }}>

                </Table>
                <Modal title="预约面试" visible={isYuYueModalVisible} footer={null} onCancel={() => setIsYuYueModalVisible(false)}>
                    <ProForm

                        hideRequiredMark
                        style={{
                            margin: 'auto',
                            marginTop: 8,
                            maxWidth: 600,
                        }}
                        form={yuYueForm}
                        name="basic"
                        layout="horizontal"
                        initialValues={{
                            public: '1',
                        }}
                        onFinish={onFinishYuYue}
                    >
                        <ProFormSelect label="面试类型"
                            help=""//备注
                            options={[
                                {
                                    value: '0',
                                    label: '线下面试',
                                },
                                {
                                    value: '1',
                                    label: '线上面试',
                                },
                            ]}
                            name="way" />
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
                            ]} label="面试时间" name="type" />
                            <ProFormDateTimePicker name="time" />
                        </ProForm.Group>
                        <ProFormText help=""//备注 
                            label="面试地点"
                            name="address" />
                        <ProFormTextArea label="备注信息" name="remark" />
                    </ProForm>
                </Modal>
                <Modal title="确认offer" visible={isOfferModalVisible} footer={null} onCancel={() => setIsOfferModalVisible(false)}>
                    <ProForm
                        form={remarkForm}
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
                        onFinish={onOfferFinish}
                    >
                        <ProFormDatePicker label="offer时间"
                            help=""//备注
                            name="offerDate" />
                        <ProFormDatePicker label="入职时间"
                            help=""//备注
                            name="workDate" />

                        {/* <ProFormSelect options={[
                                {
                                    value: '0',
                                    label: '税前',
                                },
                                {
                                    value: '1',
                                    label: '税后',
                                },
                            ]} label="年薪" /> */}
                        <ProFormText label="年薪" name="salary" fieldProps={{
                            suffix: '万'
                        }} />


                        <ProFormText label="议价金额" name="needPayment" fieldProps={{
                            suffix: '元'
                        }} />
                        <ProFormText name="quot" label="保用期" fieldProps={{
                            suffix: '月'
                        }} />
                        <ProFormRadio.Group
                            options={[
                                {
                                    value: '0',
                                    label: '按固定比例收费',
                                },
                                {
                                    value: '1',
                                    label: '按固定额收费',
                                },
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请选择',
                                },
                            ]}
                            label="收费方式"
                            help=""//备注
                            name="chargeWay"

                        />
                        <ProFormSelect options={[
                            {
                                value: '0%',
                                label: '0%',
                            },
                            {
                                value: '1%',
                                label: '1%',
                            },
                            {
                                value: '3%',
                                label: '3%',
                            },
                            {
                                value: '6%',
                                label: '6%',
                            },

                        ]} label="税率" name="feeRate" />
                        <ProFormDependency name={['chargeWay']}>
                            {
                                ({ chargeWay }) => {
                                    if (+chargeWay == 0) {
                                        return (<ProFormText name="rate" label="固定比例"></ProFormText>)
                                    } else if (+chargeWay == 1) {
                                        return (<ProFormText name="ration" label="固定金额"></ProFormText>)
                                    }
                                }
                            }
                        </ProFormDependency>
                        <ProFormTextArea label="备注" name="remark" />

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
                        onFinish={onLeaveFinish}
                    >
                        <ProFormRadio.Group
                            options={[
                                {
                                    value: '0',
                                    label: '保内',
                                },
                                {
                                    value: '1',
                                    label: '保外',
                                },
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请选择',
                                },
                            ]}
                            label="是否过保"
                            help=""//备注
                            name="isQuot"

                        />

                    </ProForm>
                </Modal>
                <Modal title={stateStr(currentState)} visible={isRemarkModalVisible} footer={null} onCancel={() => setIsRemarkModalVisible(false)}>
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
                        onFinish={onFinishRemark}
                    >
                        <ProFormTextArea label="备注信息" name="remark" />

                    </ProForm>
                </Modal>
                <Modal title="更改顾问" visible={ModalVisible.state} footer={null} onCancel={() => setModalVisible({ ...ModalVisible, state: false })}>
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
                        onFinish={updateGuWen}
                    >
                        <Form.Item
                            label="推荐人"
                            name="talent"
                        >
                            <SearchInput></SearchInput>
                        </Form.Item>
                    </ProForm>
                </Modal>
            </Card>
        </>
    );
};

export default ChapterManager;
