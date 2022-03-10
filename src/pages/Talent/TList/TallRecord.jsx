import { useState, useEffect } from "react";
import { Col, Row, Table, Pagination, Typography, Button, Space, Modal, Input, Form, Radio, message, Card } from "antd";
import coin from "@/assets/images/coin.png";
import checkin from "@/assets/images/checkin.png";
import interview from "@/assets/images/interview.png";
import position from "@/assets/images/position.png";
import recommand from "@/assets/images/recommand.png";
import { history } from "umi";
import { PageContainer } from "@ant-design/pro-layout";
import { selectCstById, cclfq, addcc, selectCustomerCompany, getCustomerNumber } from "@/services/customer"
const styles = {};
const CustomerDetail = () => {
    const [cclfqForm] = Form.useForm();
    const [detail, setDetail] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [tab, setTab] = useState("");
    // const { state: { record } } = useLocation();
    const [record, setRecord] = useState({})
    const { Paragraph } = Typography;
    let initCardList = [
        {
            unit: "万",
            image: coin,
            name: 'hkje',
            description: "回款金额",
            enDescription: "Refund amount",
        },
        {
            unit: "个",
            image: position,
            name: 'yzzw',
            description: "运作职位",
            enDescription: "Operational position",
        },
        {
            unit: "个",
            image: recommand,
            name: 'tjrs',
            description: "推荐人数",
            enDescription: "Recommended number",
        },
        {
            unit: "人",
            image: checkin,
            name: 'rzrs',
            description: "入职人数",
            enDescription: "Enrollment amount",
        },

        {
            unit: "人",
            image: interview,
            name: 'yyms',
            description: "预约面试",
            enDescription: "Scheduled interviews",
        },
    ];
    const tabList = [

        {
            value: "file",
            label: "文件",
            count: 0,
            disable: false,
            span: 2,
        },

    ];
    useEffect(() => {
        const { location: { query } } = history
        selectCstById({ customerId: query.customerId }).then(res => {
            console.log(res);
            setRecord(res?.data || {});
        })
        cclfq({ customerId: query.customerId }).then(res => {
            console.log(res);
            setDetail(res?.data?.list || []);
        })
        getCustomerNumber({ customerId: query.customerId }).then(res => {
            console.log(res);
            let cardListi = initCardList.map(item => ({ ...item, num: res.data[`${item.name}`] }));
            setCardList(cardListi);
        })
    }, [isModalVisible]);
    const handlerSubmit = () => {
        const { location: { query } } = history
        cclfqForm.validateFields().then((contactValues) => {
            console.log(contactValues)
            addcc({ customerName: query.customerName, customerId: query.customerId, ...contactValues }).then(res => {
                message.info(res?.message);
                setIsModalVisible(false);
                cclfqForm.resetFields()
            })
        })
    }
    const wrapCol = {
        xs: 24,
        sm: 12,
        lg: 5
    }
    return (
        <PageContainer>
            <Card>
                <Space className={styles["info-switcher-bar"]}>
                    <Button
                        type="text"
                        onClick={() => {
                            setTab("");
                        }}
                    >
                        <span>沟通信息</span>
                    </Button>
                    {tabList.map((tabs) => {
                        if (!tabs.disable) {
                            return (
                                <Button
                                    key={tabs.label}
                                    type="text"
                                    onClick={() => {
                                        setTab(tabs.value);
                                    }}
                                    style={{ background: tab == tabs.value }}
                                >
                                    <span>{tabs.label}</span>
                                    {tabs.count > 0 ? (
                                        <span className={styles["color-red"]}>({tabs.count})</span>
                                    ) : (
                                            <span>({tabs.count})</span>
                                        )}
                                </Button>
                            );
                        }
                        return null;
                    })}
                </Space>
                <Table
                    columns={[]}
                    dataSource={[]}
                    pagination={false}
                    size="small"
                />
                <Pagination
                    current={1}
                    onChange={() => { }}
                    total={1}
                ></Pagination>
                <Modal title="添加沟通记录" visible={isModalVisible} onOk={handlerSubmit} onCancel={() => setIsModalVisible(false)}>
                    <Form
                        name="basic"
                        autoComplete="off"
                        form={cclfqForm}
                    >
                        <Form.Item
                            label="沟通类型"
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={1}>面试沟通</Radio>
                                <Radio value={2}>合同沟通</Radio>
                                <Radio value={3}>请款沟通</Radio>
                                <Radio value={0}>其他</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="沟通内容"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </PageContainer >

    );
};

export default CustomerDetail;
