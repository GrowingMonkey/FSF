import { useEffect, useState } from "react";
import { cRank, hkRank, kpiRank, signRank } from "../../../services/home";
import styles from "./RankListCard.less";
import { Table, Button } from "antd";
import { history } from 'umi'

const RankListCard = ({ activeTab }) => {
  const [tableData, setTableData] = useState([]);
  const [colums, setColums] = useState([{
    title: '归属公司',
    dataIndex: 'comName',
    key: 'comName',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }]);
  useEffect(() => {
    // cRank().then((data) => {
    //   console.log(data);
    // });
    if (activeTab == 2) {
      hkRank().then((res) => {
        setColums([
          {
            title: '归属公司',
            dataIndex: 'comName',
            key: 'comName',
          },
          {
            title: '顾问名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '职级',
            dataIndex: 'roleName',
            key: 'roleName',
          },
          {
            title: '金额',
            dataIndex: 'fee',
            key: 'fee',
          }])
        setTableData(res.data?.list || [])
      });
    } else if (activeTab == 3) {
      signRank().then((res) => {
        setTableData(res.data?.list || []);
        setColums([
          {
            title: '归属公司',
            dataIndex: 'comName',
            key: 'comName',
          },
          {
            title: '顾问名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '职级',
            dataIndex: 'roleName',
            key: 'roleName',
          },
          {
            title: '签约数',
            dataIndex: 'signNum',
            key: 'signNum',
          }])
      });
    } else {

      kpiRank().then((res) => {
        setTableData(res.data?.list || []);
        setColums([
          {
            title: '归属公司',
            dataIndex: 'comName',
            key: 'comName',
          },
          {
            title: '顾问名称',
            dataIndex: 'userName',
            key: 'userName',
          },
          {
            title: '职级',
            dataIndex: 'role',
            key: 'role',
          },
          {
            title: '业绩',
            dataIndex: 'kpiFee',
            key: 'kpiFee',
          }])
      });
    }

    // kpiRank().then((data) => {
    //   console.log(data);
    // });
  }, [activeTab]);
  return <div className={styles["container"]}>

    <Button type="link" style={{ float: 'right' }} onClick={() => history.push(`${activeTab == 2 ? '/kpi/pay-rank' : activeTab == 3 ? '/kpi/sign-rank' : '/kpi/commission-rank'}`)}>查看更多</Button>
    <Table dataSource={tableData} columns={colums} pagination={false} size="small" />
  </div>;
};

export default RankListCard;
