import { Table, Button, Space, Row, Col } from "antd";
import styles from "./InfoFile.less";

const InfoFile = () => {
  const fileData = [];
  for (let i = 0; i < 3; i += 1) {
    fileData.push({
      key: i,
      name: `合同-${i}`,
    });
  }
  fileData.push({
    key: 4,
    name: "A公司介绍文档",
  });
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
          <Button type="link" style={{ padding: 0 }}>
            下载
          </Button>
          <Button type="link" danger style={{ padding: 0 }}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className={styles["info-file"]}>
      <Row justify="end">
        <Col>
          <Button type="primary">上传新文件</Button>
        </Col>
      </Row>
      <Table
        style={{ marginTop: "25px" }}
        columns={fileColumns}
        dataSource={fileData}
        size="small"
      />
    </div>
  );
};

export default InfoFile;
