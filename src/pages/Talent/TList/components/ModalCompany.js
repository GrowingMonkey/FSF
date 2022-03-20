import { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, message, Select } from 'antd';
import { addEC, updateEC } from '../../../../services/talent';
import { industryList } from '../../../../utils/Industry';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import SelfDate from '@/components/SelfDate';
const ModalCompany = ({ visible, onSubmit, onCancel, record, talentId, data = null }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增工作经历');
  const [industryChildList, setIndustryChildList] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (data && data.id) {
      setModalTitle(`修改工作经历`);
      let isNow = data.endTime == '至今' ? true : false;

      form.setFieldsValue(Object.assign({}, {
        name: data?.name,
        job: data?.job,
        startTime: [data?.startTime, isNow ? null : data?.endTime],
        industry: data?.industry ? +data.industry : '',
        duty: data?.duty,
      }))
    } else {
      setModalTitle(`新增工作经历`);
      form.resetFields();
    }
  }, [data])
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
      if (data.id) {
        updateEC({ talentId: talentId, id: data.id, ...payload }).then(res => {
          message.info(res.message);
          onSubmit();
          form.resetFields();
          setConfirmLoading(false);
        })
      } else {
        addEC({ talentId: talentId, ...payload }).then((data) => {
          console.log(data);
          onSubmit();
          form.resetFields();
          setConfirmLoading(false);
        });
      }
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
        <Form.Item name="startTime" label="工作时间" rules={[
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
          label="所在公司"
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
          label="工作岗位"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="industry" label="所在行业">
          <Select options={industryList} onChange={onIndustryChange}></Select>
        </Form.Item>

        <Form.Item name="duty" label="工作职责" rules={[
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

export default ModalCompany;
