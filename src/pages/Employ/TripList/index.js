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
import moment from "moment";
import { useRequest, history } from 'umi'
import { selectTripList, delTrip, changeTripState } from "@/services/employ"
import { useState, useEffect } from "react";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const TripList = () => {
  const [form] = Form.useForm();
  const { data, refresh, run } = useRequest(selectTripList);
  const [tripList, setTripList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTripList(data?.list || [])
    setTotal(data?.count)
  }, [data]);
  const handlerDelete = async (row) => {
    console.log(row)
    //刷新
    let result = await delTrip({ id: row.id });
    console.log(result);
    refresh();
  }
  const handleChangeState = async (row, state) => {
    console.log(row)
    //刷新
    let result = await changeTripState({ id: row.id, state: state });
    console.log(result);
    refresh();
  }
  const formList = [
    {
      name: "title",
      label: "客户名",
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
      name: "type",
      label: "行为类型",
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
      name: "state",
      label: "消息状态",
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
  const tripColumns = [
    {
      title: "行为类型",
      dataIndex: "type",
      key: "type",
      width: 80,
      ellipsis: true,

      render: (text, record) => {
        return +text == 0 ? '客户提醒' : +text == 1 ? '职位提醒' : +text == 2 ? '人选提醒' : +text == 3 ? '面试提醒' : +text == 4 ? '待办事项' : '其他提醒'
      }
    },
    {
      title: "提醒时间",
      dataIndex: "time",
      ellipsis: true,

      key: "time",
    },
    {
      title: "提醒内容",
      dataIndex: "details",
      ellipsis: true,

      key: "details",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      ellipsis: true,

      key: "createTime",
    },
    {
      title: "客户名/职位名字/简历人选名",
      dataIndex: "name",
      ellipsis: true,

      key: "name",
    },
    {
      title: "状态",
      dataIndex: "state",
      ellipsis: true,
      width: 50,
      key: "state",
      render: (text, record) => {
        return +text == 0 ? '未读' : '已读'
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      ellipsis: true,
      fixed: 'right',
      width: 300,
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button type="danger" size="small" onClick={() => handlerDelete(record)}>删除</Button>
            <Button type="default" size="small" onClick={() => handleChangeState(record, 0)}>标记为未处理</Button>
            <Button type="primary" size="small" onClick={() => handleChangeState(record, 1)} >标记为已处理</Button>
          </Space>
        );
      },
    },
  ];

  const handleSearch = () => {
    form.validateFields().then(values => {
      console.log(values)
      run({ ...values, createTime: values.createTime ? moment(values.createTime).format("YYYY/MM/DD") : '' })
    })
  }
  return (
    <PageContainer>
      <div className={styles["search-container"]}>
        <Row justify="space-between" align="middle">
          <Col>
            <div className={styles["page-title"]}>我的行程</div>
          </Col>
          <Col>
            <Space size={8}>
              <Button onClick={() => form.resetFields()}>清空</Button>
              <Button type="primary" onClick={handleSearch}>搜索</Button>
              <Button type="primary" onClick={() => { history.push(`/employ/trip-add`) }}>添加日程</Button>
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
          pagination={{
            total: total,
            pageSize: 10,
            onChange: e => { run({ pageNo: e }) }
          }}
          size="small"
          bordered
          scroll={{ x: 900 }}
        />
      </div>
      <div style={{ width: "100%", minHeight: "15px" }}></div>
    </PageContainer>
  );
};

export default TripList;
