import {
    Form,
    Row,
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
} from "antd";
import moment from "moment";
import styles from "./index.less";
import { useRequest, history } from 'umi'
import { PageContainer } from "@ant-design/pro-layout";
import { tcaList } from '@/services/admin'
import { sysNotice, feeRank, recommendRank } from "@/services/kpi";

import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
const SignRank = () => {
    const { data, run: signRun } = useRequest(recommendRank)
    const [rankList, setRankList] = useState([])
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setRankList(data?.list || []);
        setTotal(data?.count)
    }, [data]);
    const [form] = Form.useForm();
    const { data: areaList, run, refresh } = useRequest((params) => {
        return tcaList({ ...params, level: 0, count: 100 })
    });
    const signColumns = [
        {
            title: '',
            dataIndex: 'stateName',
            key: 'stateName',
            ellipsis: true,
            width: 75,
            render: text => <span style={{ color: 'red' }}>{text}</span>,
        },
        {
            title: '所在公司',
            dataIndex: 'comName',
            key: 'comName',
            ellipsis: true,
        }, {
            title: '推荐人',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
        },
        {
            title: '人选名称',
            dataIndex: 'talentName',
            key: 'talentName',
            render: (text, record) => {
                return <span style={{ color: 'blue' }} onClick={() => history.push(`/talent/detail?talentId=${record.talentId}`)}> {text}</span>
            },
            ellipsis: true,
        },
        {
            title: '人选职位',
            dataIndex: 'job',
            key: 'job',
            ellipsis: true,
            render: (text, record) => {
                return <span style={{ color: 'blue' }} onClick={() => history.push(`/project/p-detail/detail?projectId=${record.projectId}&customerId=${record.customerId}&id=573`)}> {text}</span>
            },
        },
        {
            title: '录入时间',
            dataIndex: 'offerDate ',
            key: 'offerDate ',
            ellipsis: true,
        },
        {
            title: '人选年薪',
            dataIndex: 'salary',
            key: 'salary',
            render: text => <span style={{ color: 'red' }}>{text || 0}万</span>,
            ellipsis: true,
        },
    ]
    const formList = [
        {
            name: "areaName",
            label: "排行区域",
            type: "select",
            span: 8,
            options: areaList?.list
        },

        {
            name: "creatTime",
            label: "录入时间",
            type: "dateRangPicker",
            span: 8,
        },
        {
            name: "offerDate",
            label: "offer时间",
            type: "dateRangPicker",
            span: 8,
        },
    ];
    console.log(rankList);
    const handleSearch = () => {
        form.validateFields().then(values => {
            console.log(values)
            signRun({
                areaName: values.areaId,
                startTime: values.creatTime ? moment(values.creatTime[0]).format("YYYY/MM/DD") : '',
                endTime: values.creatTime ? moment(values.creatTime[1]).format("YYYY/MM/DD") : '',
                offerDate1: values.offerDate ? moment(values.offerDate[0]).format("YYYY/MM/DD") : '',
                offerDate2: values.offerDate ? moment(values.offerDate[1]).format("YYYY/MM/DD") : '',

            })
        })
    }
    const handleInpputSearch = (e) => {
        run({ name: e })
    }
    const handleReset = () => {
        console.log(form);
        form.resetFields()
    }
    return (
        <PageContainer>
            <div className={styles["search-container"]}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className={styles["page-title"]}>实时推荐排行</div>
                    </Col>
                    <Col>
                        <Space size={8}>
                            <Button onClick={handleReset}>清空</Button>
                            <Button type="primary" onClick={handleSearch}>搜索</Button>
                        </Space>
                    </Col>
                </Row>
                <Divider></Divider>
                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                >
                    {
                        <Row gutter={32}>
                            {formList.map((col) => {
                                if (col.render) {
                                    return col.render();
                                }
                                if (col.type === "input") {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item
                                                name={col.name}
                                                label={col.label}
                                                rules={col.rules}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === "inputNumber") {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item
                                                name={col.name}
                                                label={col.label}
                                                rules={col.rules}
                                            >
                                                <InputNumber></InputNumber>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === "select") {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item
                                                name={col.name}
                                                label={col.label}
                                                rules={col.rules}
                                            >
                                                <Select showSearch onSearch={handleInpputSearch}>
                                                    {
                                                        areaList && areaList?.list.map((item) => {
                                                            return (<Option value={item.id}>{item.name}</Option>)
                                                        })

                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === "cascader") {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item
                                                name={col.name}
                                                label={col.label}
                                                rules={col.rules}
                                            >
                                                <Cascader options={col.options}></Cascader>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === "datePicker") {
                                    return (
                                        <Col span={col.span} key={col.name}>
                                            <Form.Item name={col.name} label={col.label}>
                                                <DatePicker style={{ width: "100%" }}></DatePicker>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'dateRangPicker') {
                                    return (<Col span={col.span} key={col.name}>
                                        <Form.Item name={col.name} label={col.label}>
                                            <RangePicker format={`YYYY-MM-DD`} />
                                        </Form.Item>
                                    </Col>)
                                }
                                if (col.type === 'date') {
                                    return (<Col span={col.span} key={col.name}>
                                        <Form.Item name={col.name} label={col.label}>
                                            <DatePicker style={{ width: "100%" }} format={`YYYY-MM-DD`} />
                                        </Form.Item>
                                    </Col>)
                                }
                                return null;
                            })}
                        </Row>
                    }
                </Form>
            </div>
            <div className={styles["list-container"]}>
                <Table
                    columns={signColumns}
                    dataSource={rankList}
                    pagination={{
                        total: total,
                        pageSize: 10,
                        onChange: e => { signRun({ pageNo: e }) },
                        showTotal: total => `共${total}条`

                    }}
                    size="small"
                    bordered
                    scroll={{ x: 900 }}
                />
            </div>
            <div style={{ width: "100%", minHeight: "15px" }}></div>
        </PageContainer>
    );
};

export default SignRank;
