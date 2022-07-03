import { useState, useEffect } from 'react';
import {
    Form,
    Row,
    Tag,
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
import { history } from 'umi';
import styles from '../index.less';
import { PageContainer } from '@ant-design/pro-layout';
import ModalForm from '../components/ModalForm';
import { queryKpiList, confirmKpi, refuseKpi } from '@/services/eco';
import { userKpiData, teamList } from '@/services/kpi';
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;
import momemt from 'moment'

const KpiList = () => {
    const [selectedTags, setSelectedTags] = useState([])
    const [form] = Form.useForm();
    const [fresh, setFresh] = useState(false);
    const [visible, setVisible] = useState(false);
    const [formValue, setFormValue] = useState(null);
    const [searchValues, setSearchValues] = useState(null);
    const [kpiList, setKpiList] = useState([]);
    const [count, setCount] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [teamTag, setTeamTag] = useState([]);
    const formList = [
        {
            name: 'rate',
            label: '顾问名称',
            type: 'input',
            span: 8,
        },
        {
            name: "shsj",
            label: "年份",
            type: "dateRangPicker",
            span: 6,
        },
    ];
    const kpiColumns = [
        {
            title: '顾问名称',
            dataIndex: 'userName',
            key: 'userName',
            width: 60,
            ellipsis: true,
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
        },
        {
            title: '推给客户',
            dataIndex: 'tgkh',
            width: 60,

            key: 'tgkh',
            ellipsis: true,
        },
        {
            title: '客户面试',
            dataIndex: 'khms',
            width: 60,

            key: 'khms',
            ellipsis: true,
        },
        {
            title: '确认offer',
            dataIndex: 'cgrz',
            width: 60,

            key: 'cgrz',
            ellipsis: true,
        },
        {
            title: '录入人选',
            dataIndex: 'lrrx',
            width: 60,

            key: 'lrrx',
            ellipsis: true,

        },
        {
            title: '签约客户',
            dataIndex: 'qykh',
            width: 60,

            key: 'qykh',
            ellipsis: true,
        },

        {
            title: '业绩金额',
            dataIndex: 'kpiFee',
            width: 60,

            key: 'kpiFee',
            ellipsis: true,
        },
        {
            title: '考核分数',
            dataIndex: 'score',
            width: 60,

            key: 'score',
            ellipsis: true,
        },

    ];

    // 清空
    const handleSearchClear = () => {
        form.resetFields();
        setSearchValues(null);
    };

    // 搜索
    const handleSearch = () => {
        form.validateFields().then((values) => {
            let payload = Object.assign({}, values);
            if (values.cityCode) {
                if (values.cityCode[1]) {
                    payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
                } else {
                    payload.cityCode = `${values.cityCode[0]}`;
                }
            }
            if (values.customer) {
                payload.customerName = values.customer.customerName;
                delete payload.customer;
            }
            if (values.sqsj) {
                payload.sqsj1 = momemt(values.sqsj[0]).format('YYYY-MM-DD')
                payload.sqsj2 = moment(values.sqsj[1]).format('YYYY-MM-DD')
                delete payload.sqsj;
            }
            if (values.shsj) {
                payload.shsj1 = momemt(values.shsj[0]).format('YYYY-MM-DD')
                payload.shsj2 = momemt(values.shsj[1]).format('YYYY-MM-DD')
                delete payload.shsj;
            }
            setSearchValues(payload);
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
        userKpiData({ ...searchValues, pageNo: pageNo, pageSize: 10, appUserId: selectedTags.length > 0 ? selectedTags[0] : '' }).then((res) => {

            setKpiList(
                res?.data || []
            );
            setCount(res?.data.length)
        });

    }, [searchValues, count, pageNo, fresh, selectedTags]);
    useEffect(() => {
        teamList().then(res => {
            console.log(res)
            setTeamTag(res.data)
            console.log(teamTag)
        })
    }, [])
    const handleChange = (tag, checked) => {
        debugger
        const nextSelectedTags = checked
            ? [tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };
    const expandedRowRender = (record) => {
        console.log(record)
        const data = record.childList;
        return <Table showHeader={false} columns={[{
            title: '',
            dataIndex: 'idx',
            width: '4%',
            key: 'id',
        }, ...kpiColumns]} style={{ marginLeft: 0 }} dataSource={data} pagination={false} />;
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
                                if (col.type === "inputRange") {
                                    return (
                                        <Col span={col.span} key={col.name} >
                                            <Form.Item name={col.name} label={col.label}>
                                                <Input.Group compact>
                                                    <Input style={{ width: '47%' }}></Input>- <Input style={{ width: '47%' }}></Input>
                                                </Input.Group>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'dateRangPicker') {
                                    return (<Col span={col.span} key={col.name}>
                                        <Form.Item name={col.name} label={col.label}>
                                            <DatePicker picker="year" format={`YYYY-MM-DD`} />
                                        </Form.Item>
                                    </Col>)
                                }
                                return null;
                            })}
                        </Row>
                    }
                </Form>

                {teamTag.length > 0 && teamTag.map((tag) => (
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
                <Table columns={kpiColumns} dataSource={kpiList} pagination={{
                    total: count,
                    pageSize: 10,
                    onChange: e => { setPageNo(e) },
                    showTotal: count => `共${count}条`

                }}

                    expandRowByClick={true}
                    expandable={{
                        expandedRowRender,
                    }}
                    size="small"
                    bordered
                    scroll={{ x: 800 }} />
            </div>
            <div style={{ width: '100%', minHeight: '15px' }} />
        </PageContainer>
    );
};

export default KpiList;
