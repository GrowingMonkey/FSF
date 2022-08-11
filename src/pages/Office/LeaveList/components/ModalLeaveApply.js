import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import { addLeave } from '@/services/office'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import moment from 'moment'
// import { upload } from '@/utils/lib/upload'
const ModalLeaveApply = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [yearMsg, setYearMsg] = useState('');
  const [form] = Form.useForm();
  const formList = [
    {
      name: "leaveDate",
      label: "请假时间",
      type: "dateRange",
      span: 6,
    },
    {
      name: "type",
      label: "请假类型",
      type: "select",
      span: 6,
      options: [
        { label: '事假', value: 0 },
        { label: '病假', value: 1 },
        { label: '婚假', value: 2 },
        { label: '丧假', value: 3 },
        { label: '产假', value: 4 },
        { label: '年假', value: 6 },
        { label: '其他', value: 5 }]
    },
    {
      name: "reason",
      label: "请假原因",
      type: "textArea",
      span: 6,
    },
  ];
  const handleCancel = () => {
    onCancel()
  };
  const handleOk = () => {
    console.log(111);
    form.validateFields().then(value => {
      console.log(value);
      addLeave({ reason: value.reason, type: value.type, startTime: moment(value.leaveDate[0]).format('YYYY-MM-DD'), endTime: moment(value.leaveDate[1]).format('YYYY-MM-DD') }).then(res => {
        onSubmit()
      })
    })
  };
  const changeType = async (e) => {
    console.log(e);
    if (e == 6) {
      // let result = await getYearLeave();
      setYearMsg('当前年假剩余天数:' + 0)

    }
    else { setYearMsg('') }
  }

  return (
    <Modal
      forceRender
      visible={visible}
      title="请假申请"
      okText="提交"
      cancelText="取消"
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        {formList.map((col) => {
          if (col.type === "input") {
            return (
              <Form.Item
                name={col.name}
                label={col.label}
                rules={col.rules}
                key={col.label}
              >
                <Input></Input>
              </Form.Item>
            );
          }
          if (col.type === "select") {
            return (
              <Form.Item
                name={col.name}
                label={col.label}
                rules={col.rules}
                extra={<div style={{ color: 'red' }}>{yearMsg}</div>}
                key={col.label}
              >
                <Select options={col.options} onChange={(value) => changeType(value)}></Select>
              </Form.Item>
            );
          }
          if (col.type === "datePicker") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label}>
                <DatePicker style={{ width: "100%" }}></DatePicker>
              </Form.Item>
            );
          }
          if (col.type === "textArea") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label}>
                <TextArea
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            );
          }
          if (col.type === "dateRange") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label}>
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            );
          }
          return null;
        })}
      </Form>
    </Modal>
  );
};

export default ModalLeaveApply;
