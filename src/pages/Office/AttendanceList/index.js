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

const AttendanceList = () => {
  const [form] = Form.useForm();
  const formList = [
    {
      name: "checkType",
      label: "打卡类型",
      type: "select",
      span: 6,
      options: [
        { label: "九点前", value: 0 },
        { label: "九点后", value: 1 },
        { label: "下班18点前", value: 2 },
        { label: "18点后", value: 3 },
      ],
    },
    {
      name: "comId",
      label: "归属公司ID",
      type: "input",
      span: 6,
    },
    {
      name: "createTime",
      label: "打卡日期",
      type: "datePicker",
      span: 6,
    },
    {
      name: "userId",
      label: "请假用户ID",
      type: "input",
      span: 6,
    },
  ];
  const attendanceList = [];
  const attendanceColumns = [
    {
      title: "姓名",
      dataIndex: "type0",
      key: "type0",
    },
    {
      title: "状态",
      dataIndex: "type1",
      key: "type1",
    },
    {
      title: "归属公司",
      dataIndex: "type2",
      key: "type2",
    },
    {
      title: "日期",
      dataIndex: "type3",
      key: "type3",
    },
    {
      title: "职务",
      dataIndex: "type4",
      key: "type4",
    },
    {
      title: "上班时间：申请补卡",
      dataIndex: "type5",
      key: "type5",
    },
    {
      title: "下班时间：申请补卡",
      dataIndex: "type6",
      key: "type6",
    },
    {
      title: "请假信息",
      dataIndex: "type7",
      key: "type7",
    },
    {
      title: "外出信息",
      dataIndex: "type8",
      key: "type8",
    },
    {
      title: "外出详情",
      dataIndex: "type9",
      key: "type9",
    },
    {
      title: "部门领导",
      dataIndex: "type10",
      key: "type10",
    },
  ];
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>考勤管理</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button>导出Excel</Button>
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
          columns={attendanceColumns}
          dataSource={attendanceList}
          pagination={false}
          size="small"
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default AttendanceList;
