import { Divider } from "antd";
import styles from "./InfoCard.less";

const InfoCard = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["line-1"]}>个人资料</div>
      <div className={styles["line-2"]}>何先生</div>
      <div className={styles["line-3"]}>(成都一区)</div>
      <Divider></Divider>
      <div className={styles["line-4"]}>借月愁情书急, 笔尖皆画英姑.</div>
    </div>
  );
};

export default InfoCard;
