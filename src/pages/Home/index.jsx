import { useEffect, useState } from "react";

import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Card, List, Table, Typography, Button, Modal, Collapse } from "antd";
import { selectWorkFlow } from "../../services/home";
import InfoCard from "./components/InfoCard";
import DataCard from "./components/DataCard";
import RankTabCard from "./components/RankTabCard";
import RankListCard from "./components/RankListCard";
import styles from "./index.less";
import { sysNotice, feeRank, recommendRank } from "@/services/home";
import { history } from 'umi';
const Home = () => {
    const [activeTab, setActiveTab] = useState(2);
    const [dataState, setDataState] = useState(null);
    const [noticeData, setNoticeData] = useState([]);
    const [feeRankData, setFeeRankData] = useState([]);
    const [recommendRankData, setRecommendRankData] = useState([]);
    const [NoticeVisible, setNoticeVisible] = useState(false);
    const [NoticeContent, setNoticeContent] = useState({})
    const [Ic, setIc] = useState(0);
    useEffect(() => {
        selectWorkFlow().then((res) => {
            const { data } = res;
            setDataState(data)
        });
        sysNotice().then(res => {
            setNoticeData(res?.data?.list || []);
        });
        feeRank().then(res => {
            setFeeRankData(res?.data?.list || []);
        });
        recommendRank().then(res => {
            setRecommendRankData(res?.data?.list || []);
        });
    }, []);
    const feeRankColumns = [
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
            ellipsis: true,
        },
        {
            title: '人选职位',
            dataIndex: 'job',
            key: 'job',
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
    const recommendRankColums = [
        {
            title: '所在公司',
            dataIndex: 'comName',
            key: 'comName',
            ellipsis: true,
        }, {
            title: '服务顾问',
            dataIndex: 'userName',
            key: 'userName',
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
            dataIndex: 'fee',
            key: 'fee',
            ellipsis: true,
            render: text => <span style={{ color: 'red' }}>{text || 0}元</span>,
        },
        {
            title: '回款时间',
            dataIndex: 'time',
            key: 'time',
            ellipsis: true,
        },
    ]
    const wrapLeftCol = {
        xs: 24,
        md: 8,
        lg: 6
    }
    const wrapRightCol = {
        xs: 24,
        md: 16,
        lg: 18
    }
    const warpBottomCol = {
        left: {
            xs: 24,
            md: 4,
            lg: 4
        },
        middle: {
            xs: 24,
            md: 8,
            lg: 8
        },
        right: {
            xs: 24,
            md: 12,
            lg: 12
        },
    }
    const formatNotice = (item) => {
        let str = '';
        switch (+(item.type)) {
            case 0:
                str = '公司大事';
                break;
            case 1:
                str = '大元宝';
                break;
            case 2:
                str = '入职周年';
                break;
            case 3:
                str = '大钻石';
                break;
        }
        return str;
    }
    return (
        <PageContainer>
            <Row gutter={24} style={{ height: "100%", display: 'flex' }} wrap={true}>
                <Col {...wrapLeftCol}>
                    <div className={styles["info-card"]}>
                        <InfoCard></InfoCard>
                    </div>
                </Col>
                <Col {...wrapRightCol}>
                    <div className={styles["data-card"]}>
                        <DataCard dataState={dataState}></DataCard>
                    </div>
                </Col>
            </Row>
            <div className={styles["bottom-container"]}>
                <Row gutter={16} style={{ height: "100%" }}>
                    <Col span={12}>
                        <div className={styles["rank-data-card"]}>
                            <Card title="实时推荐榜" extra={<Button type="link" onClick={() => history.push(`/kpi/sign-rank`)}>查看更多</Button>}>

                                <Table size="small" dataSource={recommendRankData} bordered columns={feeRankColumns} pagination={false} scroll={{ x: 550, }}></Table>
                            </Card>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={styles["rank-data-card"]}>
                            <Card title="实时回款榜" extra={<Button type="link" onClick={() => history.push(`/kpi/pay-rank`)}>查看更多</Button>}>
                                <Table size="small" dataSource={feeRankData} bordered columns={recommendRankColums} pagination={false} scroll={{ x: 500, }}></Table>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* </div> */}
            <div className={styles["bottom-container"]}>
                <Row style={{ height: "100%" }} gutter={16}>
                    <Col {...warpBottomCol.left}>
                        <div className={styles["rank-tab-card"]}>
                            <RankTabCard
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            ></RankTabCard>
                        </div>
                    </Col>
                    <Col {...warpBottomCol.middle}>
                        <div className={styles["rank-data-card"]}>
                            <RankListCard activeTab={activeTab}></RankListCard>
                        </div>
                    </Col>
                    <Col {...warpBottomCol.right}>
                        <div className={styles["data-tracker-card"]}>
                            <Card title={'新闻公告'} extra={<Button type="link" onClick={() => history.push(`/employ/publish-list`)}>查看更多</Button>}>
                                <List
                                    bordered
                                    size="small"
                                    dataSource={noticeData}
                                    renderItem={item => (
                                        <List.Item data={Ic}
                                            onClick={() => {
                                                //         noticeData.map((itemss, index) => {
                                                //             if (itemss.id == item.id) {
                                                //                 noticeData[index] = { ...item, show: item.show ? false : true }
                                                //             }
                                                //         })
                                                //         setNoticeData([].concat(noticeData));
                                                //         console.log(noticeData)
                                                setNoticeContent(item);
                                                setNoticeVisible(true)
                                            }}
                                        >
                                            <Typography.Text mark style={{ width: '72px', display: 'inline-block' }}>[{formatNotice(item)}]</Typography.Text> <Typography.Text style={{ width: "44%", display: 'inline-flex', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold' }}>{item.title}</Typography.Text><Typography.Text style={{ display: "inline-block", paddingRight: '5px', width: '70px', float: 'right' }}>{item.userName}</Typography.Text><Typography.Text style={{ width: '85px', display: 'inline-block', float: 'right' }}>{item.publishTime}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal title="公告内容" visible={NoticeVisible} footer={null} onCancel={() => setNoticeVisible(false)}>
                    <p>{NoticeContent.content}</p>
                </Modal>
            </div>
        </PageContainer>
    );
};

export default Home;
