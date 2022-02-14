import { useEffect, useState } from "react";

import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Card } from "antd";
import { selectWorkFlow } from "../../services/home";
import InfoCard from "./components/InfoCard";
import DataCard from "./components/DataCard";
import RankTabCard from "./components/RankTabCard";
import RankListCard from "./components/RankListCard";
import styles from "./index.less";
const Home = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [dataState, setDataState] = useState([0, 0, 0, 0, 0]);
    useEffect(() => {
        selectWorkFlow().then((res) => {
            const { data } = res;
            dataState[0] = data[8] ? data[8].num : 0;
            dataState[1] = data[6] ? data[8].num : 0;
            dataState[2] = data[13] ? data[13].num : 0;
            dataState[3] = data[14] ? data[14].num : 0;
            dataState[4] = data[12] ? data[12].num : 0;
        });
    }, []);
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
            md: 10,
            lg: 10
        },
        right: {
            xs: 24,
            md: 10,
            lg: 10
        },
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
            {/* </div> */}
            <div className={styles["bottom-container"]}>
                <Row gutter={16} style={{ height: "100%" }}>
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
                            <Card title="公司大事"></Card>
                        </div>
                    </Col>
                </Row>

            </div>
            <div className={styles["bottom-container"]}>
                <Row gutter={16} style={{ height: "100%" }}>
                    <Col span={12}>
                        <div className={styles["rank-data-card"]}>
                            <Card title="实时推荐榜"></Card>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={styles["rank-data-card"]}>
                            <Card title="实时回款榜"></Card>
                        </div>
                    </Col>

                </Row>

            </div>
        </PageContainer>
    );
};

export default Home;
