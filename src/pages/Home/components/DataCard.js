import { Divider, Col, Row } from "antd";
import styles from "./DataCard.less";

const DataCard = ({ dataState }) => {
  // 6 客户面试数、8 offer人数、12 人选录入数，13 签约客户数，14 新增项目数
  const dataList = [
    {
      value: "1213",
      unit: "人",
      label: "新增人选",
    },
    {
      value: "88",
      unit: "次",
      label: "新增职位",
    },
    {
      value: "22",
      unit: "人",
      label: "年度签约",
    },
    {
      value: "10",
      unit: "元",
      label: "年度回款",
    },
    {
      value: "102",
      unit: "人",
      label: "年度推荐",
    },
    {
      value: "103",
      unit: "人",
      label: "年度面试",
    },
    {
      value: "104",
      unit: "人",
      label: "年度offer",
    },
    {
      value: "105",
      unit: "人",
      label: "年度入职",
    },
  ];
  const wrapCol = {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  }
  console.log(dataState)
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>个人数据</div>
      <Row className={styles["data-list"]} gutter={17}>
        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addTalentNum || 0}</span>
              <span>{dataList[0].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[0].label}</div>
          </div>
        </Col>

        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addJobNum || 0}</span>
              <span>{dataList[1].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[1].label}</div>
          </div>
        </Col>



        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addSignNum || 0}</span>
              <span>{dataList[2].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[2].label}</div>
          </div>
        </Col>



        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addServiceFee || 0}</span>
              <span>{dataList[3].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[3].label}</div>
          </div>
        </Col>

        {/* <Divider type="vertical" style={{ height: "100%" }}></Divider> */}

        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addRecommendNum || 0}</span>
              <span>{dataList[4].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[4].label}</div>
          </div>
        </Col>
        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addFaceNum || 0}</span>
              <span>{dataList[5].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[5].label}</div>
          </div>
        </Col>
        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addOfferNum || 0}</span>
              <span>{dataList[6].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[6].label}</div>
          </div>
        </Col>
        <Col {...wrapCol}>
          <div className={styles["data-item"]}>
            <div>
              <span className={styles["value"]}>{dataState?.addWorkNum || 0}</span>
              <span>{dataList[7].unit}</span>
            </div>
            <div className={styles.data_info}>{dataList[7].label}</div>
          </div>
        </Col>

      </Row>
    </div>
  );
};

export default DataCard;
