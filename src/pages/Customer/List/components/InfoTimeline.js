import { Timeline, Divider } from "antd";
import styles from "./InfoTimeline.module.scss";
import "./Timeline.css";

const InfoTimeline = () => {
  const timelineData = [
    {
      time: "2021-7-27",
      record: "成都一分杨怡凡 将此客户从公共池转移给 成都一分杨杨怡凡",
      reason: "顾问申请理由: 工单一键转入",
    },
    {
      time: "2021-3-10",
      record: "系统将此客户从 亦庄公司-段某 名下自动转入公司公共池",
      reason:
        "转入原因: 未签约的广告呼入有效期是1个月 没有有效跟进记录, 流入全国客户池转入原因: 未签约的广告呼入有效期是1个月 没有有效跟进记录, 流入全国客户池",
    },
  ];
  return (
    <div className={styles["info-timeline"]}>
      <Timeline mode="left">
        {timelineData.map((data) => {
          return (
            <Timeline.Item label={data.time} key={data.time}>
              <div>
                <div>{data.record}</div>
                <Divider
                  style={{
                    margin: "1px 0",
                  }}
                ></Divider>
                <div>{data.reason}</div>
              </div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
};

export default InfoTimeline;
