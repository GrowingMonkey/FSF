import { useState, useEffect } from "react";
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Select,
    Table,
    Cascader,
    Divider,
    Space,
} from "antd";
import { info } from "china-region";
import CustomerSearch from "../../../components/CustomerSearch";
import {
    hzJobList,
    pauseProject,
    runProject,
    finishProject,
    closeProject,
} from "../../../services/project";
import { history } from 'umi';
import { cityList } from "../../../utils/CityList";
import { industryList } from "../../../utils/Industry";
import { positionList } from "../../../utils/Position";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const PList = () => {
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [listLength, setListLength] = useState(0);
    const [total, setTotal] = useState(0);
    const [listData, setListData] = useState([]);
    const [searchValues, setSearchValues] = useState(null);
    const [industryChildList, setIndustryChildList] = useState([]);
    const stateTypes = ["草稿", "发布"];
    const listColumns = [
        {
            title: "状态",
            dataIndex: "state",
            key: "state",
            width: "10%",
            ellipsis: true,
            render: (text, record) => {
                return (
                    <Select
                        value={record.state}
                        options={stateChaneTypes[text]}
                        style={{ width: "100%" }}
                        onChange={(value) => {
                            handleStateChange(value, record.projectId);
                        }}
                    ></Select>
                );
            },
        },
        {
            title: "客户",
            dataIndex: "customerName",
            key: "customerName",
            ellipsis: true,
        },
        {
            title: "职位名称",
            dataIndex: "name",
            ellipsis: true,
            key: "name",
        },
        {
            title: "工作地点",
            dataIndex: "cityCode",
            ellipsis: true,
            width: 200,
            key: "cityCode",
            render: (text) => {
                let cityCode = text.split("/");
                // console.log(cityCode);
                let city = "";
                if (cityCode.length === 2) {
                    city = cityCode[1];
                }
                if (cityCode.length === 1) {
                    city = cityCode[0];
                }
                return <span>{info(city)?.name || '不限'}</span>;
            },
        },

        // {
        //   title: "执行团队",
        //   dataIndex: "k6",
        //   key: "k6",
        // },
        // {
        //   title: "归属公司",
        //   dataIndex: "k7",
        //   key: "k7",
        // },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            ellipsis: true,
            width: 120,
            key: "updateTime",
            render: (text) => {
                if (text) {
                    return <span>{text.split(" ")[0]}</span>;
                }
                return null;
            },
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <Space size={16}>
                    <Button type="link" style={{ padding: 0 }} onClick={() => history.push(
                        `/project/p-detail/detail?projectId=${record.projectId}&customerId=${record.customerId}&id=${record.id}`,
                    )}>
                        查看详情
              </Button>
                </Space>
            ),
            width: 100,
        },
        // {
        //   title: "活跃",
        //   dataIndex: "k9",
        //   key: "k9",
        // },
    ];
    const formList = [
        {
            name: "cityCode",
            label: "城市",
            type: "cascader",
            options: cityList,
            span: 6,
        },
        {
            name: "customerName",
            label: "客户名",
            type: "input",
            span: 6,
            // render: () => {
            //     return (
            //         <Col span={6} key="customer" {...wrapCol}>
            //             <Form.Item name="customer" label="客户">
            //                 <CustomerSearch></CustomerSearch>
            //             </Form.Item>
            //         </Col>
            //     );
            // },
        },
        {
            name: "industry",
            label: "行业",
            type: "select",
            span: 6,
            render: () => {
                return (
                    <Col span={6} key="industry" {...wrapCol}>
                        <Form.Item name="industry" label="行业">
                            <Select
                                options={industryList}
                                onChange={onIndustryChange}
                            ></Select>
                        </Form.Item>
                    </Col>
                );
            },
        },
        {
            name: "industryChild",
            label: "子行业",
            type: "select",
            span: 6,
            render: () => {
                return (
                    <Col span={6} key="industryChild" {...wrapCol}>
                        <Form.Item name="industryChild" label="子行业">
                            <Select options={industryChildList}></Select>
                        </Form.Item>
                    </Col>
                );
            },
        },
        {
            name: "job",
            label: "岗位",
            type: "cascader",
            span: 6,
            options: positionList,
        },
        {
            name: "level",
            label: "紧急程度",
            type: "select",
            options: [
                { label: "一般", value: 0 },
                { label: "紧急", value: 1 },
                { label: "特急", value: 2 },
            ],
            span: 6,
        },
        {
            name: "name",
            label: "职位名",
            type: "input",
            span: 6,
        },
        {
            name: "quotTime",
            label: "所保用期限",
            type: "select",
            options: [
                { label: "无期限", value: 0 },
                { label: "一个月", value: 1 },
                { label: "二个月", value: 2 },
                { label: "三个月", value: 3 },
                { label: "四个月", value: 4 },
                { label: "五个月", value: 5 },
                { label: "六个月", value: 6 },
                { label: "七个月", value: 7 },
                { label: "八个月", value: 8 },
                { label: "九个月", value: 9 },
                { label: "十个月", value: 10 },
                { label: "十一个月", value: 11 },
                { label: "十二个月", value: 12 },
            ],
            span: 6,
        },
        // {
        //   name: "requireAgeS",
        //   label: "年龄要求, 不小于",
        //   type: "input",
        //   span: 6,
        // },
        // {
        //   name: "requireAgeE",
        //   label: "年龄要求, 不大于",
        //   type: "input",
        //   span: 6,
        // },
        {
            name: "requireAgeE",
            label: "年龄",
            type: "inputRange",
            span: 6,
        },
        {
            name: "requireAllTime",
            label: "是否统招",
            type: "select",
            options: [
                { label: "不是", value: 0 },
                { label: "是", value: 1 },
            ],
            span: 6,
        },
        {
            name: "requireEdu",
            label: "学历要求",
            type: "select",
            options: [
                {
                    label: "不限",
                    value: 0,
                },
                {
                    label: "初中及以上",
                    value: 1,
                },
                {
                    label: "中专及以上",
                    value: 2,
                },
                {
                    label: "高中及以上",
                    value: 3,
                },
                {
                    label: "大专及以上",
                    value: 4,
                },
                {
                    label: "本科及以上",
                    value: 5,
                },
                {
                    label: "硕士及以上",
                    value: 6,
                },
                {
                    label: "博士及以上",
                    value: 7,
                },
            ],
            span: 6,
        },
        {
            name: "requireGender",
            label: "性别要求",
            type: "select",
            options: [
                { label: "不限", value: 0 },
                { label: "男", value: 1 },
                { label: "女", value: 2 },
            ],
            span: 6,
        },
        {
            name: "salary",
            label: "年薪",
            type: "input",
            span: 6,
        },
    ];
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
                label: "发布",
                value: 1,
                disabled: true,
            },
            {
                label: "结束",
                value: 2,
            },
            {
                label: "暂停",
                value: 3,
            },
            {
                label: "关闭",
                value: 4,
            },
        ],
        2: [
            {
                label: "结束",
                value: 2,
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
        4: [
            {
                label: "关闭",
                value: 4,
                disabled: true,
            },
        ]
    };
    const handleStateChange = (value, projectId) => {

        console.log(value, projectId);
        if (value === 1) {
            runProject({ projectId: projectId }).then((data) => {
                console.log(data);
                hzJobList({
                    pageNo: currentPage,
                    pageSize: 10,
                    ...searchValues,
                }).then((data) => {
                    console.log(data);
                    setListData(
                        data.list.map((item) => {
                            return Object.assign(item, { key: item.id });
                        })
                    );
                });
            });
        }
        if (value === 2) {
            finishProject({ projectId: projectId }).then(() => {
                hzJobList({
                    pageNo: currentPage,
                    pageSize: 10,
                    ...searchValues,
                }).then((res) => {
                    const { data } = res;
                    setListData(
                        data.list.map((item) => {
                            return Object.assign(item, { key: item.id });
                        })
                    );
                });
            });
        }
        if (value === 3) {
            pauseProject({ projectId: projectId }).then(() => {
                hzJobList({
                    pageNo: currentPage,
                    pageSize: 10,
                    ...searchValues,
                }).then((res) => {
                    const { data } = res;
                    setListData(
                        data.list.map((item) => {
                            return Object.assign(item, { key: item.id });
                        })
                    );
                });
            });
        }
        if (value === 4) {
            closeProject({ projectId: projectId }).then(() => {
                hzJobList({
                    pageNo: currentPage,
                    pageSize: 10,
                    ...searchValues,
                }).then((res) => {
                    const { data } = res;
                    setListData(
                        data.list.map((item) => {
                            return Object.assign(item, { key: item.id });
                        })
                    );
                });
            });
        }
    };
    const onIndustryChange = (value, data) => {
        setIndustryChildList(data.children);
        form.setFieldsValue({ industryChild: data.children[0].value });
    };
    const handleSearchConfirm = () => {
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

            console.log(payload);
            setSearchValues(payload);
            setCurrentPage(1);
        });
    };
    const handleSearchClear = () => {
        form.resetFields();
        setSearchValues(null);
        setCurrentPage(1);
    };
    const onPageChange = (value) => {
        setCurrentPage(value);
    };
    useEffect(() => {
        hzJobList({ pageNo: currentPage, pageSize: 10, ...searchValues }).then(
            (res) => {
                const { data } = res;
                setListData(
                    data.list.map((item) => {
                        return Object.assign(item, { key: item.id });
                    })
                );
                setTotal(data?.count || 0)
            }
        );
    }, [currentPage, searchValues]);
    const wrapCol = {
        xs: 24,
        sm: 12,
        lg: 8,
        xl: 6
    }
    return (
        <PageContainer>
            <div className={styles["search-container"]}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className={styles["page-title"]}>条件筛选</div>
                    </Col>
                    <Col>
                        {/* <Space>
                            <Button onClick={handleSearchClear}>清空</Button>
                            <Button type="primary" onClick={handleSearchConfirm}>
                                搜索
              </Button>
                        </Space> */}
                    </Col>
                </Row>
                <Divider></Divider>
                <Form
                    form={form}
                    style={{ marginTop: "15px" }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                >
                    <Row gutter={32}>
                        {formList.map((item) => {
                            if (item.render) {
                                return item.render();
                            }
                            if (item.type === "select") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item name={item.name} label={item.label}>
                                            <Select options={item.options}></Select>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "cascader") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item name={item.name} label={item.label}>
                                            <Cascader options={item.options}></Cascader>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "input") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item name={item.name} label={item.label}>
                                            <Input></Input>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "inputRange") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item name={item.name} label={item.label}>
                                            <Input style={{ width: '47%' }}></Input>-<Input style={{ width: '47%' }}></Input>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            return null;
                        })}
                        <Col span={6} {...wrapCol} key={'action1'}></Col>
                        <Col span={6} {...wrapCol} key={'action2'}></Col>
                        <Col span={6} {...wrapCol} key={'action'}>
                            <Form.Item label=" " colon={false}>
                                <Space size="large">
                                    <Button onClick={handleSearchClear}>清空</Button>
                                    <Button type="primary" onClick={handleSearchConfirm}>
                                        搜索
                  </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className={styles["list-container"]}>
                <Table
                    columns={listColumns}
                    dataSource={listData}
                    pagination={false}
                    size="small"
                    scroll={{ x: 550 }}
                    bordered
                    pagination={{
                        total: total,
                        pageSize: 10,
                        onChange: e => { setCurrentPage(e) },
                        showTotal: (total) => `共${total}条`
                    }}
                />
            </div>
            <div style={{ width: "100%", minHeight: "15px" }}></div>
        </PageContainer>
    );
};

export default PList;
