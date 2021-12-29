import { useEffect } from "react";
import { cRank, hkRank, kpiRank, signRank } from "../../../services/home";
import styles from "./RankListCard.less";

const RankListCard = ({ activeTab }) => {
  useEffect(() => {
    cRank().then((data) => {
      console.log(data);
    });
    hkRank().then((data) => {
      console.log(data);
    });
    kpiRank().then((data) => {
      console.log(data);
    });
    signRank().then((data) => {
      console.log(data);
    });
  }, []);
  return <div className={styles["container"]}></div>;
};

export default RankListCard;
