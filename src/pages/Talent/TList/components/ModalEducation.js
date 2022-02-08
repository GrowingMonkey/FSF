import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Tree,
  Row,
  Col,
  Divider,
  DatePicker,
  Select,
} from "antd";
import moment from "moment";
import { addEdu } from "../../../../services/talent";
const { RangePicker } = DatePicker;
const ModalEducation = ({ visible, onSubmit, onCancel, talentId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增教育经历");
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      let payload = Object.assign({}, values);
      if (values.startTime) {
        payload.startTime = values.startTime[0].format("YYYY-MM-DD");
        payload.endTime = values.startTime[1].format("YYYY-MM-DD");
      }
      if (values.endTime) {
        payload.endTime = values.endTime.format("YYYY-MM-DD");
      }
      addEdu({ talentId: talentId, ...payload }).then((data) => {
        console.log(data);
        onSubmit();
        form.resetFields();
        setConfirmLoading(false);
      });
    });
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setConfirmLoading(false);
  };
  return (
    <Modal
      forceRender
      visible={visible}
      title={modalTitle}
      okText="提交"
      cancelText="取消"
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        labelAlign="right"
      >
        <Form.Item name="startTime" label="学习日期">
          <RangePicker style={{ width: "100%" }}></RangePicker>
        </Form.Item>
        <Form.Item
          name="name"
          label="毕业院校"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="classes"
          label="所学专业"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="isAllTime"
          label="是否统招"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Select
            options={[
              { label: "是", value: 0 },
              { label: "否", value: 1 },
            ]}
          ></Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default ModalEducation;
