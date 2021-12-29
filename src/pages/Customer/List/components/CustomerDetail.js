import { useState } from "react";
import { Col, Row, Avatar, Typography, Button, Space } from "antd";
// import CustomerInfo from "./CustomerInfo";
import InfoBasic from "./InfoBasic";
import InfoFile from "./InfoFile";
import InfoPosition from "./InfoPosition";
import InfoTimeline from "./InfoTimeline";
import InfoCandidate from "./InfoCandidate";
// import CustomerInfoCandidate from "./CustomerInfoCandidate";
// import CustomerInfoPosition from "./CustomerInfoPosition";
// import CustomerInfoAttachment from "./CustomerInfoAttachment";
// import CustomerInfoContract from "./CustomerInfoContract";
// import CustomerInfoTimeline from "./CustomerInfoTimeline";
// import CustomerInfoFile from "./CustomerInfoFile";
import coin from "../../../../assets/images/coin.png";
import checkin from "../../../../assets/images/checkin.png";
import interview from "../../../../assets/images/interview.png";
import position from "../../../../assets/images/position.png";
import recommand from "../../../../assets/images/recommand.png";
import styles from "./CustomerDetail.module.scss";

const CustomerDetail = () => {
  const [tab, setTab] = useState("");
  const { Paragraph } = Typography;
  const cardList = [
    {
      unit: "万",
      image: coin,
      description: "回款金额",
      enDescription: "Refund amount",
    },
    {
      unit: "个",
      image: position,
      description: "运作职位",
      enDescription: "Operational position",
    },
    {
      unit: "个",
      image: recommand,
      description: "推荐人数",
      enDescription: "Recommended number",
    },
    {
      unit: "人",
      image: checkin,
      description: "入职人数",
      enDescription: "Enrollment amount",
    },

    {
      unit: "人",
      image: interview,
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
  return (
    <div className={styles["customer-detail"]}>
      <Row gutter={16}>
        {cardList.map((card) => {
          return (
            <Col flex={1} key={card.description}>
              <div className={styles["customer-detail-card"]}>
                <div className={styles["card-title"]}>0{card.unit}</div>
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
      <Row gutter={16} style={{ marginTop: "20px" }}>
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
          </Space>
          <div className={styles["info-content"]}>
            {tab === "" ? <InfoBasic></InfoBasic> : null}
            {tab === "file" ? <InfoFile></InfoFile> : null}
            {tab === "position" ? <InfoPosition></InfoPosition> : null}
            {tab === "timeline" ? <InfoTimeline></InfoTimeline> : null}
            {tab === "candidate" ? <InfoCandidate></InfoCandidate> : null}
          </div>
        </Col>
        <Col span={8}>
          <div className={styles["revisit-record"]}>
            <div className={styles["revisit-record-title"]}>沟通记录</div>
            <div className={styles["record-item"]}>
              <Row gutter={16} align="middle">
                <Col span={2}>
                  <Avatar>U</Avatar>
                </Col>
                <Col span={14}>
                  <div className={styles["record-owner"]}>
                    南京公司-淘严明（Allen）
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
              </Typography>
            </div>
          </div>
        </Col>
      </Row>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </div>
  );
};

export default CustomerDetail;
