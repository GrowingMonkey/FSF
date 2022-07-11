import { Divider, Col, Row, Image, Tag } from "antd";
import styles from "./DataCard.less";
import I1 from "../../../assets/images/1.png";
import I2 from "../../../assets/images/2.png";
import I3 from "../../../assets/images/3.png";
import I4 from "../../../assets/images/4.png";

const DataCard = ({ dataState, selectType, selectDateType, dataType = 1, dateType = 'year' }) => {
  // 6 客户面试数、8 offer人数、12 人选录入数，13 签约客户数，14 新增项目数
  const dataList = [
    {
      value: "1213",
      unit: "人",
      label: "新增人选",
    },
    {
      value: "88",
      unit: "个",
      label: "新增职位",
    },
    {
      value: "22",
      unit: "个",
      label: "年度签约",
    },
    {
      value: "10",
      unit: "元",
      label: "年度业绩",
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
    md: 12,
    lg: 12,
    xl: 12,
  }
  const leftCss = {
    display: 'flex',
    alignItem: 'center'
  }
  const formatNum = (value) => {
    if (+value > 10000) {
      return { num: (+value / 10000).toFixed(2), toW: true }
    } else {
      return {
        num: value,
        toW: false
      }
    }
  }
  console.log(dataState)
  return (
    <div>
      <div style={{ display: 'flex', marginLeft: 24 }}>
        <Tag color={dateType == 'year' ? '#108ee9' : null} style={{ cursor: 'pointer', marginTop: 20 }} onClick={() => selectDateType('year')}>年</Tag>
        <Tag color={dateType == 'month' ? '#108ee9' : null} style={{ cursor: 'pointer', marginTop: 20 }} onClick={() => selectDateType('month')}>月</Tag>
        <Tag color={dateType == 'day' ? '#108ee9' : null} style={{ cursor: 'pointer', marginTop: 20 }} onClick={() => selectDateType('day')}>日</Tag>
      </div>
      <div className={styles["container"]}>
        {/* <div className={styles["title"]}>个人数据</div> */}
        <Row className={styles["data-list"]} gutter={17}>

          <Col span="12">

            <Row gutter={[0, 68]}>
              <Col {...wrapCol}>
                <div style={leftCss}>
                  <Image src={I1} preview={false} style={{ width: 56, height: 56 }} />
                  <div className={styles["data-item"]}>
                    <div className={styles.data_info}>{dataList[0].label}</div>
                    <div>
                      <span className={styles["value"]}>{dataState?.addTalentNum || 0}</span>
                      <span style={{ fontSize: 14 }}>{dataList[0].unit}</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col {...wrapCol}>
                <div style={leftCss}>
                  <Image src={I2} preview={false} style={{ width: 56, height: 56 }} />

                  <div className={styles["data-item"]}>
                    <div className={styles.data_info}>{dataList[1].label}</div>

                    <div>
                      <span className={styles["value"]}>{dataState?.addJobNum || 0}</span>
                      <span>{dataList[1].unit}</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col {...wrapCol}>
                <div style={leftCss}>
                  <Image src={I3} preview={false} style={{ width: 56, height: 56 }} />
                  <div className={styles["data-item"]}>
                    <div className={styles.data_info}>{dataList[2].label}</div>

                    <div>
                      <span className={styles["value"]}>{dataState?.addSignNum || 0}</span>
                      <span>{dataList[2].unit}</span>
                    </div>

                  </div>
                </div>
              </Col>
              <Col {...wrapCol}>
                <div style={leftCss}>
                  <Image src={I4} preview={false} style={{ width: 56, height: 56 }} />
                  <div className={styles["data-item"]}>
                    <div className={styles.data_info}>{dataList[3].label}</div>

                    <div>
                      <span className={styles["value"]}>{formatNum(dataState?.addServiceFee).num}</span>
                      <span>{formatNum(dataState?.addServiceFee).toW ? '万' + dataList[3].unit : dataList[3].unit}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <Row gutter={[0, 68]}>
              <Col {...wrapCol}>
                <div className={styles["data-item"]}>
                  <div className={styles.data_info}>{dataList[4].label}</div>
                  <div>
                    <span className={styles["value"]}>{dataState?.addRecommendNum || 0}</span>
                    <span>{dataList[4].unit}</span>
                  </div>

                </div>
              </Col>
              <Col {...wrapCol}>
                <div className={styles["data-item"]}>
                  <div className={styles.data_info}>{dataList[5].label}</div>

                  <div>
                    <span className={styles["value"]}>{dataState?.addFaceNum || 0}</span>
                    <span>{dataList[5].unit}</span>
                  </div>
                </div>
              </Col>
              <Col {...wrapCol}>
                <div className={styles["data-item"]}>
                  <div className={styles.data_info}>{dataList[6].label}</div>

                  <div>
                    <span className={styles["value"]}>{dataState?.addOfferNum || 0}</span>
                    <span>{dataList[6].unit}</span>
                  </div>
                </div>
              </Col>
              <Col {...wrapCol}>
                <div className={styles["data-item"]}>
                  <div className={styles.data_info}>{dataList[7].label}</div>

                  <div>
                    <span className={styles["value"]}>{dataState?.addWorkNum || 0}</span>
                    <span>{dataList[7].unit}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>


          {/*<Col {...wrapCol}>
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
        </Col> */}

        </Row>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Tag color={dataType == 1 ? '#108ee9' : null} style={{ cursor: 'pointer', marginTop: 20 }} onClick={() => selectType(1)}>个人</Tag>
          <Tag color={dataType == 2 ? '#108ee9' : null} style={{ cursor: 'pointer', marginTop: 20 }} onClick={() => selectType(2)}>团队</Tag>
          <Tag color={dataType == 3 ? '#108ee9' : null} style={{ cursor: 'pointer', marginTop: 20 }} onClick={() => selectType(3)}>公司</Tag>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
