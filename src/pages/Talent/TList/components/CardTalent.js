import { Row, Col, Space, Divider, Button } from "antd";
import styles from "./CardTalent.less";
const CardTalent = ({ record }) => {
  const education = [
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
  ];
  const gender = [
    { label: "未知", value: 0 },
    { label: "男", value: 1 },
    { label: "女", value: 2 },
  ];
  return (
    <div className={styles["card-container"]}>
      <div className={styles["basic-info"]}>
        <Row gutter={8} justify="space-between" align="middle">
          <Col>
            <div className={styles["name"]}>{record.name}</div>
          </Col>
          <Col>
            <div className={styles["basic-info-tag"]}>{record.age}岁</div>
          </Col>
          <Col>
            <div className={styles["basic-info-tag"]}>
              {record.education ? education[record.education].label : "未知"}
            </div>
          </Col>
          <Col>
            <div className={styles["basic-info-tag"]}>
              工作经验: {record.experience}
            </div>
          </Col>
          <Col>
            <Space>
              <div>编号：{record.talentId}</div>
              <Divider type="vertical" />
              <div>更新时间：{record.updateTime.split(" ")[0]}</div>
            </Space>
          </Col>
        </Row>
        <Row gutter={32} className={styles["record-info"]}>
          <Col>
            <div>个人履历:</div>
          </Col>
          {/* <Col>
            <div>
              <Space size={16} split={<Divider type="vertical" />}>
                <div>2011.12-2016.05</div>
                <div>天津职业技术师范大学</div>
                <div>职业教师教育</div>
              </Space>
            </div>
            <div>
              <Space size={16} split={<Divider type="vertical" />}>
                <div>2011.12-2016.05</div>
                <div>天津职业技术师范大学</div>
                <div>职业教师教育</div>
              </Space>
            </div>
            <div>
              <Space size={16} split={<Divider type="vertical" />}>
                <div>2011.12-2016.05</div>
                <div>天津职业技术师范大学</div>
                <div>职业教师教育</div>
              </Space>
            </div>
          </Col> */}
        </Row>
      </div>
      <div className={styles["bottom-container"]}>
        <Row justify="space-between">
          <Col>
            <Space>
              {/* <span>推荐记录 1</span>
              <span>沟通记录 10</span> */}
            </Space>
          </Col>
          <Col>
            <Space>
              <Button>查看详情</Button>
              <Button>加入项目</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardTalent;
