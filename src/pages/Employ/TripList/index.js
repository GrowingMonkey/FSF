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
import { PageContainer } from '@ant-design/pro-layout';
import styles from "./index.less";

const TripList = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "name",
      label: "标题",
      type: "input",
      wrapCol: {
        xl: 6,
        md: 12,
        xs: 24
      }
    },
    {
      name: "createTime",
      label: "创建日期",
      type: "datePicker",
      wrapCol: {
        xl: 6,
        md: 12,
        xs: 24,
      }
    },
    {
      name: "state",
      label: "消息状态",
      type: "select",
      options: [
        { label: "客户提醒", value: 0 },
        { label: "职位提醒", value: 1 },
        { label: "人选提醒", value: 2 },
        { label: "面试提醒", value: 3 },
        { label: "待办事项", value: 4 },
        { label: "其他提醒", value: 5 },
      ],
      wrapCol: {
        xl: 6,
        md: 12,
        xs: 24
      }
    },
    {
      name: "type",
      label: "行为类型",
      type: "select",
      options: [
        { label: "未处理", value: 0 },
        { label: "已处理", value: 1 },
      ],
      wrapCol: {
        xl: 6,
        md: 12,
        xs: 24
      }
    },
  ];
  const tripList = [];
  const tripColumns = [
    {
      title: "行为类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "提醒时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "提醒内容",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "客户名/职位名字/简历人选名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Space size="middle">
            <Button type="text">删除</Button>
            <Button type="text">标记为未处理</Button>
            <Button type="text">标记为已处理</Button>
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
            <div className={styles["page-title"]}>我的行程</div>
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
                    <Col span={col.span} {...col.wrapCol} key={col.name}>
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
                    <Col span={col.span} {...col.wrapCol} key={col.name}>
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
                    <Col span={col.span} {...col.wrapCol} key={col.name}>
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
          columns={tripColumns}
          dataSource={tripList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default TripList;
