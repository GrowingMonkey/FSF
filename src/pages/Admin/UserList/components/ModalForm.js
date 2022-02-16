import { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Row, Col, Divider } from 'antd';
import moment from 'moment';
import { addUser, updateUser } from '../../../../services/admin';

const ModalForm = ({ visible, onSubmit, onCancel, record, areaTypes, companyTypes, roleTypes }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增角色');
  const [date, setDate] = useState(null);
  const [comName, setComName] = useState('');
  const [areaName, setAreaName] = useState('');
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      if (record) {
        form.setFieldsValue(record);
        setDate(moment(record.hireDate));
        setModalTitle('编辑角色');
      } else {
        setModalTitle('新增角色');
      }
    }
  }, [visible]);
  // TODO
  const recruitmentChannels = [
    {
      label: '正常入职',
      value: 0,
    },
    {
      label: '推荐',
      value: 1,
    },
  ];
  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        if (record) {
          updateUser({
            userId: record.userId,
            ...values,
            hireDate: date?.format('YYYY-MM-DD'),
            comName: comName,
            areaName: areaName,
          }).then(() => {
            onSubmit();
            setConfirmLoading(false);
            form.resetFields();
            setDate(null);
            setComName('');
            setAreaName('');
          });
        } else {
          addUser({
            ...values,
            hireDate: date?.format('YYYY-MM-DD'),
            comName: comName,
            areaName: areaName,
          }).then(() => {
            onSubmit();
            setConfirmLoading(false);
            form.resetFields();
            setDate(null);
            setComName('');
            setAreaName('');
          });
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        setConfirmLoading(false);
      });
  };
  const handleCancel = () => {
    setConfirmLoading(false);
    form.resetFields();
    setDate(null);
    setComName('');
    setAreaName('');
    onCancel();
  };
  const onComanyChange = (data, info) => {
    setComName(info.label);
  };
  const onAreaChange = (data, info) => {
    setAreaName(info.label);
  };
  const onDateChange = (data) => {
    setDate(data);
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
      width={1000}
    >
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              name="account"
              label="账户"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="电话"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="所属大区"
              name="areaName"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Select options={areaTypes} onChange={onAreaChange} />
            </Form.Item>
            <Form.Item
              name="comId"
              label="所属公司"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Select options={companyTypes} onChange={onComanyChange} />
            </Form.Item>
          </Col>
          <Col span={2} style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col span={11}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="上岗日期">
              <DatePicker value={date} onChange={onDateChange}></DatePicker>
            </Form.Item>
            <Form.Item
              name="roleId"
              label="角色"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Select options={roleTypes}></Select>
            </Form.Item>
            <Form.Item name="recruitmentChannel" label="招聘渠道">
              <Select options={recruitmentChannels} />
            </Form.Item>
            <Form.Item name="introduce" label="个人介绍">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalForm;
