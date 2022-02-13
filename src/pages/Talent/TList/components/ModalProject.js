import { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import { addEP } from '../../../../services/talent';
import { industryList } from '../../../../utils/Industry';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import SelfDate from '@/components/SelfDate';
const ModalProject = ({ visible, onSubmit, onCancel, record, talentId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增项目经历');
  const [industryChildList, setIndustryChildList] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      let payload = Object.assign({}, values);
      if (values.startTime) {
        payload.startTime = values.startTime.startTime.format('YYYY-MM-DD');
        payload.endTime = values.startTime.endTime.format('YYYY-MM-DD');
        payload.isNow = values.startTime.isNow;
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
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} labelAlign="left">
        <Form.Item name="startTime" label="项目时间" rules={[
          {
            required: true,
            message: '必填',
          },
        ]}>
          <SelfDate
            fieldProps={{ picker: 'month' }}
            returnType={'moment'}
            style={{ width: '328px' }}
          ></SelfDate>
        </Form.Item>
        <Form.Item
          name="name"
          label="项目名称"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="job"
          label="项目职位"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="duty" label="项目职责" rules={[
          {
            required: true,
            message: '必填',
          },
        ]}>
          <TextArea></TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProject;
