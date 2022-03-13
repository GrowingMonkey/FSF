import { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Upload, Row, Col, Divider } from 'antd';
import moment from 'moment';
import { addUser, updateUser } from '../../../../services/admin';
import { upload } from '@/utils/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormUploadButton,
} from '@ant-design/pro-form';
const ModalForm = ({ visible, onSubmit, onCancel, record, areaTypes, companyTypes, roleTypes }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增角色');
  const [date, setDate] = useState(null);
  const [comName, setComName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [areaName, setAreaName] = useState('');
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      if (record) {
        console.log(record);
        form.setFieldsValue(record);
        form.setFieldsValue({ headUrl: [record.headUrl] });
        setImageUrl(record.headUrl);
        setDate(moment(record.hireDate));
        setModalTitle('编辑角色');
      } else {
        setModalTitle('新增角色');
      }
    }
  }, [visible]);
  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
            headUrl: values.headUrl[0]
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
            headUrl: values.headUrl[0]
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
      <ProForm form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left" layout={'horizontal'} submitter={{
        render: (props, dom) => {
          return null;
        },
      }}>
        <Row gutter={16}>
          <Col span={11}>
            <ProFormUploadButton
              name="headUrl"
              label="头像"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
              icon={null}
              fieldProps={{
                listType: 'picture-card',
                className: 'avatar-uploader',
                showUploadList: false,
                customRequest: async (options) => {
                  let result = await upload(options.file, () => { });
                  console.log(result.res.requestUrls[0]);
                  form.setFieldsValue({ headUrl: [result.name] });
                  setImageUrl(
                    result.res.requestUrls[0].split('?')[0] +
                    '?x-oss-process=image/resize,w_100,h_100/quality,q_50',
                  );
                  options.onSuccess(result.res.requestUrls[0], result.res.requestUrls[0]);
                },
              }}
              name="headUrl"
              title={
                imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                    uploadButton
                  )
              }
            />
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
          </Col>
          <Col span={2} style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col span={11}>
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
            <Form.Item
              name="flowerName"
              label="员工花名"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Input />
            </Form.Item>
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
      </ProForm>
    </Modal>
  );
};

export default ModalForm;
