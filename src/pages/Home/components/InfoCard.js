import { Divider } from "antd";
import styles from "./InfoCard.less";
import { useModel } from 'umi';
const InfoCard = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <div className={styles["container"]}>
      <div className={styles["line-1"]}>个人资料</div>
      <div className={styles["line-2"]}>{currentUser?.name}</div>
      <div className={styles["line-3"]}>({currentUser?.comName})</div>
      <Divider></Divider>
      <div className={styles["line-4"]}>{currentUser?.introduce}</div>
    </div>
  );
};

export default InfoCard;
