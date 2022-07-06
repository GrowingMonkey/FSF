import { Divider, Avatar } from "antd";
import styles from "./InfoCard.less";
import { useModel } from 'umi';
const InfoCard = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <div className={styles["container"]}>
      <div style={{ width: '100%' }}>
        <div className={styles["line-1"]}>个人资料</div>
      </div>
      <Avatar size={80} src={'https://faithful.oss-cn-shanghai.aliyuncs.com' + currentUser.headUrl + '?x-oss-process=image/resize,w_100,h_100/quality,q_50'} alt="avatar" />
      <div className={styles["line-2"]}>{currentUser?.name}</div>
      <div className={styles["line-3"]}>({currentUser?.comName})</div>
      <Divider></Divider>
      <div className={styles["line-4"]}>{currentUser?.introduce}</div>
    </div>
  );
};

export default InfoCard;
