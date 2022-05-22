import { useState, useEffect } from "react";
import { Modal, Form, Input, Cascader } from "antd";
import { info, getCodeByProvinceName } from "china-region";
import { cityList } from "../../../../utils/CityList";
import { addTCA, tcaList, updateTeam, addTeam, userList, updateTCA } from "../../../../services/admin";
import DebounceSelect from './UserSearch'

const ModalFormTeam = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增团队");
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        let payload = { ...values };
        // if (payload.cityCode.length === 2) {
        //   payload.cityCode = payload.cityCode[1];
        // }
        // if (payload.cityCode.length === 1) {
        //   payload.cityCode = payload.cityCode[0];
        // }
        if (record) {
          updateTeam({ id: record.id, ...payload, ids: values.ids.map(item => item.value), leaderId: values.leaderId.value, superiorId: values.superiorId.value, level: 2 }).then(() => {
            onSubmit();
            form.resetFields();
            setConfirmLoading(false);
          });
        } else {
          addTeam({ ...payload, ids: values.ids.map(item => item.value), leaderId: values.leaderId.value, superiorId: values.superiorId.value, level: 2 }).then(() => {
            onSubmit();
            form.resetFields();
            setConfirmLoading(false);
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  useEffect(() => {
    if (visible) {
      if (record) {
        let value = { ...record };
        let cityInfo = info(`${value.cityCode}`);
        console.log(cityInfo);
        let provinceCode = "";
        let prefectureCode = cityInfo.code;
        if (cityInfo.prefecture !== cityInfo.province) {
          provinceCode = getCodeByProvinceName(cityInfo.province);
        } else {
          provinceCode = prefectureCode;
        }
        value.cityCode = [provinceCode, prefectureCode];
        console.log(value);
        form.setFieldsValue({ ...value });
        setModalTitle("编辑团队");
      } else {
        setModalTitle("新增团队");
      }
    }
  }, [visible]);
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
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="superiorId" label="归属公司">
          <DebounceSelect
            showSearch
            value={form.getFieldValue('name')}
            placeholder="Select users"
            fetchOptions={async (e) => {
              let a = await tcaList({ name: e, level: '1' });
              console.log(a)
              console.log(e);

              return a.data.list.map(item => {
                return {
                  label: `${item.name} `,
                  value: item.id,
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
        <Form.Item name="leaderId" label="团队负责人">
          <DebounceSelect
            // mode="multiple"
            showSearch
            value={form.getFieldValue('name')}
            placeholder="Select users"
            fetchOptions={async (e) => {
              let a = await userList({ name: e });
              console.log(a)
              console.log(e);

              return a.data.list.map(item => {
                return {
                  label: `${item.name} `,
                  value: item.id,
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
        <Form.Item name="ids" label="团队下属员工">
          <DebounceSelect
            mode="multiple"

            value={form.getFieldValue('name')}
            placeholder="Select users"
            fetchOptions={async (e) => {
              let a = await userList({ name: e });
              console.log(a)
              console.log(e);

              return a.data.list.map(item => {
                return {
                  label: `${item.name} `,
                  value: item.id,
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
        <Form.Item name="remark" label="说明">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFormTeam;
