import { useState, useEffect } from "react";
import { Modal, Descriptions, Row, Col, Button, Space } from "antd";

const ModalMyInfo = ({ visible, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const userDescription = [
    { label: "所属公司", value: "" },
    { label: "性别", value: "" },
    { label: "所属部门", value: "" },
    { label: "入职时间", value: "" },
    { label: "手机号", value: "" },
    { label: "担任职务", value: "" },
    { label: "邮箱地址", value: "" },
    { label: "座机号码", value: "" },
    { label: "所属行业", value: "" },
    { label: "QQ", value: "" },
    { label: "招聘渠道", value: "" },
    { label: "所属团队", value: "" },
    { label: "出生年月", value: "" },
    { label: "账户状态", value: "" },
    { label: "用户名", value: "" },
    { label: "户籍地址", value: "" },
    { label: "智联配额", value: "" },
  ];
  const kpiDescription = [
    { label: "服务客户", value: "" },
    { label: "签约客户", value: "" },
    { label: "录入职位", value: "" },
    { label: "客户评语", value: "" },
    { label: "新增建立", value: "" },
    { label: "智联下载", value: "" },
    { label: "推荐人选", value: "" },
    { label: "简历评语", value: "" },
    { label: "合作职位", value: "" },
    { label: "上岗人数", value: "" },
    { label: "回款金额", value: "" },
    { label: "业绩金额", value: "" },
    { label: "提成金额", value: "" },
  ];
  const handleCancel = () => { };
  const handleOk = () => { };
  return (
    <Modal
      forceRender
      visible={visible}
      title="我的信息"
      okText="确定"
      cancelText="关闭"
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      width={1600}
    >
      <Row gutter={32}>
        <Col span={12}>
          <Descriptions bordered size="middle" column={4}>
            {userDescription.map((item) => {
              return (
                <Descriptions.Item label={item.label} key={item.label} span={2}>
                  {item.label}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions bordered size="middle" column={4}>
            {kpiDescription.map((item) => {
              return (
                <Descriptions.Item label={item.label} key={item.label} span={2}>
                  {item.label}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: "15px" }}>
        <Col>
          <Space size={8}>
            <Button>我的职位</Button>
            <Button>我的客户</Button>
            <Button>我的点评</Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalMyInfo;
