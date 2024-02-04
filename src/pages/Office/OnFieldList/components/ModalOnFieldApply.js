import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Radio, Upload, message, Cascader } from "antd";
import { addBtrip } from '@/services/office'
import DebounceSelect from '@/pages/Admin/TCAList/components/UserSearch'
import { userList } from "@/services/admin";
import { upload } from '@/utils/lib/upload';

import CascaderMul from '@/components/CascaderMul';
import { cityListName } from '@/utils/CityList';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';





const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ModalOnFieldApply = ({ visible, onSubmit, onCancel, record }) => {
  const [fileUrl, setFileUrl] = useState(null);

  const [num, setNum] = useState(0)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const formList = [
    {
      name: "type",
      label: " ",
      type: "radio",
      span: 6,
      rules: [{
        required: true,
        message: '请选择出差类型'
      }],
    },
    {
      name: "members",
      label: "添加成员",
      type: "inputUser",
      span: 6,
      rules: [{
        required: true,
        message: '请选择出差人员'
      }],
    },
    {
      name: "sourceCity",
      label: "出发城市",
      type: "cascader",
      options: cityListName,
      span: 6,
      rules: [{
        required: true,
        message: '请选择出发城市'
      }],
    },
    {
      name: "targetCity",
      label: "目标城市",
      type: "cascader",
      options: cityListName,
      span: 6,
      rules: [{
        required: true,
        message: '请选择目标城市'
      }],
    },
    {
      name: "targetAddress",
      label: "详细地址",
      type: "input",
      rules: [{
        required: true,
        message: '请输入详细地址'
      }],
      span: 6,
    },
    {
      name: "onfiledDate",
      label: "出差日期",
      type: "dateRange",
      span: 6,
      rules: [{
        required: true,
        message: '请选择出差时间'
      }],
    },

    {
      name: "reason",
      label: "出差原因",
      type: "textArea",
      rules: [{
        required: true,
        message: '请输入出差原因'
      }],
      span: 6,
    },
    {
      name: "file",
      label: "附件",
      type: "file",
      span: 6,
    },
  ];
  const handleCancel = () => {
    onCancel()
  };
  const handleOk = () => {
    form.validateFields().then(value => {
      console.log(value);
      let params = {
        ...value,
        sourceCity: value.sourceCity[0],
        targetCity: value.targetCity[0],
        startTime: moment(value.onfiledDate[0]).format('YYYY/MM/DD'),
        endTime: moment(value.onfiledDate[1]).format('YYYY/MM/DD'),
        onfiledDate: '',
      }
      if (value.type == 1) {
        params.members = value.members.map((item => {
          return {
            appUserId: item.value,
            appUserName: item.label
          }
        }))
      }
      addBtrip(params).then(res => {
        onSubmit()
      })
    })

  };
  return (
    <Modal
      forceRender
      visible={visible}
      title="出差申请"
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
                key={col.label}
              >
                <Select options={col.options}></Select>
              </Form.Item>
            );
          }
          if (col.type === "datePicker") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
                <DatePicker style={{ width: "100%" }}></DatePicker>
              </Form.Item>
            );
          }
          if (col.type === "radio") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
                <Radio.Group onChange={(e) => setNum(e.target.value)}>
                  <Radio default value="0">单人出差</Radio>
                  <Radio value="1">多人出差</Radio>
                </Radio.Group>
              </Form.Item>
            );
          }
          if (col.type === "inputUser") {
            console.log(form.getFieldValue('type'))
            if (form.getFieldValue('type') != 0) {
              return (
                <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
                  <DebounceSelect
                    mode="multiple"
                    value={form.getFieldValue('ids')}
                    placeholder="Select users"

                    fetchOptions={async (e) => {
                      let a = await userList({ name: e });
                      console.log(a)
                      console.log(e);

                      return a.data.list.map(item => {
                        return {
                          label: `${item.name} `,
                          value: item.userId,
                        }
                      });
                    }}
                    onChange={(newValue) => {
                      // setValue(newValue);
                    }}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              );
            }

          }
          if (col.type === 'file') {
            return (<Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
              <Upload
                name="file"
                showUploadList={false}
                listType='picture-card'
                onChange={() => { }}
                customRequest={async (options) => {
                  let result = await upload(options.file, () => { console.log('chenggong') }, '/file/');
                  console.log(result.res);
                  if (result.res.status == 200) {
                    message.info('上传成功');
                    let name = result.name.split('/').filter(i => i.indexOf('.') > 0);
                    console.log(name)
                    console.log(result.res.requestUrls[0]);
                    form.setFieldsValue({ file: result.name.split('?')[0] });
                    setFileUrl(result.res.requestUrls[0].split('?')[0])
                    console.log(form.getFieldValue('file'))

                  }
                  options.onSuccess();
                }}>
                {fileUrl ? (
                  <img
                    src={fileUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                    uploadButton
                  )}
              </Upload>

            </Form.Item>)
          }
          if (col.type === "cascader") {
            return (
              <Form.Item name={col.name} label={col.label} rules={col.rules}>
                <Cascader
                  options={col.options}
                  placeholder=""
                ></Cascader>
              </Form.Item>
            );
          }
          if (col.type === "textArea") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
                <TextArea
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            );
          }
          if (col.type === "dateRange") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label} rules={col.rules}>
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

export default ModalOnFieldApply;
