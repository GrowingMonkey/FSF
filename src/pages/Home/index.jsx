import { useEffect, useState } from "react";

import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Card, Tooltip, List, Table, Image, Typography, Button, Modal, Avatar, Collapse, message } from "antd";
import { selectWorkFlow } from "../../services/home";
import InfoCard from "./components/InfoCard";
import DataCard from "./components/DataCard";
import RankTabCard from "./components/RankTabCard";
import RankListCard from "./components/RankListCard";
import styles from "./index.less";
import { sysNotice, feeRank, recommendRank, readNotice } from "@/services/home";
import { history } from 'umi';
import M1 from "../../assets/images/M1.png";

import M2 from "../../assets/images/M2.png";

import M3 from "../../assets/images/M3.png";
import MP from "../../assets/images/MP.png";
import M4 from "../../assets/images/M4.png";
import LHR from "../../assets/images/LHR.png";
import LHL from "../../assets/images/LHL.png";
import YBR from "../../assets/images/YBR.png";
import YBL from "../../assets/images/YBL.png";
import START from "../../assets/images/START.png";


const Home = () => {
    const [activeTab, setActiveTab] = useState(2);
    const [dataState, setDataState] = useState(null);
    const [noticeData, setNoticeData] = useState([]);
    const [feeRankData, setFeeRankData] = useState([]);
    const [recommendRankData, setRecommendRankData] = useState([]);
    const [NoticeVisible, setNoticeVisible] = useState(false);
    const [fresh, setFresh] = useState(false);
    const [NoticeContent, setNoticeContent] = useState({})
    const [Ic, setIc] = useState(0);
    const [dataType, setDataType] = useState(1)
    const [dateType, setDateType] = useState('year')

    useEffect(() => {
        selectWorkFlow({ type: dataType, time: dateType }).then((res) => {
            const { data } = res;
            setDataState(data)
        });
    }, [dataType, dateType]);
    useEffect(() => {
        // selectWorkFlow({type:1}).then((res) => {
        //     const { data } = res;
        //     setDataState(data)
        // });

        feeRank({ pageSize: 5 }).then(res => {
            setFeeRankData(res?.data?.list || []);
        });
        recommendRank({ pageSize: 5 }).then(res => {
            setRecommendRankData(res?.data?.list || []);
        });
    }, []);
    useEffect(() => {
        // selectWorkFlow({type:1}).then((res) => {
        //     const { data } = res;
        //     setDataState(data)
        // });
        sysNotice().then(res => {
            setNoticeData(res?.data?.list || []);
            let rep = isReadMsg(res?.data?.list || []);
            if (rep.bol) {
                setNoticeVisible(true);
                NoticeContent.title == undefined && setNoticeContent(rep.content)
            }
        });
    }, [fresh])
    const isReadMsg = (arr) => {
        let bol = false;
        let content = null;
        arr && arr.map((item, index) => {
            content = item;
            if (item.isRead == 0) {
                bol = true;
            }
        })
        return { bol: bol, content: content };
    }
    const feeRankColumns = [
        {
            title: '',
            dataIndex: 'stateName',
            key: 'stateName',
            ellipsis: true,
            width: 60,
            render: text => <span style={{ color: 'red' }}>{text}</span>,
        },
        {
            title: '所在公司',
            dataIndex: 'comName',
            key: 'comName',
            width: 80,
            ellipsis: true,
        }, {
            title: '推荐人',
            dataIndex: 'userName',
            width: 80,
            key: 'userName',
            ellipsis: true,
        },
        {
            title: '人选名称',
            dataIndex: 'talentName',
            width: 80,
            key: 'talentName',
            ellipsis: true,
        },
        {
            title: '人选职位',
            dataIndex: 'job',
            key: 'job',
            ellipsis: {
                showTitle: false,
            },
            width: 150,
            render: job => (
                <Tooltip placement="topLeft" title={job}>
                    {job}
                </Tooltip>
            ),
        },
        {
            title: '人选年薪',
            dataIndex: 'salary',
            key: 'salary',
            width: 80,
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
            width: 200,
            key: 'customerName',
            ellipsis: true,
        },
        {
            title: '回款金额',
            dataIndex: 'fee',
            key: 'fee',
            ellipsis: {
                showTitle: false,
            },

            render: fee => (
                <Tooltip placement="topLeft" title={fee}>
                    <span style={{ color: 'red' }}>{fee || 0}元</span>
                </Tooltip>
            ),
        },
        {
            title: '回款时间',
            dataIndex: 'time',
            key: 'time',
            ellipsis: {
                showTitle: false,
            },

            render: time => (
                <Tooltip placement="topLeft" title={time}>
                    {time}
                </Tooltip>
            ),
        },
    ]
    const wrapLeftCol = {
        xs: 24,
        md: 8,
        lg: 8
    }
    const wrapRightCol = {
        xs: 24,
        md: 16,
        lg: 16
    }
    const warpBottomCol = {
        left: {
            xs: 24,
            md: 12,
            lg: 12
        },
        middle: {
            xs: 24,
            md: 12,
            lg: 12
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
    const getNextMsg = async (content) => {
        if (content.isRead == 0) {
            await readNotice({ id: NoticeContent.id }); setNoticeContent({}); setFresh(!fresh);
        } else {
            noticeData.map((item, index) => {
                if (item.id == NoticeContent.id) {
                    if (noticeData[index + 1]) {
                        setNoticeContent(noticeData[index + 1])
                    } else {
                        message.error('没有更多数据了');
                        setNoticeVisible(false)
                    }
                }
            })
        }
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
                        <DataCard dataType={dataType} dateType={dateType} selectDateType={(e) => setDateType(e)} selectType={(e) => setDataType(e)} dataState={dataState}></DataCard>
                    </div>
                </Col>
            </Row>
            <div className={styles["bottom-container"]}>
                <Row gutter={16} style={{ height: "100%" }}>
                    <Col span={12}>
                        <div className={styles["rank-data-card"]}>
                            <Card title="实时推荐榜" extra={<Button type="link" onClick={() => history.push(`/kpi/p-rank`)}>查看更多</Button>}>

                                <Table size="small" dataSource={recommendRankData} bordered columns={feeRankColumns} pagination={false} scroll={{ x: 550, }}></Table>
                            </Card>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={styles["rank-data-card"]}>
                            <Card title="实时回款榜" extra={<Button type="link" onClick={() => history.push(`/kpi/pb-rank`)}>查看更多</Button>}>
                                <Table size="small" dataSource={feeRankData} bordered columns={recommendRankColums} pagination={false} scroll={{ x: 500, }}></Table>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* </div> */}
            <div className={styles["bottom-container"]}>
                <Row style={{ height: "100%" }} gutter={16}>
                    {/* <Col {...warpBottomCol.left}>
                        <div className={styles["rank-tab-card"]}>
                            <RankTabCard
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            ></RankTabCard>
                        </div>
                    </Col> */}
                    <Col {...warpBottomCol.middle}>

                        <div className={styles["rank-data-card"]} style={{ position: 'relative' }}>
                            <RankTabCard
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                style={{ position: 'absolute' }}
                            ></RankTabCard>
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
                                            <Typography.Text style={{ width: '72px', fontWeight: 'bold', display: 'inline-block' }}>[{formatNotice(item)}]</Typography.Text> <Typography.Text link style={{ width: "44%", color: '#0065fb', display: 'inline-flex', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold' }}>{item.title}</Typography.Text><Typography.Text style={{ display: "inline-block", paddingRight: '5px', width: '70px', float: 'right' }}>{'系统发布'}</Typography.Text><Typography.Text style={{ width: '85px', display: 'inline-block', float: 'right' }}>{item.publishTime}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal title={null}
                    cancelText={'下一条'}
                    okText="关闭"
                    // footer={<Button type="primary" onClick={() => setNoticeVisible(false)}>关闭</Button>}
                    centered closable={false}
                    onCancel={async () => { await getNextMsg(NoticeContent); }}
                    onOk={async () => { await readNotice({ id: NoticeContent.id }); setNoticeVisible(false) }}
                    title={<div style={{ textAlign: 'center' }}>{NoticeContent.title}</div>}
                    style={{ position: 'relative', background: 'none' }} visible={NoticeVisible} >
                    <div style={{
                        height: '332px',
                        position: 'absolute',
                        top: '-332px',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        marginLeft: '-24px',
                        alignItems: 'end'
                    }}><img src={NoticeContent.type == 0 ? M2 : NoticeContent.type == 1 ? M1 : NoticeContent.type == 2 ? M3 : M4} style={{
                        width: NoticeContent.type == 0 || NoticeContent.type == 2 ? '70%' : '100%'
                    }} /></div>
                    {
                        NoticeContent.type != 0 && [<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image width={62} style={{ paddingTop: NoticeContent.type == 1 ? '22px' : null }} src={NoticeContent.type == 1 ? YBL : NoticeContent.type == 3 ? START : LHL} />
                            {/* <Avatar src={'https://faithful.oss-cn-shanghai.aliyuncs.com' + NoticeContent.headUrl || ''} size={132} style={{ marginLeft: 70, marginRight: 70 }}></Avatar> */}
                            <div style={{ maxWidth: '100%' }}>{NoticeContent.content}</div>
                            <Image width={62} style={{ paddingBottom: NoticeContent.type == 1 ? '22px' : null }} src={NoticeContent.type == 1 ? YBR : NoticeContent.type == 3 ? START : LHR} />
                        </div>, <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{
                                width: 164, textAlign: 'center', lineHeight: '42px', marginTop: '-20px',
                                zIndex: 10, backgroundImage: `url(${MP})`, backgroundSize: '100%'
                            }}>{''}</div>
                        </div>]

                    }
                    {NoticeContent.type == 0 && <p>{NoticeContent.content}</p>}
                </Modal>
            </div>
        </PageContainer>
    );
};

export default Home;
