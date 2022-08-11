import { useState, useEffect } from "react";
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
    Tag,
    Pagination,
} from "antd";
import { industryList } from "../../../utils/Industry";
import { myCustomerList } from "@/services/customer";
import LV0 from "../../../assets/images/LV0.png";
import LV1 from "../../../assets/images/LV1.png";
import LV2 from "../../../assets/images/LV2.png";
import LV3 from "../../../assets/images/LV3.png";
import LV4 from "../../../assets/images/LV4.png";
import LV5 from "../../../assets/images/LV5.png";
import VIP0 from "../../../assets/images/VIP0.png";
import VIP1 from "../../../assets/images/VIP1.png";
import CustomerDetail from "./components/CustomerDetail";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import { Link } from "umi";
import CompanySearch from "@/components/CompanySearch";

const CustomerList = () => {
    console.clear()
    const [form] = Form.useForm();
    const [showState, setShowState] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValues, setSearchValues] = useState(null);
    const [listLength, setListLength] = useState(0);
    const [customerList, setCustomerList] = useState([]);
    const [detailVisible, setDetailVisible] = useState(false);
    const [customerRecord, setCustomerRecord] = useState(null);
    const formList = [
        {
            name: "belong",
            label: "客户归属",
            type: "select",
            span: 6,
            options: [
                { label: "所有", value: 0 },
                { label: "我的", value: 1 },
                { label: "我的团队的", value: 2 },
            ],
        },
        {
            name: "certification",
            label: "是否认证",
            type: "select",
            span: 6,
            options: [
                { label: "否", value: 0 },
                { label: "是", value: 1 },
            ],
        },
        {
            name: "comId",
            label: "归属公司",
            type: "CompanySearch",
            span: 6,
        },
        {
            name: "customerSize",
            label: "公司规模",
            type: "select",
            span: 6,
            options: [
                {
                    label: " 0-15人",
                    value: 0,
                },
                {
                    label: "15-50人",
                    value: 1,
                },
                {
                    label: "50-100人",
                    value: 2,
                },
                {
                    label: "100-500人",
                    value: 3,
                },
                {
                    label: "500-1000人",
                    value: 4,
                },
                {
                    label: "1000-10000人",
                    value: 5,
                },
                {
                    label: "10000人以上",
                    value: 6,
                },
            ],
        },
        {
            name: "industryType",
            label: "所属行业",
            type: "select",
            span: 6,
            options: industryList,
        },
        {
            name: "level",
            label: "客户等级",
            type: "select",
            span: 6,
            options: [
                {
                    label: "普通",
                    value: "普通",
                },
                {
                    label: "VIP1",
                    value: "VIP1",
                },
                {
                    label: "VIP2",
                    value: "VIP2",
                },
                {
                    label: "VIP3",
                    value: "VIP3",
                },
                {
                    label: "VIP4",
                    value: "VIP4",
                },
                {
                    label: "VIP5",
                    value: "VIP5",
                },
            ],
        },
        {
            name: "name",
            label: "客户名",
            type: "input",
            span: 6,
        },
        // {
        //   name: "signPercentLess",
        //   label: "签约比例最小值",
        //   type: "inputNumber",
        //   span: 6,
        // },
        {
            name: "signPercentMore",
            label: "签约比例",
            type: "inputNumberRange",
            span: 6,
        },
        {
            name: "sourceType",
            label: "客户来源",
            type: "select",
            span: 6,
            options: [
                {
                    label: "公共池",
                    value: 0,
                },
                {
                    label: "广告呼入",
                    value: 1,
                },
                {
                    label: "主动BD",
                    value: 2,
                },
                {
                    label: "电销开发",
                    value: 3,
                },
            ],
        },
        {
            name: "state",
            label: "客户状态",
            type: "select",
            span: 6,
            options: [
                {
                    label: "潜在客户",
                    value: 0,
                },
                {
                    label: "签约运作",
                    value: 1,
                },
                {
                    label: "签约暂停",
                    value: 2,
                },
                {
                    label: "签约终止",
                    value: 3,
                },
            ],
        },
        {
            name: "vip",
            label: "是否大客户",
            type: "select",
            span: 6,
            options: [
                { label: "否", value: 0 },
                { label: "是", value: 1 },
            ],
        },
    ];
    const customerColumns = [
        {
            title: "来源",
            dataIndex: "sourceType",
            key: "sourceType",
            width: 70,
            ellipsis: true,
            render: (text) => {
                return <span>{sourceTypeOptions[text].label}</span>;
            },
        },
        {
            title: "客户名称",
            dataIndex: "name",
            ellipsis: true,
            key: "name",
            render: (text, record) => {
                return (
                    <Space align="center">
                        {record.vip ? (
                            <img src={VIP1} width="12" height="12" alt="VIP1"></img>
                        ) : (
                                <img src={VIP0} width="12" height="12" alt="VIP0"></img>
                            )}
                        <img
                            src={levelIcons[record.level]}
                            alt="LV0"
                            width="33"
                            height="17"
                        ></img>
                        <div
                            style={{
                                paddingTop: "2px",
                            }}
                        >
                            {text}
                        </div>
                    </Space>
                );
            },
        },
        {
            title: "认证",
            dataIndex: "certification",
            key: "certification",
            width: 70,
            ellipsis: true,
            render: (text) => {
                return text ? (
                    <Tag color="green">已认证</Tag>
                ) : (
                        <Tag color="red">未认证</Tag>
                    );
            },
        },
        {
            title: "招聘人数",
            ellipsis: true,
            width: 80,
            dataIndex: "jobBeansNum",
            key: "jobBeansNum",
            render: (text) => {
                return text == 0 ? '不限' : text
            }
        },
        {
            title: "执行团队",
            dataIndex: "comId",
            ellipsis: true,
            width: 80,
            key: "comId",
        },
        {
            title: "归属公司",
            dataIndex: "comName",
            width: 80,
            ellipsis: true,
            key: "comName",
        },
        {
            title: "客户状态",
            dataIndex: "state",
            width: 80,
            ellipsis: true,
            key: "state",
            render: (text) => {
                return <span>{stateOptions[text].label}</span>;
            },
        },
        {
            title: "最后沟通",
            dataIndex: "updateTime",
            ellipsis: true,
            width: 200,
            key: "updateTime",
        },
        {
            title: "记录",
            dataIndex: "customerCommunicateBeansNum",
            ellipsis: true,
            width: 80,
            key: "customerCommunicateBeansNum",
            render: (text) => {
                return (
                    <div
                        style={{
                            width: "28px",
                            height: "28px",
                            lineHeight: "28px",
                            borderRadius: "50%",
                            textAlign: "center",
                            backgroundColor: "#1BBC9B",
                            color: "#ffffff",
                        }}
                    >
                        {text}
                    </div>
                );
            },
        },
        {
            title: "操作",
            key: "action",
            width: 200,
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => {
                  setCustomerRecord(record);
                  setDetailVisible(true);
                }}
              >
                查看
              </Button> */}
                    <Link target="_blank" to={{
                        pathname: '/customer/detail',
                        search: '?id=' + record.id + '&customerId=' + record.customerId + '&customerName=' + record.name,
                        state: { record: record },
                    }}>查看</Link>
                    <Button type="link" style={{ padding: 0 }}>
                        转移
              </Button>
                </Space>
            ),
        },
    ];
    const levelIcons = [LV0, LV1, LV2, LV3, LV4, LV5];
    const sourceTypeOptions = [
        {
            label: "公共池",
            value: 0,
        },
        {
            label: "广告呼入",
            value: 1,
        },
        {
            label: "主动BD",
            value: 2,
        },
        {
            label: "电销开发",
            value: 3,
        },
    ];
    const stateOptions = [
        {
            label: "潜在客户",
            value: 0,
        },
        {
            label: "签约运作",
            value: 1,
        },
        {
            label: "签约暂停",
            value: 2,
        },
        {
            label: "签约终止",
            value: 3,
        },
    ];
    const onSearch = () => {
        form.validateFields().then((values) => {
            // // console.log(values);
            setSearchValues({ ...values, comId: values?.comId?.recommenderUserId });
            setCurrentPage(1);
            // cstList({ ...values, pageNo: currentPage, pageSize: 10 }).then((data) => {
            //   // console.log(data);
            //   setCustomerList(
            //     data.list.map((item) => {
            //       return Object.assign(item, {
            //         key: item.customerId,
            //       });
            //     })
            //   );
            //   setListLength(data.count);
            // });
        });
    };
    const onClear = () => {
        form.resetFields();
        setSearchValues(null);
        setCurrentPage(1);
        // cstList({ pageNo: currentPage, pageSize: 10 }).then((data) => {
        //   // console.log(data);
        //   setCustomerList(
        //     data.list.map((item) => {
        //       return Object.assign(item, {
        //         key: item.customerId,
        //       });
        //     })
        //   );
        //   setListLength(data.count);
        // });
    };
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        // form.validateFields().then((values) => {
        //   // console.log(values);
        //   cstList({ ...values, pageNo: currentPage, pageSize: 10 }).then((data) => {
        //     // console.log(data);
        //     setCustomerList(
        //       data.list.map((item) => {
        //         return Object.assign(item, {
        //           key: item.customerId,
        //         });
        //       })
        //     );
        //     setListLength(data.count);
        //   });
        // });
        myCustomerList({ pageNo: currentPage, pageSize: 10, ...searchValues }).then(res => {
            const { data } = res;
            console.log(res);
            setCustomerList(
                data?.list.map((item) => {
                    return Object.assign(item, {
                        key: item.customerId,
                    });
                })
            );
            setListLength(data.count);
        }
        );
    }, [currentPage, searchValues]);
    const wrapCol = {
        xs: 24,
        sm: 12,
        lg: 6,
    }
    return (
        <PageContainer>
            <div className={styles["search-container"]} style={{ maxHeight: !showState ? '200px' : 'none', overflow: 'hidden' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className={styles["page-title"]}>条件查询</div>
                    </Col>
                    <Col>
                        {/* <Space size={8}>
                            <Button type="primary" onClick={() => setShowState(!showState)}>{showState ? '收起' : '展开'}</Button>
                            <Button onClick={onClear}>清空</Button>
                            <Button type="primary" onClick={onSearch}>
                                搜索
                  </Button>
                        </Space> */}
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
                                        <Col span={col.span} {...wrapCol} key={col.name}>
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
                                        <Col span={col.span} {...wrapCol} key={col.name}>
                                            <Form.Item
                                                name={col.name}
                                                label={col.label}
                                                rules={col.rules}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                ></InputNumber>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === "inputNumberRange") {
                                    return (
                                        <Col span={col.span} {...wrapCol} key={col.name}>
                                            <Form.Item
                                                name={col.name}
                                                label={col.label}
                                                rules={col.rules}
                                            >

                                                <InputNumber
                                                    style={{ width: "47%" }}
                                                ></InputNumber>-<InputNumber
                                                    style={{ width: "47%" }}
                                                ></InputNumber>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === "select") {
                                    return (
                                        <Col span={col.span}{...wrapCol} key={col.name}>
                                            <Form.Item
                                                name={col.name}
                                                label={col.label}
                                                rules={col.rules}
                                            >
                                                <Select options={col.options}></Select>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === "cascader") {
                                    return (
                                        <Col span={col.span} {...wrapCol} key={col.name}>
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
                                        <Col span={col.span} {...wrapCol} key={col.name}>
                                            <Form.Item name={col.name} label={col.label}>
                                                <DatePicker style={{ width: "100%" }}></DatePicker>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                if (col.type === 'CompanySearch') {
                                    return (<Col span={col.span} {...wrapCol} key={col.name}>
                                        <Form.Item name={col.name} label={col.label}>
                                            <CompanySearch />
                                        </Form.Item>
                                    </Col>);
                                }
                                return null;
                            })}
                            <Col span={6} {...wrapCol} key={'action'}>
                                <Form.Item label=" " colon={false}>
                                    <Space size="large">
                                        <Button onClick={onClear}>清空</Button>
                                        <Button type="primary" onClick={onSearch}>搜索</Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                </Form>
            </div>
            <div className={styles["list-container"]}>
                <Table
                    columns={customerColumns}
                    dataSource={customerList}
                    pagination={false}
                    size="small"
                    scroll={{ x: 550 }}
                    bordered
                />
                <Row justify="end" style={{ marginTop: "15px" }}>
                    <Col>
                        <Pagination
                            current={currentPage}
                            onChange={onPageChange}
                            total={listLength}
                            showTotal={listLength => `共${listLength}条`}

                        ></Pagination>
                    </Col>
                </Row>
            </div>
        </PageContainer>
    );
};

export default CustomerList;
