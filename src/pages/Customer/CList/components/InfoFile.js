import { Table, Button, Space, Row, Col, Upload, Pagination, message } from "antd";
import styles from "./InfoFile.less";
import { useEffect, useState } from "react";
import { history } from "umi";
import { upload } from '@/utils/lib/upload';
import { contractsQuery, addContract } from '@/services/customer'
import ReadConfig from '@/utils/ReadConfig'
const InfoFile = () => {
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [fileData, setFileData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  // const fileData = [];
  // for (let i = 0; i < 3; i += 1) {
  //   fileData.push({
  //     key: i,
  //     name: `合同-${i}`,
  //   });
  // }
  // fileData.push({
  //   key: 4,
  //   name: "A公司介绍文档",
  // });
  const fileColumns = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Space size={16}>
          <Button type="link" style={{ padding: 0 }} onClick={() => window.open(`${ReadConfig.OSS_READ_ADDRESS}${record.url}`)}>
            下载
          </Button>
          {/* <Button type="link" danger style={{ padding: 0 }}>
            删除
          </Button> */}
        </Space>
      ),
    },
  ];
  const updateData = () => {
    isRefresh ? setIsRefresh(false) : setIsRefresh(true);
  }
  useEffect(() => {
    const { location: { query } } = history;
    console.log(location);
    contractsQuery({ pageNo: pageNo, pageSize: 20, customerId: query.customerId }).then(res => {
      console.log(res);
      setFileData(res?.data?.list || []);
      setTotal(res?.data?.count || 0);
    })
  }, [pageNo, isRefresh])
  return (
    <div className={styles["info-file"]}>
      <Row justify="end">
        <Col>
          <Upload
            name="file"
            showUploadList={false}
            onChange={() => { }}
            customRequest={async (options) => {
              let result = await upload(options.file, () => { console.log('chenggong') }, '/hetong/');
              console.log(result.res);
              if (result.res.status == 200) {
                let name = result.name.split('/').filter(i => i.indexOf('.') > 0);
                const { location: { query } } = history;
                addContract({ customerId: query.customerId, name: name[0], url: result.name }).then(res => {
                  message.info(res.message || '上传成功');
                  updateData();
                })
              }
              // setImageUrl(
              //   result.res.requestUrls[0].split('?')[0] +
              //   '?x-oss-process=image/resize,w_100,h_100/quality,q_50',
              // );
              options.onSuccess();
            }}>
            <Button type="primary">上传新文件</Button>
          </Upload>
        </Col>
      </Row>
      <Table
        style={{ marginTop: "25px" }}
        columns={fileColumns}
        dataSource={fileData}
        size="small"
        pagination={{
          total: total,
          pageSize: 10,
          onChange: e => setPageNo(e),
          showTotal: total => `共${total}条`

        }}
      />
    </div>
  );
};

export default InfoFile;
