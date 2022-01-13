import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import { addEP } from "../../../../services/talent";
import { industryList } from "../../../../utils/Industry";

const ModalProject = ({ visible, onSubmit, onCancel, record, talentId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增项目经历");
  const [industryChildList, setIndustryChildList] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      let payload = Object.assign({}, values);
      if (values.startTime) {
        payload.startTime = values.startTime.format("YYYY-MM-DD");
      }
      if (values.endTime) {
        payload.endTime = values.endTime.format("YYYY-MM-DD");
      }
      addEP({ talentId: talentId, ...payload }).then((data) => {
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
  const onIndustryChange = (value, data) => {
    setIndustryChildList(data.children);
    form.setFieldsValue({ industryChild: data.children[0].value });
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
        <Form.Item
          name="name"
          label="项目名称"
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
          name="job"
          label="当前岗位"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="industry" label="行业">
          <Select options={industryList} onChange={onIndustryChange}></Select>
        </Form.Item>
        <Form.Item name="industryChild" label="子行业">
          <Select options={industryChildList}></Select>
        </Form.Item>
        <Form.Item name="startTime" label="开始日期">
          <DatePicker style={{ width: "100%" }}></DatePicker>
        </Form.Item>
        <Form.Item name="endTime" label="结束日期">
          <DatePicker style={{ width: "100%" }}></DatePicker>
        </Form.Item>
        <Form.Item name="details" label="项目业绩">
          <Input></Input>
        </Form.Item>
        <Form.Item name="duty" label="项目职责">
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProject;
