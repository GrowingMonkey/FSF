import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Table,
  Divider,
  Space,
  DatePicker,
} from "antd";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import { useRequest } from 'umi';
import { selectMsgList } from '@/services/employ'
import { useState, useEffect } from "react";
const MessageList = () => {
  const [form] = Form.useForm();
  const [messageList, setMessageList] = useState([]);
  const { data } = useRequest(selectMsgList)
  useEffect(() => {
    setMessageList(data?.list || []);
  }, [data])
  const formList = [
    {
      name: "name",
      label: "标题",
      type: "input",
      span: 6,
    },
    {
      name: "createTime",
      label: "创建日期",
      type: "datePicker",
      span: 6,
    },
    {
      name: "state",
      label: "消息状态",
      type: "select",
      span: 6,
      options: [
        { label: "未处理", value: 0 },
        { label: "已处理", value: 1 },
      ],
    },
    {
      name: "行为类型",
      label: "姓名",
      type: "select",
      span: 6,
      options: [
        { label: "客户交流", value: 0 },
        { label: "职位交流", value: 1 },
        { label: "人选交流", value: 2 },
        { label: "喜报", value: 3 },
        { label: "喜报", value: 4 },
        { label: "其他文本", value: 5 },
      ],
    },
  ];
  const messageColumns = [
    // {
    //   title: "选择",
    //   dataIndex: "",
    //   key: "",
    // },
    {
      title: "信息分类",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "发件人",
      dataIndex: "sendName",
      key: "sendName",
    },
    {
      title: "内容",
      dataIndex: "details",
      key: "details",
      width: "50%",
    },
    {
      title: "发送时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Space size="middle">
            <Button type="text">删除</Button>
            <Button type="text">展示</Button>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>我的通知</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button>清空</Button>
              <Button type="primary">搜索</Button>
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          {
            <Row gutter={32}>
              {formList.map((col) => {
                if (col.render) {
                  return col.render();
                }
                if (col.type === "input") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item
                        name={col.name}
                        label={col.label}
                        rules={col.rules}
                      >
                        <Input></Input>
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === "select") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item
                        name={col.name}
                        label={col.label}
                        rules={col.rules}
                      >
                        <Select options={col.options}></Select>
                      </Form.Item>
                    </Col>
                  );
                }
                if (col.type === "datePicker") {
                  return (
                    <Col span={col.span} key={col.name}>
                      <Form.Item name={col.name} label={col.label}>
                        <DatePicker style={{ width: "100%" }}></DatePicker>
                      </Form.Item>
                    </Col>
                  );
                }
                return null;
              })}
            </Row>
          }
        </Form>
      </div>
      <div className={styles["list-container"]}>
        <Table
          columns={messageColumns}
          dataSource={messageList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default MessageList;
