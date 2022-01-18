import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Form,
    Row,
    Col,
    Input,
    InputNumber,
    Button,
    Select,
    DatePicker,
    Cascader,
    Divider,
    Space,
} from "antd";
import CustomerSearch from "../../../components/CustomerSearch";
import { addProject, getProjectId } from "../../../services/project";
import { cityList } from "../../../utils/CityList";
import { industryList } from "../../../utils/Industry";
import { positionList } from "../../../utils/Position";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";

const PCreation = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [industryChildList, setIndustryChildList] = useState([]);
    const formList = [
        {
            name: "customer",
            label: "客户",
            type: "input",
            options: null,
            rules: [
                {
                    required: true,
                    message: "必填",
                },
            ],
            span: 12,
            render: () => {
                return (
                    <Col span={12} key="customer" {...wrapCol}>
                        <Form.Item
                            name="customer"
                            label="客户"
                            rules={[
                                {
                                    required: true,
                                    message: "必填",
                                },
                            ]}
                        >
                            <CustomerSearch></CustomerSearch>
                        </Form.Item>
                    </Col>
                );
            },
        },
        {
            name: "name",
            label: "职位名",
            type: "input",
            options: null,
            rules: [
                {
                    required: true,
                    message: "必填",
                },
            ],
            span: 12,
        },
        {
            name: "cityCode",
            label: "城市",
            type: "cascader",
            options: cityList,
            rules: [
                {
                    required: true,
                    message: "必填",
                },
            ],
            span: 12,
        },
        {
            name: "industry",
            label: "行业",
            type: "select",
            options: industryList,
            span: 12,
            render: () => {
                return (
                    <Col span={12} key="industry" {...wrapCol}>
                        <Form.Item
                            name="industry"
                            label="行业"
                            rules={[
                                {
                                    required: true,
                                    message: "必填",
                                },
                            ]}
                        >
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
            options: industryChildList,
            span: 12,
            render: () => {
                return (
                    <Col span={12} key="industryChild" {...wrapCol}>
                        <Form.Item
                            name="industryChild"
                            label="子行业"
                            rules={[
                                {
                                    required: true,
                                    message: "必填",
                                },
                            ]}
                        >
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
            rules: [
                {
                    required: true,
                    message: "必填",
                },
            ],
            span: 12,
            options: positionList,
        },
        {
            name: "state",
            label: "类型",
            type: "select",
            options: [
                { label: "草稿", value: 0 },
                { label: "发布", value: 1 },
            ],
            rules: [
                {
                    required: true,
                    message: "必填",
                },
            ],
            span: 12,
        },
        // {
        //   name: "customerId",
        //   label: "客户ID",
        //   type: "input",
        //   options: null,
        //   span: 6,
        // },
        {
            name: "details",
            label: "职位描述",
            type: "input",
            options: null,
            span: 12,
        },

        // {
        //   name: "endTime",
        //   label: "项目结束时间",
        //   type: "datePicker",
        //   options: null,
        //   span: 12,
        // },
        {
            name: "level",
            label: "紧急程度",
            type: "select",
            options: [
                { label: "一般", value: 0 },
                { label: "紧急", value: 1 },
                { label: "特急", value: 2 },
            ],
            span: 12,
        },
        // {
        //   name: "projectId",
        //   label: "职位ID",
        //   type: "input",
        //   options: null,
        //   span: 6,
        // },
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
                    label: "初中以上",
                    value: 1,
                },
                {
                    label: "中专以上",
                    value: 2,
                },
                {
                    label: "高中以上",
                    value: 3,
                },
                {
                    label: "大专以上",
                    value: 4,
                },
                {
                    label: "本科以上",
                    value: 5,
                },
                {
                    label: "硕士以上",
                    value: 6,
                },
                {
                    label: "博士以上",
                    value: 7,
                },
            ],
            span: 12,
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
            span: 12,
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
            span: 12,
        },
        {
            name: "recruitNum",
            label: "招聘人数",
            type: "input",
            options: null,
            span: 12,
        },
        {
            name: "reportName",
            label: "汇报对象",
            type: "input",
            options: null,
            span: 12,
        },
        {
            name: "reportTel",
            label: "汇报对象电话",
            type: "input",
            options: null,
            span: 12,
        },
        // {
        //   name: "requireAgeS",
        //   label: "年龄要求 范围开始",
        //   type: "inputNumber",
        //   options: null,
        //   span: 12,
        // },
        // {
        //   name: "requireAgeE",
        //   label: "年龄要求 范围结束",
        //   type: "inputNumber",
        //   options: null,
        //   span: 12,
        // },
        {
            name: "requireAgeE",
            label: "年龄范围",
            type: "range",
            options: null,
            span: 12,
        },
        {
            name: "requireAllTime",
            label: "是否统招",
            type: "select",
            options: [
                { label: "不是", value: 0 },
                { label: "是", value: 1 },
            ],
            span: 12,
        },
        {
            name: "salary",
            label: "年薪",
            type: "inputNumber",
            options: null,
            span: 12,
        },
        {
            name: "startTime",
            label: "项目时间",
            type: "datePickerRange",
            options: null,
            span: 12,
        },
    ];
    const onIndustryChange = (value, data) => {
        // console.log(value, data);
        setIndustryChildList(data.children);
        form.setFieldsValue({ industryChild: data.children[0].value });
    };
    const onSubmit = () => {
        form.validateFields().then((values) => {
            console.clear();
            let payload = Object.assign({}, values);
            if (values.job) {
                payload.job = `${values.job[0]}/${values.job[1]}/${values.job[2]}`;
            }
            if (values.startTime) {
                payload.startTime = values.startTime.format("YYYY-MM-DD");
            }
            if (values.endTime) {
                payload.endTime = values.endTime.format("YYYY-MM-DD");
            }
            if (values.cityCode) {
                if (values.cityCode[1]) {
                    payload.cityCode = `${values.cityCode[0]}/${values.cityCode[1]}`;
                } else {
                    payload.cityCode = `${values.cityCode[0]}`;
                }
            }
            delete payload.customer;
            payload.customerId = values.customer.customerId;
            payload.customerName = values.customer.customerName;
            console.log(payload);
            getProjectId().then((res) => {
                const { data } = res
                addProject({ projectId: data, ...payload }).then((data) => {
                    // console.log(data);
                    history.push("/project/p-list");
                });
            });
        });
    };
    const onReset = () => {
        form.resetFields();
    };
    const wrapCol = {
        xs: 24,
        sm: 12,
        lg: 8,
        xl: 6
    }
    const wrapTimeCol = {
        xs: 24,
        sm: 24,
        lg: 16,
        xl: 12
    }
    return (
        <PageContainer>

            <div className={styles["info-container"]}>
                <Row justify="space-between" align="middle">
                    <Row>
                        <div className={styles["page-title"]}>创建职位</div>
                    </Row>
                    <Col>
                        <Space>
                            <Button onClick={onReset}>清空</Button>
                            <Button type="primary" onClick={onSubmit}>
                                提交
              </Button>
                        </Space>
                    </Col>
                </Row>
                <Divider></Divider>
                <Form
                    form={form}
                    style={{ marginTop: "15px" }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="right"
                    initialValues={{
                        level: 0,
                        quotTime: 0,
                        requireGender: 0,
                        requireEdu: 0,
                    }}
                >
                    <Row gutter={32}>
                        {formList.map((item) => {
                            if (item.render) {
                                return item.render();
                            }
                            if (item.type === "select") {
                                return (
                                    <Col span={item.span} {...wrapCol} key={item.name}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.label}
                                            rules={item.rules}
                                        >
                                            <Select options={item.options}></Select>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "cascader") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.label}
                                            rules={item.rules}
                                        >
                                            <Cascader
                                                options={item.options}
                                                placeholder=""
                                            ></Cascader>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "input") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.label}
                                            rules={item.rules}
                                        >
                                            <Input></Input>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "inputNumber") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.label}
                                            rules={item.rules}
                                        >
                                            <InputNumber style={{ width: "100%" }}></InputNumber>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "datePicker") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.label}
                                            rules={item.rules}
                                        >
                                            <DatePicker style={{ width: "100%" }}></DatePicker>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "range") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapCol}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.label}
                                            rules={item.rules}
                                        >
                                            <Input style={{ width: '47%' }}></Input>-<Input style={{ width: '47%' }}></Input>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.type === "datePickerRange") {
                                return (
                                    <Col span={item.span} key={item.name} {...wrapTimeCol}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.label}
                                            labelCol={{ xs: 2, sm: 4, lg: 4, md: 4 }}
                                            wrapperCol={{ xs: 2, sm: 20, lg: 20, md: 20 }}
                                            rules={item.rules}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <DatePicker style={{ width: "47%" }}></DatePicker>-<DatePicker style={{ width: "47%" }}></DatePicker>
                                            </div>

                                        </Form.Item>
                                    </Col>
                                );
                            }
                            return null;
                        })}
                    </Row>
                </Form>
            </div>
        </PageContainer>
    );
};

export default PCreation;
