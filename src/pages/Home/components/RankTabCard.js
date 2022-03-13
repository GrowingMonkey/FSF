import { useState, useEffect } from "react";
import { Space, Divider, Col, Row } from "antd";
import styles from "./RankTabCard.less";

const RankTabCard = ({ activeTab, setActiveTab }) => {
  const list = [
    // {
    //   name: "提成排行",
    //   value: 0,
    // },
    // {
    //   name: "回款排行",
    //   value: 1,
    // },
    {
      name: "回款排行",
      value: 2,
    },
    {
      name: "签约排行",
      value: 3,
    },
  ];
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>排行榜</div>
      {list.map((tab) => {
        return (
          <div
            className={styles["tab-item"]}
            key={tab.value}
            style={{ padding: '0 10px 0 10px' }}
            onClick={() => {
              setActiveTab(tab.value);
            }}
          >
            {activeTab === tab.value ? (
              <div className={styles["tab-name-active"]}>{tab.name}</div>
            ) : (
                <div className={styles["tab-name"]}>{tab.name}</div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default RankTabCard;
