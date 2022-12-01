import { useState, useEffect } from 'react';
import {
    Form,
    Row,
    Tag,
    Modal,
    Popconfirm,
    Col,
    Input,
    InputNumber,
    Button,
    Select,
    Table,
    Divider,
    Space,
    DatePicker,
    Cascader,
    message,
} from 'antd';
import { history, Link } from 'umi';
import styles from '../index.less';
import { PageContainer } from '@ant-design/pro-layout';
import SearchInput from '@/components/SearchInput';
import ModalForm from '../components/ModalForm';
import { queryKpiList, confirmKpi, refuseKpi } from '@/services/eco';
import {
    userKpiData,
    teamList,
    kpiPop1,
    kpiPop12,
    kpiPop13,
    kpiPop6,
    kpiPop9,
    kpiPop8,
    kpiFeePop,
} from '@/services/kpi';
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;
import moment from 'moment';

const KpiList = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [form] = Form.useForm();
    const [fresh, setFresh] = useState(false);
    const [visible, setVisible] = useState(false);
    const [formValue, setFormValue] = useState(null);
    const [talentList, setTalentList] = useState([]);
    const [modelVisiBle, setModelVisiBle] = useState({
        type: 'khms',
        date: '',
        pageNo: 1,
        visible: false,
    });
    const [modalCount, setModalCount] = useState(0);
    const [searchValues, setSearchValues] = useState(null);
    const [kpiList, setKpiList] = useState([]);
    const [count, setCount] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [teamTag, setTeamTag] = useState([]);
    const formList = [
        {
            name: 'appUserName',
            label: '顾问名称',
            type: 'SearchInput',
            span: 8,
        },
        {
            name: 'year',
            label: '年份',
            type: 'dateRangPicker',
            span: 6,
        },
    ];
    useEffect(async () => {
        if (modelVisiBle.visible) {
            console.log(searchValues);
            let result = null;
            switch (modelVisiBle.type) {
                case 'tgkh':
                    result = await kpiPop1({
                        appUserId: selectedTags.length > 0 ? selectedTags[0] : searchValues.appUserId,
                        time: modelVisiBle.date,
                        pageNo: modelVisiBle.pageNo,
                        pageSize: 10,
                    });
                    setModalCount(result?.data?.count || 0);
                    break;
                case 'khms':
                    result = await kpiPop6({
                        appUserId: selectedTags.length > 0 ? selectedTags[0] : searchValues.appUserId,
                        time: modelVisiBle.date,
                        pageNo: modelVisiBle.pageNo,
                        pageSize: 10,
                    });
                    setModalCount(result?.data?.count || 0);
                    break;
                case 'offer':
                    result = await kpiPop8({
                        appUserId: selectedTags.length > 0 ? selectedTags[0] : searchValues.appUserId,
                        time: modelVisiBle.date,
                        pageNo: modelVisiBle.pageNo,
                        pageSize: 10,
                    });
                    setModalCount(result?.data?.count || 0);
                    break;
                case 'cgrz':
                    result = await kpiPop9({
                        appUserId: selectedTags.length > 0 ? selectedTags[0] : searchValues.appUserId,
                        time: modelVisiBle.date,
                        pageNo: modelVisiBle.pageNo,
                        pageSize: 10,
                    });
                    setModalCount(result?.data?.count || 0);
                    break;
                case 'lrrx':
                    result = await kpiPop12({
                        appUserId: selectedTags.length > 0 ? selectedTags[0] : searchValues.appUserId,
                        time: modelVisiBle.date,
                        pageNo: modelVisiBle.pageNo,
                        pageSize: 10,
                    });
                    setModalCount(result?.data?.count || 0);
                    break;
                case 'qykh':
                    result = await kpiPop13({
                        appUserId: selectedTags.length > 0 ? selectedTags[0] : '',
                        time: modelVisiBle.date,
                        pageNo: modelVisiBle.pageNo,
                        pageSize: 10,
                    });
                    setModalCount(result?.data?.count || 0);
                    break;
                default:
                    result = await kpiFeePop({
                        appUserId: selectedTags.length > 0 ? selectedTags[0] : searchValues.appUserId,
                        time: modelVisiBle.date,
                        pageNo: modelVisiBle.pageNo,
                        pageSize: 10,
                    });
                    setModalCount(result?.data?.count || 0);
            }
            setTalentList(result?.data?.list || []);
        }
    }, [modelVisiBle]);
    const kpiColumns = [
        {
            title: '顾问名称',
            dataIndex: 'userName',
            key: 'userName',
            width: 60,
            ellipsis: true,
            render: (text, record) => {
                return <span style={{ fontWeight: 'bold' }}>{text}</span>;
            },
        },
        {
            title: '期数',
            dataIndex: 'dataTime',
            key: 'dataTime',
            width: 100,
            ellipsis: true,
            render: (text, record) => {
                return <span style={{ fontWeight: 'bold' }}>{text}</span>;
            },
        },
        {
            title: '职级',
            dataIndex: 'job',
            key: 'job',
            ellipsis: true,
            width: 40,
            render: (text, record) => {
                return <span style={{ fontWeight: 'bold' }}>{text}</span>;
            },
        },
        {
            title: '推给客户',
            dataIndex: 'tgkh',
            width: 60,

            key: 'tgkh',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return <Link style={{ fontWeight: 'bold' }}>{text}</Link>;
                }
            },
        },
        {
            title: '客户面试',
            dataIndex: 'khms',
            width: 60,

            key: 'khms',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return <Link style={{ fontWeight: 'bold' }}>{text}</Link>;
                }
            },
        },
        {
            title: '确认offer',
            dataIndex: 'offer',
            width: 60,
            key: 'offer',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return <Link style={{ fontWeight: 'bold' }}>{text}</Link>;
                }
            },
        },
        {
            title: '成功入职',
            dataIndex: 'cgrz',
            width: 60,
            key: 'cgrz',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return <Link style={{ fontWeight: 'bold' }}>{text}</Link>;
                }
            },
        },
        {
            title: '录入人选',
            dataIndex: 'lrrx',
            width: 60,

            key: 'lrrx',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return <Link style={{ fontWeight: 'bold' }}>{text}</Link>;
                }
            },
        },
        {
            title: '签约客户',
            dataIndex: 'qykh',
            width: 60,

            key: 'qykh',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return <Link style={{ fontWeight: 'bold' }}>{text}</Link>;
                }
            },
        },

        {
            title: '业绩金额',
            dataIndex: 'fee',
            width: 60,

            key: 'fee',
            ellipsis: true,
            render: (text, record) => {
                return <span style={{ fontWeight: 'bold' }}>{text}</span>;
            },
        },
        {
            title: '考核分数',
            dataIndex: 'score',
            width: 60,

            key: 'score',
            ellipsis: true,
            render: (text, record) => {
                return <span style={{ fontWeight: 'bold' }}>{text}</span>;
            },
        },
    ];
    const kp2Columns = [
        {
            title: '顾问名称',
            dataIndex: 'userName',
            key: 'userName',
            width: 60,
            ellipsis: true,
            render: (text) => '',
        },
        {
            title: '期数',
            dataIndex: 'dataTime',
            key: 'dataTime',
            width: 100,
            ellipsis: true,
        },
        {
            title: '职级',
            dataIndex: 'job',
            key: 'job',
            ellipsis: true,
            width: 40,
            render: (text) => '',
        },
        {
            title: '推给客户',
            dataIndex: 'tgkh',
            width: 60,

            key: 'tgkh',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return (
                        <Link
                            onClick={() => {
                                console.log(record);
                                setModelVisiBle({ type: 'tgkh', date: record.dataTime, pageNo: 1, visible: true });
                            }}
                        >
                            {text}
                        </Link>
                    );
                }
            },
        },
        {
            title: '客户面试',
            dataIndex: 'khms',
            width: 60,

            key: 'khms',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return (
                        <Link
                            onClick={() =>
                                setModelVisiBle({ type: 'khms', date: record.dataTime, pageNo: 1, visible: true })
                            }
                        >
                            {text}
                        </Link>
                    );
                }
            },
        },
        {
            title: '确认offer',
            dataIndex: 'offer',
            width: 60,
            key: 'offer',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return (
                        <Link
                            onClick={() =>
                                setModelVisiBle({ type: 'offer', date: record.dataTime, pageNo: 1, visible: true })
                            }
                        >
                            {text}
                        </Link>
                    );
                }
            },
        },
        {
            title: '成功入职',
            dataIndex: 'cgrz',
            width: 60,
            key: 'cgrz',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return (
                        <Link
                            onClick={() =>
                                setModelVisiBle({ type: 'cgrz', date: record.dataTime, pageNo: 1, visible: true })
                            }
                        >
                            {text}
                        </Link>
                    );
                }
            },
        },
        {
            title: '录入人选',
            dataIndex: 'lrrx',
            width: 60,

            key: 'lrrx',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return (
                        <Link
                            onClick={() =>
                                setModelVisiBle({ type: 'lrrx', date: record.dataTime, pageNo: 1, visible: true })
                            }
                        >
                            {text}
                        </Link>
                    );
                }
            },
        },
        {
            title: '签约客户',
            dataIndex: 'qykh',
            width: 60,

            key: 'qykh',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return (
                        <Link
                            onClick={() =>
                                setModelVisiBle({ type: 'qykh', date: record.dataTime, pageNo: 1, visible: true })
                            }
                        >
                            {text}
                        </Link>
                    );
                }
            },
        },

        {
            title: '业绩金额',
            dataIndex: 'fee',
            width: 60,

            key: 'fee',
            ellipsis: true,
            render: (text, record) => {
                if (text == 0) {
                    return 0;
                } else {
                    return (
                        <Link
                            onClick={() =>
                                setModelVisiBle({ type: 'yjje', date: record.dataTime, pageNo: 1, visible: true })
                            }
                        >
                            {text}
                        </Link>
                    );
                }
            },
        },
        {
            title: '考核分数',
            dataIndex: 'score',
            width: 60,

            key: 'score',
            ellipsis: true,
            render: (text) => '',
        },
    ];
    const kp3Columns = [
        {
            title: '人选名称',
            dataIndex: 'talentName',
            key: 'talentName',
            width: 80,
            ellipsis: true,
        },
        {
            title: '岗位名称',
            dataIndex: 'job',
            key: 'job',
            ellipsis: true,
        },
        {
            title: '公司名称',
            dataIndex: 'company',
            key: 'company',
            ellipsis: true,
        },
        {
            title: '日期',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 100,
            ellipsis: true,
        },
        // {
        //     title: '操作',
        //     width: 80,
        //     key: 'action',
        //     render: (text, record) => {
        //         return <Link>查看详情</Link>
        //     }

        // },
    ];
    const renderColumn = (type) => {
        let cl = [];
        switch (type) {
            case 'lrrx':
                cl = [
                    {
                        title: '录入日期',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        width: 100,
                        ellipsis: true,
                    },
                    {
                        title: '人选名称',
                        dataIndex: 'talentName',
                        key: 'talentName',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '人选岗位',
                        dataIndex: 'job',
                        key: 'job',
                        ellipsis: true,
                    },
                    // {
                    //     title: '操作',
                    //     key: 'action',
                    //     width: 80,
                    //     render: (text, record) => {
                    //         return <Link>查看详情</Link>
                    //     }

                    // },
                ];
                break;
            case 'qykh':
                cl = [
                    {
                        title: '签约日期',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        width: 100,
                        ellipsis: true,
                    },
                    {
                        title: '客户名称',
                        dataIndex: 'customerName',
                        key: 'customerName',
                        ellipsis: true,
                    },
                    // {
                    //     title: '操作',
                    //     key: 'action',
                    //     width: 80,
                    //     render: (text, record) => {
                    //         return <Link>查看详情</Link>
                    //     }
                    // }
                ];
                break;
            case 'yjje':
                cl = [
                    {
                        title: '业绩日期',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        width: 100,
                        ellipsis: true,
                    },
                    {
                        title: '客户名称',
                        dataIndex: 'customerName',
                        key: 'customerName',
                        ellipsis: true,
                    },

                    {
                        title: '回款金额',
                        dataIndex: 'serviceFee',
                        key: 'serviceFee',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '业绩比例',
                        dataIndex: 'rate',
                        key: 'rate',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '业绩金额',
                        dataIndex: 'kpiFee',
                        key: 'kpiFee',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '回款用户',
                        dataIndex: 'userName',
                        key: 'userName',
                        width: 80,
                        ellipsis: true,
                    },
                ];
                break;
            default:
                cl = kp3Columns;
        }
        return cl;
    };
    const renderTitle = (type) => {
        let cl = '';
        switch (type) {
            case 'lrrx':
                cl = '录入人选';
                break;
            case 'qykh':
                cl = '客户签约';
                break;
            case 'yjje':
                cl = '业绩金额';
                break;
            default:
                cl = '人选列表';
        }
        return cl;
    };

    // 清空
    const handleSearchClear = () => {
        form.resetFields();
        setSearchValues(null);
    };

    // 搜索
    const handleSearch = () => {
        form.validateFields().then((values) => {
            console.log(values);
            setSelectedTags([]);
            setSearchValues({
                year: moment(values.year).format('YYYY'),
                appUserName: values.appUserName.recommenderName,
                appUserId: values.appUserName.recommenderId,
            });
        });
    };

    // 新增kpi
    const handleAddKpi = () => {
        setFormValue(null);
        setVisible(true);
    };

    const onSubmit = () => {
        setVisible(false);
        setCount(count + 1); // 改变count值触发刷新
    };

    const onCancel = () => {
        setVisible(false);
    };

    useEffect(() => {
        userKpiData({
            ...searchValues,
            pageNo: pageNo,
            pageSize: 10,
            appUserId: selectedTags.length > 0 ? selectedTags[0] : searchValues?.appUserId ? searchValues.appUserId : '',
        }).then((res) => {
            setKpiList(
                res.data.length > 0
                    ? res?.data.map((item, index) => {
                        return Object.assign(item, { key: index });
                    })
                    : [],
            );
            setCount(res?.data.length);
        });
    }, [searchValues, count, pageNo, fresh, selectedTags]);
    useEffect(() => {
        teamList().then((res) => {
            console.log(res);
            setTeamTag(res.data);
            console.log(teamTag);
        });
    }, []);
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [tag] : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };
    const expandedRowRender = (record, index, indent, expanded) => {
        console.log(index, indent);
        const data = record.childList;
        return (
            <Table
                showHeader={false}
                columns={[
                    {
                        title: '',
                        dataIndex: 'idx',
                        width: '4%',
                        key: 'id',
                    },
                    ...kp2Columns,
                ]}
                style={{ marginLeft: 0, background: '#ddd' }}
                dataSource={data}
                pagination={false}
            />
        );
    };

    return (
        <PageContainer>
            <ModalForm
                visible={visible}
                onSubmit={onSubmit}
                onCancel={onCancel}
                record={formValue}
            ></ModalForm>

            <div className={styles['search-container']}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className={styles['page-title']}>我的绩效</div>
                    </Col>
                </Row>
                <Divider />
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
                    {
                        <Row gutter={32}>
                            {formList.map((col) => {
                                if (col.render) {
                                    return col.render();
                                }
                                if (col.type === 'input') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label} rules={col.rules}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'inputNumber') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label} rules={col.rules}>
                                                <InputNumber />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'SearchInput') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label} rules={col.rules}>
                                                <SearchInput></SearchInput>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'select') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label} rules={col.rules}>
                                                <Select options={col.options} />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'cascader') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label} rules={col.rules}>
                                                <Cascader options={col.options} />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'datePicker') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label}>
                                                <DatePicker style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'inputRange') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label}>
                                                <Input.Group compact>
                                                    <Input style={{ width: '47%' }}></Input>-{' '}
                                                    <Input style={{ width: '47%' }}></Input>
                                                </Input.Group>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'dateRangPicker') {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label}>
                                                <DatePicker picker="year" format={`YYYY`} />
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                return null;
                            })}
                            <Button type="primary" onClick={handleSearch}>
                                搜索
              </Button>
                        </Row>
                    }
                </Form>

                {teamTag.length > 0 &&
                    teamTag.map((tag) => (
                        <CheckableTag
                            key={tag.userId}
                            checked={selectedTags.indexOf(tag.userId) > -1}
                            onChange={(checked) => handleChange(tag.userId, checked)}
                        >
                            {tag.name}
                        </CheckableTag>
                    ))}
            </div>
            <div className={styles['list-container']}>
                <Table
                    columns={kpiColumns}
                    dataSource={kpiList}
                    pagination={{
                        total: count,
                        pageSize: 10,
                        onChange: (e) => {
                            setPageNo(e);
                        },
                        showTotal: (count) => `共${count}条`,
                    }}
                    pagination={false}
                    expandRowByClick={true}
                    expandable={{
                        expandedRowRender,
                        rowExpandable: (record) => true,
                    }}
                    size="small"
                    bordered
                    scroll={{ x: 800 }}
                />
            </div>
            <div style={{ width: '100%', minHeight: '15px' }} />
            <Modal
                width={620}
                title={renderTitle(modelVisiBle.type)}
                visible={modelVisiBle.visible}
                onOk={() => setModelVisiBle({ ...modelVisiBle, visible: false })}
                onCancel={() => setModelVisiBle({ ...modelVisiBle, visible: false })}
            >
                {talentList && (
                    <Table
                        columns={renderColumn(modelVisiBle.type)}
                        dataSource={talentList}
                        pagination={{
                            total: modalCount,
                            pageSize: 10,
                            onChange: (e) => {
                                setModelVisiBle({ ...modelVisiBle, pageNo: e });
                            },
                            showTotal: (modalCount) => `共${modalCount}条`,
                        }}
                        size="small"
                        bordered
                    />
                )}
            </Modal>
        </PageContainer>
    );
};

export default KpiList;
