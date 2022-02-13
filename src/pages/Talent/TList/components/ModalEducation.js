import { useState, useEffect } from 'react';
import { Modal, Form, Input, Tree, Row, Col, Divider, DatePicker, Select } from 'antd';
import moment from 'moment';
import { addEdu } from '../../../../services/talent';
const { RangePicker } = DatePicker;
import SelfDate from '@/components/SelfDate';
const ModalEducation = ({ visible, onSubmit, onCancel, talentId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增教育经历');
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
      if (values.endTime) {
        payload.endTime = values.endTime.format('YYYY-MM-DD');
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
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} labelAlign="left">
        <Form.Item name="startTime" label="学习日期" rules={[
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
          label="毕业院校"
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
          name="classes"
          label="所学专业"
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
          name={'education'}
          fieldKey={'education'}
          label="学历"
        >
          <Select
            options={[
              {
                label: '不限',
                value: 0,
              },
              {
                label: '初中',
                value: 1,
              },
              {
                label: '中专',
                value: 2,
              },
              {
                label: '高中',
                value: 3,
              },
              {
                label: '大专',
                value: 4,
              },
              {
                label: '本科',
                value: 5,
              },
              {
                label: '硕士',
                value: 6,
              },
              {
                label: '博士',
                value: 7,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="isAllTime"
          label="是否统招"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Select
            options={[
              { label: '是', value: 0 },
              { label: '否', value: 1 },
            ]}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEducation;
