import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Radio, Cascader } from "antd";
import { addBtrip } from '@/services/office'
import DebounceSelect from '@/pages/Admin/TCAList/components/UserSearch'
import { userList } from "@/services/admin";
import CascaderMul from '@/components/CascaderMul';
import { cityListName } from '@/utils/CityList';
import moment from 'moment';




const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ModalOnFieldApply = ({ visible, onSubmit, onCancel, record }) => {
  const [num, setNum] = useState(0)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const formList = [
    {
      name: "type",
      label: " ",
      type: "radio",
      span: 6,
    },
    {
      name: "members",
      label: "添加成员",
      type: "inputUser",
      span: 6,
    },
    {
      name: "sourceCity",
      label: "出发城市",
      type: "cascader",
      options: cityListName,
      span: 6,
    },
    {
      name: "targetCity",
      label: "目标城市",
      type: "cascader",
      options: cityListName,
      span: 6,
    },
    {
      name: "targetAddress",
      label: "详细地址",
      type: "input",
      span: 6,
    },
    {
      name: "onfiledDate",
      label: "出差日期",
      type: "dateRange",
      span: 6,
    },
    {
      name: "reason",
      label: "出差原因",
      type: "textArea",
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
              <Form.Item name={col.name} label={col.label} key={col.label}>
                <DatePicker style={{ width: "100%" }}></DatePicker>
              </Form.Item>
            );
          }
          if (col.type === "radio") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label}>
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
                <Form.Item name={col.name} label={col.label} key={col.label}>
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
          if (col.type === "cascader") {
            return (
              <Form.Item name={col.name} label={col.label}>
                <Cascader
                  options={col.options}
                  placeholder=""
                ></Cascader>
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

export default ModalOnFieldApply;
