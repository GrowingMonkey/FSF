import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Select,
    Table,
    Divider,
    Space,
    DatePicker,
} from "antd";
import { PageContainer } from '@ant-design/pro-layout';
import styles from "./index.less";
import { useRequest, history } from 'umi'
import { sysNotice, publishSys } from "@/services/employ"
import { useState, useEffect } from "react";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const TripList = () => {
    const [form] = Form.useForm();
    const { data, refresh, run } = useRequest(sysNotice);
    const [tripList, setTripList] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTripList(data?.list || [])
        setTotal(data?.count)
    }, [data]);
    const handlerDelete = async (row) => {
        console.log(row)
        //刷新
        let result = await publishSys({ id: row.id });
        console.log(result);
        refresh();
    }
    const formList = [
        {
            name: "title",
            label: "标题",
            type: "input",
            wrapCol: {
                xl: 6,
                md: 12,
                xs: 24
            }
        },

        {
            name: "state",
            label: "状态",
            type: "select",
            options: [
                { label: "全部", value: 0 },
                { label: "已发布", value: 1 },
                { label: "未发布", value: 2 },
            ],
            wrapCol: {
                xl: 6,
                md: 12,
                xs: 24
            }
        },
        {
            name: "type",
            label: "类型",
            type: "select",
            options: [
                { label: "公司大事", value: 0 },
                { label: "大鲨鱼（员工突破", value: 1 },
                { label: "入职周年", value: 1 },
            ],
            wrapCol: {
                xl: 6,
                md: 12,
                xs: 24
            }
        },
    ];
    const tripColumns = [
        {
            title: "行为类型",
            dataIndex: "type",
            ellipsis: true,
            key: "type",
            render: (text, record) => {
                return text == 0 ? '公司大事' : text == 1 ? '大元宝' : text == 2 ? '入职周年' : '大钻石'
            }
        },
        {
            title: "公告时间",
            dataIndex: "publishTime",
            ellipsis: true,
            key: "publishTime",
        },
        {
            title: "提醒内容",
            dataIndex: "content",
            ellipsis: true,
            key: "content",
        },
        {
            title: "创建者",
            dataIndex: "userName",
            ellipsis: true,
            key: "userName",
        },
        {
            title: "状态",
            dataIndex: "state",
            key: "state",
            ellipsis: true,
            render: (text, record) => {
                return text == 0 ? '全部' : text == 1 ? '已发布' : '未发布'
            }
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            ellipsis: true,
            width: 200,
            fixed: 'right',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Button type="primary" size="small" onClick={() => handlerDelete(record)}>发布</Button>
                        <Button type="default" size="small">查看</Button>
                        <Button type="primary" size="small">编辑</Button>
                    </Space>
                );
            },
        },
    ];
    const handleSearch = () => {
        form.validateFields().then(values => {
            console.log(values)
            run(values)
        })
    }
    return (
        <PageContainer>
            <div className={styles["search-container"]}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className={styles["page-title"]}>系统公告</div>
                    </Col>
                    <Col>
                        <Space size={8}>
                            <Button onClick={() => form.resetFields()}>清空</Button>
                            <Button type="primary" onClick={handleSearch}>搜索</Button>
                            <Button type="primary" onClick={() => { history.push(`/employ/publish-add`) }}>添加公告</Button>
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
                                        <Col span={col.span} {...col.wrapCol} key={col.name}>
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
                                if (col.type === "select") {
                                    return (
                                        <Col span={col.span} {...col.wrapCol} key={col.name}>
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
                                if (col.type === "datePicker") {
                                    return (
                                        <Col span={col.span} {...col.wrapCol} key={col.name}>
                                            <Form.Item name={col.name} label={col.label}>
                                                <DatePicker style={{ width: "100%" }}></DatePicker>
                                            </Form.Item>
                                        </Col>
                                    );
                                }
                                return null;
                            })}
                        </Row>
                    }
                </Form>
            </div>
            <div className={styles["list-container"]}>
                <Table
                    columns={tripColumns}
                    dataSource={tripList}
                    pagination={{
                        total: total,
                        pageSize: 10,
                        onChange: e => { run({ pageNo: e }) },
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

export default TripList;
