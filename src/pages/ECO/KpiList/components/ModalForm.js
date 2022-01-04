import { useState, useEffect } from 'react';
import { Modal, Form, Input, Cascader } from 'antd';
import { addKpi } from '../../../../services/eco';

const ModalFormTeam = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增业绩');
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        let payload = { ...values };
        addKpi({ ...payload }).then(() => {
          onSubmit();
          form.resetFields();
          setConfirmLoading(false);
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const stateList = [
    {
      label: '待审核',
      value: 0,
    },
    {
      label: '已通过',
      value: 1,
    },
    {
      label: '已驳回',
      value: 2,
    },
  ];

  const typeList = [
    {
      label: '首付款',
      value: 0,
    },
    {
      label: '服务费/回款',
      value: 1,
    },
    {
      label: '咨询费',
      value: 2,
    },
  ];

  return (
    <Modal
      visible={visible}
      title={modalTitle}
      okText="提交"
      cancelText="取消"
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
        <Form.Item name="employ" label="json数组">
          <Input></Input>
        </Form.Item>
        <Form.Item name="rate" label="所占比例">
          <Input />
        </Form.Item>
        <Form.Item name="serviceFeeId" label="费用来源ID">
          <Cascader options={[]} placeholder="请选择" />
        </Form.Item>
        <Form.Item name="state" label="审核状态">
          <Cascader options={stateList} placeholder="请选择" />
        </Form.Item>
        <Form.Item name="type" label="业绩类型">
          <Cascader options={typeList} placeholder="请选择" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFormTeam;
