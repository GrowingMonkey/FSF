import { useState, useEffect } from "react";
import { Col, Row, Avatar, Typography, Button, Space, Modal, Input, Form, Radio, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import InfoBasic from "../CList/components/InfoBasic";
import InfoFile from "../CList/components/InfoFile";
import InfoProject from "../CList/components/InfoProject";
import InfoTimeline from "../CList/components/InfoTimeline";
import InfoCandidate from "../CList/components/InfoCandidate";
import coin from "@/assets/images/coin.png";
import checkin from "@/assets/images/checkin.png";
import interview from "@/assets/images/interview.png";
import position from "@/assets/images/position.png";
import recommand from "@/assets/images/recommand.png";
import styles from "../CList/components/CustomerDetail.less";
import { useLocation, history } from "umi";
import { PageContainer } from "@ant-design/pro-layout";
import { selectCstById, cclfq, addcc, selectCustomerCompany, getCustomerNumber } from "@/services/customer"

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
            value: "candidate",
            label: "人选信息",
            count: 0,
            disable: false,
            span: 3,
        },
        {
            value: "position",
            label: "职位",
            count: 0,
            disable: false,
            span: 2,
        },
        {
            value: "contact",
            label: "通话",
            count: 0,
            disable: true,
            span: 2,
        },
        {
            value: "file",
            label: "文件",
            count: 0,
            disable: false,
            span: 2,
        },
        {
            value: "timeline",
            label: "转移",
            count: 0,
            disable: false,
            span: 2,
        },
        {
            value: "withdraw",
            label: "回款",
            count: 0,
            disable: false,
            span: 2,
        },
    ];
    useEffect(() => {
        // console.clear();
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
            <Row gutter={12} >
                {cardList.map((card) => {
                    return (
                        <Col {...wrapCol} key={card.description}>
                            <div className={styles["customer-detail-card"]}>
                                <div className={styles["card-title"]}>{card.num || 0}{card.unit}</div>
                                <div className={styles["card-content"]}>
                                    <img src={card.image} alt="card" width="46" height="46"></img>
                                    <div>
                                        <div className={styles["content-description"]}>
                                            {card.description}
                                        </div>
                                        <div className={"content-description-en"}>
                                            {card.enDescription}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            <Row gutter={16} style={{ marginTop: "15px" }}>
                <Col span={16}>
                    <Space className={styles["info-switcher-bar"]}>
                        <Button
                            type="text"
                            onClick={() => {
                                setTab("");
                            }}
                        >
                            <span>基本信息</span>
                        </Button>
                        {tabList.map((tab) => {
                            if (!tab.disable) {
                                return (
                                    <Button
                                        key={tab.label}
                                        type="text"
                                        onClick={() => {
                                            setTab(tab.value);
                                        }}
                                    >
                                        <span>{tab.label}</span>
                                        {tab.count > 0 ? (
                                            <span className={styles["color-red"]}>({tab.count})</span>
                                        ) : (
                                                <span>({tab.count})</span>
                                            )}
                                    </Button>
                                );
                            }
                            return null;
                        })}
                        <Button
                            type="text"
                            style={{ position: "absolute", top: "8px", right: "20px" }}
                            shape="circle"
                            icon={<CloseOutlined />}
                        ></Button>
                    </Space>
                    <div className={styles["info-content"]}>
                        {tab === "" ? <InfoBasic record={record}></InfoBasic> : null}
                        {tab === "file" ? <InfoFile record={record}></InfoFile> : null}
                        {tab === "position" ? (
                            <InfoProject record={record}></InfoProject>
                        ) : null}
                        {tab === "timeline" ? (
                            <InfoTimeline record={record}></InfoTimeline>
                        ) : null}
                        {tab === "candidate" ? (
                            <InfoCandidate record={record}></InfoCandidate>
                        ) : null}
                    </div>
                </Col>
                <Col span={8}>
                    <div className={styles["revisit-record"]}>
                        <div className={styles["revisit-record-title"]}>沟通记录<Button style={{ float: 'right' }} type="primary" size="small" onClick={() => setIsModalVisible(true)}>添加</Button></div>
                        <div className={styles["record-item"]}>
                            {detail.map(item => {
                                return <>
                                    <Row gutter={16} align="middle" >
                                        <Col span={2}>
                                            <Avatar>U</Avatar>
                                        </Col>
                                        <Col span={14}>
                                            <div className={styles["record-owner"]}>
                                                {item.customerName}-{item.contactName}（{item.userName}）
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div className={styles["record-time"]}>{item.updateTime}</div>
                                        </Col>
                                    </Row>
                                    <Typography className={styles["record-description"]}>
                                        <Paragraph style={{ marginBottom: "0" }}>
                                            {item.content}
                                        </Paragraph>
                                    </Typography>
                                </>
                            })}
                            {/* <Row gutter={16} align="middle" >
                                <Col span={2}>
                                    <Avatar>U</Avatar>
                                </Col>
                                <Col span={14}>
                                    <div className={styles["record-owner"]}>

                                        南京公司-淘严明（Allensss）
                                        {data.cust}
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className={styles["record-time"]}>2021.06.17 10:43</div>
                                </Col>
                            </Row>
                            <Typography className={styles["record-description"]}>
                                <Paragraph style={{ marginBottom: "0" }}>
                                    第三代半导体龙头公司,第三代化合物半导体,宽带隙半导体,电信配件,碳化硅充电器,串口转换器,牵引电源,创新服务器电源,变速电机驱动器,业界优秀品牌,系统稳定,效率高,性能..
                                </Paragraph>
                            </Typography> */}
                        </div>
                    </div>
                </Col>
            </Row>
            <div style={{ width: "100%", minHeight: "15px" }}></div>
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
        </PageContainer >

    );
};

export default CustomerDetail;
